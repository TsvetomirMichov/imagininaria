import React, { useEffect, useState } from 'react'
import { addDoc, collection } from "firebase/firestore";
import { auth, firestore, storage } from "../lib/firebase"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import Navbar from '../../components/Navbar/Navbar';
import { Box, Button, TextField, Typography } from '@mui/material';


import Footer from '../../components/Footer/Footer'
import TopImageLeft1 from '../../images/about/image.webp'
import TopImageLeft2 from '../../images/about/about2.webp'
import TopImageRight1 from '../../images/about/about1.webp'
import TopImageRight2 from '../../images/about/about4.webp'
import UploadIcon from '../../images/upload-icon-3.png'
import styled from '@emotion/styled'

import RandomImage from '../../images/about/about1.webp'
import { getAuth } from 'firebase/auth';

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

const CreatePost = ({ title }) => {
    const [file, setFile] = useState("")
    const [data, setData] = useState({})
    const [perc, setPerc] = useState(null)
    const navigate = useNavigate()

    const auth = getAuth();
    const user = auth.currentUser;

    const [postDetails, setPostDetails] = useState({
        prompt: '',
        userEmail: user?.email,
        userId: user?.uid,
        imageData: ''
    });

    const inserDate = async () => {
        console.log('start inserting')
        await addDoc(collection(firestore, 'posts'), {
            ...postDetails
        });
    }

    const HandleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        if (postDetails.prompt !== '' && postDetails.userEmail !== null && postDetails.imageData !== null && file) {
            try {
                const uploadImage = () => {
                    const name = file.name;
                    console.log("name : ", name)
                    console.log('post image name : ', postDetails.imageData)
                    const storageRef = ref(storage, name);
                    const uploadTask = uploadBytesResumable(storageRef, file);

                    uploadTask.on('state_changed',
                        (snapshot) => {
                            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            console.log('Upload is ' + progress + '% done');
                            setPerc(progress)
                            switch (snapshot.state) {
                                case 'paused':
                                    console.log('Upload is paused');
                                    break;
                                case 'running':
                                    console.log('Upload is running');
                                    break;
                                default:
                                    break;
                            }
                        },
                        (error) => {
                            console.log(error)
                        },
                        () => {
                            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                                postDetails.imageData = downloadURL

                            });
                        }
                    );
                }
                uploadImage()
                if (perc == 100) {
                    inserDate()
                }

            } catch (err) {
                console.log(err)
            }
        }
    }

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
                    <Box
                        className="new"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%',
                            justifyContent: 'center'
                            , alignItems: 'center'
                        }}
                    >
                        <Box
                            className="newContainer"
                            sx={{
                                maxWidth: '800px',
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >


                            <Box
                                className="bottom"
                                sx={{
                                    display: 'flex',
                                    flexDirection: { xs: 'column', sm: 'row' },
                                    justifyContent: 'center',
                                    alignItems: { xs: 'center', sm: 'flex-start' },
                                }}>
                               

                                <Box className="right" sx={{ ml: { xs: 0, sm: '2em' } }}>
                                <Box sx={{
                                    py:3
                                }}>
                                    <Typography variant='h4' fontWeight={800}>
                                        Become a creator
                                    </Typography>
                                    <Typography variant='body1' fontWeight={600}>
                                        Showcase your creations on Imaginaria.
                                    </Typography>
                                </Box>

                                    <form onSubmit={HandleSubmit}>

                                        <Box className="left" sx={{ mb: { xs: '2em', sm: 0 } }}>
                                            
                                            <img width={190} height={150} src={file ? URL.createObjectURL(file) : UploadIcon} alt="" />
                                            <Box className="formInput" sx={{ mb: '1em' }}>
                                                <label htmlFor="file">Click to upload image</label>
                                                <input type="file" id="file" style={{ display: 'none' }} onChange={(e) => setFile(e.target.files[0])} />
                                            </Box>
                                        </Box>
                                        <TextField
                                            fullWidth
                                            label="Prompt"
                                            variant="outlined"
                                            InputProps={{
                                                style: { color: 'black', backgroundColor: 'white' },
                                            }}
                                            value={postDetails.prompt}
                                            onChange={(e) => setPostDetails((prev) => ({ ...prev, prompt: e.target.value }))}
                                            sx={{ mb: '1em' }}
                                        />
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            InputProps={{
                                                style: { color: 'black', backgroundColor: 'white' },
                                            }}
                                            value={user ? user?.email : ''}
                                            onChange={(e) => setPostDetails((prev) => ({ ...prev, lastName: e.target.value }))}
                                            sx={{ mb: '1em' }}
                                        />
                                        <button variant="contained" color="warning" type="submit" >
                                            Submit
                                        </button>
                                    </form>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Footer />

        </div>
    )
}

export default CreatePost
