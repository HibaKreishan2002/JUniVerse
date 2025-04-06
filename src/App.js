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
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import FileSharingHub from "./pages/FileSharingHub/FileSharingHub";
import FileScreen from "./pages/FileSharingHub/FileScreen";
import FilesManagement from "./pages/FileSharingHub/FilesManagement";
import TherapistNotes from "./pages/Therapist/TherapistNotes";
import News from "./pages/NewsHub/News";
import NewsManagement from "./pages/NewsHub/NewsManagement";

function App() {
  return (
    <>
      <Routes>
      <Route path="/" element={<Homepage />} />

        <Route path="/Login" element={<Login />} />


        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/ProfilePage" element={<ProfilePage />} />
            <Route path="/SocialHub" element={<SocialHub />} />
            <Route path="/MentalHealthHub" element={<MentalHealthHub />} />
              <Route path="/TherapistChats" element={<TherapistChats />} />
              <Route path="/TherapistNotes" element={<TherapistNotes />} />
              <Route path="/FileSharing" element={<FileSharingHub />} />
              <Route path="/files/:folderId" element={<FileScreen />} />
              <Route path="/ECard" element={<ECard />} />
              <Route path="/FilesManagement" element={<FilesManagement />} />
              <Route path="/News" element={<News/>} />
              <Route path="/NewsManagement" element={<NewsManagement/>} />




          </Route>
        </Route>




        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
