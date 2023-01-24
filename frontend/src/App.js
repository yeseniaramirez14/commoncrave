import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from './Components/Nav';
import Home from './Pages/Home';
import GroupForm from './Components/GroupForm';
import AboutUs from './Pages/AboutUs';

const App = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/group" element={<GroupForm />} />
        <Route path="/aboutus" element={<AboutUs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
