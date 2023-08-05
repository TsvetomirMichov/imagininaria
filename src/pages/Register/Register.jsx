import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { Box, Typography, Link } from '@mui/material'
import TopImageLeft1 from '../../images/about/image.webp'
import TopImageLeft2 from '../../images/about/top_left.webp'
import TopImageRight1 from '../../images/about/top_right.webp'
import TopImageRight2 from '../../images/about/bottom_right.webp'
import styled from '@emotion/styled'


import { useState } from 'react';
import { createNewUser } from '../lib/firebase';
import { auth } from '../lib/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { firestore } from '../lib/firebase';
import { TextField, Button } from '@mui/material';


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

const SignupPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate inputs
        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }

        try {
            await createNewUser(auth, email, password);
            await addDoc(collection(firestore, 'users'), {
                email: email,
                password: password
            });
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Error signing up:', errorCode, ' ', errorMessage);
            setError('An error occurred while signing up');
        }
    };
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

                    <BoxTop sx={{ mt: '10em', padding: '1.5em', display: { xs: 'none', sm: 'flex' } }}>

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
                    <Box display="flex" alignItems="center" mr={10}>
                        <form onSubmit={handleSubmit} style={{ maxWidth: '400px', width: '100%', padding: '16px' }}>
                            <Typography variant="h4" align="left" gutterBottom>
                              Register to  Become a creator
                            </Typography>
                            <Typography variant="body1" align="left" mb={5} gutterBottom>
                                Showcase your creations on Freeflo.
                            </Typography>
                            <div style={{ marginBottom: '16px' }}>
                                <Typography variant="body1" fontWeight="bold">
                                    Email:
                                </Typography>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    style={{ backgroundColor: '#262626', minWidth: '20em' }}
                                />
                            </div>
                            <div style={{ marginBottom: '1.5em' }}>
                                <Typography variant="body1" fontWeight="bold">
                                    Password:
                                </Typography>
                                <TextField
                                    fullWidth
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    variant="outlined"
                                    style={{ backgroundColor: '#262626' }}
                                />
                            </div>
                            <Button variant="contained" color="warning" type="submit" fullWidth>
                                Sign Up
                            </Button>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '16px' }}>
                                <Typography variant="body1" fontWeight="bold" sx={{ paddingRight: '8px' }}>
                                    Already a member?
                                </Typography>
                                <Link sx={{
            color:'white',
          }} href="/becomeACreator">Sign in now</Link>
                            </div>
                        </form>
                    </Box>
                </Box>
            </Box>
            <Footer />

        </div>
    )
}

export default SignupPage