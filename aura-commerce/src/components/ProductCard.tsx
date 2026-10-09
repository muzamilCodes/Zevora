import { motion } from 'framer-motion';
import { ShoppingCart, Eye, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { useCart } from '@/context/CartContext';
import { toast } from '@/hooks/use-toast';

export interface Product {
  _id: string;
  name: string;
  price: number;
  discount?: number;
  image?: string;
  productImgUrls?: string[];
  category?: string;
  description?: string;
  isAvailable?: boolean;
}

interface ProductCardProps {
  product: Product;
  index?: number;
}

const defaultImage =
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop';

export const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const { addItem } = useCart();
  const imageSrc =
    product.image ||
    (product.productImgUrls && product.productImgUrls.length > 0
      ? product.productImgUrls[0]
      : defaultImage);

  const finalPrice = product.discount
    ? product.price - (product.price * product.discount) / 100
    : product.price;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addItem({
      id: product._id,
      name: product.name,
      price: finalPrice,
      image: imageSrc,
    });

    toast({
      title: 'Added to cart',
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group"
    >
      <Link to={`/product/${product._id}`}>
        <div className="glass rounded-2xl overflow-hidden card-hover shadow-card border border-border/40 hover:border-primary/40 transition-all duration-300">
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden bg-muted/40">
            <img
              src={imageSrc}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).src = defaultImage;
              }}
            />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
              {product.discount ? (
                <span className="px-2.5 py-1 text-xs font-semibold bg-red-500 text-white rounded-full shadow-sm">
                  -{product.discount}% OFF
                </span>
              ) : null}
              {product.category && (
                <span className="px-2.5 py-1 text-xs font-medium bg-background/80 backdrop-blur-md text-foreground rounded-full border border-border/50">
                  {product.category}
                </span>
              )}
            </div>

            {/* Quick Actions overlay */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <div className="w-full flex gap-2">
                <Button
                  size="sm"
                  className="flex-1 bg-white/90 hover:bg-white text-zinc-900 font-medium shadow-md backdrop-blur-sm"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="w-4 h-4 mr-1.5" />
                  Add to Cart
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="bg-white/90 hover:bg-white text-zinc-900 shadow-md backdrop-blur-sm"
                >
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 space-y-2">
            <div className="flex items-center gap-1 text-amber-500 text-xs">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="font-semibold text-foreground">4.8</span>
              <span className="text-muted-foreground">(24)</span>
            </div>

            <h3 className="font-medium text-foreground line-clamp-1 group-hover:text-primary transition-colors">
              {product.name}
            </h3>

            {product.description && (
              <p className="text-xs text-muted-foreground line-clamp-2">
                {product.description}
              </p>
            )}

            <div className="flex items-center justify-between pt-2 border-t border-border/30">
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-foreground">
                  ₹{Math.round(finalPrice).toLocaleString('en-IN')}
                </span>
                {product.discount ? (
                  <span className="text-xs text-muted-foreground line-through">
                    ₹{Math.round(product.price).toLocaleString('en-IN')}
                  </span>
                ) : null}
              </div>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium bg-emerald-500/10 px-2 py-0.5 rounded-full">
                In Stock
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

