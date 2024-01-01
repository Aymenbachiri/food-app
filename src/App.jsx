import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import CartRoute from "./Routes/CartRoute";
import ScrollToTop from "./components/ScrollToTop";
import Register from "./Routes/Register";
import Signin from "./components/Signin";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<CartRoute />} />
        <Route path="/register" element={<Register />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </>
  );
}

export default App;
