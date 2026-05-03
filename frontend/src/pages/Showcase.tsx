import { useState } from 'react'
import PageMeta from '@/components/common/PageMeta'
import {
  PlaceholderImage,
  StarRating,
  ProgressBadge,
  StatCard,
  ServiceCard,
  TrainerCard,
  ProgramCard,
  BlogCard,
  TestimonialCard,
  PricingCard,
  FilterBar,
} from '@/components/common'
import ThemeToggle from '@/components/layout/ThemeToggle'
import NewsletterForm from '@/components/forms/NewsletterForm'
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Badge,
  Input,
  Label,
  Switch,
  Slider,
  Progress,
  Alert,
  AlertDescription,
  AlertTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Checkbox,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
  Skeleton,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Avatar,
  AvatarFallback,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  ScrollArea,
} from '@/components/ui'
import {
  Dumbbell,
  Brain,
  Heart,
  Users,
  ShieldCheck,
  Activity,
  ChevronsUpDown,
  Plus,
  Settings,
  LogOut,
  User,
  HelpCircle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import { toast } from 'sonner'

const mockPricingTiers = [
  { name: 'Basic', price: 29, period: 'session', description: 'Perfect for beginners.', features: [
    { label: '1 session/week', included: true }, { label: 'Assessment', included: true },
    { label: 'Email support', included: true }, { label: 'Custom plan', included: false },
  ], cta: 'Get Started', popular: false, discount: '' },
  { name: 'Standard', price: 59, period: 'session', description: 'Most popular plan.', features: [
    { label: '3 sessions/week', included: true }, { label: 'Full assessment', included: true },
    { label: 'Priority support', included: true }, { label: 'Custom plan', included: true },
  ], cta: 'Get Started', popular: true, discount: 'Save 15%' },
  { name: 'Premium', price: 99, period: 'session', description: 'Full experience.', features: [
    { label: 'Daily sessions', included: true }, { label: 'Full assessment', included: true },
    { label: '24/7 support', included: true }, { label: 'Custom plan', included: true },
  ], cta: 'Get Started', popular: false, discount: 'Save 20%' },
]

const mockInvoices = [
  { id: 'INV001', status: 'Active', method: 'Credit Card', amount: '$250.00' },
  { id: 'INV002', status: 'Pending', method: 'PayPal', amount: '$150.00' },
  { id: 'INV003', status: 'Active', method: 'Bank', amount: '$350.00' },
]

export default function Showcase() {
  const [collapsibleOpen, setCollapsibleOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [radioVal, setRadioVal] = useState('comfortable')
  const [check1, setCheck1] = useState(false)

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background py-24">
        <PageMeta title="Showcase — VitalEdge" description="Every component." />
        <div className="container-custom space-y-8">

          <h1 className="text-center gradient-text text-4xl font-extrabold">Component Showcase</h1>

          {/* Typography & Headings */}
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-muted-foreground">Typography</h2>
            <div className="rounded-xl border bg-card p-6">
              <h1>Heading 1</h1><h2>Heading 2</h2><h3>Heading 3</h3><h4>Heading 4</h4><h5>Heading 5</h5><h6>Heading 6</h6>
              <p className="text-muted-foreground">Body text.</p>
              <span className="gradient-text text-xl font-bold">Gradient Text</span>
            </div>
          </div>

          {/* Buttons & Badges */}
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-muted-foreground">Buttons &amp; Badges</h2>
            <div className="rounded-xl border bg-card p-6">
              <div className="flex flex-wrap items-center gap-3">
                <Button>Primary</Button><Button variant="secondary">Secondary</Button><Button variant="outline">Outline</Button><Button variant="ghost">Ghost</Button><Button variant="destructive">Destructive</Button><Button variant="link">Link</Button><Button size="sm">Small</Button><Button size="lg">Large</Button><Button size="icon"><Plus className="h-4 w-4" /></Button><Button disabled>Disabled</Button>
                <Badge>Default</Badge><Badge variant="secondary">Secondary</Badge><Badge variant="outline">Outline</Badge><Badge variant="destructive">Destructive</Badge>
                <ProgressBadge level="beginner" /><ProgressBadge level="intermediate" /><ProgressBadge level="advanced" />
              </div>
            </div>
          </div>

          {/* Form Elements */}
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-muted-foreground">Forms</h2>
            <div className="rounded-xl border bg-card p-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-2"><Label>Input</Label><Input placeholder="Name" /></div>
                <div className="space-y-2"><Label>Textarea</Label><Textarea placeholder="Message" rows={3} /></div>
                <div className="space-y-2"><Label>Select</Label>
                  <Select defaultValue="physio"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="physio">Physiotherapy</SelectItem><SelectItem value="training">Training</SelectItem></SelectContent></Select>
                </div>
                <div className="space-y-2"><Label>Checkbox</Label><div className="flex items-center gap-2"><Checkbox checked={check1} onCheckedChange={(v) => setCheck1(v as boolean)} /><Label>Notifications</Label></div></div>
                <div className="space-y-2"><Label>Radio</Label>
                  <RadioGroup value={radioVal} onValueChange={setRadioVal} className="flex gap-4">
                    <div className="flex items-center gap-2"><RadioGroupItem value="comfortable" id="r1" /><Label htmlFor="r1">Comfy</Label></div>
                    <div className="flex items-center gap-2"><RadioGroupItem value="compact" id="r2" /><Label htmlFor="r2">Compact</Label></div>
                  </RadioGroup>
                </div>
                <div className="space-y-2"><Label>Switch</Label><div className="flex items-center gap-2"><Switch /><span className="text-sm text-muted-foreground">Toggle</span></div></div>
                <div className="space-y-2"><Label>Slider</Label><Slider defaultValue={[50]} max={100} /></div>
                <div className="space-y-2"><Label>Progress</Label><Progress value={65} className="h-2" /></div>
              </div>
            </div>
          </div>

          {/* Alerts & Toast */}
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-muted-foreground">Alerts &amp; Toast</h2>
            <div className="rounded-xl border bg-card p-6 space-y-3">
              <Alert><AlertTitle>Info</AlertTitle><AlertDescription>Alert description.</AlertDescription></Alert>
              <div className="flex gap-3"><Button variant="outline" onClick={() => toast.success('Success!')}>Success</Button><Button variant="outline" onClick={() => toast.error('Error!')}>Error</Button><Button variant="outline" onClick={() => toast.info('Info!')}>Info</Button><Button variant="outline" onClick={() => toast.warning('Warning!')}>Warning</Button></div>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-muted-foreground">Navigation</h2>
            <div className="rounded-xl border bg-card p-6 space-y-6">
              <Breadcrumb><BreadcrumbList><BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbPage>Current</BreadcrumbPage></BreadcrumbItem></BreadcrumbList></Breadcrumb>
              <Tabs defaultValue="a"><TabsList><TabsTrigger value="a">Tab A</TabsTrigger><TabsTrigger value="b">Tab B</TabsTrigger><TabsTrigger value="c">Tab C</TabsTrigger></TabsList><TabsContent value="a" className="pt-3 text-sm text-muted-foreground">Content A.</TabsContent><TabsContent value="b" className="pt-3 text-sm text-muted-foreground">Content B.</TabsContent><TabsContent value="c" className="pt-3 text-sm text-muted-foreground">Content C.</TabsContent></Tabs>
            </div>
          </div>

          {/* Interactive */}
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-muted-foreground">Interactive</h2>
            <div className="rounded-xl border bg-card p-6 space-y-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="1"><AccordionTrigger>Question 1?</AccordionTrigger><AccordionContent>Answer 1.</AccordionContent></AccordionItem>
                <AccordionItem value="2"><AccordionTrigger>Question 2?</AccordionTrigger><AccordionContent>Answer 2.</AccordionContent></AccordionItem>
              </Accordion>
              <Collapsible open={collapsibleOpen} onOpenChange={setCollapsibleOpen} className="space-y-2">
                <div className="flex items-center justify-between"><span className="text-sm font-medium">Collapsible</span><CollapsibleTrigger asChild><Button variant="ghost" size="sm">{collapsibleOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}</Button></CollapsibleTrigger></div>
                <CollapsibleContent className="space-y-1 rounded-md border p-3 text-sm text-muted-foreground"><p>Hidden content revealed.</p><p>More hidden content.</p></CollapsibleContent>
              </Collapsible>
              <div className="flex gap-4">
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}><DialogTrigger asChild><Button variant="outline">Dialog</Button></DialogTrigger><DialogContent><DialogHeader><DialogTitle>Dialog Title</DialogTitle><DialogDescription>Dialog description.</DialogDescription></DialogHeader><Input placeholder="Enter value" /><DialogFooter><Button onClick={() => setDialogOpen(false)}>Save</Button></DialogFooter></DialogContent></Dialog>
                <DropdownMenu><DropdownMenuTrigger asChild><Button variant="outline"><User className="mr-2 h-4 w-4" />Menu <ChevronsUpDown className="ml-2 h-4 w-4" /></Button></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuLabel>Account</DropdownMenuLabel><DropdownMenuSeparator /><DropdownMenuItem><User className="mr-2 h-4 w-4" />Profile</DropdownMenuItem><DropdownMenuItem><Settings className="mr-2 h-4 w-4" />Settings</DropdownMenuItem><DropdownMenuSeparator /><DropdownMenuItem className="text-destructive"><LogOut className="mr-2 h-4 w-4" />Logout</DropdownMenuItem></DropdownMenuContent></DropdownMenu>
                <Popover><PopoverTrigger asChild><Button variant="outline"><HelpCircle className="mr-2 h-4 w-4" />Popover</Button></PopoverTrigger><PopoverContent className="w-64"><p className="text-sm text-muted-foreground">Popover content here.</p></PopoverContent></Popover>
                <Tooltip><TooltipTrigger asChild><Button variant="outline">Tooltip</Button></TooltipTrigger><TooltipContent><p>Tooltip text!</p></TooltipContent></Tooltip>
                <ThemeToggle />
              </div>
            </div>
          </div>

          {/* Avatars, Skeleton, Table */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-muted-foreground">Avatars</h2>
              <div className="rounded-xl border bg-card p-6 flex items-center gap-4">
                <Avatar className="h-16 w-16"><AvatarFallback>AB</AvatarFallback></Avatar>
                <Avatar className="h-12 w-12"><AvatarFallback>CD</AvatarFallback></Avatar>
                <Avatar><AvatarFallback>EF</AvatarFallback></Avatar>
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-muted-foreground">Skeleton</h2>
              <div className="rounded-xl border bg-card p-6 space-y-3">
                <Skeleton className="h-4 w-3/4" /><Skeleton className="h-4 w-1/2" /><Skeleton className="h-20 w-full" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-muted-foreground">Table</h2>
            <div className="rounded-xl border bg-card p-6">
              <Table><TableCaption>Recent bookings</TableCaption><TableHeader><TableRow><TableHead>ID</TableHead><TableHead>Status</TableHead><TableHead>Method</TableHead><TableHead className="text-right">Amount</TableHead></TableRow></TableHeader><TableBody>{mockInvoices.map((inv) => (<TableRow key={inv.id}><TableCell className="font-medium">{inv.id}</TableCell><TableCell>{inv.status}</TableCell><TableCell>{inv.method}</TableCell><TableCell className="text-right">{inv.amount}</TableCell></TableRow>))}</TableBody></Table>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-muted-foreground">Scroll Area</h2>
            <div className="rounded-xl border bg-card p-6">
              <ScrollArea className="h-32 w-full rounded-md border p-3">
                {Array.from({ length: 15 }).map((_, i) => (<p key={i} className="text-sm text-muted-foreground">Item {i + 1}</p>))}
              </ScrollArea>
            </div>
          </div>

          {/* Cards */}
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-muted-foreground">Card Variants</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              <Card><CardHeader><CardTitle>Header Card</CardTitle><CardDescription>Description here.</CardDescription></CardHeader><CardContent><p className="text-sm text-muted-foreground">Content area.</p></CardContent><CardFooter><Button size="sm">Action</Button></CardFooter></Card>
              <Card><CardContent className="pt-6"><p className="font-medium">Simple Card</p><p className="text-sm text-muted-foreground">Just content.</p></CardContent></Card>
              <Card className="border-primary"><CardHeader><CardTitle className="text-primary">Highlighted</CardTitle><CardDescription>Primary border.</CardDescription></CardHeader></Card>
            </div>
          </div>

          {/* Rating & Placeholders */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-muted-foreground">Star Rating</h2>
              <div className="rounded-xl border bg-card p-6 flex items-center gap-6">
                <StarRating rating={5} size="sm" showValue /><StarRating rating={4.5} size="md" showValue /><StarRating rating={3.5} size="lg" showValue />
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-muted-foreground">Placeholders</h2>
              <div className="rounded-xl border bg-card p-6 grid grid-cols-4 gap-3">
                <PlaceholderImage type="avatar" text="JD" /><PlaceholderImage type="thumbnail" text="T" /><PlaceholderImage type="square" text="S" /><PlaceholderImage type="banner" text="B" />
              </div>
            </div>
          </div>

          {/* Filter & Newsletter */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-muted-foreground">Filter Bar</h2>
              <div className="rounded-xl border bg-card p-6">
                <FilterBar categories={[{ label: 'All', value: '' }, { label: 'Therapy', value: 't' }, { label: 'Training', value: 'tr' }]} activeCategory="tr" />
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-muted-foreground">Newsletter</h2>
              <div className="rounded-xl border bg-card p-6">
                <NewsletterForm />
              </div>
            </div>
          </div>

          {/* Stat Cards */}
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-muted-foreground">Stat Cards</h2>
            <div className="grid gap-4 sm:grid-cols-4">
              <StatCard icon={<Users className="h-5 w-5" />} value={2847} label="Clients" />
              <StatCard icon={<ShieldCheck className="h-5 w-5" />} value={52} label="Trainers" />
              <StatCard icon={<Activity className="h-5 w-5" />} value={12} label="Services" />
              <StatCard icon={<Heart className="h-5 w-5" />} value={98} label="Success" suffix="%" />
            </div>
          </div>

          {/* Service Cards */}
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-muted-foreground">Service Cards</h2>
            <div className="grid gap-6 sm:grid-cols-3">
              <ServiceCard slug="physio" icon={<Activity className="h-5 w-5" />} name="Physiotherapy" category="Therapy" description="Expert rehab programs." priceFrom={75} popular />
              <ServiceCard slug="training" icon={<Dumbbell className="h-5 w-5" />} name="Training" category="Training" description="1-on-1 sessions." priceFrom={60} />
              <ServiceCard slug="mental" icon={<Brain className="h-5 w-5" />} name="Mental Health" category="Wellness" description="Professional counseling." priceFrom={90} />
            </div>
          </div>

          {/* Trainer Cards */}
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-muted-foreground">Trainer Cards</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <TrainerCard id="1" name="Sarah Mitchell" title="Physiotherapist" rating={4.9} reviewCount={127} specialties={['Physio', 'Rehab']} priceFrom={85} />
              <TrainerCard id="2" name="Marcus Chen" title="Trainer" rating={4.7} reviewCount={89} specialties={['Strength', 'HIIT']} priceFrom={60} />
            </div>
          </div>

          {/* Program & Blog Cards */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-muted-foreground">Program Cards</h2>
              <div className="grid gap-4">
                <ProgramCard slug="wl" name="Weight Loss" description="12-week transformation." duration="12 weeks" level="beginner" price={499} />
                <ProgramCard slug="sc" name="Strength" description="Build a solid base." duration="8 weeks" level="intermediate" price={399} />
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-muted-foreground">Blog Cards</h2>
              <div className="grid gap-4">
                <BlogCard slug="s1" title="10 Stretching Benefits" excerpt="How stretching transforms flexibility." category="Fitness" author="Dr. Ross" readTime="5 min" date="Mar 15" featured />
                <BlogCard slug="s2" title="Nutrition Tips" excerpt="Eat right for recovery." category="Nutrition" author="J. Park" readTime="7 min" date="Mar 10" />
              </div>
            </div>
          </div>

          {/* Testimonial & Pricing */}
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-muted-foreground">Testimonials</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              <TestimonialCard quote="VitalEdge changed my fitness approach completely." name="Alex T." role="Engineer" service="Training" rating={5} />
              <TestimonialCard quote="Physio sessions got me running in 3 months." name="Maria G." role="Runner" service="Physio" rating={4.8} />
              <TestimonialCard quote="Best investment in my health." name="Sam L." role="Teacher" service="Diet" rating={4.9} />
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-muted-foreground">Pricing Cards</h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {mockPricingTiers.map((t) => (<PricingCard key={t.name} tier={t} />))}
            </div>
          </div>

        </div>
      </div>
    </TooltipProvider>
  )
}
