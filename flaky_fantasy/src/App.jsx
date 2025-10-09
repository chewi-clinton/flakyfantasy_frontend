// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import HomePage from "./components/Home.jsx";
import ShopPage from "./pages/Shop.jsx";
import CartPage from "./pages/Cart.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import Services from "./pages/Services.jsx";
import TermsConditions from "./pages/TermsandPrivacy.jsx";
import AdminLogin from "./Admin/AdminLogin.jsx";
import AdminDashboard from "./Admin/AdminDashboard.jsx";
import ProductList from "./Admin/ProductList.jsx";
import ProductForm from "./Admin/ProductForm.jsx";
import CategoryList from "./Admin/CategoryList.jsx";
import DiscountList from "./Admin/DiscountList.jsx";
import ServiceList from "./Admin/ServiceList.jsx";
import ProductDetail from "./pages/Product_details.jsx";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product-details" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/terms" element={<TermsConditions />} />
          <Route path="/Admin-login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<ProductList />} />
          <Route path="/admin/products/new" element={<ProductForm />} />
          <Route path="/admin/products/edit/:id" element={<ProductForm />} />
          <Route path="/admin/categories" element={<CategoryList />} />
          <Route path="/admin/discounts" element={<DiscountList />} />
          <Route path="/admin/services" element={<ServiceList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
