import { 
  Signup,
  Landing
 } from "./pages";
import { AuthProvider } from "./utils/AuthContext";
function App() {
  return (
    <AuthProvider>
      <Landing />
    </AuthProvider>
  );
}

export default App;
