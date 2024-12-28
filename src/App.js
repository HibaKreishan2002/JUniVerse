// import Header from './components/Header';
import SocialHub from './pages/SocialHub/SocialHub';
import { Routes, Route } from "react-router-dom";
import './App.css';
import MentalHealthHub from './pages/MentalHealthHub/MentalHealthHub';
import Login from './pages/Registeration/Login';
import TherapistChats from './pages/Therapist/TherapistChats';
// import Footer from './components/Footer';
import Layout from './components/Layout';
import Home from './pages/Home/Home';


function App() {
  return (
    <>
    {/* <Header/> */}
    <Routes>
    {/* <Route path='/SocialHub' element={<SocialHub />} /> 
    <Route path='/MentalHealthHub' element={<MentalHealthHub />} />  */}
    <Route path='/Login' element={<Login />} /> 

    <Route  path="/" element={<Layout />}>
    
    <Route index element={<Home/>} />
    <Route path="/SocialHub" element={<SocialHub />} />
    <Route path="/MentalHealthHub" element={<MentalHealthHub />} />
    <Route path="/TherapistChats" element={<TherapistChats />} />
  </Route>
    </Routes> 


   </>
  );
}

export default App;
