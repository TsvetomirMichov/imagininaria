import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Galery from '../../components/Galery/Galery'
import Hero from '../../components/Hero/Hero'
import { Box } from '@mui/material'

const Home = () => {
    const [showNavbar, setShowNavbar] = React.useState(false);

    const handleScroll = () => {
        if (window.scrollY > 349) {
            setShowNavbar(true);
        } else {
            setShowNavbar(false);
        }
    };

    React.useEffect(() => {
        // Add the scroll event listener when the component mounts
        window.addEventListener('scroll', handleScroll);
        // Remove the scroll event listener when the component unmounts
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

  return (
    <div>
        <Box sx={{display: showNavbar ? 'block' : 'none',position: 'fixed',zIndex:100,width:'100%'}}>
        <Navbar />
        </Box>
        <Hero/>
        <Galery/>
    </div>
  )
}

export default Home