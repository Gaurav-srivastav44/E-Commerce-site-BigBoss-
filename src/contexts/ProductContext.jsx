import React, { createContext, useContext, useState, useEffect } from "react";

// Create context
const ProductContext = createContext(undefined);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Shirts 1–50
    const shirts = Array.from({ length: 50 }).map((_, i) => ({
      id: `shirt-${i + 1}`,
      name: `Shirt ${i + 1}`,
      category: "Shirt",
      price: 550,
      description: "Premium shirt from local collection.",
      createdAt: new Date().toISOString(),
      image: new URL(`../images/${i + 1}.jpg`, import.meta.url).href,
    }));

    // Pants a–h
    const pantLetters = ["a", "b", "c", "d", "e", "f", "g", "h"];
    const pants = pantLetters.map((letter, i) => ({
      id: `pant-${letter}`,
      name: `Pant ${letter.toUpperCase()}`,
      category: "Pant",
      price: 750,
      description: "Comfortable pant from local collection.",
      createdAt: new Date().toISOString(),
      image: new URL(`../images/${letter}.jpg`, import.meta.url).href,
    }));

    setProducts([...shirts, ...pants]);
  }, []);

  const addProduct = (productData) =>
    setProducts((prev) => [
      { ...productData, id: `local-${Date.now()}` },
      ...prev,
    ]);

  const updateProduct = (id, updates) =>
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, ...updates } : product
      )
    );

  const deleteProduct = (id) =>
    setProducts((prev) => prev.filter((product) => product.id !== id));

  const getProduct = (id) => products.find((p) => p.id === id);

  return (
    <ProductContext.Provider
      value={{ products, addProduct, updateProduct, deleteProduct, getProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// ✅ Hook for accessing products
export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};
