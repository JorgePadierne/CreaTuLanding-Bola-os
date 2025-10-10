import Cards from "../ui/Cards";
import mockProductsData from "./mocks";
import { useState, useEffect } from "react";
import type { Product } from "./typeProducts";

interface ItemListContainerProps {
  cantidad?: number;
  category?: string;
}

const fakeFetchProducts = (): Promise<Product[]> => {
  return new Promise((resolve) => {
    const delay = Math.random() * 1000 + 1000;

    setTimeout(() => {
      resolve(mockProductsData.products as Product[]);
    }, delay);
  });
};

export default function ItemListContainer({
  cantidad = 0,
  category = "All",
}: ItemListContainerProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fakeFetchProducts()
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40 text-xl font-medium">
        Cargando productos... ⏳
      </div>
    );
  }

  const filteredByCategory =
    category && category !== "All"
      ? products.filter((product) => product.category === category)
      : products;

  const productsToDisplay =
    cantidad && cantidad > 0
      ? filteredByCategory.slice(0, cantidad)
      : filteredByCategory;

  if (productsToDisplay.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No se encontraron productos en esta categoría.
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productsToDisplay.map((product: Product) => (
          <div key={product.id} className="flex justify-center">
            <Cards
              productId={product.id}
              productName={product.name}
              price={product.price}
              img={product.imageUrl}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
