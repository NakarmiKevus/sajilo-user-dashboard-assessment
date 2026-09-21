import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserList from "./pages/UserList";
import NotFound from "./pages/NotFound";
import UserDetails from "./pages/UserDetails";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/user/:id" element={<UserDetails />}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
