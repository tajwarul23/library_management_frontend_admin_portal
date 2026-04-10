import AuthState from "./auth/AuthState";
import BookState from "./book/BookState";
import StudentState from "./student/StudentState";
import ReservationState from "./reservation/ReservationState";

const AppState = ({ children }) => {
  return (
    <AuthState>
      <BookState>
        <StudentState>
          <ReservationState>
            {children}
          </ReservationState>
        </StudentState>
      </BookState>
    </AuthState>
  );
};

export default AppState;