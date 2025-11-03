import { useCartContext } from "../../hooks/useCartContext";
import { Link, useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const { cart, addItem, removeItem, removeProduct, clearCart, totalPrice, canCheckout } =
    useCartContext();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <svg
            className="mx-auto h-24 w-24 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Tu carrito está vacío
          </h2>
          <p className="mt-2 text-gray-600">
            ¡Agrega algunos productos para empezar!
          </p>
          <Link
            to="/"
            className="mt-6 inline-block px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Ir a la tienda
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Carrito de Compras
          </h1>
          <p className="mt-2 text-gray-600">
            {cart.length} {cart.length === 1 ? "producto" : "productos"} en tu
            carrito
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Lista de productos */}
          <div className="lg:col-span-8 space-y-4">
            {cart.map((item) => (
              <div
                key={item.product.id}
                className="bg-white rounded-lg shadow-md p-6 flex flex-col sm:flex-row gap-6"
              >
                {/* Imagen del producto */}
                <div className="flex-shrink-0">
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="w-full sm:w-32 h-32 object-cover rounded-lg"
                  />
                </div>

                {/* Información del producto */}
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {item.product.name}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                        {item.product.description}
                      </p>
                    </div>
                    <button
                      onClick={() => removeProduct(item.product.id)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                      aria-label="Eliminar producto"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Controles de cantidad y precio */}
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                        aria-label="Disminuir cantidad"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20 12H4"
                          />
                        </svg>
                      </button>
                      <span className="text-lg font-medium text-gray-900 w-8 text-center">
                        {item.product.stock !== 0
                          ? item.quantity
                          : "Este item no tiene stock"}
                      </span>
                      <button
                        onClick={() => addItem(item.product, 1)}
                        disabled={item.quantity >= item.product.stock}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                          item.quantity >= item.product.stock
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-indigo-600 hover:bg-indigo-700 text-white"
                        }`}
                        aria-label="Aumentar cantidad"
                        title={
                          item.quantity >= item.product.stock
                            ? "No hay más stock disponible"
                            : undefined
                        }
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-gray-900">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500">
                        ${item.product.price.toFixed(2)} c/u
                      </p>
                      {item.product.stock === 0 && (
                        <p className="text-sm text-red-600 mt-1">Sin stock</p>
                      )}
                      {item.quantity > item.product.stock && (
                        <p className="text-sm text-red-600 mt-1">
                          Cantidad supera el stock disponible
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Resumen del pedido */}
          <div className="lg:col-span-4 mt-8 lg:mt-0">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Resumen del Pedido
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Envío</span>
                  <span className="text-green-600">Gratis</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-xl font-bold text-gray-900">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <button
                disabled={!canCheckout}
                className={`w-full font-semibold py-3 rounded-lg transition-colors mb-3 flex items-center justify-center gap-2 ${
                  canCheckout
                    ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                title={!canCheckout ? "Revisa items sin stock o cantidad inválida" : undefined}
                onClick={() => canCheckout && navigate("/checkout")}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
                Proceder al Pago
              </button>

              {!canCheckout && (
                <p className="text-sm text-red-600 mb-3">
                  No puedes continuar: hay productos sin stock o cantidades que superan el stock.
                </p>
              )}

              <button
                onClick={clearCart}
                className="w-full bg-red-100 hover:bg-red-200 text-red-700 font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Vaciar Carrito
              </button>

              <Link
                to="/"
                className="mt-4 block text-center text-indigo-600 hover:text-indigo-800 font-medium"
              >
                ← Continuar comprando
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
