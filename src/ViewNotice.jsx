import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ViewNotices() {

  const [notices, setNotices] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    loadNotices();
  }, []);


  const loadNotices = () => {

    axios.get("http://localhost:8080/noticesbyall")
      .then(res => setNotices(res.data))
      .catch(err => console.log(err));
  };


  // Delete Notice
  const deleteNotice = async (id) => {

    if (!window.confirm("Are you sure?")) return;

    try {
      await axios.delete(
        `http://localhost:8080/notice/delete/${id}`
      );

      alert("Deleted Successfully");
      loadNotices();

    } catch {
      alert("Delete Failed");
    }
  };


  return (
    <div className="container mt-4">

      <h2 className="text-center text-success mb-4">
        Admin - Manage Notices
      </h2>


      <div className="row">

        {notices.map((n) => (

          <div
            className="col-md-4 mb-4"
            key={n.notice_id}
          >

            <div
              className="card shadow-lg border-0 h-100"
              style={{
                borderRadius: "15px",
                background: "linear-gradient(135deg,#f8fff8,#e0f5e9)"
              }}
            >

              <div className="card-body d-flex flex-column">

                {/* Header */}
                <div className="mb-2">

                  <span className="badge bg-success mb-2">
                    Dept #{n.department_id}
                  </span>

                  <h5 className="fw-bold text-dark">
                    Notice #{n.notice_id}
                  </h5>

                </div>


                {/* Content */}
                <p className="text-muted">
                  {n.content}
                </p>


                {/* Dates */}
                <small>
                  📅 Posted: {n.posting_date}
                </small>

                <small className="mb-2">
                  ⏳ Expiry: {n.expiry_date}
                </small>


                {/* File */}
                {n.notice_file && (

                  <a
                    href={`http://localhost:8080/notices/file/${n.notice_id}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline-success btn-sm mb-2"
                  >
                    📄 View File
                  </a>

                )}


                {/* Buttons */}
                <div className="mt-auto d-flex justify-content-between">

                  {/* Update */}
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() =>
                      navigate(`/admin/update/${n.notice_id}`)
                    }
                  >
                    ✏️ Edit
                  </button>


                  {/* Delete */}
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() =>
                      deleteNotice(n.notice_id)
                    }
                  >
                    🗑 Delete
                  </button>

                </div>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}
