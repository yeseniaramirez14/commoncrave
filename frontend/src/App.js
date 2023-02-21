import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./Components/Nav";
import GroupForm from "./Pages/GroupForm";
import CravingsCheckBox from "./Components/CravingsCheckBox";
import Home from "./Pages/Home";
import AboutUs from "./Pages/AboutUs";
import GroupList from "./Pages/GroupList";
import JoinGroupFromUrlForm from "./Pages/JoinGroupFromUrlForm";


const App = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/group" element={<GroupForm />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/cravings" element={<CravingsCheckBox />} />
        <Route path="/group/:id" element={<GroupList />} />
        <Route path="/joingroup/:id" element={<JoinGroupFromUrlForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
