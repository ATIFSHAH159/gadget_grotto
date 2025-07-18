import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Menubar from "./Components/Menubar";
import Footer from "./Components/Footer";
import Aboutus from "./Pages/Aboutus";
import LandingPage from "./Pages/Landingpage";
import Contactus from "./Pages/Contactus";
import PowerBanks from "./Pages/Powerbank";
import BluetoothSpeaker from "./Pages/Bluetooth_speaker";
import FitnessBands from "./Pages/Fitness_Bands";
import PhoneCases from "./Pages/PhoneCases";
import GamingHeadsets from "./Pages/Gamingheadset";
import ChargingCables from "./Pages/Chargingcables";
import MobileSkins from "./Pages/MobileSkins";
import HardDrives from "./Pages/Harddrives";
import DroneCameras from "./Pages/Dronecameras";
import AdminPanel from "./Admin/AdminPanel";
import EarBuds from "./Pages/Earbuds";
import AddtoCart from "./Pages/AddtoCart";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import SearchResults from "./Pages/SearchResults";
import { AuthProvider } from './Context/AuthContext';
import ProtectedRoute from './Components/ProtectedRoute';
import { useState } from 'react';
import Notification from './Components/Notification';
import ProductDetail from "./Pages/ProductDetail";
import Success from './Pages/Success';
import OrderHistory from './Pages/OrderHistory';
import AdminOrders from './Admin/AdminOrders';

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type) => {
    setNotification({ message, type });
  };

  const handleCloseNotification = () => {
    setNotification(null);
  };

  return (
    <AuthProvider>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={handleCloseNotification}
        />
      )}
      {!isAdminRoute && <Menubar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path='/contactus' element={<Contactus/>}/>
        <Route path='/addtocart' element={<AddtoCart/>}/>
        <Route path='/products/Powerbanks' element={<PowerBanks/>}/>
        <Route path='/products/Bluetooth_Speaker' element={<BluetoothSpeaker/>}/>
        <Route path='/products/Fitness_Bands' element={<FitnessBands/>}/>
        <Route path='/products/Phone_Cases & Covers' element={<PhoneCases/>}/>
        <Route path='/products/Gaming_Headsets' element={<GamingHeadsets/>}/>
        <Route path='/products/Drone_Cameras' element={<DroneCameras/>}/>
        <Route path='/products/Hard_Drives & SSDs' element={<HardDrives/>}/>
        <Route path='/products/Mobile_Skins' element={<MobileSkins/>}/>
        <Route path='/products/Charging_Cables' element={<ChargingCables/>}/>
        <Route path='/products/Earbuds' element={<EarBuds/>}/>
        <Route path="/login" element={<Login showNotification={showNotification} />} />
        <Route path="/signup" element={<Signup showNotification={showNotification} />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/success" element={<Success />} />
        <Route path="/orders" element={<OrderHistory />} />
        
        {/* Protected Admin Routes */}
        <Route path='/admin/*' element={
          <ProtectedRoute>
            <AdminPanel showNotification={showNotification} />
          </ProtectedRoute>
        }/>
      </Routes>
      {!isAdminRoute && <Footer />}
    </AuthProvider>
  );
}

export default App;
