export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <h1 className="mb-4 text-8xl font-bold text-primary">404</h1>
        <p className="mb-8 text-xl text-muted-foreground">Page not found</p>
        <a href="/" className="text-primary underline">Go Home</a>
      </div>
    </section>
  )
}
