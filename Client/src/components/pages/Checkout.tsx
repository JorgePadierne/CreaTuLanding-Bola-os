import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../services/firebase";
import { useCartContext } from "../../hooks/useCartContext";
import { useForm } from "react-hook-form";

function Checkout() {
  const navigate = useNavigate();
  const { cart, totalPrice, clearCart } = useCartContext();
  const [submitting, setSubmitting] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (cart.length === 0 && !orderId) {
      navigate("/", { replace: true });
    }
  }, [cart.length, orderId, navigate]);

  const items = useMemo(
    () =>
      cart.map((item) => ({
        productId: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
      })),
    [cart]
  );

  type CheckoutForm = {
    firstName: string;
    lastName: string;
    address: string;
    email: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CheckoutForm>({ mode: "onChange" });

  const onSubmit = async (data: CheckoutForm) => {
    if (!isValid || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const order = {
        buyer: {
          firstName: data.firstName.trim(),
          lastName: data.lastName.trim(),
          address: data.address.trim(),
          email: data.email.trim(),
        },
        items,
        total: Number(totalPrice.toFixed(2)),
        createdAt: serverTimestamp(),
      };
      const ref = await addDoc(collection(db, "orders"), order);
      setOrderId(ref.id);
      clearCart();
    } catch {
      setError("Ocurrió un error al crear la orden. Intenta nuevamente.");
    } finally {
      setSubmitting(false);
    }
  };

  if (orderId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-md p-8 max-w-lg w-full text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            ¡Gracias por tu compra!
          </h1>
          <p className="text-gray-700 mb-4">
            Tu código de seguimiento es:
          </p>
          <p className="text-indigo-600 font-mono text-lg break-all mb-6">
            {orderId}
          </p>
          <button
            onClick={() => navigate("/", { replace: true })}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Datos del comprador
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre
            </label>
            <input
              type="text"
              {...register("firstName", { required: true, minLength: 2 })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Juan"
            />
            {errors.firstName && (
              <p className="text-sm text-red-600 mt-1">Ingresa un nombre válido.</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Apellidos
            </label>
            <input
              type="text"
              {...register("lastName", { required: true, minLength: 2 })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Pérez Gómez"
            />
            {errors.lastName && (
              <p className="text-sm text-red-600 mt-1">Ingresa apellidos válidos.</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dirección
            </label>
            <input
              type="text"
              {...register("address", { required: true, minLength: 5 })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Calle 123, Ciudad, País"
            />
            {errors.address && (
              <p className="text-sm text-red-600 mt-1">Ingresa una dirección válida.</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              {...register("email", {
                required: true,
                pattern: /.+@.+\..+/,
              })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="juan@example.com"
            />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">Ingresa un correo válido.</p>
            )}
          </div>

          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={!isValid || submitting}
              className={`w-full font-semibold py-3 rounded-lg transition-colors ${
                !isValid || submitting
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white"
              }`}
            >
              {submitting ? "Procesando..." : `Pagar $${totalPrice.toFixed(2)}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Checkout