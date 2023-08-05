import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { Box, Typography, Link } from '@mui/material'
import LoginPage from '../Login/Login'
import TopImageLeft1 from '../../images/about/image.webp'
import TopImageLeft2 from '../../images/about/about2.webp'
import TopImageRight1 from '../../images/about/about1.webp'
import TopImageRight2 from '../../images/about/about4.webp'
import logo_about from '../../images/about/logo_about.webp'
import styled from '@emotion/styled'


const BoxTop = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
   
}));

const ImageContainer = styled(Box)({
    position: 'relative',
    width: '10%',
    '& img': {
        display: 'block',
    },
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '30%',
        background: 'linear-gradient(rgba(255, 255, 255, 0.5), transparent)',
    },
});

const BecomeACreator = () => {
    return (
        <div>
            <Box sx={{
                position: 'relative',
            }}>
                <Navbar />
                <Box sx={{
                    backgroundColor: '#171717',
                    color: 'white',
                    width: '100%',
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                }}>
             
                    <BoxTop sx={{ mt: '10em', padding: '1.5em',display:{xs:'none',sm:'flex'} }}>

                        <Box sx={{ display: 'flex', flexDirection: 'row', mt: '-1em', mr: '1em' }}>
                            <Box gap={5} mt={2} p={{ xs: 4, sm: 5 }} position={'relative'} sx={{ display: 'flex', flexDirection: 'column' }}>
                                <ImageContainer>
                                    <img src={TopImageRight1} width={190} height={230} alt="Image 5" />
                                </ImageContainer>

                                <img src={TopImageLeft2} width={190} height={230} alt="Image 3" />

                            </Box>
                            <Box gap={5} position={'relative'} sx={{ display: 'flex', flexDirection: 'column' }}>
                                <ImageContainer>
                                    <img src={TopImageLeft1} width={190} height={230} alt="Image 5" />
                                </ImageContainer>

                                <img src={TopImageRight2} width={190} height={230} alt="Image 3" />
                            </Box>
                        </Box>
                    </BoxTop>
                    <LoginPage />
                    
                </Box>
            </Box>
            <Footer />

        </div>
    )
}

export default BecomeACreator