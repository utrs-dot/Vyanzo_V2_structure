/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "motion/react";
import { ArrowRight, Plus, ChevronLeft, ChevronRight, Linkedin, ExternalLink, Globe, Factory, Map, MessageCircle, ArrowUp, Menu, X } from "lucide-react";
import React, { useEffect, useRef, ReactNode, useState } from "react";
import Lenis from "lenis";

const products = [
  // BELGIUM REGION
  { 
    id: "BE-CV-01",
    name: "Benor Certified Cover - D400", 
    category: "Covers",
    region: "Belgium",
    type: "Ductile Iron",
    certification: "Benor",
    image: "https://picsum.photos/seed/be-cover-1/800/600",
    desc: "Heavy-duty municipal cover with Benor certification for Belgian infrastructure.",
    longDesc: "Meticulously designed and manufactured for the Belgian market, our Benor certified covers meet the most demanding quality standards. As a manufacturer, we ensure consistent quality and service levels are paramount.",
    specs: [
      { label: "Certification", value: "Benor" },
      { label: "Frame height", value: "20cm" },
      { label: "Load category", value: "D400 – heavy duty" },
      { label: "Inscriptions", value: "D/RWA, EU/P, Aquafin, optional customer logo" }
    ]
  },
  { 
    id: "BE-CV-02",
    name: "Benor Certified Cover - E600", 
    category: "Covers",
    region: "Belgium",
    type: "Ductile Iron",
    certification: "Benor",
    image: "https://picsum.photos/seed/be-cover-2/800/600",
    desc: "Extra heavy-duty cover for industrial and high-traffic areas.",
    longDesc: "Designed for extreme loads, this E600 certified cover provides maximum durability for industrial zones and heavy transport hubs in Belgium.",
    specs: [
      { label: "Certification", value: "Benor" },
      { label: "Frame height", value: "20cm" },
      { label: "Load category", value: "E600 – industrial" },
      { label: "Inscriptions", value: "D/RWA, EU/P, Aquafin" }
    ]
  },
  { 
    id: "BE-SP-01",
    name: "Benor Siphon - Plat Recht", 
    category: "Siphons",
    region: "Belgium",
    type: "Ductile Iron",
    certification: "Benor",
    image: "https://picsum.photos/seed/be-siphon-1/800/600",
    desc: "High-capacity siphon with multiple version options for versatile installation.",
    longDesc: "Our siphons are engineered for high-performance municipal water management. Available in various configurations to suit specific project requirements in the Belgian region.",
    specs: [
      { label: "Certification", value: "Benor" },
      { label: "Load category", value: "D400" },
      { label: "Flow through capacity", value: "48l/sec" },
      { label: "Available versions", value: "Plat recht 45°, Plat recht, Plat rond, Gebogen rond, Gebogen recht" }
    ]
  },
  { 
    id: "BE-SB-01",
    name: "Benor Surface Box", 
    category: "Surface boxes",
    region: "Belgium",
    type: "Ductile Iron",
    certification: "Benor",
    image: "https://picsum.photos/seed/be-box-1/800/600",
    desc: "Standard surface box for utility access with specific Belgian inscriptions.",
    longDesc: "Durable and reliable surface boxes designed for long-term utility access. Features standard Belgian inscriptions for easy identification of utility types.",
    specs: [
      { label: "Certification", value: "Benor" },
      { label: "Load category", value: "D400" },
      { label: "Inscriptions", value: "D/RWA, EU/P, Regenwater, Vuilwater" }
    ]
  },
  // SCANDINAVIA REGION
  { 
    id: "SC-CV-01",
    name: "Nordic Standard Cover - D400", 
    category: "Covers",
    region: "Scandinavia",
    type: "Ductile Iron",
    certification: "Nordic Certified",
    image: "https://picsum.photos/seed/sc-cover-1/800/600",
    desc: "Frost-resistant cover designed for extreme Scandinavian climates.",
    longDesc: "Engineered to withstand the harsh conditions of Northern Europe, our Nordic range focuses on durability and environmental responsibility. Manufactured in our state-of-the-art facilities using green energy.",
    specs: [
      { label: "Certification", value: "Nordic Standard" },
      { label: "Frame Height", value: "25cm" },
      { label: "Load Category", value: "D400" },
      { label: "Frost Resistance", value: "High" }
    ]
  },
  { 
    id: "SC-GR-01",
    name: "Nordic Storm Grate", 
    category: "Grates",
    region: "Scandinavia",
    type: "Ductile Iron",
    certification: "Nordic Certified",
    image: "https://picsum.photos/seed/sc-grate-1/800/600",
    desc: "High-flow storm grate for efficient water drainage in Nordic regions.",
    longDesc: "Designed for rapid water evacuation during heavy rainfall and snowmelt. Features a secure locking mechanism and high-durability coating.",
    specs: [
      { label: "Certification", value: "Nordic Standard" },
      { label: "Load Category", value: "D400" },
      { label: "Flow Capacity", value: "High" },
      { label: "Material", value: "Ductile Iron GJS 500-7" }
    ]
  }
];

const stats = [
  { 
    icon: "Globe", 
    title: "Annual Production", 
    value: "> 20,000 tons of castings", 
    desc: "shipped worldwide" 
  },
  { 
    icon: "Factory", 
    title: "State of the art production facilities", 
    value: "Green Energy Powered", 
    desc: "Inductotherm furnaces, DISA 280c vertical moulding line, laser pouring, AI-driven sandplant with monitoring all along the sand process, supported by rooftop solar panel green energy, continuous training and coaching of employees to implement the latest technology and best practices" 
  },
  { 
    icon: "Map", 
    title: "Global Reach", 
    value: "Serving customers in Belgium, France, Spain, Italy, Austria, Holland, UK, USA and Canada", 
    desc: "" 
  }
];

const services = [
  { title: "Product Development" },
  { title: "A-Z Production Excellence" },
  { title: "Custom Packaging & Delivery Options" },
  { title: "Product Certification" },
];

const team = [
  { name: "Steve Vernelen", role: "CEO" },
  { name: "Roxane Sabatier", role: "Office Manager" },
  { name: "Annick D'Hont", role: "Legal and Contracts" },
  { name: "Naba Kumar Gayen", role: "Head of Quality" },
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

  const [currentPage, setCurrentPage] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [productIndex, setProductIndex] = useState(0);
  const [statsIndex, setStatsIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeCerts, setActiveCerts] = useState<string[]>([]);
  const [activeTypes, setActiveTypes] = useState<string[]>([]);
  const [selectedRegion, setSelectedRegion] = useState("Belgium");
  const [sortBy, setSortBy] = useState("Newest Arrivals");
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const filteredProducts = products.filter(p => {
    const regionMatch = p.region === selectedRegion;
    const certMatch = activeCerts.length === 0 || activeCerts.includes(p.certification);
    const typeMatch = activeTypes.length === 0 || activeTypes.includes(p.category);
    return regionMatch && certMatch && typeMatch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "Load Class: Low to High") {
      const aClass = a.specs.find(s => s.label === "Load Class")?.value || "";
      const bClass = b.specs.find(s => s.label === "Load Class")?.value || "";
      return aClass.localeCompare(bClass);
    }
    if (sortBy === "Load Class: High to Low") {
      const aClass = a.specs.find(s => s.label === "Load Class")?.value || "";
      const bClass = b.specs.find(s => s.label === "Load Class")?.value || "";
      return bClass.localeCompare(aClass);
    }
    return 0; // Default: Newest Arrivals (order in array)
  });

  const toggleCert = (cert: string) => {
    setActiveCerts(prev => 
      prev.includes(cert) ? prev.filter(c => c !== cert) : [...prev, cert]
    );
  };

  const toggleType = (type: string) => {
    setActiveTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const resetFilters = () => {
    setActiveCerts([]);
    setActiveTypes([]);
  };

  const navigateTo = (page: string, data?: any) => {
    setCurrentPage(page);
    if (data) setSelectedProduct(data);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  return (
    <div className="min-h-screen bg-white selection:bg-vyanzo-blue selection:text-white">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-vyanzo-gold z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-6 md:px-12 pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="pointer-events-auto"
        >
          <span className="text-2xl md:text-3xl font-serif italic text-white mix-blend-difference tracking-tight">
            Vyanzo
          </span>
        </motion.div>
        
        <div className="pointer-events-auto">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="group flex items-center bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-vyanzo-blue transition-all rounded-lg overflow-hidden"
          >
            <div className="px-4 py-3 border-r border-white/20 group-hover:border-vyanzo-blue/20">
              <Plus className={`w-5 h-5 transition-transform duration-500 ${isMenuOpen ? "rotate-45" : ""}`} />
            </div>
            <div className="px-6 py-3 text-sm font-bold uppercase tracking-widest">
              Menu
            </div>
          </button>
        </div>
      </nav>

      {/* Mega Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[60] bg-vyanzo-blue text-white overflow-y-auto"
          >
            <div className="container mx-auto px-6 md:px-12 py-32 min-h-screen flex flex-col">
              <div className="flex justify-between items-start mb-24">
                <span className="text-3xl font-serif italic text-vyanzo-gold">Vyanzo</span>
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="group flex items-center gap-4 text-white/60 hover:text-white transition-colors"
                >
                  <span className="text-xs font-bold uppercase tracking-[0.3em]">Close</span>
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-all">
                    <X className="w-6 h-6" />
                  </div>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 flex-1">
                {/* Main Navigation */}
                <div className="lg:col-span-4">
                  <div className="section-label text-vyanzo-gold mb-12">Navigation</div>
                  <div className="flex flex-col gap-8">
                    {[
                      { name: "Home", id: "home" },
                      { name: "About Us", id: "about" },
                      { name: "Our Services", id: "services" },
                      { name: "Contact", id: "contact" },
                      { name: "Client Portal", id: "portal" }
                    ].map((item, i) => (
                      <motion.button 
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + i * 0.05 }}
                        onClick={() => navigateTo(item.id)}
                        className="text-4xl md:text-5xl font-medium text-left hover:text-vyanzo-gold hover:translate-x-4 transition-all duration-500"
                      >
                        {item.name}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Products Mega Section */}
                <div className="lg:col-span-8">
                  <div className="section-label text-vyanzo-gold mb-12">Product Portfolio</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    {/* Regions */}
                    <div>
                      <h3 className="text-xl font-bold mb-8 text-white/40 uppercase tracking-widest">By Region</h3>
                      <div className="space-y-6">
                        {["Belgium", "Scandinavia"].map((region, i) => (
                          <motion.button
                            key={region}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + i * 0.1 }}
                            onClick={() => {
                              setSelectedRegion(region);
                              navigateTo('products-list');
                            }}
                            className="group flex items-center justify-between w-full p-6 bg-white/5 rounded-2xl border border-white/5 hover:bg-vyanzo-gold hover:text-vyanzo-blue transition-all duration-500"
                          >
                            <div className="text-2xl font-bold">{region} Solutions</div>
                            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Categories */}
                    <div>
                      <h3 className="text-xl font-bold mb-8 text-white/40 uppercase tracking-widest">By Category</h3>
                      <div className="grid grid-cols-1 gap-4">
                        {["Manhole Covers", "Grates", "Siphons", "Surface Boxes"].map((cat, i) => (
                          <motion.button
                            key={cat}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + i * 0.05 }}
                            onClick={() => {
                              setActiveTypes([cat.split(' ')[0]]); // Simple mapping for now
                              navigateTo('products-list');
                            }}
                            className="text-xl font-medium text-left text-white/60 hover:text-white hover:translate-x-2 transition-all"
                          >
                            {cat}
                          </motion.button>
                        ))}
                      </div>
                      
                      <div className="mt-12 p-8 bg-vyanzo-gold/10 rounded-3xl border border-vyanzo-gold/20">
                        <h4 className="text-vyanzo-gold font-bold mb-2">Need a custom solution?</h4>
                        <p className="text-sm text-white/60 mb-6">Our engineering team can help design bespoke castings for your specific needs.</p>
                        <button 
                          onClick={() => navigateTo('contact')}
                          className="text-xs font-bold uppercase tracking-widest text-vyanzo-gold hover:text-white transition-colors"
                        >
                          Talk to an expert →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-24 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] uppercase tracking-[0.3em] font-bold text-white/20">
                <div className="flex gap-8">
                  <a href="#" className="hover:text-vyanzo-gold transition-colors">LinkedIn</a>
                  <a href="#" className="hover:text-vyanzo-gold transition-colors">Instagram</a>
                </div>
                <div>info@vyanzo.be</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {currentPage === "about" && (
        <div className="pt-48 pb-32">
          <div className="container mx-auto px-6 md:px-12">
            <FadeInWhenVisible>
              <div className="section-label">Who We Are</div>
              <h1 className="mb-32 max-w-6xl">
                Since 2018, we have been at the forefront of providing meticulously designed and manufactured municipal casting products across Europe.
              </h1>
            </FadeInWhenVisible>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 mb-48">
              <div className="lg:col-span-6 lg:col-start-7">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                  <motion.div 
                    whileHover={{ y: -15 }}
                    className="p-12 bg-vyanzo-gray rounded-3xl group cursor-pointer flex flex-col justify-between aspect-square border border-vyanzo-blue/5"
                  >
                    <h3 className="text-3xl">Our Story</h3>
                    <ArrowRight className="w-8 h-8 group-hover:translate-x-3 transition-transform text-vyanzo-gold" />
                  </motion.div>
                  <motion.div 
                    whileHover={{ y: -15 }}
                    className="p-12 bg-vyanzo-gray rounded-3xl group cursor-pointer flex flex-col justify-between aspect-square border border-vyanzo-blue/5"
                  >
                    <h3 className="text-3xl">Our Solutions</h3>
                    <ArrowRight className="w-8 h-8 group-hover:translate-x-3 transition-transform text-vyanzo-gold" />
                  </motion.div>
                </div>
                <FadeInWhenVisible delay={0.2}>
                  <p className="text-2xl text-vyanzo-blue/60 leading-relaxed font-light">
                    As pioneers of high-quality casting, we bring deep expertise, certainty of execution and a long-term partnership orientation to solutions that evolve with your needs.
                  </p>
                </FadeInWhenVisible>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 mb-48">
              <div className="lg:col-span-6">
                <FadeInWhenVisible>
                  <h2 className="mb-12">From OEM to Leading Manufacturer</h2>
                  <div className="space-y-8 text-vyanzo-blue/70 text-xl leading-relaxed font-light">
                    <p>Since its inception in 2018, Vyanzo has evolved from an OEM supplier to become a leading manufacturer of its own range of Manhole Covers, Grates and other municipal casting products that are now supplied across Europe.</p>
                    <p>We offer end-to-end services to customers around the world who share our business philosophy: Quality, Service & Reliability at a correct price – and that with relentless consistency.</p>
                    <p>We have continuously upgraded our production facilities with the latest machines and technology, always considering the environment and energy efficiency. For example, we don’t melt with coal, like they still do in Belgium, but with the latest electrical induction furnaces. Hence reducing massively our environmental impact.</p>
                  </div>
                </FadeInWhenVisible>
              </div>
              <div className="lg:col-span-6">
                <div className="aspect-video bg-vyanzo-blue/5 rounded-3xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://picsum.photos/seed/vyanzo-about/1200/800" 
                    alt="Vyanzo Office" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
              {[
                { title: "Quality", desc: "Uncompromising standards in every casting we produce." },
                { title: "Service", desc: "Dedicated support from design to delivery." },
                { title: "Reliability", desc: "A partner you can count on for consistent results." },
                { title: "Consistency", desc: "Relentless focus on maintaining excellence at scale." }
              ].map((value, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="p-8 bg-vyanzo-gray border border-vyanzo-blue/5"
                >
                  <div className="text-vyanzo-gold font-bold mb-4">0{i + 1}</div>
                  <h3 className="text-xl font-medium mb-4">{value.title}</h3>
                  <p className="text-vyanzo-blue/60">{value.desc}</p>
                </motion.div>
              ))}
            </div>

            <div id="team-section" className="mb-32">
              <FadeInWhenVisible>
                <div className="section-label text-vyanzo-light-blue">THE TEAM</div>
                <h2 className="text-4xl md:text-5xl font-medium mb-16">Meet the experts behind Vyanzo</h2>
              </FadeInWhenVisible>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { name: "Stijn", role: "Founder & CEO" },
                  { name: "Jitesh", role: "Operations Director" },
                  { name: "Suman", role: "Quality Assurance" },
                  { name: "Pradeep", role: "Logistics Manager" },
                  { name: "Anjali", role: "Client Relations" },
                  { name: "Marco", role: "Technical Lead" },
                  { name: "Sarah", role: "Supply Chain" },
                  { name: "David", role: "Business Development" }
                ].map((person, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <div className="aspect-[3/4] bg-vyanzo-gray mb-6 overflow-hidden relative">
                      <img 
                        src={`https://picsum.photos/seed/team-${i}/400/600`} 
                        alt={person.name} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <h3 className="text-xl font-medium">{person.name}</h3>
                    <p className="text-vyanzo-blue/40 uppercase tracking-widest text-[10px] font-bold">{person.role}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {currentPage === "contact" && (
        <div className="pt-48 pb-32">
          <div className="container mx-auto px-6 md:px-12">
            <FadeInWhenVisible>
              <div className="section-label">CONTACT</div>
              <h1 className="mb-24">Let's Connect</h1>
            </FadeInWhenVisible>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 mb-48">
              <div className="lg:col-span-5">
                <FadeInWhenVisible>
                  <h2 className="mb-10">Get in Touch</h2>
                  <p className="text-vyanzo-blue/60 text-xl leading-relaxed mb-16 font-light">Our team is ready to help you with any inquiries regarding our products or services.</p>
                  
                  <div className="space-y-12">
                    <div className="flex items-start gap-8">
                      <div className="w-16 h-16 bg-vyanzo-gray rounded-2xl flex items-center justify-center flex-shrink-0 border border-vyanzo-blue/5">
                        <ExternalLink className="w-6 h-6 text-vyanzo-gold" />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-vyanzo-blue/40 mb-2">Email</div>
                        <div className="text-2xl font-bold">info@vyanzo.be</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-8">
                      <div className="w-16 h-16 bg-vyanzo-gray rounded-2xl flex items-center justify-center flex-shrink-0 border border-vyanzo-blue/5">
                        <Globe className="w-6 h-6 text-vyanzo-gold" />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-vyanzo-blue/40 mb-2">Headquarters</div>
                        <div className="text-2xl font-bold">Antwerp, Belgium</div>
                      </div>
                    </div>
                  </div>
                </FadeInWhenVisible>
              </div>

              <div className="lg:col-span-7">
                <FadeInWhenVisible delay={0.2}>
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      showToast("Message sent successfully! We will get back to you soon.");
                      (e.target as HTMLFormElement).reset();
                    }}
                    className="bg-vyanzo-gray p-16 rounded-[2.5rem] border border-vyanzo-blue/5 grid grid-cols-1 md:grid-cols-2 gap-10"
                  >
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-vyanzo-blue/40">Name *</label>
                      <input type="text" required className="w-full bg-white border border-vyanzo-blue/10 p-5 focus:border-vyanzo-gold outline-none transition-all rounded-xl" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-vyanzo-blue/40">Surname *</label>
                      <input type="text" required className="w-full bg-white border border-vyanzo-blue/10 p-5 focus:border-vyanzo-gold outline-none transition-all rounded-xl" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-vyanzo-blue/40">Email *</label>
                      <input type="email" required className="w-full bg-white border border-vyanzo-blue/10 p-5 focus:border-vyanzo-gold outline-none transition-all rounded-xl" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-vyanzo-blue/40">Phone *</label>
                      <input type="tel" required className="w-full bg-white border border-vyanzo-blue/10 p-5 focus:border-vyanzo-gold outline-none transition-all rounded-xl" />
                    </div>
                    <div className="md:col-span-2 space-y-3">
                      <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-vyanzo-blue/40">Message</label>
                      <textarea rows={5} className="w-full bg-white border border-vyanzo-blue/10 p-5 focus:border-vyanzo-gold outline-none transition-all rounded-xl resize-none" />
                    </div>
                    <div className="md:col-span-2">
                      <button type="submit" className="btn-gold w-full">Send Message</button>
                    </div>
                  </form>
                </FadeInWhenVisible>
              </div>
            </div>

            <div className="mb-48">
              <FadeInWhenVisible>
                <div className="section-label">GLOBAL OFFICES</div>
                <h2 className="mb-20">Our presence around the world</h2>
              </FadeInWhenVisible>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                {[
                  { city: "Antwerp", country: "Belgium", type: "Headquarters" },
                  { city: "Rajkot", country: "India", type: "Production Hub" },
                  { city: "Istanbul", country: "Turkey", type: "Regional Office" },
                  { city: "Ningbo", country: "China", type: "Quality Control" }
                ].map((office, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.8 }}
                    viewport={{ once: true }}
                    className="p-12 bg-vyanzo-blue text-white rounded-[2rem] hover:bg-vyanzo-gold hover:text-vyanzo-blue transition-all duration-500 group"
                  >
                    <div className="text-vyanzo-gold group-hover:text-vyanzo-blue font-bold mb-6 uppercase tracking-[0.2em] text-[10px]">{office.type}</div>
                    <h3 className="text-3xl mb-3">{office.city}</h3>
                    <p className="text-white/60 group-hover:text-vyanzo-blue/60 text-lg">{office.country}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {currentPage === "products-list" && (
        <div className="pt-48 pb-32 bg-vyanzo-gray min-h-screen">
          <div className="container mx-auto px-6 md:px-12">
            <nav className="flex items-center gap-4 mb-12 text-sm font-bold uppercase tracking-widest text-vyanzo-blue/40">
              <button onClick={() => navigateTo('home')} className="hover:text-vyanzo-gold transition-colors">Home</button>
              <ChevronRight className="w-4 h-4" />
              <span className="text-vyanzo-blue">Product Portfolio</span>
            </nav>

            <div className="mb-24">
              <FadeInWhenVisible>
                <h1 className="mb-8">Product Portfolio</h1>
                <p className="text-2xl text-vyanzo-blue/60 max-w-3xl leading-relaxed mb-20 font-light">
                  Geographically organized solutions tailored to regional standards and requirements.
                </p>
                
                <div className="flex gap-12 mb-20 border-b border-vyanzo-blue/10">
                  {["Belgium", "Scandinavia"].map((region) => (
                    <button
                      key={region}
                      onClick={() => setSelectedRegion(region)}
                      className={`pb-6 px-2 text-sm font-bold uppercase tracking-[0.3em] transition-all relative ${
                        selectedRegion === region ? "text-vyanzo-blue" : "text-vyanzo-blue/40 hover:text-vyanzo-blue/60"
                      }`}
                    >
                      {region}
                      {selectedRegion === region && (
                        <motion.div 
                          layoutId="regionUnderline"
                          className="absolute bottom-0 left-0 right-0 h-1 bg-vyanzo-gold"
                        />
                      )}
                    </button>
                  ))}
                </div>
              </FadeInWhenVisible>
            </div>

            <div className="flex flex-col lg:flex-row gap-12">
              <aside className="w-full lg:w-72 flex flex-col gap-6">
                <div className="p-8 bg-white border border-vyanzo-blue/5 rounded-2xl shadow-sm">
                  <h3 className="text-lg font-medium mb-6 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-vyanzo-light-blue" />
                    Certifications
                  </h3>
                  <div className="space-y-3">
                    {Array.from(new Set(products.filter(p => p.region === selectedRegion).map(p => p.certification))).map((cert) => (
                      <label key={cert} className="flex items-center gap-3 p-3 rounded-xl hover:bg-vyanzo-gray cursor-pointer transition-colors border border-transparent hover:border-vyanzo-blue/5">
                        <input 
                          type="checkbox" 
                          checked={activeCerts.includes(cert)}
                          onChange={() => toggleCert(cert)}
                          className="accent-vyanzo-gold w-4 h-4 rounded" 
                        />
                        <span className="text-sm font-medium text-vyanzo-blue/70">{cert}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="p-8 bg-white border border-vyanzo-blue/5 rounded-2xl shadow-sm">
                  <h3 className="text-lg font-medium mb-6 flex items-center gap-2">
                    <Factory className="w-5 h-5 text-vyanzo-light-blue" />
                    Category
                  </h3>
                  <div className="space-y-3">
                    {["Covers", "Siphons", "Surface boxes"].map((cat) => (
                      <label key={cat} className="flex items-center gap-3 p-3 rounded-xl hover:bg-vyanzo-gray cursor-pointer transition-colors border border-transparent hover:border-vyanzo-blue/5">
                        <input 
                          type="checkbox" 
                          checked={activeTypes.includes(cat)}
                          onChange={() => toggleType(cat)}
                          className="accent-vyanzo-gold w-4 h-4 rounded" 
                        />
                        <span className="text-sm font-medium text-vyanzo-blue/70">{cat}</span>
                      </label>
                    ))}
                  </div>
                  <button 
                    onClick={resetFilters}
                    className="w-full mt-8 text-sm font-bold text-vyanzo-light-blue hover:text-vyanzo-gold transition-colors flex items-center justify-center gap-2"
                  >
                    <ArrowUp className="w-4 h-4 rotate-180" />
                    Reset Filters
                  </button>
                </div>

                <div className="p-8 bg-vyanzo-blue text-white rounded-2xl">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-6">Quality Standards</h3>
                  <div className="space-y-8">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <Plus className="w-4 h-4 text-vyanzo-gold" />
                        <span className="text-sm font-bold">What is Benor?</span>
                      </div>
                      <p className="text-xs text-white/60 leading-relaxed">Belgian quality mark for construction products, ensuring conformity to European standards.</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <Plus className="w-4 h-4 text-vyanzo-gold" />
                        <span className="text-sm font-bold">Vyanzo Proprietary</span>
                      </div>
                      <p className="text-xs text-white/60 leading-relaxed">Enhanced security and durability features exclusive to our custom-engineered range.</p>
                    </div>
                  </div>
                </div>
              </aside>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-8">
                  <p className="text-sm text-vyanzo-blue/40">Showing <span className="font-bold text-vyanzo-blue">{filteredProducts.length}</span> of {products.length} products</p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-vyanzo-blue/40">Sort by:</span>
                    <select 
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="bg-transparent border-none text-sm font-bold text-vyanzo-blue focus:ring-0 cursor-pointer"
                    >
                      <option>Newest Arrivals</option>
                      <option>Load Class: Low to High</option>
                      <option>Load Class: High to Low</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {sortedProducts.map((product, i) => (
                    <motion.div 
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                      onClick={() => navigateTo('product-detail', product)}
                      className="group bg-white rounded-2xl border border-vyanzo-blue/5 overflow-hidden hover:shadow-2xl hover:shadow-vyanzo-blue/10 transition-all cursor-pointer"
                    >
                      <div className="aspect-square relative bg-vyanzo-gray overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-4 right-4">
                          <span className="bg-vyanzo-blue text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                            {product.certification.split(' ')[0]}
                          </span>
                        </div>
                      </div>
                      <div className="p-8">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="font-medium text-xl leading-tight group-hover:text-vyanzo-light-blue transition-colors">{product.name}</h3>
                          <span className="text-[10px] font-bold text-vyanzo-blue/20 uppercase tracking-widest">{product.id}</span>
                        </div>
                        <p className="text-sm text-vyanzo-blue/60 mb-6 line-clamp-2">{product.desc}</p>
                        <div className="flex items-center gap-2 mb-8">
                          <Globe className="w-4 h-4 text-vyanzo-light-blue" />
                          <span className="text-xs font-bold text-vyanzo-light-blue uppercase tracking-widest">{product.certification}</span>
                        </div>
                        <button className="w-full py-4 rounded-xl font-bold text-sm border border-vyanzo-blue/10 group-hover:bg-vyanzo-blue group-hover:text-white group-hover:border-vyanzo-blue transition-all">
                          View Technical Specs
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-16 flex justify-center">
                  <nav className="flex items-center gap-2">
                    <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white border border-transparent hover:border-vyanzo-blue/5 transition-all">
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-vyanzo-blue text-white font-bold">1</button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white border border-transparent hover:border-vyanzo-blue/5 transition-all">2</button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white border border-transparent hover:border-vyanzo-blue/5 transition-all">3</button>
                    <span className="mx-2 text-vyanzo-blue/20">...</span>
                    <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white border border-transparent hover:border-vyanzo-blue/5 transition-all">8</button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white border border-transparent hover:border-vyanzo-blue/5 transition-all">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {currentPage === "product-detail" && selectedProduct && (
        <div className="pt-32 pb-24 min-h-screen">
          <div className="container mx-auto px-6 md:px-12">
            <nav className="flex items-center gap-2 mb-8 text-sm font-medium text-vyanzo-blue/40">
              <button onClick={() => navigateTo('home')} className="hover:text-vyanzo-light-blue">Home</button>
              <ChevronRight className="w-3 h-3" />
              <button onClick={() => navigateTo('products-list')} className="hover:text-vyanzo-light-blue">{selectedProduct.category}</button>
              <ChevronRight className="w-3 h-3" />
              <span className="text-vyanzo-blue">{selectedProduct.name}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              <div className="lg:col-span-8">
                <div className="relative group mb-12">
                  <div className="w-full aspect-[4/3] rounded-3xl overflow-hidden bg-vyanzo-gray border border-vyanzo-blue/5">
                    <img 
                      src={selectedProduct.image} 
                      alt={selectedProduct.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="absolute top-8 left-8">
                    <div className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl border border-vyanzo-blue/5 flex items-center gap-3 shadow-xl">
                      <Globe className="w-5 h-5 text-vyanzo-light-blue" />
                      <span className="text-xs font-bold tracking-widest uppercase text-vyanzo-blue">{selectedProduct.certification}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-12">
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-vyanzo-blue/5 pb-12">
                    <div>
                      <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-4">{selectedProduct.name}</h1>
                      <p className="text-vyanzo-blue/40 text-xl">{selectedProduct.desc}</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="px-4 py-2 bg-vyanzo-light-blue/10 text-vyanzo-light-blue text-xs font-bold rounded-full border border-vyanzo-light-blue/20 uppercase tracking-widest">Manufacturer Direct</span>
                    </div>
                  </div>

                  <div className="prose prose-lg max-w-none">
                    <h3 className="text-2xl font-bold mb-8">Technical Specifications</h3>
                    <div className="border border-vyanzo-blue/10 rounded-2xl overflow-hidden mb-12">
                      <table className="w-full text-left border-collapse">
                        <tbody>
                          {selectedProduct.specs.map((spec: any, i: number) => (
                            <tr key={i} className={i % 2 === 0 ? "bg-vyanzo-gray" : "bg-white"}>
                              <td className="p-6 text-sm font-bold uppercase tracking-widest text-vyanzo-blue/40 border-r border-vyanzo-blue/5 w-1/3">{spec.label}</td>
                              <td className="p-6 text-lg text-vyanzo-blue/80">{spec.value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="bg-vyanzo-gray p-8 rounded-3xl border border-vyanzo-blue/5">
                        <Factory className="w-8 h-8 text-vyanzo-blue mb-6" />
                        <h4 className="text-xl font-bold mb-4">Production Excellence</h4>
                        <p className="text-sm text-vyanzo-blue/60 leading-relaxed">Utilizing Inductotherm furnaces and DISA 280c vertical moulding lines for unsurpassed precision.</p>
                      </div>
                      <div className="bg-vyanzo-gray p-8 rounded-3xl border border-vyanzo-blue/5">
                        <Globe className="w-8 h-8 text-vyanzo-blue mb-6" />
                        <h4 className="text-xl font-bold mb-4">Eco-Friendly Casting</h4>
                        <p className="text-sm text-vyanzo-blue/60 leading-relaxed">Powered by rooftop solar energy and electrical induction furnaces to minimize environmental impact.</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-12">
                    <h3 className="text-2xl font-medium mb-8">Technical Specifications</h3>
                    <div className="overflow-hidden border border-vyanzo-blue/5 rounded-3xl">
                      <table className="w-full text-left text-sm">
                        <thead className="bg-vyanzo-gray text-vyanzo-blue/40">
                          <tr>
                            <th className="px-8 py-6 font-bold uppercase tracking-widest">Parameter</th>
                            <th className="px-8 py-6 font-bold uppercase tracking-widest">Value</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-vyanzo-blue/5">
                          {selectedProduct.specs.map((spec: any, i: number) => (
                            <tr key={i} className="hover:bg-vyanzo-gray/50 transition-colors">
                              <td className="px-8 py-6 font-medium text-vyanzo-blue">{spec.label}</td>
                              <td className="px-8 py-6 text-vyanzo-blue/60">{spec.value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <aside className="lg:col-span-4 flex flex-col gap-8">
                <div className="bg-white border border-vyanzo-blue/5 rounded-3xl p-10 sticky top-32 shadow-2xl shadow-vyanzo-blue/5">
                  <h3 className="text-xl font-medium mb-8 flex items-center gap-3">
                    <ExternalLink className="w-6 h-6 text-vyanzo-light-blue" />
                    Documentation
                  </h3>
                  <div className="space-y-4">
                    {[
                      { name: "Technical Sheet", type: "PDF • 2.4 MB", color: "text-red-500" },
                      { name: "CAD Drawing", type: "DWG • 12.8 MB", color: "text-blue-500" },
                      { name: "Maintenance Manual", type: "PDF • 5.1 MB", color: "text-emerald-500" }
                    ].map((doc, i) => (
                      <button 
                        key={i} 
                        onClick={() => showToast(`Download started: ${doc.name}`)}
                        className="w-full flex items-center justify-between p-5 bg-vyanzo-gray hover:bg-vyanzo-light-blue/5 transition-all rounded-2xl border border-transparent hover:border-vyanzo-light-blue/10 group"
                      >
                        <div className="flex items-center gap-4">
                          <Plus className={`w-5 h-5 ${doc.color}`} />
                          <div className="text-left">
                            <p className="text-sm font-bold text-vyanzo-blue">{doc.name}</p>
                            <p className="text-[10px] text-vyanzo-blue/40 uppercase tracking-widest font-bold">{doc.type}</p>
                          </div>
                        </div>
                        <ArrowUp className="w-4 h-4 text-vyanzo-blue/20 group-hover:text-vyanzo-light-blue transition-colors rotate-90" />
                      </button>
                    ))}
                  </div>
                  <div className="mt-12 pt-12 border-t border-vyanzo-blue/5">
                    <p className="text-[10px] font-bold text-vyanzo-blue/40 uppercase tracking-widest mb-6">Request Support</p>
                    <button 
                      onClick={() => showToast("Engineering support request sent. We will contact you shortly.")}
                      className="w-full py-5 bg-vyanzo-blue text-white font-bold rounded-2xl hover:bg-vyanzo-light-blue transition-all shadow-xl shadow-vyanzo-blue/20"
                    >
                      Contact Engineering
                    </button>
                    <p className="text-[11px] text-center text-vyanzo-blue/40 mt-6 leading-relaxed italic">
                      Architecture concrete textures & proprietary molding used in production.
                    </p>
                  </div>
                </div>

                <div className="rounded-3xl overflow-hidden relative h-64 border border-vyanzo-blue/5 group">
                  <img 
                    src="https://picsum.photos/seed/process/600/600" 
                    alt="Manufacturing Process" 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-vyanzo-blue via-vyanzo-blue/20 to-transparent opacity-80" />
                  <div className="absolute bottom-8 left-8">
                    <p className="text-[10px] font-bold text-vyanzo-gold uppercase tracking-widest mb-2">Manufacturing Process</p>
                    <p className="text-white text-sm font-medium">Casting in Architectural Concrete Molds</p>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      )}
      {currentPage === "services" && (
        <div className="pt-32 pb-24">
          <div className="container mx-auto px-6 md:px-12">
            <FadeInWhenVisible>
              <div className="section-label text-vyanzo-light-blue">OUR SERVICES</div>
              <h1 className="text-5xl md:text-7xl font-medium mb-12">Expert Solutions for Your Needs</h1>
            </FadeInWhenVisible>

            <div className="space-y-12 mb-32">
              {[
                { 
                  title: "Product Development", 
                  desc: "We transform your ideas into reality through advanced 3D modeling, rapid prototyping, and precision tooling design. Our engineering team ensures every specification is met before production begins.",
                  icon: <Factory className="w-8 h-8" />,
                  details: ["3D CAD/CAM Design", "Rapid Prototyping", "Tooling & Pattern Making", "Material Analysis"]
                },
                { 
                  title: "A-Z Production Excellence", 
                  desc: "From raw material selection to final surface treatment, we manage the entire manufacturing process. Our facilities in India, Turkey, and China adhere to strict international quality standards.",
                  icon: <Globe className="w-8 h-8" />,
                  details: ["Sand Casting", "Investment Casting", "Die Casting", "CNC Machining"]
                },
                { 
                  title: "Custom Packaging & Delivery", 
                  desc: "We provide tailored packaging solutions to ensure your products arrive in perfect condition. Our global logistics network handles everything from sea freight to last-mile delivery.",
                  icon: <Map className="w-8 h-8" />,
                  details: ["Custom Palletizing", "Global Shipping", "Warehousing", "Just-in-Time Delivery"]
                },
                { 
                  title: "Product Certification", 
                  desc: "Quality is at our core. We ensure all products meet or exceed industry certifications such as EN124, ISO 9001, and specific regional requirements.",
                  icon: <ExternalLink className="w-8 h-8" />,
                  details: ["EN124 Compliance", "ISO 9001:2015", "Third-party Inspection", "Material Certification"]
                }
              ].map((service, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-vyanzo-gray p-12 rounded-3xl border border-vyanzo-blue/5"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    <div className="lg:col-span-1">
                      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-vyanzo-light-blue shadow-sm">
                        {service.icon}
                      </div>
                    </div>
                    <div className="lg:col-span-7">
                      <h3 className="text-3xl font-medium mb-6">{service.title}</h3>
                      <p className="text-vyanzo-blue/60 text-lg leading-relaxed mb-8">{service.desc}</p>
                      <div className="flex flex-wrap gap-3">
                        {service.details.map((detail, j) => (
                          <span key={j} className="px-4 py-2 bg-white rounded-full text-xs font-bold uppercase tracking-widest text-vyanzo-blue/40 border border-vyanzo-blue/5">
                            {detail}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="lg:col-span-4">
                      <div className="aspect-square bg-white rounded-2xl overflow-hidden shadow-sm">
                        <img 
                          src={`https://picsum.photos/seed/service-${i}/600/600`} 
                          alt={service.title} 
                          className="w-full h-full object-cover opacity-80"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {currentPage === "portal" && (
        <div className="pt-48 pb-32 min-h-[80vh] flex items-center">
          <div className="container mx-auto px-6 md:px-12">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                <div>
                  <FadeInWhenVisible>
                    <div className="section-label">CLIENT PORTAL</div>
                    <h1 className="mb-10">Welcome Back</h1>
                    <p className="text-vyanzo-blue/60 text-xl leading-relaxed mb-16 font-light">Access your personalized dashboard to manage orders, view technical documents, and track inventory in real-time.</p>
                    
                    <div className="space-y-8">
                      {[
                        { icon: <Map className="w-6 h-6" />, text: "Real-time Order Tracking" },
                        { icon: <ExternalLink className="w-6 h-6" />, text: "Technical Specifications Library" },
                        { icon: <Globe className="w-6 h-6" />, text: "Inventory Management" }
                      ].map((feature, i) => (
                        <div key={i} className="flex items-center gap-6 text-vyanzo-blue/80">
                          <div className="w-14 h-14 bg-vyanzo-gray rounded-2xl flex items-center justify-center text-vyanzo-gold border border-vyanzo-blue/5">
                            {feature.icon}
                          </div>
                          <span className="text-lg font-bold">{feature.text}</span>
                        </div>
                      ))}
                    </div>
                  </FadeInWhenVisible>
                </div>

                <FadeInWhenVisible delay={0.2}>
                  <div className="bg-vyanzo-gray p-16 rounded-[2.5rem] border border-vyanzo-blue/5 shadow-2xl">
                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        showToast("Login successful. Redirecting to dashboard...", "info");
                      }}
                      className="space-y-8"
                    >
                      <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-vyanzo-blue/40">Username or Email</label>
                        <input type="text" required className="w-full bg-white border border-vyanzo-blue/10 p-5 focus:border-vyanzo-gold outline-none transition-all rounded-xl" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-vyanzo-blue/40">Password</label>
                        <input type="password" required className="w-full bg-white border border-vyanzo-blue/10 p-5 focus:border-vyanzo-gold outline-none transition-all rounded-xl" />
                      </div>
                      <div className="flex items-center justify-between text-xs font-bold">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" className="accent-vyanzo-gold w-4 h-4 rounded" />
                          <span className="text-vyanzo-blue/60">Remember me</span>
                        </label>
                        <button type="button" className="text-vyanzo-gold hover:underline">Forgot password?</button>
                      </div>
                      <button type="submit" className="btn-gold w-full">Login to Portal</button>
                    </form>
                    <div className="mt-10 pt-10 border-t border-vyanzo-blue/5 text-center">
                      <p className="text-vyanzo-blue/40 text-xs font-bold">Don't have an account? <button className="text-vyanzo-gold hover:underline">Request Access</button></p>
                    </div>
                  </div>
                </FadeInWhenVisible>
              </div>
            </div>
          </div>
        </div>
      )}
      {currentPage === "home" && (
        <>
          {/* Hero Section */}
          <section ref={heroRef} className="relative h-screen flex items-center bg-vyanzo-blue overflow-hidden">
            <motion.div 
              style={{ y: heroY }}
              className="absolute inset-0 z-0"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-vyanzo-blue/80 via-vyanzo-blue/40 to-vyanzo-blue z-10" />
              <img 
                src="https://picsum.photos/seed/vyanzo-hero/1920/1080?grayscale" 
                alt="Industrial Casting" 
                className="w-full h-full object-cover opacity-50 scale-110"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            <div className="container mx-auto px-6 md:px-12 relative z-20">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-end">
                <div className="lg:col-span-9">
                  <motion.h1 
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    className="text-white mb-16"
                  >
                    Meticulously Designed <br className="hidden md:block" />
                    <span className="text-vyanzo-gold italic">Products.</span>
                  </motion.h1>
                </div>
                <div className="lg:col-span-3 pb-8">
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="space-y-12"
                  >
                    <div className="flex items-center gap-6 text-vyanzo-gold">
                      <div className="w-4 h-4 rounded-full bg-vyanzo-gold animate-pulse" />
                      <span className="text-xs font-bold uppercase tracking-[0.4em]">What we do</span>
                    </div>
                    <p className="text-2xl text-white/80 leading-relaxed font-light">
                      Vyanzo delivers top quality castings to the most demanding customers. Consistent quality and service level are paramount to what we do.
                    </p>
                    <button 
                      onClick={() => {
                        const el = document.getElementById('products');
                        el?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="btn-gold group flex items-center justify-center gap-6 w-full md:w-auto"
                    >
                      Explore our solutions
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-3 transition-transform" />
                    </button>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>

          {/* Products Carousel Section */}
          <section id="products" className="py-32 md:py-48 bg-vyanzo-gray overflow-hidden">
            <div className="container mx-auto px-6 md:px-12">
              <FadeInWhenVisible>
                <div className="section-label">KNOW OUR PRODUCTS</div>
                <h2 className="mb-16 max-w-4xl">Discover our range of meticulously crafted products</h2>
              </FadeInWhenVisible>

              <div className="relative">
                <div className="flex gap-8 overflow-hidden">
                  <motion.div 
                    animate={{ x: `-${productIndex * 100}%` }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="flex gap-8 w-full"
                  >
                    {products.map((product, i) => (
                      <div 
                        key={i} 
                        onClick={() => navigateTo('product-detail', product)}
                        className="min-w-full md:min-w-[45%] lg:min-w-[30%] group cursor-pointer product-card-hover bg-white p-8 rounded-2xl border border-vyanzo-blue/5"
                      >
                        <div className="aspect-[4/3] overflow-hidden bg-vyanzo-blue/5 mb-8 rounded-xl">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="space-y-4">
                          <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-vyanzo-gold">{product.category}</div>
                          <h3 className="group-hover:text-vyanzo-gold transition-colors">{product.name}</h3>
                          <p className="text-sm text-vyanzo-blue/50 line-clamp-2 leading-relaxed">{product.desc}</p>
                          <div className="pt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest group-hover:gap-4 transition-all text-vyanzo-blue">
                            View Details <ArrowRight className="w-3 h-3" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </div>

                <div className="flex justify-between items-center mt-16">
                  <div className="flex gap-3">
                    {Array.from({ length: Math.ceil(products.length / (window.innerWidth > 1024 ? 3 : window.innerWidth > 768 ? 2 : 1)) }).map((_, i) => (
                      <button 
                        key={i} 
                        onClick={() => setProductIndex(i)}
                        className={`h-1.5 transition-all duration-500 rounded-full ${productIndex === i ? "bg-vyanzo-gold w-16" : "bg-vyanzo-blue/10 w-6"}`}
                      />
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => setProductIndex(Math.max(0, productIndex - 1))}
                      className="p-5 rounded-full border border-vyanzo-blue/10 hover:bg-vyanzo-blue hover:text-white transition-all duration-300"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button 
                      onClick={() => setProductIndex(Math.min(products.length - 1, productIndex + 1))}
                      className="p-5 rounded-full border border-vyanzo-blue/10 hover:bg-vyanzo-blue hover:text-white transition-all duration-300"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Tagline Section */}
          <section className="py-32 md:py-56 container mx-auto px-6 md:px-12 text-center">
            <FadeInWhenVisible>
              <h2 className="max-w-5xl mx-auto">
                Vyanzo delivers <span className="italic text-vyanzo-gold">top quality castings</span> to the most demanding customers. Consistent quality and service level are paramount.
              </h2>
            </FadeInWhenVisible>
          </section>

          {/* Stats Section */}
          <section className="bg-vyanzo-blue text-white py-32 md:py-56 overflow-hidden">
            <div className="container mx-auto px-6 md:px-12">
              <div className="section-label mb-24">Purpose-built manufacturing</div>
              <div className="space-y-32">
                {stats.map((stat, i) => (
                  <div key={i} className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start border-t border-white/10 pt-16 group">
                    <div className="lg:col-span-4">
                      <h3 className="text-4xl md:text-5xl font-serif italic text-white group-hover:text-vyanzo-gold transition-colors duration-500">{stat.title}</h3>
                    </div>
                    <div className="lg:col-span-5">
                      <div className="text-2xl md:text-3xl text-white/90 leading-tight mb-8 font-light">{stat.value}</div>
                      <p className="text-white/50 text-lg leading-relaxed max-w-xl">{stat.desc}</p>
                    </div>
                    <div className="lg:col-span-3 text-right hidden lg:block">
                      <span className="oversized-number text-white opacity-10 group-hover:opacity-20 transition-opacity duration-700">0{i + 1}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Environmental Responsibility Section */}
          <section className="py-32 md:py-56 bg-white overflow-hidden">
            <div className="container mx-auto px-6 md:px-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
                <div className="lg:col-span-6">
                  <FadeInWhenVisible>
                    <div className="section-label text-emerald-600 mb-8">Environmental Responsibility</div>
                    <h2 className="text-4xl md:text-6xl font-serif italic leading-tight mb-12">
                      Massively reducing our <span className="text-emerald-600">environmental impact</span> through innovation.
                    </h2>
                    <p className="text-xl text-vyanzo-blue/70 leading-relaxed mb-12 font-light">
                      We don’t melt with coal, like they still do in Belgium, but with the latest electrical induction furnaces. This shift, combined with rooftop solar panel green energy, represents our commitment to a sustainable future.
                    </p>
                    <div className="flex flex-wrap gap-8">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center">
                          <div className="w-3 h-3 rounded-full bg-emerald-500" />
                        </div>
                        <span className="text-sm font-bold uppercase tracking-widest">No Coal Melting</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center">
                          <div className="w-3 h-3 rounded-full bg-emerald-500" />
                        </div>
                        <span className="text-sm font-bold uppercase tracking-widest">Solar Powered</span>
                      </div>
                    </div>
                  </FadeInWhenVisible>
                </div>
                <div className="lg:col-span-6 relative">
                  <FadeInWhenVisible delay={0.2}>
                    <div className="aspect-square rounded-[3rem] overflow-hidden bg-emerald-50 relative group">
                      <img 
                        src="https://picsum.photos/seed/environment/1000/1000" 
                        alt="Environmental Commitment" 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-emerald-900/10 mix-blend-multiply" />
                    </div>
                  </FadeInWhenVisible>
                </div>
              </div>
            </div>
          </section>

          {/* Company Overview Section */}
          <section className="py-24 md:py-40 container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
              <div className="lg:col-span-6">
                <FadeInWhenVisible>
                  <div className="section-label text-vyanzo-light-blue">OUR EVOLUTION</div>
                  <h2 className="text-3xl md:text-5xl font-serif italic leading-tight mb-12">
                    "Since its inception in 2018, Vyanzo has evolved from an OEM supplier to become a leading manufacturer."
                  </h2>
                  <button onClick={() => navigateTo('about')} className="btn-gold inline-flex items-center gap-4 group">
                    Our Story
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </FadeInWhenVisible>
              </div>
              <div className="lg:col-span-6 space-y-8 text-vyanzo-blue/70 leading-relaxed">
                <FadeInWhenVisible delay={0.2}>
                  <p className="text-xl font-medium text-vyanzo-blue">Discover our range of meticulously designed and manufactured products.</p>
                  <p>Vyanzo delivers top quality castings to the most demanding customers. Consistent quality and service level are paramount to what we do. We offer end-to-end services to customers around the world who share our business philosophy: Quality, Service & Reliability at a correct price – and that with relentless consistency.</p>
                  <p>We have continuously upgraded our production facilities with the latest machines and technology, always considering the environment and energy efficiency. Vyanzo’s production facilities are state-of-the-art and ready to meet customer volume and quality demands for decades to come.</p>
                </FadeInWhenVisible>
              </div>
            </div>
          </section>

          {/* Services Preview Section */}
          <section className="py-24 md:py-40 bg-vyanzo-light-blue/5">
            <div className="container mx-auto px-6 md:px-12">
              <FadeInWhenVisible>
                <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
                  <div className="max-w-2xl">
                    <div className="section-label text-vyanzo-light-blue">OUR SERVICES</div>
                    <h2 className="text-4xl md:text-5xl font-medium tracking-tight">DISCOVER WHAT WE CAN DO FOR YOU</h2>
                  </div>
                  <button onClick={() => navigateTo('services')} className="btn-gold inline-flex items-center gap-4 group">
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </FadeInWhenVisible>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {services.map((service, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white p-10 border border-vyanzo-blue/5 hover:border-vyanzo-gold transition-all group"
                  >
                    <div className="w-12 h-12 bg-vyanzo-light-blue/10 flex items-center justify-center mb-8 group-hover:bg-vyanzo-gold transition-colors">
                      <Plus className="w-5 h-5 text-vyanzo-light-blue group-hover:text-vyanzo-blue" />
                    </div>
                    <h3 className="text-xl font-medium">{service.title}</h3>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* World Map Section */}
          <section className="py-24 md:py-40 bg-vyanzo-blue text-white overflow-hidden">
            <div className="container mx-auto px-6 md:px-12 text-center">
              <FadeInWhenVisible>
                <div className="section-label text-white/40 justify-center">GLOBAL PRESENCE</div>
                <h2 className="text-4xl md:text-5xl font-medium mb-20">Our Global Network</h2>
              </FadeInWhenVisible>
              
              <div className="relative aspect-video max-w-5xl mx-auto bg-white/5 rounded-3xl overflow-hidden border border-white/10 p-8">
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <Globe className="w-96 h-96" />
                </div>
                
                <div className="absolute bottom-8 left-8 flex gap-8">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-vyanzo-light-blue" />
                    <span className="text-xs font-semibold uppercase tracking-widest text-white/60">Customers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-vyanzo-gold" />
                    <span className="text-xs font-semibold uppercase tracking-widest text-white/60">Production Sites</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* The Team Teaser Section */}
          <section className="py-32 md:py-56 container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
              <div className="lg:col-span-6">
                <FadeInWhenVisible>
                  <div className="section-label">THE TEAM</div>
                  <h2 className="mb-10">Our dynamic team spans the globe</h2>
                  <p className="text-2xl text-vyanzo-blue/60 leading-relaxed mb-16 font-light">
                    Our dynamic team spans the globe, bringing diverse talents committed to efficiency, expertise, and passion.
                  </p>
                  <button onClick={() => navigateTo('about')} className="btn-gold group flex items-center gap-6">
                    Meet The Team
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-3 transition-transform" />
                  </button>
                </FadeInWhenVisible>
              </div>
              <div className="lg:col-span-6 grid grid-cols-2 gap-8">
                {team.map((person, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1, duration: 0.8 }}
                    viewport={{ once: true }}
                    className="aspect-square bg-vyanzo-gray p-12 flex flex-col justify-end border border-vyanzo-blue/5 rounded-[2rem] hover:bg-vyanzo-blue hover:text-white transition-all duration-500 group"
                  >
                    <div className="text-2xl font-bold mb-2">{person.name}</div>
                    <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-vyanzo-gold">{person.role}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Form Section */}
          <section className="py-32 md:py-56 bg-vyanzo-gray">
            <div className="container mx-auto px-6 md:px-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
                <div className="lg:col-span-5">
                  <FadeInWhenVisible>
                    <div className="section-label">GET IN TOUCH</div>
                    <h2 className="mb-10">Ready to start your journey?</h2>
                    <p className="text-vyanzo-blue/60 text-xl leading-relaxed mb-16 font-light">
                      Have questions or are you ready to embark on a new manufacturing journey? Our dedicated team is here to assist you.
                    </p>
                    <div className="space-y-8">
                      <div className="flex items-center gap-6">
                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center border border-vyanzo-blue/5 shadow-sm">
                          <ExternalLink className="w-6 h-6 text-vyanzo-gold" />
                        </div>
                        <span className="text-2xl font-bold">info@vyanzo.be</span>
                      </div>
                    </div>
                  </FadeInWhenVisible>
                </div>
                
                <div className="lg:col-span-7">
                  <FadeInWhenVisible delay={0.2}>
                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        showToast("Message sent successfully! We will get back to you soon.");
                        (e.target as HTMLFormElement).reset();
                      }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    >
                      <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-vyanzo-blue/40">Name *</label>
                        <input type="text" required className="w-full bg-white border border-vyanzo-blue/10 p-5 focus:border-vyanzo-gold outline-none transition-all rounded-xl" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-vyanzo-blue/40">Surname *</label>
                        <input type="text" required className="w-full bg-white border border-vyanzo-blue/10 p-5 focus:border-vyanzo-gold outline-none transition-all rounded-xl" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-vyanzo-blue/40">Email *</label>
                        <input type="email" required className="w-full bg-white border border-vyanzo-blue/10 p-5 focus:border-vyanzo-gold outline-none transition-all rounded-xl" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-vyanzo-blue/40">Phone *</label>
                        <input type="tel" required className="w-full bg-white border border-vyanzo-blue/10 p-5 focus:border-vyanzo-gold outline-none transition-all rounded-xl" />
                      </div>
                      <div className="md:col-span-2 space-y-3">
                        <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-vyanzo-blue/40">Message</label>
                        <textarea rows={5} className="w-full bg-white border border-vyanzo-blue/10 p-5 focus:border-vyanzo-gold outline-none transition-all rounded-xl resize-none" />
                      </div>
                      <div className="md:col-span-2">
                        <button type="submit" className="btn-gold w-full md:w-auto">Send Message</button>
                      </div>
                    </form>
                  </FadeInWhenVisible>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Footer */}
      <footer className="bg-vyanzo-blue text-white py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 mb-24">
            <div className="lg:col-span-4">
              <div className="mb-8">
                <span className="text-2xl font-serif italic text-white tracking-tight">
                  Vyanzo
                </span>
              </div>
              <p className="text-white/40 text-sm leading-relaxed max-w-sm">
                Vyanzo delivers top-quality castings to industry leaders making global manufacturing a local experience.
              </p>
            </div>
            
            <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-12">
              <div className="space-y-4">
                <div className="text-[10px] uppercase tracking-widest font-bold text-vyanzo-gold mb-6">Navigation</div>
                {[
                  { name: "About", id: "about" },
                  { name: "Team", id: "about" },
                  { name: "Services", id: "services" },
                  { name: "Products", id: "products-list" },
                  { name: "Contact", id: "contact" },
                  { name: "Client Portal", id: "portal" }
                ].map(item => (
                  <button 
                    key={item.name} 
                    onClick={() => navigateTo(item.id)} 
                    className="block text-sm text-white/60 hover:text-vyanzo-gold transition-colors text-left"
                  >
                    {item.name}
                  </button>
                ))}
              </div>
              <div className="space-y-4">
                <div className="text-[10px] uppercase tracking-widest font-bold text-vyanzo-gold mb-6">Connect</div>
                <a href="#" className="block text-sm text-white/60 hover:text-vyanzo-gold transition-colors flex items-center gap-2">LinkedIn <Linkedin className="w-3 h-3" /></a>
                <a href="#" className="block text-sm text-white/60 hover:text-vyanzo-gold transition-colors flex items-center gap-2">WhatsApp <MessageCircle className="w-3 h-3" /></a>
              </div>
              <div className="space-y-4">
                <div className="text-[10px] uppercase tracking-widest font-bold text-vyanzo-gold mb-6">Legal</div>
                <a href="#" className="block text-sm text-white/60 hover:text-vyanzo-gold transition-colors">Privacy Policy</a>
                <a href="#" className="block text-sm text-white/60 hover:text-vyanzo-gold transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
          
          <div className="pt-16 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] uppercase tracking-[0.3em] font-bold text-white/20">
            <div>Copyright @Vyanzo 2026</div>
            <div className="flex items-center gap-4">
              <span>Made by Malvah Studio</span>
              <div className="w-1 h-1 rounded-full bg-vyanzo-gold" />
              <span>All Rights Reserved</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Actions */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4">
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border ${
              toast.type === 'success' ? 'bg-vyanzo-blue text-white border-vyanzo-gold/20' : 'bg-white text-vyanzo-blue border-vyanzo-blue/5'
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${toast.type === 'success' ? 'bg-vyanzo-gold' : 'bg-vyanzo-light-blue'}`} />
            <span className="text-sm font-medium">{toast.message}</span>
          </motion.div>
        )}
        {showScrollTop && (
          <motion.button 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={scrollToTop}
            className="w-12 h-12 bg-vyanzo-blue text-white rounded-full flex items-center justify-center shadow-xl hover:bg-vyanzo-gold hover:text-vyanzo-blue transition-all"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
        <a 
          href="https://wa.me/32475264752" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-all"
        >
          <MessageCircle className="w-6 h-6" />
        </a>
      </div>
    </div>
  );
}
