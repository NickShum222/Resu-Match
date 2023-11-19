import { Signup, Landing, Login, Dashboard } from "./pages";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./utils/AuthContext";
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
