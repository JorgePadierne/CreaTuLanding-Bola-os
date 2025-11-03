import Cards from "../ui/Cards";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import type { Product } from "./typeProducts";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../services/firebase";

interface ItemListContainerProps {
  cantidad?: number;
}

export default function ItemListContainer({
  cantidad = 0,
}: ItemListContainerProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { type } = useParams<{ type: string }>();

  useEffect(() => {
    setLoading(true);
    const shouldFilter = Boolean(type && type.toLowerCase() !== "all");
    const baseCollection = collection(db, "products");
    const prodCollection = shouldFilter
      ? query(baseCollection, where("category", "==", String(type)))
      : baseCollection;

    getDocs(prodCollection)
      .then((data) => {
        const dataProducts = data.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Product, "id">),
        }));
        setProducts(dataProducts as Product[]);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [type]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40 text-xl font-medium">
        Cargando productos... ⏳
      </div>
    );
  }

  const displayedProducts = cantidad ? products.slice(0, cantidad) : products;

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayedProducts.map((product: Product) => (
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
