import { useState } from "react";
import axios from "axios";

export default function AdminAcknowledgement() {

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
    { id: 10, name: "IT & E-Governance" }
  ];

  const [deptId, setDeptId] = useState("");
  const [ackList, setAckList] = useState([]);

  const handleDepartmentChange = async (e) => {

    const selectedDept = e.target.value;
    setDeptId(selectedDept);

    if (!selectedDept) return;

    try {

      const response = await axios.get(
        `http://localhost:8080/admin/acknowledgement/${selectedDept}`
      );

      setAckList(response.data);

    } catch (error) {

      console.error("Error fetching acknowledgement data", error);

    }

  };

  return (

    <div className="container mt-4">

      <h3 className="text-center mb-4">
        Department Acknowledgement Report
      </h3>

      {/* Department Dropdown */}

      <div className="mb-3">

        <label className="form-label">
          Select Department
        </label>

        <select
          className="form-control"
          value={deptId}
          onChange={handleDepartmentChange}
        >

          <option value="">-- Select Department --</option>

          {departments.map((dept) => (

            <option key={dept.id} value={dept.id}>
              {dept.name}
            </option>

          ))}

        </select>

      </div>

      {/* Acknowledgement Table */}

      <table className="table table-bordered table-striped">

        <thead className="table-dark">

          <tr>
            <th>Staff Name</th>
            <th>Email</th>
            <th>Notice Content</th>
            <th>Status</th>
          </tr>

        </thead>

        <tbody>

          {ackList.length === 0 ? (

            <tr>
              <td colSpan="4" className="text-center">
                No acknowledgements found
              </td>
            </tr>

          ) : (

            ackList.map((row, index) => (

              <tr key={index}>

                <td>{row[0]}</td>
                <td>{row[1]}</td>
                <td>{row[2]}</td>
                <td>
                  {row[3] ? (
                    <span className="badge bg-success">
                      Acknowledged
                    </span>
                  ) : (
                    <span className="badge bg-danger">
                      Pending
                    </span>
                  )}
                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>

  );

}