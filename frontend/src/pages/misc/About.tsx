import { PageMeta, SectionHeading, StatCard } from '@/components/common'
import { Card, CardContent } from '@/components/ui/card'
import { Users, Dumbbell, Star, Trophy } from 'lucide-react'

export default function About() {
  return (
    <>
      <PageMeta title="About Us — VitalEdge" description="Learn about our mission, team, and commitment to your health." />
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeading label="Our Story" title="About VitalEdge" subtitle="Built on science, driven by results." align="center" />
          <div className="mx-auto mt-8 max-w-3xl text-center">
            <p className="mb-6 text-lg text-muted-foreground">
              VitalEdge was founded with a simple mission: make elite-level health coaching accessible to everyone.
              We bring together certified strength coaches, physiotherapists, dietitians, and mental wellness experts
              under one roof so you get a truly holistic approach to health.
            </p>
            <p className="mb-6 text-lg text-muted-foreground">
              Every programme we offer is evidence-based, every trainer is fully certified, and every client gets
              a personalised plan. We don't do one-size-fits-all.
            </p>
          </div>
        </div>
      </section>
      <section className="border-b py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            <StatCard icon={<Users className="h-6 w-6" />} value={500} label="Active Clients" suffix="+" />
            <StatCard icon={<Dumbbell className="h-6 w-6" />} value={1200} label="Sessions Completed" suffix="+" />
            <StatCard icon={<Star className="h-6 w-6" />} value={4.9} label="Average Rating" suffix="/5" />
            <StatCard icon={<Trophy className="h-6 w-6" />} value={98} label="Success Rate" suffix="%" />
          </div>
        </div>
      </section>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeading title="Our Values" align="center" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <Card><CardContent className="p-6"><h3 className="mb-2 text-lg font-semibold">Evidence-Based</h3><p className="text-muted-foreground">Every programme and recommendation is backed by peer-reviewed research and real-world results.</p></CardContent></Card>
            <Card><CardContent className="p-6"><h3 className="mb-2 text-lg font-semibold">Personalised</h3><p className="text-muted-foreground">No cookie-cutter plans. Your programme is built around your goals, schedule, and abilities.</p></CardContent></Card>
            <Card><CardContent className="p-6"><h3 className="mb-2 text-lg font-semibold">Holistic</h3><p className="text-muted-foreground">We address the whole person — training, nutrition, recovery, and mental wellness.</p></CardContent></Card>
          </div>
        </div>
      </section>
    </>
  )
}
