import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
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
import Toast from "./components/Toast.jsx";

const MainLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

const AdminLayout = () => {
  return (
    <AdminProvider>
      <Outlet />
    </AdminProvider>
  );
};

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="App">
          <Toast />
          <Routes>
            {/* Admin routes with AdminLayout */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route
                index
                element={
                  <ProtectedAdminRoute>
                    <AdminDashboard />
                  </ProtectedAdminRoute>
                }
              />
              <Route path="login" element={<AdminLogin />} />
              <Route
                path="products"
                element={
                  <ProtectedAdminRoute>
                    <ProductList />
                  </ProtectedAdminRoute>
                }
              />
              <Route
                path="products/new"
                element={
                  <ProtectedAdminRoute>
                    <ProductForm />
                  </ProtectedAdminRoute>
                }
              />
              <Route
                path="products/edit/:id"
                element={
                  <ProtectedAdminRoute>
                    <ProductForm />
                  </ProtectedAdminRoute>
                }
              />
              <Route
                path="categories"
                element={
                  <ProtectedAdminRoute>
                    <CategoryList />
                  </ProtectedAdminRoute>
                }
              />
              <Route
                path="discounts"
                element={
                  <ProtectedAdminRoute>
                    <DiscountList />
                  </ProtectedAdminRoute>
                }
              />
              <Route
                path="services"
                element={
                  <ProtectedAdminRoute>
                    <ServiceList />
                  </ProtectedAdminRoute>
                }
              />
            </Route>

            {/* Non-admin routes with MainLayout */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/product-details" element={<ProductDetail />} />
              <Route path="/cart" element={<CartPage />} />
              <Route
                path="/order-confirmation"
                element={<OrderConfirmation />}
              />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/terms" element={<TermsConditions />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
