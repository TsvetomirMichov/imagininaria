import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { Box } from '@mui/material'
import LoginPage from '../Login/Login'
import TopImageRight1 from '../../images/heroImage.jpg'
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
                mb: '15em'
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
                    <LoginPage />

                    <BoxTop sx={{ mt: '10em',  display: { xs: 'none', sm: 'flex' } }}>
                            <Box sx={{
                                display: 'flex', flexDirection: 'row', mt: '-1em', position: 'relative',
                                width: '100%',
                                height: { xs: '40%', sm: '100%' }
                            }}>
                                <Box position={'relative'}  sx={{ display: 'flex',justifyContent:'center',mt:'2em',  width: '100%', height: '20em' }}>
                                    <ImageContainer sx={{
                                        width: { xs: '100%', sm: '35em' },
                                    }}>
                                        <img src={TopImageRight1} width={'100%'} height={'100%'} alt="Image 5" />
                                    </ImageContainer>
                                </Box>
                            </Box>
                    </BoxTop>

                </Box>
            </Box>
            <Footer />

        </div>
    )
}

export default BecomeACreator
