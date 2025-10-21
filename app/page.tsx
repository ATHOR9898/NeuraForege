import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, BarChart, Zap, Cpu, LineChart } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === "hero-dashboard");
  const features = [
    {
      icon: <BarChart className="h-8 w-8 text-primary" />,
      title: 'AI-Powered Dashboards',
      description: 'Instantly generate interactive dashboards from your business data for a clear view of your KPIs.',
    },
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: 'Workflow Automation',
      description: 'Automate repetitive tasks with pre-built templates for lead qualification, invoicing, and more.',
    },
    {
      icon: <LineChart className="h-8 w-8 text-primary" />,
      title: 'Real-Time Insights',
      description: 'Our engine provides instant, actionable business insights to help you make smarter decisions.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <HeroSection heroImage={heroImage} />
        <FeaturesSection features={features} />
        <PricingSection />
        <CallToActionSection />
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <Link href="/" className="flex items-center justify-center" prefetch={false}>
        <Cpu className="h-6 w-6 text-primary" />
        <span className="ml-2 text-lg font-bold font-headline">NeuraForge AI</span>
      </Link>
      <nav className="ml-auto flex items-center gap-4 sm:gap-6">
        <Link href="#features" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
          Features
        </Link>
        <Link href="#pricing" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
          Pricing
        </Link>
        <Button asChild>
          <Link href="/dashboard">Get Started</Link>
        </Button>
      </nav>
    </header>
  );
}

function HeroSection({ heroImage }: { heroImage: any }) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-background">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none font-headline text-primary">
                Unlock Your Business Potential with AI
              </h1>
              <p className="max-w-[600px] text-foreground/80 md:text-xl">
                NeuraForge is a unified AI platform for SMBs, offering powerful dashboards, workflow automation, and real-time insights to turn your data into a competitive advantage.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/dashboard">
                  Start Your Free Trial
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            {heroImage && (
              <Image
                src={heroImage.imageUrl}
                width={1270}
                height={846}
                alt={heroImage.description}
                data-ai-hint={heroImage.imageHint}
                className="mx-auto aspect-[3/2] overflow-hidden rounded-xl object-cover object-center sm:w-full shadow-2xl"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection({ features }: { features: any[] }) {
  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Key Features</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">A Smarter Way to Run Your Business</h2>
            <p className="max-w-[900px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              80% of business data goes unused. NeuraForge helps you leverage your data with an affordable, all-in-one AI platform.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-12 py-12 lg:grid-cols-3 lg:gap-8">
          {features.map((feature) => (
            <Card key={feature.title} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-col items-center text-center gap-4">
                {feature.icon}
                <CardTitle className="font-headline">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p>{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/50">
      <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">
            Transparent Pricing for Every Business Size
          </h2>
          <p className="mx-auto max-w-[600px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Choose the plan that's right for you. Get started for free.
          </p>
        </div>
        <div className="mx-auto w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 pt-12">
          <PricingCard
            title="Freemium"
            price="₹0"
            period="/month"
            features={[
              'Basic Dashboard',
              '1 Workflow Template',
              'Weekly Insights Digest',
              'Community Support',
            ]}
            buttonText="Start for Free"
            variant="secondary"
          />
          <PricingCard
            title="SaaS Premium"
            price="₹4,000"
            period="/month"
            features={[
              'AI-Powered Dashboards',
              'All Workflow Templates',
              'Real-Time Insights Engine',
              'Priority Email & Chat Support',
            ]}
            buttonText="Go Premium"
            variant="primary"
          />
        </div>
      </div>
    </section>
  );
}

interface PricingCardProps {
  title: string;
  price: string;
  period: string;
  features: string[];
  buttonText: string;
  variant: 'primary' | 'secondary';
}

function PricingCard({ title, price, period, features, buttonText, variant }: PricingCardProps) {
  return (
    <Card className={`flex flex-col ${variant === 'primary' ? 'border-primary shadow-2xl' : ''}`}>
      <CardHeader>
        <CardTitle className="font-headline">{title}</CardTitle>
        <div className="flex items-baseline">
          <span className="text-4xl font-bold">{price}</span>
          <span className="text-muted-foreground">{period}</span>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <ul className="space-y-2 text-left">
          {features.map((feature) => (
            <li key={feature} className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-accent" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <div className="p-6">
        <Button asChild className="w-full" variant={variant === 'primary' ? 'default' : 'outline'}>
          <Link href="/dashboard">{buttonText}</Link>
        </Button>
      </div>
    </Card>
  );
}

function CallToActionSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl font-headline">Ready to Forge a Smarter Future?</h2>
            <p className="max-w-md text-foreground/80">
              Join hundreds of SMBs who are transforming their business with NeuraForge AI. Sign up today and see the difference data can make.
            </p>
          </div>
          <div className="flex justify-start lg:justify-end">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/dashboard">
                Claim Your Free Trial
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
      <p className="text-xs text-muted-foreground">&copy; 2024 NeuraForge AI. All rights reserved.</p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
          Terms of Service
        </Link>
        <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
          Privacy
        </Link>
      </nav>
    </footer>
  );
}
