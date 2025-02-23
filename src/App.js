import SocialHub from "./pages/SocialHub/SocialHub";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import MentalHealthHub from "./pages/MentalHealthHub/MentalHealthHub";
import Login from "./pages/Registeration/Login";
import TherapistChats from "./pages/Therapist/TherapistChats";
import Layout from "./components/Layout";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ECard from "./pages/E-Card/ECard";
import Homepage from "./pages/Homepage/Homepage";
import NotFound from "./pages/NotFound"; // صفحة الخطأ 404
import ProtectedRoute from "./components/ProtectedRoute"; // حماية الصفحات

function App() {
  return (
    <>
      <Routes>

        <Route path="/" element={<Login />} />


        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/ProfilePage" element={<ProfilePage />} />
            <Route path="/SocialHub" element={<SocialHub />} />
            <Route path="/MentalHealthHub" element={<MentalHealthHub />} />
              <Route path="/TherapistChats" element={<TherapistChats />} />
            <Route path="/ECard" element={<ECard />} />
          </Route>
        </Route>


        <Route path="/Homepage" element={<Homepage />} />


        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
