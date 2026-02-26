/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { ArrowRight, Plus, ChevronLeft, ChevronRight, Linkedin, ExternalLink } from "lucide-react";
import React, { useEffect, useRef, ReactNode } from "react";
import Lenis from "lenis";

const team = [
  { name: "Doug Cruikshank", role: "Founder & Managing Partner" },
  { name: "Rafael Castro", role: "Partner" },
  { name: "Rich Davis", role: "Partner", highlight: true },
  { name: "Ben Lee", role: "Principal" },
  { name: "Peter Wright", role: "Director" },
  { name: "Diane Moore", role: "Vice President" },
  { name: "Will Randell", role: "Vice President" },
  { name: "Salonee Ferrao", role: "Senior Analyst" },
  { name: "Andrew Dunn", role: "Analyst" },
  { name: "Alex Bockler", role: "CFO & CCO" },
  { name: "Ronak Patel", role: "Controller" },
  { name: "Caitlin Hilmer", role: "Executive Assistant" },
];

const solutions = [
  {
    id: "01",
    title: "NAV-Based Loans",
    description: "Flexible, non-dilutive capital backed by the unrealized value of underlying portfolio investments.",
    details: "Designed to support a broad range of fund- and portfolio-level objectives, including follow-on investments, liquidity management, capital structure optimization, and other strategic initiatives."
  },
  {
    id: "02",
    title: "GP & Management Company Financing",
    description: "Customized financing solutions backed by management fees, GP commitments, and carried interest.",
    details: "Enables GP co-investments, succession planning, and seed capital to launch new strategies or expand the franchise."
  },
  {
    id: "03",
    title: "Customized Solutions",
    description: "Bespoke financing structures supported by uncalled capital, concentrated portfolios, or portfolios of limited partnership interests.",
    details: "Includes solutions for single-asset or multi-asset continuation vehicles, preferred equity financing, and capital tailored for family offices and ultra-high-net-worth investors."
  }
];

const news = [
  { category: "News", title: "Hark Capital provides $57.5 million NAV facility to Insignia Capital Group", date: "December 2025" },
  { category: "News", title: "Doug Cruikshank on the Evolution of Fund Finance", date: "November 2025", external: true },
  { category: "News", title: "Hark Capital Provides $50 Million NAV Facility to Pharos Capital Group", date: "July 2025" },
  { category: "Insights", title: "Q2 2025 NAV Lending Overview", date: "July 2025" },
  { category: "News", title: "Fusion Connect Secures $85M Term Loan From Hark Capital to Fuel Strategic Growth", date: "May 2025" },
  { category: "Insights", title: "Q1 2025 NAV Lending Overview", date: "April 2025" },
  { category: "Insights", title: "Hark Capital on Bridging the Equity Gap", date: "January 2025" },
  { category: "News", title: "Hark Capital Provides $65 Million Facility to Portfolio Companies Managed by WM Partners", date: "January 2025" },
  { category: "Insights", title: "FY2024 NAV Lending Overview – A Year in Review: 'All That Glitters Is Not Gold'", date: "January 2025" },
  { category: "Insights", title: "Q3 2024 NAV Lending Market Overview", date: "October 2024" },
];

const FadeInWhenVisible = ({ children, delay = 0 }: { children: ReactNode; delay?: number; key?: React.Key }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
  >
    {children}
  </motion.div>
);

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "30%"]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white selection:bg-hark-blue selection:text-white">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-hark-blue z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-start p-6 md:p-10 pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="pointer-events-auto"
        >
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-hark-blue flex items-center justify-center">
              <div className="w-3 h-3 border border-white rotate-45" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white mix-blend-difference">Hark Capital</span>
          </div>
        </motion.div>
        
        <div className="flex flex-col items-end gap-4 pointer-events-auto">
          <motion.button 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-hark-blue/40 backdrop-blur-md text-white p-4 flex items-center gap-6 group hover:bg-hark-blue transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-widest">Click to Expand</span>
          </motion.button>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-hark-blue/40 backdrop-blur-md text-white p-8 flex flex-col gap-4 min-w-[240px]"
          >
            <a href="#solutions" className="text-sm font-medium hover:opacity-60 transition-opacity">Our Solutions</a>
            <a href="#about" className="text-sm font-medium hover:opacity-60 transition-opacity">About Us</a>
            <a href="#news" className="text-sm font-medium hover:opacity-60 transition-opacity">News & Insights</a>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-end overflow-hidden">
        <motion.img 
          style={{ y: heroY }}
          src="https://picsum.photos/seed/hark-hero/1920/1080?blur=2" 
          className="absolute inset-0 w-full h-full object-cover scale-110"
          alt="Abstract blue background"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-hark-blue/80 via-hark-blue/20 to-transparent" />
        
        <div className="container mx-auto px-6 md:px-12 pb-24 relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-8xl font-medium text-white max-w-4xl tracking-tight leading-[0.9]"
          >
            Pioneers in <br />NAV financing
          </motion.h1>
          
          <div className="mt-12 flex justify-end">
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="text-white/70 text-sm md:text-base max-w-sm leading-relaxed"
            >
              We provide purpose-built NAV and GP financing solutions for private equity investors and their portfolio investments across North America and Europe.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section id="about" className="py-24 md:py-40 container mx-auto px-6 md:px-12">
        <FadeInWhenVisible>
          <div className="section-label">Who We Are</div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8">
              <h2 className="text-4xl md:text-5xl font-medium leading-[1.1] tracking-tight">
                Since 2013, we have been at the forefront of providing tailored fund financing solutions to middle-market sponsors, specializing in NAV financing, and GP & management company financing solutions.
              </h2>
            </div>
            
            <div className="lg:col-span-4 flex flex-col gap-8">
              <div className="grid grid-cols-2 gap-4">
                <button className="border border-hark-border p-6 flex justify-between items-center group hover:bg-hark-blue hover:text-white transition-all">
                  <span className="text-xs font-semibold uppercase tracking-widest">Our Story</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="border border-hark-border p-6 flex justify-between items-center group hover:bg-hark-blue hover:text-white transition-all">
                  <span className="text-xs font-semibold uppercase tracking-widest">Our Solutions</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              <p className="text-sm text-hark-blue/60 leading-relaxed">
                As pioneers of NAV financing, we bring deep expertise, certainty of execution and a long-term partnership orientation to solutions that evolve with your needs.
              </p>
            </div>
          </div>
        </FadeInWhenVisible>
      </section>

      {/* Core Stats */}
      <section className="relative py-32 overflow-hidden">
        <motion.img 
          initial={{ scale: 1.2 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 2 }}
          src="https://picsum.photos/seed/hark-stats/1920/1080?grayscale&blur=5" 
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          alt="Stats background"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-hark-blue/90" />
        
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <FadeInWhenVisible>
            <div className="section-label text-white">Core Stats</div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
              {[
                { label: "Founded", value: "2013" },
                { label: "Capital Deployed", value: "$2.0B+" },
                { label: "Unique Sponsors", value: "60+" },
                { label: "Funds Raised", value: "4" },
              ].map((stat, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-transparent p-8 md:p-12 border-r border-white/10 last:border-r-0"
                >
                  <div className="text-5xl md:text-7xl font-medium text-white mb-8">{stat.value}</div>
                  <div className="h-px w-full bg-white/20 mb-4" />
                  <div className="text-[10px] uppercase tracking-widest font-semibold text-white/50">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Our People */}
      <section className="py-24 md:py-40 container mx-auto px-6 md:px-12">
        <div className="section-label">Our People</div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-5">
            <FadeInWhenVisible>
              <h2 className="text-4xl md:text-5xl font-medium leading-[1.1] tracking-tight mb-8">
                Deep fund finance expertise guided by a highly experienced leadership team
              </h2>
              <p className="text-sm text-hark-blue/60 leading-relaxed max-w-md">
                The Hark Capital team blends innovation with decades of industry experience — grounded in collaboration, and driven by integrity and excellence.
              </p>
            </FadeInWhenVisible>
          </div>
          
          <div className="lg:col-span-7">
            <div className="border-t border-hark-border">
              {team.map((person, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  viewport={{ once: true }}
                  className={`flex justify-between items-center py-4 border-bottom border-hark-border group cursor-pointer hover:bg-hark-gray px-4 -mx-4 transition-colors ${person.highlight ? 'text-hark-blue' : 'text-hark-blue/60'}`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`text-lg md:text-xl font-medium ${person.highlight ? 'text-hark-blue' : ''}`}>{person.name}</span>
                    {person.highlight && <Plus className="w-3 h-3 text-hark-blue" />}
                  </div>
                  <span className="text-[10px] uppercase tracking-widest font-semibold opacity-60">{person.role}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Purpose-built financing */}
      <section id="solutions" className="bg-hark-blue text-white py-24 md:py-40">
        <div className="container mx-auto px-6 md:px-12">
          <FadeInWhenVisible>
            <div className="section-label text-white/60">Our Solutions</div>
            <h2 className="text-4xl md:text-5xl font-medium leading-[1.1] tracking-tight mb-20 max-w-md">
              Purpose-built financing for private markets
            </h2>
          </FadeInWhenVisible>
          
          <div className="space-y-20">
            {solutions.map((sol, i) => (
              <FadeInWhenVisible key={i}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-t border-white/10 pt-12">
                  <div className="lg:col-span-4">
                    <h3 className="text-2xl font-medium">{sol.title}</h3>
                  </div>
                  <div className="lg:col-span-4 space-y-6">
                    <p className="text-sm text-white/80 leading-relaxed">{sol.description}</p>
                    <p className="text-xs text-white/50 leading-relaxed">{sol.details}</p>
                  </div>
                  <div className="lg:col-span-4 flex justify-end">
                    <motion.span 
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 0.2, scale: 1 }}
                      transition={{ duration: 1 }}
                      className="text-8xl md:text-[160px] font-serif italic leading-none"
                    >
                      {sol.id}
                    </motion.span>
                  </div>
                </div>
              </FadeInWhenVisible>
            ))}
          </div>
          
          <FadeInWhenVisible delay={0.2}>
            <div className="mt-20">
              <button className="border border-white/20 px-8 py-4 flex items-center gap-12 group hover:bg-white hover:text-hark-blue transition-all">
                <span className="text-xs font-semibold uppercase tracking-widest">Explore Our Solutions</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Recent Transactions */}
      <section className="py-24 md:py-40 bg-hark-gray">
        <div className="container mx-auto px-6 md:px-12">
          <FadeInWhenVisible>
            <div className="flex justify-between items-end mb-12">
              <div>
                <div className="section-label">Recent Transactions</div>
                <h2 className="text-3xl font-medium">Some of our recent transactions</h2>
              </div>
              <div className="flex gap-2">
                <button className="w-10 h-10 border border-hark-border flex items-center justify-center hover:bg-white transition-colors">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="w-10 h-10 border border-hark-border flex items-center justify-center hover:bg-white transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </FadeInWhenVisible>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[50, 65, 85].map((amount, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-12 aspect-[4/5] flex flex-col justify-between border border-hark-border group hover:shadow-xl transition-all"
              >
                <div className="text-6xl font-medium leading-none">
                  ${amount} <br />Million
                </div>
                <div className="text-[10px] uppercase tracking-widest font-semibold opacity-40">NAV Facility</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* News & Insights */}
      <section id="news" className="py-24 md:py-40 container mx-auto px-6 md:px-12">
        <div className="section-label">News & Insights</div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-5" />
          <div className="lg:col-span-7">
            <div className="space-y-0">
              {news.map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  viewport={{ once: true }}
                  className="group border-t border-hark-border py-8 cursor-pointer hover:bg-hark-gray px-4 -mx-4 transition-colors"
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] uppercase tracking-widest font-bold bg-hark-gray group-hover:bg-white px-2 py-1 transition-colors">
                      {item.category}
                    </span>
                    {item.external && <ExternalLink className="w-3 h-3 opacity-40" />}
                  </div>
                  <h3 className="text-lg md:text-xl font-medium mb-8 group-hover:text-hark-light-blue transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] uppercase tracking-widest font-semibold opacity-40">{item.date}</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </div>
                </motion.div>
              ))}
            </div>
            
            <FadeInWhenVisible>
              <button className="mt-12 w-full bg-hark-blue text-white p-6 flex justify-between items-center group">
                <span className="text-xs font-semibold uppercase tracking-widest">Explore More News & Insights</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>

      {/* Partner with us */}
      <section className="relative h-[80vh] flex items-center overflow-hidden">
        <motion.img 
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          src="https://picsum.photos/seed/hark-partner/1920/1080?blur=3" 
          className="absolute inset-0 w-full h-full object-cover"
          alt="Partner background"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-hark-blue/60" />
        
        <div className="container mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-end">
          <motion.h2 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="text-6xl md:text-8xl font-medium text-white tracking-tight"
          >
            Partner with us
          </motion.h2>
          
          <FadeInWhenVisible>
            <div className="space-y-8">
              <p className="text-white/80 text-lg leading-relaxed max-w-md">
                Whether you're seeking additional capital at the fund, manager, or portfolio level, we're here to help. Let's connect and explore a solution tailored to your needs.
              </p>
              <div className="bg-white p-8 flex justify-between items-center group cursor-pointer hover:bg-hark-gray transition-colors">
                <span className="text-sm font-semibold">Get in Touch</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex justify-between items-start mb-24">
            <button 
              onClick={scrollToTop}
              className="text-xs font-semibold uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity"
            >
              Back To Top
            </button>
            
            <div className="grid grid-cols-2 gap-24">
              <div className="space-y-4">
                <div className="text-[10px] uppercase tracking-widest font-bold opacity-40 mb-6">Navigation</div>
                <a href="#" className="block text-sm opacity-60 hover:opacity-100 transition-opacity">Home</a>
                <a href="#solutions" className="block text-sm opacity-60 hover:opacity-100 transition-opacity">Our Solutions</a>
                <a href="#about" className="block text-sm opacity-60 hover:opacity-100 transition-opacity">About Us</a>
                <a href="#" className="block text-sm opacity-60 hover:opacity-100 transition-opacity">Recent Transactions</a>
                <a href="#news" className="block text-sm opacity-60 hover:opacity-100 transition-opacity">Insights & Resources</a>
                <a href="#" className="block text-sm opacity-60 hover:opacity-100 transition-opacity">Contact Us</a>
              </div>
              <div className="space-y-4">
                <div className="text-[10px] uppercase tracking-widest font-bold opacity-40 mb-6">Links</div>
                <a href="#" className="block text-sm opacity-60 hover:opacity-100 transition-opacity flex items-center gap-2">LinkedIn <Linkedin className="w-3 h-3" /></a>
                <a href="#" className="block text-sm opacity-60 hover:opacity-100 transition-opacity">Investor Login</a>
                <a href="#" className="block text-sm opacity-60 hover:opacity-100 transition-opacity">Data Room</a>
              </div>
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-6 h-6 bg-white flex items-center justify-center">
                  <div className="w-3 h-3 border border-black rotate-45" />
                </div>
                <span className="text-xl font-bold tracking-tight">Hark Capital</span>
              </div>
              <div className="text-[10px] uppercase tracking-widest font-bold opacity-40">A RIDGEPOST CAPITAL STRATEGY</div>
            </div>
            
            <div className="lg:col-span-8 space-y-8">
              <p className="text-[10px] leading-relaxed opacity-40 max-w-2xl">
                Hark Capital is a strategy of Ridgepost Capital (NYSE: RPC), a leading private markets solutions provider with over $40 billion in assets under management as of September 30, 2025. Ridgepost Capital invests across private equity, private credit, and venture capital in access-constrained strategies, with a focus on the middle and lower-middle market. Ridgepost Capital's products have a global investor base and aim to deliver compelling risk-adjusted returns. For additional information, please visit www.ridgepostcapital.com.
              </p>
              <div className="text-[10px] opacity-40">© 2026 Hark Capital Advisors, LLC.</div>
            </div>
          </div>
          
          <div className="mt-24 pt-12 border-t border-white/10 flex flex-wrap gap-x-12 gap-y-4 text-[10px] uppercase tracking-widest font-bold opacity-40">
            <a href="#" className="hover:opacity-100 transition-opacity">Accessibility Statement</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Privacy Statement</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Legal Disclosure</a>
          </div>
          
          <div className="mt-12 text-[10px] opacity-40">Made by Malvah Studio</div>
        </div>
      </footer>
    </div>
  );
}
