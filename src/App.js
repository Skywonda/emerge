import { Route, Routes } from "react-router-dom";
import { Dashboard } from "./components/dashboard";
import { Signin } from "./pages/signin";
import { Signup } from "./pages/signup";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Signin />} />
    </Routes>
  );
}

export default App;
