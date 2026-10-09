import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, HeartHandshake, Award, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const stats = [
  { value: '50K+', label: 'Happy Customers' },
  { value: '1,200+', label: 'Curated Products' },
  { value: '99.8%', label: 'Satisfaction Rate' },
  { value: '24/7', label: 'VIP Support' },
];

const values = [
  {
    icon: Award,
    title: 'Uncompromised Quality',
    description: 'Every single product is inspected and tested to adhere to strict world-class quality standards.',
  },
  {
    icon: ShieldCheck,
    title: 'Authenticity Guaranteed',
    description: '100% genuine products sourced directly from verified manufacturers and trusted artisan partners.',
  },
  {
    icon: HeartHandshake,
    title: 'Customer-Centric Care',
    description: 'We prioritize our customers with hassle-free 30-day returns and immediate dispute resolution.',
  },
  {
    icon: Sparkles,
    title: 'Modern Craftsmanship',
    description: 'Blending contemporary aesthetics with sustainable, durable, and ethically sourced materials.',
  },
];

const About = () => {
  return (
    <div className="min-h-screen py-12 lg:py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-semibold uppercase tracking-wider text-primary">
            <Users className="w-3.5 h-3.5" />
            Our Heritage & Story
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold">
            Crafting Extraordinary Experiences at{' '}
            <span className="gradient-text">Zevora</span>
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Founded with a passion for excellence, Zevora was born out of a desire to bring world-class curated lifestyle gear, electronics, and essentials to India with transparent elegance and fair pricing in Indian Rupees (₹).
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="glass rounded-2xl p-6 text-center border border-border/40 shadow-card"
            >
              <div className="text-3xl md:text-4xl font-bold font-display gradient-text mb-1">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-muted-foreground font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Story Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-display font-bold">
              Driven by passion, defined by standard
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We started with a simple belief: everyday products should be beautifully engineered, reliable, and delightful to use. Over the years, we have grown into a premier destination for conscious consumers worldwide.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              From handpicked electronics to artisan lifestyle gear, each item in our catalog is curated by experts with meticulous attention to detail and durability.
            </p>
            <div className="pt-2">
              <Link to="/products">
                <Button variant="gradient" size="lg" className="gap-2">
                  Explore The Collection
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-border/40 aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop"
                alt="Aura Commerce showroom"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>

        {/* Brand Values */}
        <div className="mb-20">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-3xl font-display font-bold mb-3">Our Core Values</h2>
            <p className="text-sm text-muted-foreground">
              What sets Aura Commerce apart and guides every step of our journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * idx }}
                  className="glass rounded-2xl p-6 border border-border/40 shadow-card flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{val.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
