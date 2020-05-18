import React from 'react'
import Box from '@material-ui/core/Box';
import FadeLoader from 'react-spinners/FadeLoader'

export const spinnerLoading = () => (
    <Box style={{
        position: 'absolute',
        top: '0',
        left: '0',
        backgroundColor: 'rgba(0,0,0,.5)',
        zIndex:'10000',
        width: window.innerWidth,
        height: window.innerHeight,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }}>
        <FadeLoader
          size={120}
          color={"#ffffff"}
        />
    </Box>
)