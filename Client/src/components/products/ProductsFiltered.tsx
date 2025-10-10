import { ChevronDownIcon } from "@heroicons/react/24/solid";
import extendedMockProductsData from "../products/mocks";
import type { Product } from "../products/typeProducts";

const getUniqueCategories = (products: Product[]): string[] => {
  const categories = products.map((product) => product.category);
  return ["All", ...Array.from(new Set(categories))];
};

interface ProductFiltersProps {
  onCategoryChange: (category: string) => void;
}

function ProductFilters({ onCategoryChange }: ProductFiltersProps) {
  const uniqueCategories = getUniqueCategories(
    extendedMockProductsData.products as Product[]
  );

  // Función para manejar la selección
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onCategoryChange(event.target.value);
  };

  return (
    <div className="flex justify-start items-center py-6 px-4">
      {/* Contenedor relativo para posicionar el icono de chevron */}
      <div className="relative inline-block text-left">
        <label htmlFor="filtros" className="sr-only">
          Filtrar por Categoría
        </label>

        <select
          name="filtros"
          id="filtros"
          onChange={handleChange}
          className="
            appearance-none 
            bg-white 
            border border-gray-300 
            text-gray-700 
            py-2 pl-4 pr-10
            rounded-full 
            shadow-md 
            font-medium 
            hover:border-indigo-600 
            focus:outline-none 
            focus:ring-2 
            focus:ring-indigo-500 
            transition duration-150
            cursor-pointer
          "
        >
          {uniqueCategories.map((category: string) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <ChevronDownIcon className="size-5" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

export default ProductFilters;
