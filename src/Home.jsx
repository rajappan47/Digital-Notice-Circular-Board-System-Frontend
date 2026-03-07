import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-vh-100 bg-success bg-gradient d-flex flex-column">

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4">
        <div className="container-fluid">

          <span className="navbar-brand fw-bold text-success fs-4">
            Digital Notice Board
          </span>

          <span className="text-muted">
            Admin & Staff Portal
          </span>

        </div>
      </nav>


      {/* Main Section */}
      <div className="container flex-grow-1 d-flex align-items-center">

        <div className="row w-100 align-items-center">

          {/* Left */}
          <div className="col-md-6 text-white text-center text-md-start">

            <h1 className="fw-bold display-5">
              Welcome to <br /> Digital Notice System
            </h1>

            <p className="lead mt-3">
              Manage official notices and staff communications
              in one secure digital platform.
            </p>

            <div className="mt-4">

              <button
                className="btn btn-dark btn-lg me-3 mb-2"
                onClick={() => navigate("/admin-login")}
              >
                👨‍💼 Admin Login
              </button>

              <button
                className="btn btn-light btn-lg mb-2"
                onClick={() => navigate("/staff-login")}
              >
                👩‍💻 Staff Login
              </button>

            </div>

          </div>


          {/* Right Image */}
          <div className="col-md-6 text-center">

            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Office"
              className="img-fluid"
              style={{ maxHeight: "320px" }}
            />

          </div>

        </div>

      </div>


      {/* Footer */}
      <footer className="bg-white text-center py-2 text-muted small">
        © 2026 Digital Notice Board | All Rights Reserved
      </footer>

    </div>
  );
}
