import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import type { Product } from "../products/typeProducts";

interface NavInputProps {
  allProducts: Product[];
}

// -----------------------------------------------------------
// COMPONENTE PARA LA TARJETA DE RESULTADO INDIVIDUAL
// -----------------------------------------------------------
const SearchResultCard = ({ product }: { product: Product }) => (
  <Link
    // Usamos el ID para enlazar a la página de detalle
    to={`/product/${product.id}`}
    className="flex items-center p-3 hover:bg-indigo-50 transition duration-100 border-b border-gray-200 last:border-b-0"
  >
    {/* Usamos el placeholder si la URL de imagen no existe en el mock */}
    <img
      src={
        product.imageUrl || `https://placehold.co/40x40/f3f4f6/374151?text=IMG`
      }
      alt={product.name}
      className="size-10 object-cover rounded-md shadow-sm mr-3 flex-shrink-0"
    />
    <div className="flex-grow min-w-0">
      <p className="text-sm font-medium text-gray-800 truncate">
        {product.name}
      </p>
      <p className="text-xs text-indigo-600 font-semibold">
        ${product.price.toFixed(2)}
      </p>
    </div>
  </Link>
);

// -----------------------------------------------------------
// COMPONENTE PRINCIPAL
// -----------------------------------------------------------
function NavInput({ allProducts }: NavInputProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResults, setFilteredResults] = useState<Product[]>([]);
  const MAX_RESULTS = 5;

  // Lógica de filtrado
  useEffect(() => {
    if (searchTerm.length > 2) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();

      const results = allProducts
        .filter((product) =>
          product.name.toLowerCase().includes(lowerCaseSearchTerm)
        )
        .slice(0, MAX_RESULTS);

      setFilteredResults(results);
    } else {
      setFilteredResults([]);
    }
  }, [searchTerm, allProducts]);

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const showDropdown = searchTerm.length > 0 && filteredResults.length > 0;

  return (
    // 💡 1. Contenedor principal: Necesita 'relative' para posicionar el dropdown
    <div className="relative w-full max-w-xs md:max-w-md">
      {/* 💡 2. Input y Botón: Z-Index alto para que esté encima del menú */}
      <div className="relative z-20">
        <label htmlFor="Search" className="sr-only">
          Buscar
        </label>

        <input
          type="text"
          id="Search"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={inputHandler}
          // Aumentamos el ancho a 'w-full' para usar el espacio del contenedor
          className="py-1.5 pl-4 pr-10 w-full rounded-full border-gray-300 shadow-lg sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
        />

        <span className="absolute inset-y-0 right-0 grid w-10 place-content-center">
          <button
            type="button"
            aria-label="Submit search"
            className="rounded-full p-1 text-gray-400 hover:text-indigo-600 transition-colors"
          >
            <MagnifyingGlassIcon className="size-5" aria-hidden="true" />
          </button>
        </span>
      </div>

      {/* 💡 3. MENÚ DESPLEGABLE DE RESULTADOS (absolute y z-10) */}
      {showDropdown && (
        <div
          // Clases clave: absolute, top-full, w-full para cubrir el ancho del input
          className="absolute top-full mt-1 w-full max-h-80 overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-2xl z-10"
        >
          {filteredResults.map((product) => (
            <SearchResultCard key={product.id} product={product} />
          ))}

          {/* Mensaje de no resultados */}
          {filteredResults.length === 0 && (
            <p className="p-3 text-sm text-gray-500 text-center">
              No hay resultados.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default NavInput;
