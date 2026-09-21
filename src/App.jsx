import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserList from "./pages/UserList";
import NotFound from "./pages/NotFound";
import UserDetails from "./pages/UserDetails";
import Navbar from "./components/Navbar";
import AddUser from "./pages/AddUser";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/user/:id" element={<UserDetails />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
