import './App.css';
import Navbar from './components/navbar/Navbar';
import CreatePost from './pages/createPost/CreatePost';
import Home from './pages/home/Home';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import SinglePost from './pages/singlePost/SinglePost';
import Answer from './pages/answer/Answer';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MyQuestions from './pages/MyQuestions';

function RequireAuth({ children }) {
  const location = useLocation();
  const username = localStorage.getItem('df_username');
  if (!username) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
        <Route path="/createpost" element={<RequireAuth><CreatePost /></RequireAuth>} />
        <Route path="/updatepost/:postID" element={<RequireAuth><CreatePost /></RequireAuth>} />
        <Route path="/:postID" element={<RequireAuth><SinglePost /></RequireAuth>} />
        <Route path="/answer/:postID" element={<RequireAuth><Answer /></RequireAuth>} />
        <Route path="/my-questions" element={<RequireAuth><MyQuestions /></RequireAuth>} />
      </Routes>
    </>
  );
}

export default App;
