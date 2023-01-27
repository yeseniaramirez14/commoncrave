import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from './Components/Nav';
import Home from './Pages/Home';
import GroupForm from './Components/GroupForm';
import AboutUs from './Pages/AboutUs';
import CravingsCheckBox from "./Components/CravingsCheckBox";

const App = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/group" element={<GroupForm />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/cravings" element={<CravingsCheckBox />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
