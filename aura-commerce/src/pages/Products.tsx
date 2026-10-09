import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter, SlidersHorizontal, ArrowUpDown, X, Sparkles } from 'lucide-react';
import { ProductCard, Product } from '@/components/ProductCard';
import { SearchBar } from '@/components/SearchBar';
import { ProductGridSkeleton } from '@/components/Loader';
import { Button } from '@/components/ui/button';
import api from '@/api/axios';

const fallbackCatalog: Product[] = [
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
  {
    _id: 'prod-5',
    name: 'Horizon Ultra 4K Smart Projector',
    price: 14999,
    discount: 10,
    category: 'Electronics',
    description: 'Crisp 3840x2160 resolution, built-in Harman Kardon acoustics and smart keystone alignment.',
    productImgUrls: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=700&h=700&fit=crop'],
  },
  {
    _id: 'prod-6',
    name: 'Artisan Full-Grain Leather Weekender',
    price: 4599,
    discount: 0,
    category: 'Fashion',
    description: 'Handcrafted durable weekender travel duffel with water-resistant nylon lining.',
    productImgUrls: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700&h=700&fit=crop'],
  },
  {
    _id: 'prod-7',
    name: 'Titanium Smart Fitness Tracker',
    price: 2999,
    discount: 15,
    category: 'Sports',
    description: 'Sleep analysis, 100m water resistance, continuous ECG heart rate monitoring.',
    productImgUrls: ['https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=700&h=700&fit=crop'],
  },
  {
    _id: 'prod-8',
    name: 'Ceramic Pour-Over Coffee Station',
    price: 1799,
    discount: 0,
    category: 'Home & Living',
    description: 'Heat-retaining matte ceramic dripper with precision goose-neck decanter stand.',
    productImgUrls: ['https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=700&h=700&fit=crop'],
  },
];

const categories = ['All', 'Electronics', 'Fashion', 'Home & Living', 'Sports'];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get('category') || 'All'
  );

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await api.get('/product');
        const raw = response.data?.payload || response.data;
        if (Array.isArray(raw) && raw.length > 0) {
          setProducts(raw);
        } else {
          setProducts(fallbackCatalog);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setProducts(fallbackCatalog);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.description &&
          product.description.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        selectedCategory === 'All' ||
        product.category?.toLowerCase() === selectedCategory.toLowerCase();

      return matchesSearch && matchesCategory;
    });

    if (sortBy === 'price-low') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [products, searchQuery, selectedCategory, sortBy]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="min-h-screen py-10 lg:py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-semibold uppercase tracking-wider text-primary mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Full Catalog
          </div>
          <h1 className="text-3xl md:text-5xl font-display font-bold mb-2">
            Explore All Products
          </h1>
          <p className="text-muted-foreground text-sm max-w-lg">
            Discover precision-engineered essentials, limited release editions, and luxury daily upgrades.
          </p>
        </motion.div>

        {/* Search, Categories and Sort Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 space-y-4 glass p-4 md:p-6 rounded-2xl border border-border/40 shadow-card"
        >
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            {/* Search */}
            <div className="w-full md:w-96">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search by product name, features..."
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 w-full md:w-auto justify-end">
              <ArrowUpDown className="w-4 h-4 text-muted-foreground shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-10 px-3 rounded-lg glass border border-border/60 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary bg-background/80"
              >
                <option value="featured">Featured / Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Alphabetical (A - Z)</option>
              </select>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-border/40">
            <span className="text-xs font-semibold text-muted-foreground mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Filter:
            </span>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'gradient' : 'outline'}
                size="sm"
                onClick={() => handleCategoryChange(category)}
                className="text-xs h-8 rounded-full transition-all"
              >
                {category}
              </Button>
            ))}

            {(searchQuery || selectedCategory !== 'All') && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchQuery('');
                  handleCategoryChange('All');
                }}
                className="text-xs h-8 text-destructive hover:text-destructive gap-1 ml-auto"
              >
                <X className="w-3.5 h-3.5" /> Clear Filters
              </Button>
            )}
          </div>
        </motion.div>

        {/* Results Counter */}
        <div className="flex justify-between items-center mb-6 text-xs text-muted-foreground font-medium">
          <p>
            {isLoading
              ? 'Loading collection...'
              : `Showing ${filteredProducts.length} items`}
          </p>
          {selectedCategory !== 'All' && (
            <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-semibold">
              Category: {selectedCategory}
            </span>
          )}
        </div>

        {/* Product Grid */}
        {isLoading ? (
          <ProductGridSkeleton />
        ) : filteredProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="glass inline-flex flex-col items-center p-10 rounded-3xl border border-border/40 shadow-card max-w-md">
              <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                <SlidersHorizontal className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold font-display mb-2">No items match your criteria</h3>
              <p className="text-xs text-muted-foreground mb-6">
                Try searching for different keywords or reset your category selection.
              </p>
              <Button
                variant="gradient"
                size="sm"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
              >
                Reset All Filters
              </Button>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product._id} product={product} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
