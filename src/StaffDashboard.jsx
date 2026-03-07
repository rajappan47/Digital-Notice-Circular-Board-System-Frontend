import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


// Department List
const departments = [
  { id: 1, name: "Administration" },
  { id: 2, name: "Revenue" },
  { id: 3, name: "Accounts & Finance" },
  { id: 4, name: "Human Resources" },
  { id: 5, name: "Engineering / Public Works" },
  { id: 6, name: "Water Supply" },
  { id: 7, name: "Solid Waste Management" },
  { id: 8, name: "Health & Sanitation" },
  { id: 9, name: "Town Planning" },
  { id: 10, name: "IT & E-Governance" },
];

export default function StaffDashboard() {

  const [notices, setNotices] = useState([]);
  const [selectedDept, setSelectedDept] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    loadNotices();
  }, []);


  const loadNotices = () => {

    axios.get("http://localhost:8080/noticesbyall")
      .then(res => setNotices(res.data))
      .catch(err => console.log(err));
  };


  // Filter Notices
  const filteredNotices = selectedDept
    ? notices.filter(n => n.department_id === parseInt(selectedDept))
    : notices;


  return (
    <div className="container-fluid min-vh-100 bg-light">

      {/* Navbar */}
      <nav className="navbar navbar-dark bg-primary px-4">
        <span className="navbar-brand fw-bold">
          Staff Dashboard
        </span>

        <button
          className="btn btn-outline-light"
          onClick={() => navigate("/")}
        >
          Logout
        </button>
      </nav>


      <div className="container mt-4">

        <h3 className="text-primary mb-3">
          📢 Available Notices
        </h3>


        {/* Department Filter */}
        <div className="mb-4 col-md-4">

          <label className="form-label fw-bold">
            Filter by Department
          </label>

          <select
            className="form-select"
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
          >

            <option value="">All Departments</option>

            {departments.map(dep => (
              <option key={dep.id} value={dep.id}>
                {dep.name}
              </option>
            ))}

          </select>

        </div>


        {/* Notice Cards */}
        <div className="row">

          {filteredNotices.map((n) => (

            <div className="col-md-4 mb-4" key={n.notice_id}>

              <div className="card shadow h-100 border-0">

                <div className="card-body d-flex flex-column">

                  <span className="badge bg-primary mb-2">
                    Dept #{n.department_id}
                  </span>

                  <h5 className="fw-bold">
                    Notice #{n.notice_id}
                  </h5>

                  <p className="text-muted">
                    {n.content}
                  </p>

                  <small>
                    📅 Posted: {n.posting_date}
                  </small>

                  <small className="mb-2">
                    ⏳ Expiry: {n.expiry_date}
                  </small>


                  {/* View File */}
                  {n.notice_file && (
                    <a
                      href={`http://localhost:8080/notices/file/${n.notice_id}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-outline-primary btn-sm mt-2"
                    >
                      📄 View File
                    </a>
                  )}

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}