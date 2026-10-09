import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Heart, Share2, Minus, Plus, Check, Star, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Loader } from '@/components/Loader';
import { useCart } from '@/context/CartContext';
import { toast } from '@/hooks/use-toast';
import api from '@/api/axios';

interface Product {
  _id: string;
  name: string;
  price: number;
  discount?: number;
  image?: string;
  productImgUrls?: string[];
  category?: string;
  description?: string;
  colors?: string[];
  sizes?: string[];
  stock?: number;
  isAvailable?: boolean;
}

const fallbackDetails: Record<string, Product> = {
  'prod-1': {
    _id: 'prod-1',
    name: 'Zevora Studio Wireless ANC Headphones',
    price: 4999,
    discount: 15,
    category: 'Electronics',
    description:
      'Engineered with titanium drivers, spatial acoustic mapping, and high-precision hybrid Active Noise Cancellation. Delivers up to 40 hours of playback on a single charge with ultra-low latency wireless streaming.',
    productImgUrls: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=800&fit=crop',
    ],
    colors: ['Space Gray', 'Matte Black', 'Silver Moon'],
    sizes: ['Standard'],
  },
  'prod-2': {
    _id: 'prod-2',
    name: 'Apex Heritage Automatic Chronograph',
    price: 7999,
    discount: 20,
    category: 'Fashion',
    description:
      'Swiss mechanical movement with 42-hour power reserve. Features a scratch-proof sapphire crystal dome, genuine hand-stitched Tuscan leather strap, and 100m water resistance.',
    productImgUrls: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&h=800&fit=crop',
    ],
    colors: ['Midnight Gold', 'Steel Silver', 'Rose Gold'],
    sizes: ['40mm', '42mm'],
  },
  'prod-3': {
    _id: 'prod-3',
    name: 'Nordic Minimalist Oak Desk Lamp',
    price: 2499,
    discount: 10,
    category: 'Home & Living',
    description:
      'Handcrafted natural solid white oak with integrated warm eye-care LED diffused technology. Includes intuitive touch-sensitive multi-level brightness dimmer.',
    productImgUrls: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&h=800&fit=crop',
    ],
    colors: ['Natural Oak', 'Smoked Walnut'],
    sizes: ['Standard Desk Size'],
  },
  'prod-4': {
    _id: 'prod-4',
    name: 'Pro-Glide Carbon Runner 5.0',
    price: 3499,
    discount: 25,
    category: 'Sports',
    description:
      'Built with a full-length carbon fiber propulsion plate, super-critical nitrogen-infused foam, and ultra-breathable engineered mono-mesh. Designed for elite tempo runs and daily maximum comfort.',
    productImgUrls: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&h=800&fit=crop',
    ],
    colors: ['Racing Red', 'Stealth Black', 'Volt Neon'],
    sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
  },
  'prod-5': {
    _id: 'prod-5',
    name: 'Horizon Ultra 4K Smart Projector',
    price: 14999,
    discount: 10,
    category: 'Electronics',
    description:
      'True 4K UHD projection with HDR10+ support, auto optical focus, obstacle avoidance, and tuned cinematic dual Harman Kardon acoustic speakers.',
    productImgUrls: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=800&fit=crop',
    ],
    colors: ['Space Gray', 'Lunar White'],
    sizes: ['Portable Pro'],
  },
  'prod-6': {
    _id: 'prod-6',
    name: 'Artisan Full-Grain Leather Weekender',
    price: 4599,
    discount: 0,
    category: 'Fashion',
    description:
      'Constructed with vegetable-tanned premium full-grain leather, antique solid brass hardware, and dedicated shoe compartment for weekend luxury travel.',
    productImgUrls: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop',
    ],
    colors: ['Vintage Tan', 'Espresso Dark', 'Classic Black'],
    sizes: ['45 Liters Carry-On'],
  },
  'prod-7': {
    _id: 'prod-7',
    name: 'Titanium Smart Fitness Tracker',
    price: 2999,
    discount: 15,
    category: 'Sports',
    description:
      'Grade 5 titanium bezel, sapphire display, continuous SpO2 and ECG tracking, 14-day battery life, and 50m water resistance.',
    productImgUrls: [
      'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=800&h=800&fit=crop',
    ],
    colors: ['Titanium Gray', 'Carbon Black'],
    sizes: ['Adjustable Strap'],
  },
  'prod-8': {
    _id: 'prod-8',
    name: 'Ceramic Pour-Over Coffee Station',
    price: 1799,
    discount: 0,
    category: 'Home & Living',
    description:
      'High-fired matte ceramic cone with precision flow spiral ribs, borosilicate heat-resistant glass carafe, and brushed brass drip stand.',
    productImgUrls: [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&h=800&fit=crop',
    ],
    colors: ['Matte Black', 'Terracotta', 'Cloud White'],
    sizes: ['600ml (2-4 Cups)'],
  },
};

export const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem, items } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [isAdding, setIsAdding] = useState(false);

  const isInCart = items.some((item) => item.id === id);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        let fetchedData: Product | null = null;
        try {
          const response = await api.get(`/product/${id}`);
          const data = response.data?.payload || response.data;
          if (data && data.name) {
            fetchedData = data;
          }
        } catch (apiErr) {
          console.warn('API get product notice:', apiErr);
        }

        if (fetchedData) {
          setProduct(fetchedData);
          const firstImg =
            fetchedData.image ||
            (fetchedData.productImgUrls && fetchedData.productImgUrls.length > 0
              ? fetchedData.productImgUrls[0]
              : '');
          setSelectedImage(firstImg);
          if (fetchedData.colors && fetchedData.colors.length > 0) setSelectedColor(fetchedData.colors[0]);
          if (fetchedData.sizes && fetchedData.sizes.length > 0) setSelectedSize(fetchedData.sizes[0]);
        } else if (id && fallbackDetails[id]) {
          const item = fallbackDetails[id];
          setProduct(item);
          setSelectedImage(item.productImgUrls?.[0] || '');
          if (item.colors && item.colors.length > 0) setSelectedColor(item.colors[0]);
          if (item.sizes && item.sizes.length > 0) setSelectedSize(item.sizes[0]);
        } else {
          // Dynamic fallback for any unseeded ID
          const generic: Product = {
            _id: id || 'item',
            name: 'Zevora Signature Edition Product',
            price: 2999,
            discount: 10,
            category: 'Essentials',
            description: 'Handcrafted luxury item made with premium materials for discerning daily use.',
            productImgUrls: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop'],
            colors: ['Classic Black', 'Silver'],
            sizes: ['Standard'],
          };
          setProduct(generic);
          setSelectedImage(generic.productImgUrls?.[0] || '');
          setSelectedColor('Classic Black');
          setSelectedSize('Standard');
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const finalPrice = product
    ? product.discount
      ? product.price - (product.price * product.discount) / 100
      : product.price
    : 0;

  const handleAddToCart = () => {
    if (!product) return;
    setIsAdding(true);

    const imageToSave =
      selectedImage ||
      product.image ||
      (product.productImgUrls && product.productImgUrls[0]) ||
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop';

    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product._id,
        name: product.name,
        price: finalPrice,
        image: imageToSave,
      });
    }

    toast({
      title: 'Added to cart 🎉',
      description: `${quantity}x ${product.name} added to your shopping bag.`,
    });

    setTimeout(() => setIsAdding(false), 500);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20">
        <div className="text-center space-y-4 glass p-8 rounded-2xl max-w-md">
          <h2 className="text-2xl font-bold font-display">Product Not Found</h2>
          <p className="text-xs text-muted-foreground">The item you are looking for is no longer available or was moved.</p>
          <Button onClick={() => navigate('/products')} variant="gradient">
            Browse All Products
          </Button>
        </div>
      </div>
    );
  }

  const allImages = [
    ...(product.productImgUrls || []),
    ...(product.image ? [product.image] : []),
  ];
  const displayImage = selectedImage || allImages[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop';

  return (
    <div className="min-h-screen py-10 lg:py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Navigation Breadcrumb */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to collection
        </motion.button>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Images Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="relative aspect-square rounded-3xl overflow-hidden glass border border-border/40 shadow-xl bg-muted/20">
              <img
                src={displayImage}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-300"
              />
              {product.discount ? (
                <span className="absolute top-4 left-4 px-3 py-1 text-xs font-bold bg-red-500 text-white rounded-full shadow-md">
                  -{product.discount}% OFF
                </span>
              ) : null}
            </div>

            {allImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(img)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === img
                        ? 'border-primary shadow-md scale-105'
                        : 'border-border/50 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Details Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <div>
              {product.category && (
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  {product.category}
                </span>
              )}
              <h1 className="text-3xl md:text-4xl font-display font-bold mt-1 mb-2">
                {product.name}
              </h1>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-amber-500 text-sm">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                  <span className="font-bold ml-1 text-foreground">4.9</span>
                </div>
                <span className="text-xs text-muted-foreground">• 128 Customer Ratings</span>
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-extrabold gradient-text">
                ₹{Math.round(finalPrice).toLocaleString('en-IN')}
              </span>
              {product.discount ? (
                <span className="text-base text-muted-foreground line-through">
                  ₹{Math.round(product.price).toLocaleString('en-IN')}
                </span>
              ) : null}
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 font-semibold">
                Available & In Stock
              </span>
            </div>

            <div className="h-px bg-border/40" />

            <div>
              <h3 className="font-semibold text-sm mb-2">Overview</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {product.description ||
                  'Precision-crafted with premium components designed for enduring luxury, resilience, and maximum comfort.'}
              </p>
            </div>

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Color: <span className="text-foreground">{selectedColor}</span>
                </label>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                        selectedColor === color
                          ? 'border-primary bg-primary/10 text-primary font-bold'
                          : 'border-border/60 glass text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Size: <span className="text-foreground">{selectedSize}</span>
                </label>
                <div className="flex gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                        selectedSize === size
                          ? 'border-primary bg-primary/10 text-primary font-bold'
                          : 'border-border/60 glass text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector & Action Buttons */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Quantity
              </label>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center glass rounded-xl overflow-hidden border border-border/50 h-12 w-32 shrink-0">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="flex-1 h-full flex items-center justify-center hover:bg-muted/50 transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center font-bold text-sm">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="flex-1 h-full flex items-center justify-center hover:bg-muted/50 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <Button
                  variant="gradient"
                  size="xl"
                  className="flex-1 gap-2 shadow-lg shadow-primary/20 h-12"
                  onClick={handleAddToCart}
                  disabled={isAdding}
                >
                  {isAdding ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
                  {isInCart ? 'Add Another To Cart' : 'Add To Cart'}
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  className="h-12 w-12 glass border-border/60 shrink-0"
                  onClick={() => {
                    toast({
                      title: 'Saved to Wishlist',
                      description: `${product.name} saved to your favorites.`,
                    });
                  }}
                >
                  <Heart className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border/40">
              <div className="glass p-3 rounded-xl text-center border border-border/40">
                <Truck className="w-4 h-4 text-primary mx-auto mb-1" />
                <span className="text-[11px] font-semibold block">Free Shipping</span>
                <span className="text-[10px] text-muted-foreground">Orders over ₹999</span>
              </div>
              <div className="glass p-3 rounded-xl text-center border border-border/40">
                <ShieldCheck className="w-4 h-4 text-primary mx-auto mb-1" />
                <span className="text-[11px] font-semibold block">2-Year Warranty</span>
                <span className="text-[10px] text-muted-foreground">100% Guaranteed</span>
              </div>
              <div className="glass p-3 rounded-xl text-center border border-border/40">
                <RotateCcw className="w-4 h-4 text-primary mx-auto mb-1" />
                <span className="text-[11px] font-semibold block">30-Day Returns</span>
                <span className="text-[10px] text-muted-foreground">Hassle-free</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
