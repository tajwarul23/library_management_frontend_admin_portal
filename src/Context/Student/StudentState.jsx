import { useState } from "react";
import axios from "axios";
import { StudentContext } from "../AppContext";

const BASE = "http://localhost:5000/api";

const authHeaders = () => ({
   headers: {
          Auth: localStorage.getItem("token"),
        },
  withCredentials: true,
});

const StudentState = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  // ── Add Student ───────────────────────────────────────
  const addStudent = async (name, studentId, session, department) => {
    try {
      setLoading(true);
      const { data } = await axios.post(`${BASE}/admin/student/add`,
        { name, studentId, session, department },
        authHeaders()
      );
      setStudents((prev) => [...prev, data.student]);
      return { success: true, message: data.message };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || err.message };
    } finally {
      setLoading(false);
    }
  };

  // ── Delete Student ────────────────────────────────────
  const deleteStudent = async (studentId) => {
    try {
      setLoading(true);
      const { data } = await axios.delete(`${BASE}/admin/student/delete/${studentId}`, authHeaders());
      setStudents((prev) => prev.filter((s) => s._id !== studentId));
      return { success: true, message: data.message };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || err.message };
    } finally {
      setLoading(false);
    }
  };

  // ── Get Students by Department ────────────────────────
  const getStudentsByDepartment = async (department) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${BASE}/admin/student/department/${department}`, authHeaders());
      setStudents(data.students);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || err.message };
    } finally {
      setLoading(false);
    }
  };

  // ── Search Student by ID ──────────────────────────────
  const searchStudentById = async (studentId) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${BASE}/admin/student/search?id=${studentId}`, authHeaders());
      return { success: true, student: data.student };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || err.message };
    } finally {
      setLoading(false);
    }
  };

  return (
    <StudentContext.Provider value={{
      students, loading,
      addStudent, deleteStudent,
      getStudentsByDepartment, searchStudentById,
    }}>
      {children}
    </StudentContext.Provider>
  );
};

export default StudentState;