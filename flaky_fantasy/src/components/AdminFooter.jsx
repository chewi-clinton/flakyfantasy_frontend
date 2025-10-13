import React from "react";

const AdminFooter = () => {
  return (
    <footer className="admin-footer">
      <div className="admin-footer-container">
        <div className="admin-footer-content">
          <p>
            &copy; {new Date().getFullYear()} Flaky Fantasy Admin Panel. All
            rights reserved.
          </p>
          <div className="admin-footer-links">
            <a href="/terms" target="_blank" rel="noopener noreferrer">
              Terms of Service
            </a>
            <a href="/terms" target="_blank" rel="noopener noreferrer">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AdminFooter;
