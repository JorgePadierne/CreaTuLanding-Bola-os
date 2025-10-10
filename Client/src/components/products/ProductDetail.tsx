import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import extendedMockProductsData from "./mocks";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}
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

  useEffect(() => {
    if (productId) {
      setLoading(true);

      fakeFetchProduct(productId)
        .then((data) => {
          setProduct(data || null);
        })
        .catch((error) => {
          console.error("Error al buscar el producto:", error);
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
        Cargando detalles del producto... ⏳
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
          <div className="mt-8">
            <button
              type="button"
              className="w-full flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 transition duration-200 shadow-lg"
            >
              Añadir al Carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
