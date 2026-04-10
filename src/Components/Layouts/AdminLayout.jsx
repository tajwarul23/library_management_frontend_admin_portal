import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import Dashboard from "@/pages/Dashboard";
import ManageBooks from "@/pages/ManageBooks";
import ManageStudents from "@/pages/ManageStudents";
import Reservations from "@/pages/Reservations";
import IssuedBooks from "@/pages/IssuedBooks";
// import ReturnBook from "@/pages/ReturnBook";
import ReturnBook from "@/Pages/ReturnBooks";
import SessionWise from "@/pages/SessionWise";
// import DepartmentWise from "@/pages/DepartmentWise";
import DepartmentWise from "@/Pages/DeparmentWise";

const pages = {
  dashboard:   { label: "Dashboard",        component: <Dashboard /> },
  books:       { label: "Manage Books",     component: <ManageBooks /> },
  students:    { label: "Manage Students",  component: <ManageStudents /> },
  reservations:{ label: "Reservations",     component: <Reservations /> },
  issued:      { label: "Issued Books",     component: <IssuedBooks /> },
  return:      { label: "Return Book",      component: <ReturnBook /> },
  session:     { label: "Session Wise",     component: <SessionWise /> },
  department:  { label: "Department Wise",  component: <DepartmentWise /> },
};

const AdminLayout = () => {
  const [activePage, setActivePage] = useState("dashboard");

  return (
    <div className="flex h-screen bg-navy text-white overflow-hidden">
      <Sidebar activePage={activePage} setActivePage={setActivePage} pages={pages} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar title={pages[activePage].label} />
        <main className="flex-1 overflow-y-auto p-5">
          {pages[activePage].component}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;