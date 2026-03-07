import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";


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


function UpdateNotice() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [content, setContent] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [postingDate, setPostingDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [file, setFile] = useState(null);


  // Load Notice
  useEffect(() => {

    fetch(`http://localhost:8080/notice/${id}`)
      .then(res => res.json())
      .then(data => {

        setContent(data.content);
        setDepartmentId(data.department_id);
        setPostingDate(data.posting_date);
        setExpiryDate(data.expiry_date);

      });

  }, [id]);


  // Update
  const handleUpdate = (e) => {

    e.preventDefault();

    const formData = new FormData();

   
    formData.append("content", content);

    formData.append("department_id", departmentId);   

   

    if (file) {
      formData.append("notice_file", file);            
    }


    fetch(`http://localhost:8080/notice/update/${id}`, {
      method: "PUT",
      body: formData
    })
      .then(res => res.text())
      .then(msg => {

        alert(msg);
        navigate("/");

      })
      .catch(err => {
        console.error(err);
        alert("Update Failed");
      });

  };


  return (
    <div className="container mt-4">

      <div className="card shadow">

        <div className="card-header bg-warning text-dark fw-bold">
          Update Notice
        </div>


        <div className="card-body">

          <form onSubmit={handleUpdate}>


            {/* Content */}
            <div className="mb-3">

              <label className="form-label">Content</label>

              <input
                type="text"
                className="form-control"
                value={content}
                onChange={e => setContent(e.target.value)}
                required
              />

            </div>


            {/* Department */}
            <div className="mb-3">

              <label className="form-label">Department</label>

              <select
                className="form-select"
                value={departmentId}
                onChange={e => setDepartmentId(e.target.value)}
                required
              >

                <option value="">-- Select Department --</option>

                {departments.map(dep => (

                  <option key={dep.id} value={dep.id}>
                    {dep.name}
                  </option>

                ))}

              </select>

            </div>


            {/* Posting Date (Display Only) */}
            <div className="mb-3">

              <label className="form-label">Posting Date</label>

              <input
                type="date"
                className="form-control"
                value={postingDate}
                disabled   // 🔥 READ ONLY
              />

            </div>


            {/* Expiry Date */}
            <div className="mb-3">

              <label className="form-label">Expiry Date</label>

              <input
                type="date"
                className="form-control"
                value={expiryDate}
                onChange={e => setExpiryDate(e.target.value)}
                required
              />

            </div>


            {/* File */}
            <div className="mb-3">

              <label className="form-label">
                Change File (Optional)
              </label>

              <input
                type="file"
                className="form-control"
                onChange={e => setFile(e.target.files[0])}
              />

            </div>


            {/* Buttons */}
            <div className="d-flex justify-content-between">

              <button className="btn btn-warning">
                Update
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/")}
              >
                Cancel
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
}

export default UpdateNotice;
