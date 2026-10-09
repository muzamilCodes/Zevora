import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, Clock, CheckCircle, Truck, User, LogOut, ShoppingBag, ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Loader } from '@/components/Loader';
import { useAuth } from '@/context/AuthContext';
import api from '@/api/axios';

interface OrderItem {
  productId?: string | { _id?: string; name?: string; price?: number };
  name?: string;
  price?: number;
  quantity: number;
}

interface Order {
  _id: string;
  items?: OrderItem[];
  products?: OrderItem[];
  total?: number;
  orderValue?: number;
  status?: string;
  orderStatus?: string;
  createdAt: string;
  paymentStatus?: string;
}

const statusIcons: Record<string, typeof Package> = {
  pending: Clock,
  processing: Package,
  shipped: Truck,
  delivered: CheckCircle,
  cancelled: LogOut,
};

const statusColors: Record<string, string> = {
  pending: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
  processing: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
  shipped: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
  delivered: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
  cancelled: 'text-rose-500 bg-rose-500/10 border-rose-500/20',
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, isLoading: authLoading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        let backendOrders: Order[] = [];
        try {
          const response = await api.get('/order');
          const raw = response.data?.payload || response.data;
          if (Array.isArray(raw)) {
            backendOrders = raw;
          }
        } catch (error) {
          console.warn('Backend order fetch issue, using local cache:', error);
        }

        const localOrders: Order[] = JSON.parse(
          localStorage.getItem('local_orders') || '[]'
        );

        // Merge backend and local orders without duplication
        const seen = new Set<string>();
        const merged: Order[] = [];

        for (const ord of [...backendOrders, ...localOrders]) {
          const id = ord._id ? String(ord._id) : '';
          if (id && !seen.has(id)) {
            seen.add(id);
            merged.push(ord);
          } else if (!id) {
            merged.push(ord);
          }
        }

        setOrders(merged);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [isAuthenticated, authLoading]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 lg:py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
            Client Dashboard
          </h1>
          <p className="text-muted-foreground text-sm">
            Manage your personal profile, active shipments, and past purchases.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1 space-y-6"
          >
            <div className="glass rounded-2xl p-6 space-y-6 border border-border/40 shadow-card">
              {/* User Info */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-md">
                  <User className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">{user?.name || 'Valued Member'}</h3>
                  <p className="text-xs text-muted-foreground truncate max-w-[150px]">{user?.email}</p>
                </div>
              </div>

              <div className="h-px bg-border/40" />

              {/* Stats */}
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total Orders</span>
                  <span className="font-bold text-foreground">{orders.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Membership</span>
                  <span className="font-semibold text-primary">Aura VIP Tier</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Member Since</span>
                  <span className="font-semibold">{new Date().getFullYear()}</span>
                </div>
              </div>

              <div className="h-px bg-border/40" />

              <Button
                variant="outline"
                className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10 border-border/60"
                onClick={() => {
                  logout();
                  navigate('/');
                }}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>

            {/* Quick Actions Card */}
            <div className="glass rounded-2xl p-6 border border-border/40 shadow-card space-y-3">
              <h4 className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Support & Benefits</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Enjoy complimentary priority support and extended return guarantees on all your items.
              </p>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-between text-xs font-semibold p-0 h-auto hover:bg-transparent text-primary"
                onClick={() => navigate('/contact')}
              >
                <span>Contact VIP Concierge</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </motion.div>

          {/* Orders Section */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold font-display">Order History ({orders.length})</h2>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 glass"
                  onClick={() => navigate('/products')}
                >
                  <ShoppingBag className="w-4 h-4" /> Shop New Items
                </Button>
              </div>

              {isLoading ? (
                <div className="flex justify-center py-16">
                  <Loader size="lg" />
                </div>
              ) : orders.length === 0 ? (
                <div className="glass rounded-3xl p-12 text-center border border-border/40 shadow-card">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <Package className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold font-display mb-2">No orders placed yet</h3>
                  <p className="text-xs text-muted-foreground mb-6 max-w-sm mx-auto">
                    Your shopping bag is waiting for its first luxury pick. Browse through our premium categories.
                  </p>
                  <Button variant="gradient" onClick={() => navigate('/products')}>
                    Explore The Catalog
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order, index) => {
                    const status = (order.orderStatus || order.status || 'pending').toLowerCase();
                    const StatusIcon = statusIcons[status] || Clock;
                    const statusColor = statusColors[status] || statusColors.pending;
                    const totalVal = order.orderValue ?? order.total ?? 0;
                    const itemsList = order.items || order.products || [];

                    return (
                      <motion.div
                        key={order._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="glass rounded-2xl p-6 border border-border/40 shadow-card"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-border/40">
                          <div>
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                              Order ID: #{order._id.slice(-8).toUpperCase()}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Placed on{' '}
                              {new Date(order.createdAt || Date.now()).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              })}
                            </p>
                          </div>
                          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border ${statusColor}`}>
                            <StatusIcon className="w-3.5 h-3.5" />
                            <span className="capitalize">{status}</span>
                          </div>
                        </div>

                        {/* Items summary */}
                        <div className="space-y-2 mb-4">
                          {itemsList.map((item, i) => {
                            const itemName =
                              typeof item.productId === 'object' && item.productId?.name
                                ? item.productId.name
                                : item.name || 'Premium Item';
                            const itemPrice =
                              typeof item.productId === 'object' && item.productId?.price
                                ? item.productId.price
                                : item.price || 0;

                            return (
                              <div
                                key={i}
                                className="flex items-center justify-between text-xs"
                              >
                                <div className="flex items-center gap-2">
                                  <span className="px-2 py-0.5 rounded bg-muted font-bold text-foreground">
                                    {item.quantity}x
                                  </span>
                                  <span className="text-foreground font-medium">{itemName}</span>
                                </div>
                                <span className="font-semibold text-foreground">
                                  ₹{Math.round(itemPrice * item.quantity).toLocaleString('en-IN')}
                                </span>
                              </div>
                            );
                          })}
                        </div>

                        <div className="pt-3 border-t border-border/40 flex items-center justify-between">
                          <span className="text-xs font-medium text-muted-foreground">Grand Total</span>
                          <span className="text-base font-bold gradient-text">
                            ₹{Math.round(Number(totalVal)).toLocaleString('en-IN')}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
