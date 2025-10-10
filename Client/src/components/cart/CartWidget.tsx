import { Link } from "react-router-dom";
import Carrito from "../../assets/image/anadir-al-carrito.png";
import { Menu, MenuButton } from "@headlessui/react";
function CartWidget() {
  return (
    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
      <Link to="/cart">
        <Menu as="div" className="relative ml-3">
          <MenuButton className="relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 hover:scale-110 transition-transform duration-200">
            <span className="absolute -inset-1.5" />
            <span className="sr-only">Open user menu</span>
            <img className="h-8 w-8" src={Carrito} alt="Carrito de Compras" />
          </MenuButton>
        </Menu>
      </Link>
    </div>
  );
}

export default CartWidget;
