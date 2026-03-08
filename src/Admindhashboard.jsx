import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {

  const navigate = useNavigate();

  return (
    <div className="container-fluid min-vh-100 bg-light">

      {/* Navbar */}
      <nav className="navbar navbar-dark bg-success px-4">
        <span className="navbar-brand fw-bold">
          Admin Dashboard
        </span>

        <button
          className="btn btn-outline-light"
          onClick={() => navigate("/")}
        >
          Logout
        </button>
      </nav>


      <div className="row">

        {/* Sidebar */}
        <div className="col-md-3 bg-white shadow min-vh-100 p-3">

          <h5 className="text-success mb-4">
            Menu
          </h5>

          <button
            className="btn btn-outline-success w-100 mb-3"
            onClick={() => navigate("/admin/create")}
          >
            ➕ Create Notice
          </button>

          <button
            className="btn btn-outline-primary w-100 mb-3"
            onClick={() => navigate("/admin/view")}
          >
            📄 View Notices
          </button>
          <button
            className="btn btn-outline-primary w-100 mb-3"
            onClick={() => navigate("/admin/viewack")}
          >
            📄 Acknowledgements
          </button>

        </div>


        {/* Main Area */}
        <div className="col-md-9 p-4">

          <h3 className="mb-3">
            Welcome Admin 👋
          </h3>

          <p className="text-muted">
            Manage all notices from here.
          </p>

          <div className="row mt-4">

            {/* Cards */}
            <div className="col-md-4 mb-3">
              <div className="card shadow text-center p-3">
                <h5>Create Notice</h5>
                <p>Add new notices</p>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="card shadow text-center p-3">
                <h5>View Notices</h5>
                <p>Check all notices</p>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="card shadow text-center p-3">
                <h5>Manage</h5>
                <p>Edit / Delete notices</p>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
