import Home from "./Components/Home";

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="bg-gradient-to-r  h-screen from-[#000428]  to-[#004e92]  text-white">
     
              <Router>
                <Routes>
                  <Route path="/" element={<Home/>}/>
                </Routes>
              </Router>
    </div>
  );
}

export default App;
