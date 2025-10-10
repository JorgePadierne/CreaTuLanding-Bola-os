import { Link } from "react-router-dom";

type Props = {
  productId?: number;
  img: string;
  productName: string;
  price: number;
};

function Cards({ img, productName, price, productId }: Props) {
  return (
    <Link
      to={`/product/${productId}`}
      className="group relative block overflow-hidden max-w-2xs min-h-140 rounded-lg border border-gray-100 bg-white shadow-md hocer:shadow-xl transition-shadow m-4"
    >
      <button className="absolute end-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75">
        <span className="sr-only">Wishlist</span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>
      </button>

      <img
        src={img}
        alt=""
        className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
      />

      <div className="relative border border-gray-100 bg-white p-6">
        <span className="bg-indigo-600 px-3 py-1.5 text-xs font-medium whitespace-nowrap text-white">
          {" "}
          New{" "}
        </span>

        <h3 className="mt-4 text-lg font-medium text-gray-900">
          {productName}
        </h3>

        <p className="mt-1.5 text-sm text-gray-700">${price}</p>

        <form className="mt-4">
          <button className="block w-full rounded-sm bg-indigo-600 p-4 text-sm text-white font-medium transition hover:scale-105 focus:scale-95">
            Add to Cart
          </button>
        </form>
      </div>
    </Link>
  );
}

export default Cards;
