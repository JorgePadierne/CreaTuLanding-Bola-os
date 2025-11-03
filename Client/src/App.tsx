import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Navbar from "./components/ui/NavBar";
import ProductDetail from "./components/products/ProductDetail";
import Cart from "./components/cart/Cart";
import NotFound from "./components/pages/NotFound";
import Products from "./components/pages/Products";
import { CartProvider } from "./context/CartContext";
import Checkout from "./components/pages/Checkout";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:type" element={<Products />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
