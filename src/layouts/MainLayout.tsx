import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50">

      {/* Sidebar */}
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main */}
      <div className="flex flex-1 flex-col lg:ml-64">

        {/* Navbar */}
        <Navbar onMenuClick={() => setSidebarOpen(true)} />

        {/* Page Content */}
        <main className="p-4 sm:p-6">
          <div className="mx-auto max-w-6xl">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
}