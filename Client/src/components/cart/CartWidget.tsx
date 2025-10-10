import { Link } from "react-router-dom";
import Carrito from "../../assets/image/anadir-al-carrito.png";
import { Menu, MenuButton } from "@headlessui/react";
import { useCartContext } from "../../hooks/useCartContext";

function CartWidget() {
  const { totalItems } = useCartContext();

  return (
    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
      <Link to="/cart">
        <Menu as="div" className="relative ml-3">
          <MenuButton className="relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 hover:scale-110 transition-transform duration-200">
            <span className="absolute -inset-1.5" />
            <span className="sr-only">Carrito de compras</span>
            <img className="h-8 w-8" src={Carrito} alt="Carrito de Compras" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </MenuButton>
        </Menu>
      </Link>
    </div>
  );
}

export default CartWidget;
