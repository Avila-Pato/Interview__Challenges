"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import api from "./api";
import { Product } from "./type";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  
  // Flag para saber si ya estamos en el cliente (post-hidratación)
  const [isMounted, setIsMounted] = useState(false);

  // 1. Cargar productos de la API
  useEffect(() => {
    api.list().then(setProducts);
  }, []);

  // 2. Leer localStorage ÚNICAMENTE después de que el componente se montó en el cliente
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCart(JSON.parse(storedCart));
      } catch (e) {
        console.error("Error al parsear el carrito", e);
      }
    }
    setIsMounted(true); // Marcamos que ya se hidrató correctamente
  }, []);

  // 3. Guardar en localStorage solo cuando el carrito cambie Y ya hayamos montado
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, isMounted]);

  const toggleCartProduct = (product: Product) => {
    setCart((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const isInCart = (id: number) => cart.some((p) => p.id === id);
  const totalPrice = cart.reduce((total, p) => total + p.price, 0);

  return (
    <div className="bg-[#f5f5f5] min-h-screen font-sans antialiased">
      <main className="max-w-6xl min-h-screen mx-auto bg-white shadow-sm flex flex-col justify-between">
        
        {/* Header */}
        <header className="p-4 border-b border-[#dcdcdc] font-bold text-2xl">
          Estampitiency
        </header>

        {/* Grid de Productos */}
        <section className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 flex-grow">
          {products.map((product) => {
            const inCart = isInCart(product.id);

            return (
              <article key={product.id} className="flex flex-col gap-4 border border-gray-100 p-4 rounded-lg shadow-xs">
                <div className="relative w-full h-64">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                
                <div className="flex flex-col gap-2 h-full justify-between">
                  <div>
                    <p className="font-medium text-xl leading-snug">{product.title}</p>
                    <p className="text-gray-500 text-sm mt-1">{product.description}</p>
                  </div>

                  <div className="flex flex-col gap-3 mt-4">
                    <p className="text-lg font-bold text-gray-900">$ {product.price.toLocaleString()}</p>
                    <button
                      onClick={() => toggleCartProduct(product)}
                      className={`w-full py-3 rounded-md px-4 text-base font-medium transition-colors cursor-pointer ${
                        inCart
                          ? "bg-red-500 hover:bg-red-600 text-white"
                          : "bg-[#1e90ff] hover:bg-blue-600 text-white"
                      }`}
                    >
                      {inCart ? "Quitar del carrito" : "Agregar al carrito"}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        {/* Sticky Cart Badge (Solo renderiza el contador real si ya hidrató) */}
        <aside className="sticky bottom-4 mx-auto pb-4 z-10">
          <button className="text-white bg-[#1e90ff] border-none py-3 rounded-full px-6 text-lg font-medium cursor-pointer shadow-lg hover:bg-blue-600 transition-all flex items-center gap-2">
            <span>🛒 {isMounted ? cart.length : 0} {cart.length === 1 ? "producto" : "productos"}</span>
            <span className="opacity-40">|</span>
            <span>$ {isMounted ? totalPrice.toLocaleString() : 0}</span>
          </button>
        </aside>

      </main>
    </div>
  );
}

export default App;