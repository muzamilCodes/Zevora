import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Mail, Phone, MapPin, ArrowRight, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

const footerLinks = {
  shop: [
    { label: 'All Products', path: '/products' },
    { label: 'Electronics', path: '/products?category=Electronics' },
    { label: 'Fashion & Wear', path: '/products?category=Fashion' },
    { label: 'Home Living', path: '/products?category=Home' },
  ],
  company: [
    { label: 'About Us', path: '/about' },
    { label: 'Contact Us', path: '/contact' },
    { label: 'Customer Reviews', path: '/about' },
    { label: 'Privacy Policy', path: '/about' },
  ],
  account: [
    { label: 'My Dashboard', path: '/dashboard' },
    { label: 'Shopping Cart', path: '/cart' },
    { label: 'Checkout', path: '/checkout' },
    { label: 'Sign In / Register', path: '/login' },
  ],
};

export const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast({
      title: 'Subscribed to Aura newsletter!',
      description: 'You will receive exclusive early access discounts and product drops.',
    });
    setEmail('');
  };

  return (
    <footer className="glass-navbar mt-auto border-t border-border/40">
      {/* Service Highlights Bar */}
      <div className="border-b border-border/40 py-8 bg-muted/20">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-sm">Complimentary Delivery</h4>
              <p className="text-xs text-muted-foreground">Free express shipping across India on orders over ₹999</p>
            </div>
          </div>
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-sm">Secure Checkout</h4>
              <p className="text-xs text-muted-foreground">UPI, RuPay, NetBanking & Cards protected with 256-bit SSL</p>
            </div>
          </div>
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-sm">30-Day Easy Returns</h4>
              <p className="text-xs text-muted-foreground">Doorstep pickup & immediate UPI/bank refunds</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary via-indigo-500 to-accent flex items-center justify-center shadow-md">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-display text-xl font-bold tracking-tight gradient-text">
                Zevora
              </span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">
              India's premier destination for curated lifestyle gear, electronics, and essentials crafted for discerning buyers.
            </p>
            <div className="space-y-2.5 text-sm text-muted-foreground pt-2">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-primary" />
                <a href="mailto:support@zevora.in" className="hover:text-primary transition-colors">
                  support@zevora.in
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-primary" />
                <a href="tel:+919876543210" className="hover:text-primary transition-colors">
                  +91 (800) 555-0199
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Connaught Place, New Delhi, India</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm mb-4 tracking-wider uppercase text-foreground/80">Shop</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4 tracking-wider uppercase text-foreground/80">Company</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Box */}
          <div>
            <h4 className="font-semibold text-sm mb-4 tracking-wider uppercase text-foreground/80">Stay Connected</h4>
            <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
              Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-xs bg-background/50"
                  required
                />
                <Button type="submit" size="icon" variant="gradient" className="shrink-0">
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-[11px] text-muted-foreground">We respect your privacy. Unsubscribe anytime.</p>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Aura Commerce Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/about" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/about" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link to="/contact" className="hover:text-primary transition-colors">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
