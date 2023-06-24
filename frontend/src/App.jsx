import { Routes, Route } from "react-router-dom";
import "./App.css";
import { UserContextProvider } from "./context/UserContext";
import Layout from "./Layout";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import Home from "./pages/HomePage";
import Login from "./pages/LoginPage";
import PostPage from "./pages/PostPage";
import Register from "./pages/RegisterPage";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path='/post/:id' element={<PostPage />} />
          <Route path='/edit/:id' element={<EditPost />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
