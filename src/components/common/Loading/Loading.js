import { CircularProgress } from '@mui/material';
import React from 'react'
import './loading.css'

function Loading() {
  return (
    <div className='loading'>
     <CircularProgress />
    </div>
  )
}

export default Loading;