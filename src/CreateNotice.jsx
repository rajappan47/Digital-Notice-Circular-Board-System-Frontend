import { useState } from "react";
import axios from "axios";

export default function CreateNotice() {

  const [content, setContent] = useState("");
  const [comment, setComment] = useState("");
  const [file, setFile] = useState(null);

  const [departmentId, setDepartmentId] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);


  // Departments List
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


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage("❌ Please upload a file");
      return;
    }

    if (!expiryDate) {
      setMessage("❌ Please select expiry date");
      return;
    }

    setLoading(true);
    setMessage("");

    // Auto posting date
    const postingDate = new Date().toISOString().slice(0, 10);

    const formData = new FormData();

    formData.append("content", content);
   // formData.append("comment", comment);
    formData.append("notice_file", file);

    formData.append("department_id", departmentId);
    formData.append("posting_date", postingDate);
    formData.append("expiry_date", expiryDate);


    try {

      const res = await axios.post(
        "http://localhost:8080/admin/createnotice",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage("✅ Notice Created Successfully");
      alert(res.data);

      // Clear form
      setContent("");
      setComment("");
      setFile(null);
      setDepartmentId("");
      setExpiryDate("");

    } catch (error) {

      setMessage("❌ Failed to create notice");

    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="container mt-5 mb-5">

      <h3 className="mb-4 text-success text-center">
        Create New Notice
      </h3>


      <form
        onSubmit={handleSubmit}
        className="card p-4 shadow mx-auto"
        style={{ maxWidth: "600px" }}
      >

        {/* Content */}
        <div className="mb-3">
          <label className="form-label fw-bold">
            Notice Content / Comment / Remarks
          </label>

          <textarea
            className="form-control"
            rows="3"
            placeholder="Enter notice content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>


     


        {/* Department */}
        <div className="mb-3">
          <label className="form-label fw-bold">
            Select Department
          </label>

          <select
            className="form-select"
            value={departmentId}
            onChange={(e) => setDepartmentId(e.target.value)}
            required
          >
            <option value="">
              -- Select Department --
            </option>

            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>


        {/* File */}
        <div className="mb-3">
          <label className="form-label fw-bold">
            Upload Notice File (PDF)
          </label>

          <input
            type="file"
            className="form-control"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </div>


        {/* Expiry Date */}
        <div className="mb-3">
          <label className="form-label fw-bold">
            Expiry Date
          </label>

          <input
            type="date"
            className="form-control"
            value={expiryDate}
            min={new Date().toISOString().slice(0, 10)}
            onChange={(e) => setExpiryDate(e.target.value)}
            required
          />
        </div>


        {/* Button */}
        <button
          type="submit"
          className="btn btn-success w-100"
          disabled={loading}
        >

          {loading ? "Submitting..." : "Submit Notice"}

        </button>


        {/* Message */}
        {message && (
          <div className="alert alert-info text-center mt-3">
            {message}
          </div>
        )}

      </form>

    </div>
  );
}
