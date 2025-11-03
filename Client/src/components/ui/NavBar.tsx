import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import CartWidget from "../cart/CartWidget";
import { NavLink } from "react-router-dom";
import NavInput from "./NavInput";
import { useEffect, useState } from "react";
import type { Product } from "../products/typeProducts";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/firebase";

interface NavItem {
  name: string;
  href: string;
}

const navigation: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "Productos", href: "/products/all" },
];

function classNames(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

function NavBar() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  useEffect(() => {
    getDocs(collection(db, "products")).then((snapshot) => {
      const products = snapshot.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<Product, "id">),
      })) as Product[];
      setAllProducts(products);
    });
  }, []);

  return (
    <Disclosure as="nav" className="relative bg-white py-3 shadow-md">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Botón de Menú Móvil */}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 focus:outline-2 focus:outline-indigo-500">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block size-6 group-data-open:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-open:block"
              />
            </DisclosureButton>
          </div>

          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-between">
            {/* Logo */}
            <div
              className="flex shrink-0 items-center text-3xl text-indigo-600 font-extrabold 
                                drop-shadow-lg 
                                drop-shadow-indigo-500/70"
            >
              TuTienda
            </div>

            {/* Navegación y Búsqueda (Escritorio) */}
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <div className="flex space-x-4 items-center">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }: { isActive: boolean }) =>
                      classNames(
                        isActive
                          ? "bg-indigo-600 text-white"
                          : "text-gray-700 hover:bg-gray-100 hover:text-black",
                        "rounded-md px-3 py-2 font-medium text-lg transition duration-150"
                      )
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
                {/* 💡 Integración del NavInput con los productos */}
                <NavInput allProducts={allProducts} />
              </div>
            </div>
          </div>

          {/* CartWidget */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <CartWidget />
          </div>
        </div>
      </div>

      {/* Panel de Disclosure (Menú Móvil) */}
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {/* En móvil, la búsqueda debe estar antes de los enlaces */}
          <div className="mb-3">
            <NavInput allProducts={allProducts} />
          </div>
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as={NavLink}
              to={item.href}
              className={({ isActive }: { isActive: boolean }) =>
                classNames(
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "text-gray-700 hover:bg-gray-100 hover:text-black",
                  "block rounded-md px-3 py-2 text-base font-medium transition duration-150"
                )
              }
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}

export default NavBar;
