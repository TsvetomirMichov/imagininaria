import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Galery from '../../components/Galery/Galery'
import Hero from '../../components/Hero/Hero'
import { Box } from '@mui/material'

const FilterGallery = () => {

  return (
    <div>
        <Box sx={{display:  'block' ,position: 'fixed',zIndex:100,width:'100%'}}>
        <Navbar />
        </Box>
        <Galery/>
    </div>
  )
}

export default FilterGallery
