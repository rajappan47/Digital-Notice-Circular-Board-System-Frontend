import { useEffect, useState } from "react";
import axios from "axios";

export default function StaffDashboard() {

  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  // get logged-in user
  const user = JSON.parse(localStorage.getItem("user"));

  // safety check
  if (!user) {
    return <h3>User not logged in</h3>;
  }

  const departmentId = user.department_id;
  const userId = user.id;

  // load notices once
  useEffect(() => {

    const fetchNotices = async () => {

      try {

        const response = await axios.get(
          `http://localhost:8080/notices/department/${departmentId}`
        );

        setNotices(response.data);

      } catch (error) {

        console.error("Error loading notices", error);

      } finally {

        setLoading(false);

      }

    };

    if (departmentId) {
      fetchNotices();
    }

  }, [departmentId]);



  // acknowledge notice
  const acknowledgeNotice = async (noticeId) => {

    try {

      const response = await axios.post(
        "http://localhost:8080/notice/acknowledge",
        null,
        {
          params: {
            notice_id: noticeId,
            user_id: userId
          }
        }
      );

      alert(response.data);

    } catch (error) {

      console.error("Error acknowledging notice", error);
      alert("Failed to acknowledge notice");

    }

  };


  if (loading) {
    return <h3 className="text-center mt-4">Loading notices...</h3>;
  }


  return (

    <div className="container mt-4">

      <h2 className="mb-4 text-primary">Department Notices</h2>

      {notices.length === 0 ? (

        <div className="alert alert-warning">
          No notices available
        </div>

      ) : (

        <div className="row">

          {notices.map((notice) => (

            <div className="col-md-4 mb-4" key={notice.notice_id}>

              <div className="card shadow">

                <div className="card-body">

                  <h5 className="card-title">
                    Notice #{notice.notice_id}
                  </h5>

                  <p>{notice.content}</p>

                  <p className="text-muted">
                    Posting Date: {notice.posting_date}
                  </p>

                  <p className="text-muted">
                    Expiry Date: {notice.expiry_date}
                  </p>

                  {notice.notice_file && (

                    <a
                      href={`http://localhost:8080/notices/file/${notice.notice_id}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-outline-primary btn-sm me-2"
                    >
                      View File
                    </a>

                  )}

                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => acknowledgeNotice(notice.notice_id)}
                  >
                    Acknowledge
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );

}