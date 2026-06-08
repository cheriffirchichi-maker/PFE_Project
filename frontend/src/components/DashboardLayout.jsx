import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const DashboardLayout = () => {
  return (
    <div className="front-layout">
      <Navbar />
      <main className="front-content">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;