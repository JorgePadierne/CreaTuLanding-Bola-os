import ItemListContainer from "../products/ItemListContainer";
import ProductFilters from "../products/ProductsFiltered";
import { useState } from "react";

function Categories() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <>
      <ProductFilters onCategoryChange={setSelectedCategory} />

      <ItemListContainer category={selectedCategory} />
    </>
  );
}

export default Categories;
