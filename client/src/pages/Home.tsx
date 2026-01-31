import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertSubscriberSchema, type InsertSubscriber } from "@shared/schema";
import { useCreateSubscriber } from "@/hooks/use-subscribers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Shield, Zap, Server, ArrowRight, CheckCircle2 } from "lucide-react";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function Home() {
  const { mutate: subscribe, isPending } = useCreateSubscriber();
  
  const form = useForm<InsertSubscriber>({
    resolver: zodResolver(insertSubscriberSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: InsertSubscriber) => {
    subscribe(data, {
      onSuccess: () => form.reset(),
    });
  };

  const scrollToNewsletter = () => {
    document.getElementById("newsletter")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      
      {/* Navigation - Minimal */}
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <div className="font-heading font-bold text-xl tracking-tight text-primary flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            Nexus
          </div>
          <Button variant="ghost" className="font-medium" onClick={scrollToNewsletter}>
            Get Started
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 md:pt-32 md:pb-48 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="max-w-3xl mx-auto space-y-8"
          >
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary mb-4">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
              v2.0 is now live
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-balance text-slate-900">
              Build Something <span className="text-primary">Amazing</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance font-light leading-relaxed">
              Experience the next generation of development tools. Secure, scalable, and engineered for speed from the ground up.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button 
                size="lg" 
                className="h-12 px-8 text-base shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
                onClick={scrollToNewsletter}
              >
                Subscribe Now <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8 text-base bg-white/50 backdrop-blur-sm hover:bg-white">
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white border-y border-slate-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose Nexus?</h2>
            <p className="text-muted-foreground">We've obsessed over every detail to provide the best possible experience for developers and teams.</p>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {features.map((feature, idx) => (
              <motion.div key={idx} variants={fadeIn}>
                <Card className="h-full border-none shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-200/60 hover:-translate-y-1 transition-all duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Social Proof / Trust */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-8">Trusted by industry leaders</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Using simple text representations for logos to avoid external dependencies or broken images */}
            {['Acme Corp', 'GlobalTech', 'Nebula', 'Velocity', 'FoxRun'].map((brand) => (
              <span key={brand} className="text-xl font-bold font-heading">{brand}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section id="newsletter" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary -skew-y-3 origin-top-left transform scale-110"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-blue-600 -skew-y-3 origin-top-left transform scale-110"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-2xl shadow-black/20"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4 text-slate-900">Ready to get started?</h2>
                <p className="text-muted-foreground mb-6">
                  Join over 10,000 developers building the future. Subscribe to our newsletter for exclusive updates, tips, and early access.
                </p>
                <ul className="space-y-3">
                  {[
                    'Weekly development tips',
                    'Exclusive resource access',
                    'Community event invites'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center text-sm font-medium text-slate-700">
                      <CheckCircle2 className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input 
                              placeholder="Enter your email address" 
                              className="h-12 bg-white border-slate-200 focus:border-primary focus:ring-primary/10 transition-all" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      className="w-full h-12 text-lg font-semibold shadow-md hover:shadow-lg transition-all"
                      disabled={isPending}
                    >
                      {isPending ? "Subscribing..." : "Subscribe for Free"}
                    </Button>
                    <p className="text-xs text-center text-muted-foreground mt-4">
                      We respect your privacy. Unsubscribe at any time.
                    </p>
                  </form>
                </Form>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
               <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white">
                <Zap className="w-5 h-5 fill-current" />
              </div>
              <span className="font-heading font-bold text-xl text-white">Nexus</span>
            </div>
            <div className="flex gap-8 text-sm font-medium">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
              <a href="#" className="hover:text-white transition-colors">GitHub</a>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center md:text-left text-sm text-slate-500">
            &copy; {new Date().getFullYear()} Nexus Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    title: "Blazing Speed",
    description: "Built on a modern stack that optimizes for performance at every layer. Say goodbye to loading spinners.",
    icon: <Zap className="w-6 h-6" />,
  },
  {
    title: "Bank-Grade Security",
    description: "Your data is encrypted at rest and in transit. We prioritize security so you can focus on building.",
    icon: <Shield className="w-6 h-6" />,
  },
  {
    title: "99.99% Reliability",
    description: "Our distributed infrastructure ensures your application stays online, no matter the traffic load.",
    icon: <Server className="w-6 h-6" />,
  },
];
