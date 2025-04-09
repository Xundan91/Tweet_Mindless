"use client";

import { Button } from "@/components/ui/button";
import { ShinyButton } from "@/components/magicui/shiny-button";
import { ReactTyped } from "react-typed";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
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
import { Spotlight } from "@/components/ui/spotlight";

export default function Home() {
	return (
		<div className="min-h-screen bg-background">
			<Spotlight />
			<nav className="fixed top-4 left-1/2 z-50 w-[100vh] transform -translate-x-1/2 bg-background/60 backdrop-blur-lg shadow-xl rounded-2xl px-6 py-4 border border-white/10">
				<div className="flex items-center justify-between gap-4">
					<div className="flex-0">
						<Link
							href="/"
							className="text-lg font-semibold flex hover:scale-105 transition-transform items-center gap-2"
						>
							<img
								src="/logo.png"
								width={50}
								height={50}
								alt=""
								className="-translate-y-1"
							/>
							<span className="-translate-x-2">ViralxAgent</span>
						</Link>
					</div>

					<div className="flex items-center space-x-4">
						<Link
							href="#features"
							className="text-sm hover:underline hover:scale-105 transition-transform font-medium text-muted-foreground hover:text-primary"
						>
							Features
						</Link>
						<Link
							href="#pricing"
							className="text-sm hover:underline hover:scale-105 transition-transform font-medium text-muted-foreground hover:text-primary"
						>
							Pricing
						</Link>
						<Link
							href="#contact"
							className="text-sm hover:underline hover:scale-105 transition-transform font-medium text-muted-foreground hover:text-primary "
						>
							Contact
						</Link>
						<ThemeToggle />
						<Link href="/login">
							<RainbowButton className="text-sm hover:scale-105 transition-transform font-medium text-muted-foreground text-black">
								Login
							</RainbowButton>
						</Link>
					</div>
				</div>
			</nav>

			{/* Hero Section */}
			<section className="relative flex items-center justify-center py-24 min-h-[85vh]">
				<div className="absolute inset-0 bg-grid-white/10 bg-[size:40px_40px] [mask-image:radial-gradient(white,transparent_85%)]" />
				<div className="container mx-auto px-4 relative z-10">
					<div className="text-center max-w-3xl mx-auto">
						<div className="inline-flex hover:scale-105 transition-transform items-center space-x-2 rounded-full bg-primary/20 backdrop-blur-md px-4 py-1.5 mb-8 text-sm font-medium text-primary">
							<Sparkles className="h-4 w-4" />
							<span>Powered by Advanced AI Technology</span>
						</div>

						<h1 className="text-100xl md:text-6xl font-bold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
							Viral{" "}
							<span className="text-blue-500">
								<ReactTyped
									strings={["Twitter", "X"]}
									typeSpeed={100}
									backSpeed={100}
									loop
								/>
							</span>
							Game,
							<br />
							Automated & Enhanced
						</h1>
						<p className="text-lg text-white text-muted-foreground mb-12 leading-relaxed">
							Transform your Twitter presence with AI-powered
							tweets, smart scheduling, and engagement analytics.
							Join thousands of creators amplifying their social
							media impact.
						</p>
						<div className="flex flex-row gap-4 justify-center items-center">
							<Link href="/login">
								<InteractiveHoverButton className="py-4 rounded-lg">
									Start Trial
								</InteractiveHoverButton>
							</Link>
							<ShinyButton className="transition py-4 px-7 hover:scale-105 hover:bg-black hover:text-white bg-gray-200 text-black">
								Watch Demo
							</ShinyButton>
						</div>
					</div>
				</div>
			</section>

			{/* Stats Section */}
			<section className="py-16 border-y bg-muted/30 relative overflow-hidden">
				{/* Animated Background */}
				<div className="arrow-bg">
					{Array.from({ length: 50 }).map((_, i) => (
						<div
							key={i}
							className="arrow"
							style={{
								left: `${Math.random() * 100}%`,
								animationDelay: `${Math.random() * 5}s`,
								animationDuration: `${3 + Math.random() * 2}s`,
							}}
						>
							↑ {/* This is the arrow character */}
						</div>
					))}
				</div>

				{/* Stats Content */}
				<div className="container mx-auto px-4 relative z-10">
					<div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
						<div>
							<div className="text-4xl font-bold mb-2">
								1K<span className="text-blue-500">+</span>
							</div>
							<div className="text-muted-foreground">
								Active Users
							</div>
						</div>
						<div>
							<div className="text-4xl font-bold mb-2">
								1k<span className="text-blue-500">+</span>
							</div>
							<div className="text-muted-foreground">
								Tweets Generated
							</div>
						</div>
						<div>
							<div className="text-4xl font-bold mb-2">
								98<span className="text-blue-500">%</span>
							</div>
							<div className="text-muted-foreground">
								Satisfaction Rate
							</div>
						</div>
						<div>
							<div className="text-4xl font-bold mb-2">
								24<span className="text-blue-500">/</span>7
							</div>
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
							Comprehensive tools and features designed to
							maximize your Twitter impact and save you time.
						</p>
					</div>
					<div className="grid md:grid-cols-3 gap-8">
						<div className="bg-card p-8 rounded-xl border hover:border-primary/50 transition-all duration-300 hover:scale-105 relative overflow-hidden group">
							<div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
							<div className="absolute inset-0 bg-[radial-gradient(circle,_transparent_10px,_#0083ff_9px)] bg-[length:20px_20px] opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
							<Bot className="h-12 w-12 mb-6 text-primary relative z-10" />
							<h3 className="text-xl font-semibold mb-3 relative z-10">
								AI-Powered Generation
							</h3>
							<p className="text-muted-foreground relative z-10">
								Create engaging, contextual tweets that resonate
								with your audience using advanced AI technology.
							</p>
						</div>
						<div className="bg-card p-8 rounded-xl border hover:border-primary/50 transition-all duration-300 hover:scale-105 relative overflow-hidden group">
							<div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
							<div className="absolute inset-0 bg-[linear-gradient(45deg,_transparent_46%,_#0083ff_47%,_#0083ff_53%,_transparent_54%)] bg-[length:20px_20px] opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
							<Clock className="h-12 w-12 mb-6 text-primary relative z-10" />
							<h3 className="text-xl font-semibold mb-3 relative z-10">
								Smart Scheduling
							</h3>
							<p className="text-muted-foreground relative z-10">
								Post at optimal times with our intelligent
								scheduling system that maximizes engagement.
							</p>
						</div>
						<div className="bg-card p-8 rounded-xl border hover:border-primary/50 transition-all duration-300 hover:scale-105 relative overflow-hidden group">
							<div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
							<div className="absolute inset-0 bg-[radial-gradient(circle,_transparent_12px,_#0083ff_13px)] bg-[length:30px_30px] opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
							<BarChart4 className="h-12 w-12 mb-6 text-primary relative z-10" />
							<h3 className="text-xl font-semibold mb-3 relative z-10">
								Analytics & Insights
							</h3>
							<p className="text-muted-foreground relative z-10">
								Track performance metrics and get actionable
								insights to improve your Twitter strategy.
							</p>
						</div>
						<div className="bg-card p-8 rounded-xl border hover:border-primary/50 transition-all duration-300 hover:scale-105 relative overflow-hidden group">
							<div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
							<div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,_#0083ff_0px,_#0083ff_1px,_transparent_1px,_transparent_10px)] opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
							<MessageSquare className="h-12 w-12 mb-6 text-primary relative z-10" />
							<h3 className="text-xl font-semibold mb-3 relative z-10">
								Engagement Tools
							</h3>
							<p className="text-muted-foreground relative z-10">
								Boost interaction with smart reply suggestions
								and engagement automation features.
							</p>
						</div>
						<div className="bg-card p-8 rounded-xl border hover:border-primary/50 transition-all duration-300 hover:scale-105 relative overflow-hidden group">
							<div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
							<div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,_transparent,_transparent_5px,_#0083ff_6px,_transparent_7px)] opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
							<Shield className="h-12 w-12 mb-6 text-primary relative z-10" />
							<h3 className="text-xl font-semibold mb-3 relative z-10">
								Safe & Secure
							</h3>
							<p className="text-muted-foreground relative z-10">
								Enterprise-grade security ensuring your account
								and data are always protected.
							</p>
						</div>
						<div className="bg-card p-8 rounded-xl border hover:border-primary/50 transition-all duration-300 hover:scale-105 relative overflow-hidden group">
							<div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
							<div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,_transparent,_transparent_10px,_#0083ff_11px,_#0083ff_12px)] opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
							<Share2 className="h-12 w-12 mb-6 text-primary relative z-10" />
							<h3 className="text-xl font-semibold mb-3 relative z-10">
								Multi-Account Support
							</h3>
							<p className="text-muted-foreground relative z-10">
								Manage multiple Twitter accounts from a single,
								unified dashboard effortlessly.
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
							Choose the perfect plan for your Twitter automation
							needs.
						</p>
					</div>

					<div className="flex flex-col md:flex-row justify-center items-center max-w-5xl mx-auto gap-8">
						{/* Basic Plan - Small */}
						<div className="bg-card p-6 rounded-xl border hover:shadow-lg transition-all w-full md:w-1/4 md:min-h-64">
							<div className="mb-6 text-center">
								<h3 className="text-lg font-semibold mb-2">
									Basic
								</h3>
								<p className="text-3xl font-bold">Free</p>
								<p className="text-muted-foreground mt-2 text-sm">
									Perfect for getting started
								</p>
							</div>
							<ul className="space-y-3 mb-6">
								<li className="flex items-center gap-2">
									<Check className="h-4 w-4 text-green-500 flex-shrink-0" />
									<span className="text-sm">
										5 tweets per month
									</span>
								</li>
								<li className="flex items-center gap-2">
									<Check className="h-4 w-4 text-green-500 flex-shrink-0" />
									<span className="text-sm">
										Basic AI generation
									</span>
								</li>
								<li className="flex items-center gap-2">
									<Check className="h-4 w-4 text-green-500 flex-shrink-0" />
									<span className="text-sm">
										Manual posting only
									</span>
								</li>
							</ul>
							<Button
								className="w-full bg-white text-black text-sm hover:scale-105 transition"
								variant="outline"
							>
								Login
							</Button>
						</div>

						{/* Pro Plan - Now the Largest with Rainbow Border */}
						<div className="p-0.5 rounded-xl bg-gradient-to-r from-blue-500 to-black relative transform transition-all w-full md:w-2/5 md:min-h-96 z-10">
							<div className="bg-card p-10 rounded-lg h-full">
								<div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-black text-white px-6 py-1 rounded-full text-sm font-medium shadow-lg">
									Most Popular
								</div>
								<div className="mb-8 text-center">
									<h3 className="text-2xl font-semibold mb-2">
										Pro
									</h3>
									<p className="text-5xl font-bold">$5</p>
									<p className="text-muted-foreground mt-2">
										per month
									</p>
								</div>
								<ul className="space-y-4 mb-8">
									<li className="flex items-center gap-2">
										<Check className="h-6 w-6 text-green-500 flex-shrink-0" />
										<span className="text-lg">
											90 tweets per month
										</span>
									</li>
									<li className="flex items-center gap-2">
										<Check className="h-6 w-6 text-green-500 flex-shrink-0" />
										<span className="text-lg">
											Advanced AI generation
										</span>
									</li>
									<li className="flex items-center gap-2">
										<Check className="h-6 w-6 text-green-500 flex-shrink-0" />
										<span className="text-lg">
											Smart scheduling
										</span>
									</li>
									<li className="flex items-center gap-2">
										<Check className="h-6 w-6 text-green-500 flex-shrink-0" />
										<span className="text-lg">
											Basic analytics
										</span>
									</li>
									<li className="flex items-center gap-2">
										<Check className="h-6 w-6 text-green-500 flex-shrink-0" />
										<span className="text-lg">
											Email notifications
										</span>
									</li>
								</ul>
								<Button className="w-full hover:text-white hover:scale-105 transition-transform py-6 text-lg relative overflow-hidden group">
									<span className="relative z-10">
										Subscribe Now
									</span>
									<span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
								</Button>
							</div>
						</div>

						{/* Ultimate Plan - Medium sized */}
						<div className="bg-card p-8 rounded-xl border hover:shadow-xl transition-all w-full md:w-1/3 md:min-h-80">
							<div className="mb-8 text-center">
								<h3 className="text-xl font-semibold mb-2">
									Ultimate
								</h3>
								<p className="text-4xl font-bold">$15</p>
								<p className="text-muted-foreground mt-2">
									per month
								</p>
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
								<li className="flex items-center gap-2">
									<Check className="h-5 w-5 text-green-500 flex-shrink-0" />
									<span>Custom integration</span>
								</li>
							</ul>
							<Button
								className="w-full bg-white text-black hover:scale-105 transition"
								variant="outline"
							>
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
						<h2 className="text-3xl font-bold mb-4">
							Get in Touch
						</h2>
						<p className="text-muted-foreground text-lg mb-8">
							Have questions? Our team is here to help you get
							started with Twitter automation.
						</p>
						<div className="grid sm:grid-cols-2 gap-4">
							<Button
								size="lg"
								variant="outline"
								className="w-full hover:scale-105 transition-transform "
							>
								<Mail className="mr-2 h-5 w-5" />
								Contact Support
							</Button>

							<Link href={"https://x.com/kundan_singh91"}>
								<Button
									size="lg"
									variant="outline"
									className="w-full hover:scale-105 transition-transform hover:text-blue-500"
								>
									<Twitter className="mr-2 h-5 w-5 " />
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
								<span className="font-bold text-lg">
									Twitter Agent
								</span>
							</div>
							<p className="text-muted-foreground">
								Empowering your Twitter presence with AI-driven
								automation and analytics.
							</p>
						</div>
						<div>
							<h3 className="font-semibold text-lg mb-4">
								Product
							</h3>
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
							<h3 className="font-semibold text-lg mb-4">
								Company
							</h3>
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
							<h3 className="font-semibold text-lg mb-4">
								Legal
							</h3>
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
