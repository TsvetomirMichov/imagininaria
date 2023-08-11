import React from 'react';
import { Outlet } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home';
import About from './pages/About/About';
import BecomeACreator from './pages/BecomeACreator/BecomeACreator';
import SignupPage from './pages/Register/Register';
import CreatePost from './pages/CreatePost/CreatePost';
import Contact from './pages/Contact/Contact';
import UserAcc from './pages/UserAcc/UserAcc';
import FilterGallery from './pages/FilterGallery/FilterGallery';


function App() {
  const Layout = () => {
    return (
      <>
        <Outlet />
      </>
    )
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home/>}/>
        <Route path="about" element={<About />} />
        <Route path="becomeACreator" element={<BecomeACreator />} />
        <Route path="newPost" element={<CreatePost />} />
        <Route path="signup" element={<SignupPage />} />        
        <Route path="contact" element={<Contact />} />    
        <Route path="user/:id" element={<UserAcc />} />    
        <Route path="filter/:[keywords]" element={<FilterGallery />} />    
        {/* End Dash */}
      </Route>
    </Routes>

  )
}

export default App;

