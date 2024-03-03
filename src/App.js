import Help from "./Components/Help";
import Home from "./Components/Home";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="bg-gradient-to-r  h-screen w-screen overflow-auto   from-[#000428]  to-[#004e92]  text-white">
      <ToastContainer 
      position="top-left"
      />
              <Router>
                <Routes>
                  <Route path="/" element={<Home/>}/>
                  <Route path="/help" element={<Help/>}/>
                </Routes>
              </Router>
    </div>
  );
}

export default App;
