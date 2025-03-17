import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Bot,
  Sparkles,
  Clock,
  Settings,
  Mail,
  Twitter,
  Users,
  Zap,
  Shield,
  BarChart4,
  MessageSquare,
  Share2,
  Check,
} from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="text-xl font-bold flex items-center gap-2"
            >
              <Twitter className="h-6 w-6 text-primary" />
              <span>ViralxAgent</span>
            </Link>
            <div className="flex items-center space-x-6">
              <Link
                href="#features"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                Features
              </Link>
              <Link
                href="#pricing"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="#contact"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                Contact
              </Link>
              <ThemeToggle />
              <Link href="/login">
                <Button>Login</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px] [mask-image:radial-gradient(white,transparent_85%)]" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center space-x-2 rounded-full bg-primary/10 px-4 py-1.5 mb-8 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              <span>Powered by Advanced AI Technology</span>
            </div>
            <h1 className="text-100xl md:text-6xl font-bold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
              Viral Twitter Game,
              <br />
              Automated & Enhanced
            </h1>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
              Transform your Twitter presence with AI-powered tweets, smart
              scheduling, and engagement analytics. Join thousands of creators
              amplifying their social media impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/login">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-lg px-8"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-lg px-8">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">1K+</div>
              <div className="text-muted-foreground">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1k+</div>
              <div className="text-muted-foreground">Tweets Generated</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-muted-foreground">Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-muted-foreground">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Everything You Need to Excel
            </h2>
            <p className="text-muted-foreground text-lg">
              Comprehensive tools and features designed to maximize your Twitter
              impact and save you time.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-xl border hover:border-primary/50 transition-colors">
              <Bot className="h-12 w-12 mb-6 text-primary" />
              <h3 className="text-xl font-semibold mb-3">
                AI-Powered Generation
              </h3>
              <p className="text-muted-foreground">
                Create engaging, contextual tweets that resonate with your
                audience using advanced AI technology.
              </p>
            </div>
            <div className="bg-card p-8 rounded-xl border hover:border-primary/50 transition-colors">
              <Clock className="h-12 w-12 mb-6 text-primary" />
              <h3 className="text-xl font-semibold mb-3">Smart Scheduling</h3>
              <p className="text-muted-foreground">
                Post at optimal times with our intelligent scheduling system
                that maximizes engagement.
              </p>
            </div>
            <div className="bg-card p-8 rounded-xl border hover:border-primary/50 transition-colors">
              <BarChart4 className="h-12 w-12 mb-6 text-primary" />
              <h3 className="text-xl font-semibold mb-3">
                Analytics & Insights
              </h3>
              <p className="text-muted-foreground">
                Track performance metrics and get actionable insights to improve
                your Twitter strategy.
              </p>
            </div>
            <div className="bg-card p-8 rounded-xl border hover:border-primary/50 transition-colors">
              <MessageSquare className="h-12 w-12 mb-6 text-primary" />
              <h3 className="text-xl font-semibold mb-3">Engagement Tools</h3>
              <p className="text-muted-foreground">
                Boost interaction with smart reply suggestions and engagement
                automation features.
              </p>
            </div>
            <div className="bg-card p-8 rounded-xl border hover:border-primary/50 transition-colors">
              <Shield className="h-12 w-12 mb-6 text-primary" />
              <h3 className="text-xl font-semibold mb-3">Safe & Secure</h3>
              <p className="text-muted-foreground">
                Enterprise-grade security ensuring your account and data are
                always protected.
              </p>
            </div>
            <div className="bg-card p-8 rounded-xl border hover:border-primary/50 transition-colors">
              <Share2 className="h-12 w-12 mb-6 text-primary" />
              <h3 className="text-xl font-semibold mb-3">
                Multi-Account Support
              </h3>
              <p className="text-muted-foreground">
                Manage multiple Twitter accounts from a single, unified
                dashboard effortlessly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-muted-foreground text-lg">
              Choose the perfect plan for your Twitter automation needs.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-card p-8 rounded-xl border hover:shadow-lg transition-all">
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-2">Basic</h3>
                <p className="text-4xl font-bold">Free</p>
                <p className="text-muted-foreground mt-2">
                  Perfect for getting started
                </p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>5 tweets per month</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>Basic AI generation</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>Manual posting only</span>
                </li>
              </ul>
              <Button className="w-full" variant="outline">
                Login
              </Button>
            </div>

            <div className="bg-card p-8 rounded-xl border-2 border-primary relative transform hover:scale-105 transition-all">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-2">Pro</h3>
                <p className="text-4xl font-bold">$5</p>
                <p className="text-muted-foreground mt-2">per month</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>90 tweets per month</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>Advanced AI generation</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>Smart scheduling</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>Basic analytics</span>
                </li>
              </ul>
              <Button className="w-full">Subscribe Now</Button>
            </div>

            <div className="bg-card p-8 rounded-xl border hover:shadow-lg transition-all">
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-2">Ultimate</h3>
                <p className="text-4xl font-bold">$15</p>
                <p className="text-muted-foreground mt-2">per month</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>Unlimited tweets</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>Premium AI features</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>Advanced analytics</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>Priority support</span>
                </li>
              </ul>
              <Button className="w-full" variant="outline">
                Subscribe Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
            <p className="text-muted-foreground text-lg mb-8">
              Have questions? Our team is here to help you get started with
              Twitter automation.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
                <Button size="lg" variant="outline" className="w-full" >
                  <Mail className="mr-2 h-5 w-5" />
                  
                  Contact Support
                </Button>
       
              <Link href={"https://x.com/kundan_singh91"}>
                <Button size="lg" variant="outline" className="w-full">
                  <Twitter className="mr-2 h-5 w-5" />
                  Follow Updates
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Twitter className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg">Twitter Agent</span>
              </div>
              <p className="text-muted-foreground">
                Empowering your Twitter presence with AI-driven automation and
                analytics.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Product</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="#features"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#pricing"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    API
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Company</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Legal</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Terms
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Security
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-muted-foreground">
            <p>© 2024 Twitter Agent. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
