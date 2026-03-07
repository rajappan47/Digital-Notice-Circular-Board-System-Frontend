import { Routes, Route } from "react-router-dom";

import Login from "./Login";
import Home from "./Home";
import AdminDashboard from "./Admindhashboard";
import CreateNotice from "./CreateNotice";
import ViewNotices from "./ViewNotice";
import UpdateNotice from "./UpdateNotices";
import StaffDashboard from "./StaffDashboard";

function App() {

  return (

    <Routes>

      <Route path="/" element={<Home />} />

      <Route path="/admin-login" element={<Login role="admin" />} />

      <Route path="/staff-login" element={<Login role="staff" />} />

      <Route path="/admindashboard" element={<AdminDashboard />} />

       <Route path="/staffdashboard" element={<StaffDashboard />} />
      <Route path="/admin/create" element={<CreateNotice />} />

      <Route path="/admin/view" element={<ViewNotices role="admin" />} />

      {/* ✅ FIXED */}
      <Route path="/admin/update/:id" element={<UpdateNotice />} />

    </Routes>

  );
}

export default App;
