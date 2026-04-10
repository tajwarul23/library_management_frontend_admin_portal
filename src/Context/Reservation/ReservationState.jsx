import { useState } from "react";
import axios from "axios";
import { ReservationContext } from "../AppContext";

const BASE = "http://localhost:5000/api";

const authHeaders = () => ({
  headers: { Auth: localStorage.getItem("token") },
  withCredentials: true,
});

const ReservationState = ({ children }) => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);

  // ── Get All Reservations ──────────────────────────────
  const getAllReservations = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${BASE}/admin/reservations`, authHeaders());
      setReservations(data.reservations);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || err.message };
    } finally {
      setLoading(false);
    }
  };

  return (
    <ReservationContext.Provider value={{
      reservations, loading,
      getAllReservations,
    }}>
      {children}
    </ReservationContext.Provider>
  );
};

export default ReservationState;