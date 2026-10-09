import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Truck, ShieldCheck, Headphones, Zap, Star, Flame, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard, Product } from '@/components/ProductCard';
import { ProductGridSkeleton } from '@/components/Loader';
import { toast } from '@/hooks/use-toast';
import api from '@/api/axios';

const fallbackProducts: Product[] = [
  {
    _id: 'prod-1',
    name: 'Zevora Studio Wireless ANC Headphones',
    price: 4999,
    discount: 15,
    category: 'Electronics',
    description: 'High-fidelity spatial audio, 40-hour battery life, and adaptive active noise cancellation.',
    productImgUrls: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700&h=700&fit=crop'],
  },
  {
    _id: 'prod-2',
    name: 'Apex Heritage Automatic Chronograph',
    price: 7999,
    discount: 20,
    category: 'Fashion',
    description: 'Swiss movement with sapphire crystal glass and genuine Italian leather band.',
    productImgUrls: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700&h=700&fit=crop'],
  },
  {
    _id: 'prod-3',
    name: 'Nordic Minimalist Oak Desk Lamp',
    price: 2499,
    discount: 10,
    category: 'Home & Living',
    description: 'Touch-sensitive dimmer with warm ambient LED temperature control and solid oak build.',
    productImgUrls: ['https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=700&h=700&fit=crop'],
  },
  {
    _id: 'prod-4',
    name: 'Pro-Glide Carbon Runner 5.0',
    price: 3499,
    discount: 25,
    category: 'Sports',
    description: 'Carbon fiber energy return plate engineered for ultra-light marathon speed and support.',
    productImgUrls: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700&h=700&fit=crop'],
  },
];

const features = [
  {
    icon: Truck,
    title: 'Complimentary Express Delivery',
    description: 'Free expedited delivery all over India on orders exceeding ₹999.',
  },
  {
    icon: ShieldCheck,
    title: 'Encrypted & Insured Checkout',
    description: '100% fraud-proof 256-bit SSL protection with money-back guarantee.',
  },
  {
    icon: Headphones,
    title: '24/7 Dedicated Concierge',
    description: 'Expert customer support anytime you need via live chat or phone.',
  },
];

const categories = [
  {
    name: 'Electronics',
    tag: 'Flagship Tech',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&h=600&fit=crop',
  },
  {
    name: 'Fashion',
    tag: 'Apparel & Accs',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=600&fit=crop',
  },
  {
    name: 'Home & Living',
    tag: 'Interior & Decor',
    image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=600&h=600&fit=crop',
  },
  {
    name: 'Sports',
    tag: 'Fitness & Gear',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&h=600&fit=crop',
  },
];

const testimonials = [
  {
    name: 'Sophia Laurent',
    role: 'Verified Buyer',
    comment:
      'The packaging, build quality, and delivery speed were outstanding. Aura Commerce has set a completely new standard for e-commerce.',
    rating: 5,
  },
  {
    name: 'Marcus Chen',
    role: 'Tech Enthusiast',
    comment:
      'Customer service solved my shipping inquiry within minutes. The headphones exceeded my audiophile expectations!',
    rating: 5,
  },
  {
    name: 'Elena Rostova',
    role: 'Interior Designer',
    comment:
      'Authentic products, exquisite modern design, and hassle-free returns. Definitely making this my primary shopping hub.',
    rating: 5,
  },
];

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newsletterEmail, setNewsletterEmail] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/product');
        const raw = response.data?.payload || response.data;
        if (Array.isArray(raw) && raw.length > 0) {
          setFeaturedProducts(raw.slice(0, 4));
        } else {
          setFeaturedProducts(fallbackProducts);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setFeaturedProducts(fallbackProducts);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    toast({
      title: 'Welcome to Zevora VIP!',
      description: 'Your ₹500 welcome voucher has been sent to your inbox.',
    });
    setNewsletterEmail('');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-primary/20 text-xs font-semibold text-primary shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                <span>India's Curated Luxury Store</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold leading-[1.1] tracking-tight">
                Refine Your Lifestyle With{' '}
                <span className="gradient-text">Zevora India</span>
              </h1>

              <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                Discover masterfully designed gear, modern electronics, and luxury everyday products crafted for those who value detail and enduring quality.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link to="/products">
                  <Button variant="gradient" size="xl" className="gap-2 shadow-lg shadow-primary/25">
                    Explore Collection
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline" size="xl" className="glass border-border/60">
                    Our Story
                  </Button>
                </Link>
              </div>

              {/* Trust counters */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-border/40 max-w-md">
                <div>
                  <div className="text-2xl font-bold font-display gradient-text">50K+</div>
                  <div className="text-xs text-muted-foreground">Active Shoppers</div>
                </div>
                <div>
                  <div className="text-2xl font-bold font-display gradient-text">4.9/5</div>
                  <div className="text-xs text-muted-foreground">Rating Average</div>
                </div>
                <div>
                  <div className="text-2xl font-bold font-display gradient-text">100%</div>
                  <div className="text-xs text-muted-foreground">Genuine Proof</div>
                </div>
              </div>
            </motion.div>

            {/* Hero Visual Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-[4/3] max-w-lg mx-auto rounded-3xl overflow-hidden glass border border-border/50 shadow-2xl p-2">
                <img
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop"
                  alt="Aura Lifestyle Showroom"
                  className="w-full h-full object-cover rounded-2xl"
                />

                {/* Floating promo badge */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute bottom-6 left-6 right-6 p-4 rounded-xl glass bg-background/85 backdrop-blur-md border border-border/60 shadow-xl flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">
                      <Zap className="w-5 h-5 fill-current" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Deal Of The Week</h4>
                      <p className="text-sm font-semibold text-foreground">Save up to 30% on Premium Audio</p>
                    </div>
                  </div>
                  <Link to="/products?category=Electronics">
                    <Button size="sm" variant="gradient" className="text-xs h-8">
                      Shop
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-12 border-y border-border/40 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass p-6 rounded-2xl border border-border/40 shadow-card flex items-start gap-4"
                >
                  <div className="p-3 rounded-xl bg-primary/10 text-primary shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm mb-1">{item.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-semibold uppercase tracking-wider text-primary mb-2">
                Curated Departments
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold">
                Browse By Category
              </h2>
            </div>
            <Link to="/products" className="text-sm font-semibold text-primary hover:underline inline-flex items-center gap-1">
              View All Categories <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, index) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/products?category=${encodeURIComponent(cat.name)}`}>
                  <div className="group relative aspect-square rounded-2xl overflow-hidden glass border border-border/40 shadow-card">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-primary-foreground/70 bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full">
                        {cat.tag}
                      </span>
                      <h3 className="text-lg font-bold text-white mt-1 group-hover:translate-x-1 transition-transform">
                        {cat.name}
                      </h3>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-muted/30 border-y border-border/40">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-12"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-semibold uppercase tracking-wider text-primary mb-2">
                <Flame className="w-3.5 h-3.5 text-orange-500 fill-current" />
                Trending Now
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold">
                Featured Selection
              </h2>
            </div>
            <Link to="/products">
              <Button variant="outline" className="gap-2 glass border-border/60">
                View All Products
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>

          {isLoading ? (
            <ProductGridSkeleton />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product, index) => (
                <ProductCard key={product._id} product={product} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="relative rounded-3xl overflow-hidden p-8 md:p-14 border border-primary/30 shadow-2xl bg-gradient-to-r from-primary/95 via-indigo-600 to-primary text-primary-foreground">
            <div className="max-w-xl space-y-4">
              <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                Limited Time Promotion
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-extrabold leading-tight">
                Upgrade Your Space With 20% Off
              </h2>
              <p className="text-primary-foreground/90 text-sm md:text-base leading-relaxed">
                Use code <span className="font-bold underline text-white">ZEVORA20</span> at checkout to claim instant 20% savings on all electronics and home essentials.
              </p>
              <div className="pt-2">
                <Link to="/products">
                  <Button size="lg" variant="secondary" className="font-semibold shadow-md">
                    Shop The Sale Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-3xl font-display font-bold mb-2">Loved by Discerning Buyers</h2>
            <p className="text-sm text-muted-foreground">What our community says about their shopping journey.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass rounded-2xl p-6 border border-border/40 shadow-card flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-foreground/90 italic mb-6">"{t.comment}"</p>
                </div>
                <div className="border-t border-border/30 pt-3">
                  <h4 className="font-semibold text-sm">{t.name}</h4>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-display font-bold">
            Join the Aura Insiders Circle
          </h2>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            Receive exclusive weekly private sale invitations, preview releases, and design insights directly to your inbox.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="flex-1 h-12 px-4 rounded-xl glass border border-border/60 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <Button type="submit" variant="gradient" size="lg" className="h-12">
              Subscribe Free
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
