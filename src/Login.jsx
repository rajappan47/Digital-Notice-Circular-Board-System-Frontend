import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login({ role }) {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    // API based on role
    const url =
      role === "admin"
        ? "http://localhost:8080/Admin/login"
        : "http://localhost:8080/staff/login";

   try {

  const response = await axios.post(url, {
    email,
    password,
  });

  if (response.data === "valid") {

    setMessage("✅ Login Successful");
    localStorage.setItem("role", role);

    if (role === "admin") {
      navigate("/admindashboard");
    } else {
      navigate("/staffdashboard");
    }

  } else {
    setMessage("❌ Invalid Email or Password");
  }

} catch (error)
 {

   if (error.response) {
    setMessage("❌ Invalid Email or Password");
  } else {
    setMessage("❌ Server not reachable");
  }

} finally {
  setLoading(false);
}
  };


  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">

      <div className="card shadow p-4" style={{ width: "360px" }}>

        <h3 className="text-center mb-2 text-success">
          {role === "admin" ? "Admin Login" : "Staff Login"}
        </h3>

        <p className="text-center text-muted mb-3">
          Please login to continue
        </p>


        <form onSubmit={handleSubmit}>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email</label>

            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>


          {/* Password */}
          <div className="mb-3">
            <label className="form-label">Password</label>

            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>


          {/* Button */}
          <button
            type="submit"
            className="btn btn-success w-100"
            disabled={loading}
          >

            {loading ? "Logging in..." : "Login"}

          </button>

        </form>


        {/* Message */}
        {message && (
          <div className="alert alert-info text-center mt-3 p-2">
            {message}
          </div>
        )}

      </div>

    </div>
  );
}
