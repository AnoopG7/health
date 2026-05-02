import type { User } from '@/schemas/auth'

const STORAGE_KEY = 'vitaledge_auth'

async function getUsers(): Promise<unknown[]> {
  const res = await fetch('/data/users.json')
  return res.json()
}

export async function login(email: string, _password: string): Promise<User> {
  const users = await getUsers()
  const found = (users as {
    id: string
    firstName: string
    lastName: string
    email: string
    password: string
    phone: string
    avatar: string
    joinedDate: string
    role: string
  }[]).find((u) => u.email === email)

  if (!found) {
    throw new Error('Invalid email or password')
  }

  const mockToken = `token_${found.id}_${Date.now()}`
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ user: found, token: mockToken }))

  return {
    id: found.id,
    firstName: found.firstName,
    lastName: found.lastName,
    email: found.email,
    phone: found.phone,
    avatar: found.avatar,
    role: found.role as 'client' | 'trainer' | 'admin',
    createdAt: found.joinedDate,
    updatedAt: found.joinedDate,
  }
}

export async function register(data: {
  firstName: string
  lastName: string
  email: string
  password: string
}): Promise<User> {
  const mockToken = `token_${data.email}_${Date.now()}`
  const mockUser: User = {
    id: `usr-${Date.now()}`,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phone: '',
    avatar: '',
    role: 'client',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify({ user: mockUser, token: mockToken }))
  return mockUser
}

export async function verifyToken(): Promise<boolean> {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) return false

  try {
    const { token } = JSON.parse(stored)
    return !!token
  } catch {
    return false
  }
}

export function logout(): void {
  localStorage.removeItem(STORAGE_KEY)
}

export function getCurrentUser(): User | null {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) return null

  try {
    const { user } = JSON.parse(stored)
    return user as User
  } catch {
    return null
  }
}
