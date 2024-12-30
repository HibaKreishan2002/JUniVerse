import SocialHub from "./pages/SocialHub/SocialHub";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import MentalHealthHub from "./pages/MentalHealthHub/MentalHealthHub";
import Login from "./pages/Registeration/Login";
import TherapistChats from "./pages/Therapist/TherapistChats";
import Layout from "./components/Layout";
import Home from "./pages/Home/Home";
import ProjectLayout from "./components/ProjectLayout";

function App() {
  return (
    <>
      <Routes>
        {/* Route for login */}
        <Route path="/Login" element={<Login />} />

        {/* Routes wrapped in ProjectLayout */}
        <Route element={<ProjectLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/SocialHub" element={<SocialHub />} />
          <Route path="/MentalHealthHub" element={<MentalHealthHub />} />
          <Route path="/TherapistChats" element={<TherapistChats />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
