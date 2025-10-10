import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import extendedMockProductsData from "./mocks";
import type { Product } from "./typeProducts";
import { useCartContext } from "../../hooks/useCartContext";

const fakeFetchProduct = (id: string): Promise<Product | undefined> => {
  const numericId = parseInt(id);

  const foundProduct = extendedMockProductsData.products.find(
    (p: Product) => p.id === numericId
  ) as Product | undefined;

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(foundProduct);
    }, 800);
  });
};

export default function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addItem } = useCartContext();

  const handleAddToCart = () => {
    if (product) {
      addItem(product);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  useEffect(() => {
    if (productId) {
      setLoading(true);

      fakeFetchProduct(productId)
        .then((data) => {
          setProduct(data || null);
        })
        .catch(() => {
          setProduct(null);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [productId]);

  if (loading) {
    return (
      <div className="p-10 text-center text-indigo-600 text-xl font-medium">
        Cargando detalles del producto... <span className="animate-pulse">⏰</span>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-10 text-center text-red-600 text-xl">
        Producto con ID "{productId}" no encontrado. 😔
      </div>
    );
  }

  const { name, price, description, imageUrl } = product;

  return (
    <div className="py-10 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
        <div className="flex flex-col items-center">
          <div className="w-full max-w-lg lg:max-w-none rounded-xl shadow-2xl overflow-hidden mb-6">
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-full object-cover aspect-square"
            />
          </div>
        </div>

        <div className="mt-10 lg:mt-0 lg:sticky lg:top-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            {name}
          </h1>
          <p className="text-3xl tracking-tight text-gray-900 mt-3">
            ${price.toFixed(2)}
          </p>
          <div className="mt-6">
            <h3 className="sr-only">Descripción</h3>
            <p className="text-gray-600 leading-relaxed">{description}</p>
          </div>
          <div className="mt-8 space-y-4">
            <button
              type="button"
              onClick={handleAddToCart}
              className={`w-full flex items-center justify-center gap-2 rounded-md border border-transparent px-8 py-3 text-base font-medium text-white transition-all duration-200 shadow-lg ${
                addedToCart
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {addedToCart ? (
                <>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  ¡Añadido al Carrito!
                </>
              ) : (
                "Añadir al Carrito"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
