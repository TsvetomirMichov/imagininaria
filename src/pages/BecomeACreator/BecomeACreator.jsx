import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { Box } from '@mui/material'
import LoginPage from '../Login/Login'
import TopImageLeft2 from '../../images/about/top_right.webp'
import TopImageRight2 from '../../images/about/top_left.webp'
import TopImageRight1 from '../../images/about/Imaginaria-about-1.jpg'
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
                mb:'15em'
            }}>
                <Navbar />
                <Box sx={{
                    backgroundColor: 'white',
                    color: 'black',
                    width: '100%',
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                }}>
             
                    <BoxTop sx={{ mt: '10em', padding: '1.5em',display:{xs:'none',sm:'flex'} }}>
                        <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        alignItems: { xs: 'center', sm: 'flex-end' }
                    }}>
                        <Box sx={{
                            display: 'flex', flexDirection: 'row', mt: '-1em', ml: '1em', position: 'relative',
                            width: '100%',
                            height: { xs: '40%', sm: '100%' }
                        }}>
                            <Box position={'relative'} p={3} sx={{ display: 'flex', flexDirection: 'column', width: '15em', height: '15em' }}>
                                <ImageContainer sx={{
                                    width: { xs: '100%', sm: '15em' },
                                }}>
                                    <img src={TopImageRight1} width={'100%'} height={'100%'} alt="Image 5" />
                                </ImageContainer>
                            </Box>
                            <Box position={'relative'} p={3} mt={4} sx={{ display: 'flex', flexDirection: 'column', width: '15em', height: '5em' }}>
                                <ImageContainer sx={{
                                    width: { xs: '100%', sm: '15em' },
                                }}>
                                    <img src={TopImageLeft2} width={'100%'} height={'100%'} alt="Image 5" />
                                </ImageContainer>

                            </Box>
                        </Box>
                        <Box position={'relative'} p={3} >
                            <ImageContainer sx={{
                                width: { xs: '100%', sm: '30em' },
                                height:'20em'
                            }}>
                                <img src={TopImageRight2} style={{height:'100%', objectFit: 'cover' }} alt="Image 5" />
                            </ImageContainer>
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
