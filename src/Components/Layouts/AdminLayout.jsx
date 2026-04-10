import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import Dashboard from "@/Pages/Dashboard";
import ManageBooks from "@/Pages/ManageBooks";
import ManageStudents from "@/Pages/ManageStudents";
import Reservations from "@/Pages/Reservations";
import IssuedBooks from "@/Pages/IssuedBooks";
// import ReturnBook from "@/Pages/ReturnBook";
import ReturnBook from "@/Pages/ReturnBooks";
import SessionWise from "@/Pages/SessionWise";
// import DepartmentWise from "@/Pages/DepartmentWise";
import DepartmentWise from "@/Pages/DeparmentWise";


const AdminLayout = () => {
  const [activePage, setActivePage] = useState("dashboard");
  console.log("activePage:", activePage)

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":    return <Dashboard />;
      case "books":        return <ManageBooks />;
      case "students":     return <ManageStudents />;
      case "reservations": return <Reservations />;
      case "issued":       return <IssuedBooks />;
      case "return":       return <ReturnBook />;
      case "session":      return <SessionWise />;
      case "department":   return <DepartmentWise />;
      default:             return <Dashboard />;
    }
  };

 const pageTitles = {
  dashboard:    { label: "Dashboard" },
  books:        { label: "Manage Books" },
  students:     { label: "Manage Students" },
  reservations: { label: "Reservations" },
  issued:       { label: "Issued Books" },
  return:       { label: "Return Book" },
  session:      { label: "Session Wise" },
  department:   { label: "Department Wise" },
};

  return (
    <div className="flex h-screen bg-navy text-white overflow-hidden">
      <Sidebar activePage={activePage} setActivePage={setActivePage} pages={pageTitles} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar title={pageTitles[activePage].label} />
        <main className="flex-1 overflow-y-auto p-5">
          {renderPage()} {/* ← renders fresh each time */}
        </main>
      </div>
    </div>
  );
};
export default AdminLayout