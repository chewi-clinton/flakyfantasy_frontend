import React from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";
import AdminFooter from "../components/AdminFooter";

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <AdminHeader />
      <main className="admin-main-content">
        <Outlet />
      </main>
      <AdminFooter />
    </div>
  );
};

export default AdminLayout;
