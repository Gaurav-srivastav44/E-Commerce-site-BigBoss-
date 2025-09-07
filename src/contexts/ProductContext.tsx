import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  createdAt: Date;
}

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProduct: (id: string) => Product | undefined;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}

const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Executive Black Suit',
    description: 'Premium wool blend suit perfect for business meetings and formal events. Tailored fit with modern styling.',
    price: 2499,
    category: 'Suits',
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: new Date()
  },
  {
    id: '2',
    name: 'Classic Navy Blazer',
    description: 'Versatile navy blazer that pairs perfectly with dress pants or jeans. Essential for any gentleman\'s wardrobe.',
    price: 1299,
    category: 'Blazers',
    image: 'https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: new Date()
  },
  {
    id: '3',
    name: 'Crisp White Dress Shirt',
    description: 'Premium cotton dress shirt with French cuffs. Perfect for formal occasions and business wear.',
    price: 899,
    category: 'Shirts',
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: new Date()
  },
  {
    id: '4',
    name: 'Italian Leather Shoes',
    description: 'Handcrafted Italian leather dress shoes with classic Oxford styling. The perfect finishing touch.',
    price: 3999,
    category: 'Shoes',
    image: 'https://images.pexels.com/photos/292999/pexels-photo-292999.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: new Date()
  },
  {
    id: '5',
    name: 'Silk Designer Tie',
    description: 'Luxurious silk tie with subtle pattern. Adds elegance to any formal outfit.',
    price: 599,
    category: 'Accessories',
    image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: new Date()
  },
  {
    id: '6',
    name: 'Charcoal Grey Trousers',
    description: 'Tailored wool trousers with perfect drape. Essential for building a sophisticated wardrobe.',
    price: 1199,
    category: 'Trousers',
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: new Date()
  }
];

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const storedProducts = localStorage.getItem('bigBossProducts');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts).map((p: any) => ({
        ...p,
        createdAt: new Date(p.createdAt)
      })));
    } else {
      setProducts(initialProducts);
    }
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem('bigBossProducts', JSON.stringify(products));
    }
  }, [products]);

  const addProduct = (productData: Omit<Product, 'id' | 'createdAt'>) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    setProducts(prev => [newProduct, ...prev]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev =>
      prev.map(product =>
        product.id === id ? { ...product, ...updates } : product
      )
    );
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  const getProduct = (id: string) => {
    return products.find(product => product.id === id);
  };

  return (
    <ProductContext.Provider value={{
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      getProduct
    }}>
      {children}
    </ProductContext.Provider>
  );
}