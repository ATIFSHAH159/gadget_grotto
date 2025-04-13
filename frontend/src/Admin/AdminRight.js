import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import AdminHome from "./AdminHome";
import AddProducts from "./AddProducts";
import ViewProducts from "./ViewProducts";
import Reviews from "./Reviews";

function AdminRight() {
  return (
    <Routes>
      <Route path="/" element={<AdminHome />} />
      <Route path="/AddProducts" element={<AddProducts />} />
      <Route path="/ViewProducts" element={<ViewProducts />} />
      <Route path="/Reviews" element={<Reviews/>} />
    </Routes>
  );
}
export default AdminRight;