import AdminSidebar from "./AdminLeft";
import AdminRight from "./AdminRight";
import '../Admin/Assets/AdminPanel.css';

function AdminPanel() {
  return (
    <div className="Adminpanel">
      <div className="AdminSidebar">
        <AdminSidebar />
      </div>
      <div className="AdminRight">
        <AdminRight />
      </div>
    </div>
  );
}

export default AdminPanel;
