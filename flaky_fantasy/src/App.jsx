import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import OrderConfirmation from "./pages/OrderConfirmation.jsx";
import { AppProvider } from "./context/AppContext.jsx";
import { AdminProvider } from "./context/AdminContext.jsx";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute.jsx";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/product-details" element={<ProductDetail />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/terms" element={<TermsConditions />} />
            <Route path="/Admin-login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <AdminProvider>
                  <ProtectedAdminRoute>
                    <AdminDashboard />
                  </ProtectedAdminRoute>
                </AdminProvider>
              }
            />
            <Route
              path="/admin/products"
              element={
                <AdminProvider>
                  <ProtectedAdminRoute>
                    <ProductList />
                  </ProtectedAdminRoute>
                </AdminProvider>
              }
            />
            <Route
              path="/admin/products/new"
              element={
                <AdminProvider>
                  <ProtectedAdminRoute>
                    <ProductForm />
                  </ProtectedAdminRoute>
                </AdminProvider>
              }
            />
            <Route
              path="/admin/products/edit/:id"
              element={
                <AdminProvider>
                  <ProtectedAdminRoute>
                    <ProductForm />
                  </ProtectedAdminRoute>
                </AdminProvider>
              }
            />
            <Route
              path="/admin/categories"
              element={
                <AdminProvider>
                  <ProtectedAdminRoute>
                    <CategoryList />
                  </ProtectedAdminRoute>
                </AdminProvider>
              }
            />
            <Route
              path="/admin/discounts"
              element={
                <AdminProvider>
                  <ProtectedAdminRoute>
                    <DiscountList />
                  </ProtectedAdminRoute>
                </AdminProvider>
              }
            />
            <Route
              path="/admin/services"
              element={
                <AdminProvider>
                  <ProtectedAdminRoute>
                    <ServiceList />
                  </ProtectedAdminRoute>
                </AdminProvider>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
