import { useEffect, useState } from "react";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [course, setCourse] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchStudents = () => {
    fetch("http://127.0.0.1:8000/api/students/")
      .then((res) => res.json())
      .then((data) => setStudents(data));
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const addStudent = async () => {
    await fetch("http://127.0.0.1:8000/api/students/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        course,
      }),
    });

    setName("");
    setEmail("");
    setPhone("");
    setCourse("");
    fetchStudents();
  };

  const deleteStudent = async (id) => {
    await fetch(`http://127.0.0.1:8000/api/students/${id}/`, {
      method: "DELETE",
    });

    fetchStudents();
  };

  const editStudent = (student) => {
    setEditId(student.id);
    setName(student.name);
    setEmail(student.email);
    setPhone(student.phone);
    setCourse(student.course);
  }  

  const updateStudent = async () => {
  await fetch(`http://127.0.0.1:8000/api/students/${editId}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      phone,
      course,
    }),
  });

  setEditId(null);
  setName("");
  setEmail("");
  setPhone("");
  setCourse("");

  fetchStudents();
  };

  

  return (<div className="container mt-5">
  <div className="card shadow p-4">
    <h1 className="text-center mb-4">Student Management System</h1>

    <div className="row">
      <div className="col-md-3">
        <input
          type="text"
          className="form-control"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="col-md-3">
        <input
          type="email"
          className="form-control"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="col-md-3">
        <input
          type="text"
          className="form-control"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <div className="col-md-3">
        <input
          type="text"
          className="form-control"
          placeholder="Course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        />
      </div>
    </div>

    <div className="text-center mt-3">
      {editId ? (
        <button className="btn btn-warning" onClick={updateStudent}>
          Update Student
        </button>
      ) : (
        <button className="btn btn-primary" onClick={addStudent}>
          Add Student
        </button>
      )}
    </div>
  </div>

  <div className="card shadow mt-4">
    <div className="card-body">
      <h3 className="mb-3">Student List</h3>

      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.phone}</td>
              <td>{student.course}</td>

              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => editStudent(student)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => deleteStudent(student.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>
  );
}

export default App;