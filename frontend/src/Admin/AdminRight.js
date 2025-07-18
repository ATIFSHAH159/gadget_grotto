import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import AdminHome from "./AdminHome";
import AddProducts from "./AddProducts";
import ViewProducts from "./ViewProducts";
import Reviews from "./Reviews";
import AdminOrders from "./AdminOrders";
import AdminReports from "./AdminReports";
import ManageUsers from "./ManageUsers";

function AdminRight() {
  return (
    <Routes>
      <Route path="/" element={<AdminHome />} />
      <Route path="/AddProducts" element={<AddProducts />} />
      <Route path="/ViewProducts" element={<ViewProducts />} />
      <Route path="/Reviews" element={<Reviews/>} />
      <Route path="/orders" element={<AdminOrders />} />
      <Route path="/reports" element={<AdminReports />} />
      <Route path="/users" element={<ManageUsers />} />
    </Routes>
  );
}
export default AdminRight;