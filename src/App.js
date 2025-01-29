import SocialHub from "./pages/SocialHub/SocialHub";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import MentalHealthHub from "./pages/MentalHealthHub/MentalHealthHub";
import Login from "./pages/Registeration/Login";
import TherapistChats from "./pages/Therapist/TherapistChats";
import Layout from "./components/Layout";
import Home from "./pages/Home/Home";
import ECard from "./pages/E-Card/ECard";

function App() {
  return (
    <>
      <Routes>
        {/* Route for login */}
        <Route path="/Login" element={<Login />} />

        {/* Routes wrapped in Layout This is NEW */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/SocialHub" element={<SocialHub />} />
          <Route path="/MentalHealthHub" element={<MentalHealthHub />} />
          <Route path="/TherapistChats" element={<TherapistChats />} />
          <Route path="/ECard" element={<ECard />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
