import React, { useState } from 'react';
import { Typography, Grid, Box } from '@mui/material';
import { MainSketch } from './components/Sketch'


function App() {
  const [loader, setLoader] = useState(false)


  return (
    <div className="App">
      {loader ? null : (
      <Box sx={{ position: 'absolute', top: '0', left: '0', height: '100%', width: '100%', zIndex: '10', backgroundColor: 'white', alignItems: 'center' }} >
        <Typography variant="body1" sx={{ ml: `${window.innerWidth/2}px`, mt: `${window.innerHeight/2}px`}}>Loading.....</Typography>
      </Box>
      )} 
      <Grid container>
        <Grid item md={6}>
          <MainSketch setLoaded={() => setLoader(true)} />
        </Grid>
        <Grid item md={1}></Grid>
        <Grid item md={3}>
          <Box sx={{ px: [6, 0, 0, 0, 0], py: 2, display: "flex", flexDirection: 'column' }}>
            {/* poem */}
            <Box sx={{ textAlign: 'left', display: "flex", flexDirection: 'column'  }}>
              <Typography variant="p" gutterBottom>i remember when the words</Typography>
              <Typography variant="p" gutterBottom>"oh my god,"</Typography>
              <Typography variant="p" gutterBottom>slipped out of me</Typography>
              <Typography variant="p" gutterBottom>and onto your ceramic tiling.</Typography>
            </Box>
            <br/>
            <Box sx={{ textAlign: 'left', display: "flex", flexDirection: 'column'  }}>
              <Typography variant="p" gutterBottom>i remember how the dry grass felt</Typography>
              <Typography variant="p" gutterBottom>through my sweater</Typography>
              <Typography variant="p" gutterBottom>when we laid down</Typography>
              <Typography variant="p" gutterBottom>beside the creek.</Typography>
            </Box>
            <br/>
            <Box sx={{ textAlign: 'left', display: "flex", flexDirection: 'column'  }}>
              <Typography variant="p" gutterBottom>i've always been afraid</Typography>
              <Typography variant="p" gutterBottom>of how memories change</Typography>
              <Typography variant="p" gutterBottom>from how it felt</Typography>
              <Typography variant="p" gutterBottom>to make them for the first time.</Typography>
            </Box>
            <br/>
            <Box sx={{ textAlign: 'left', display: "flex", flexDirection: 'column'  }}>
              <Typography variant="p" gutterBottom>but these memories won't wilt</Typography>
              <Typography variant="p" gutterBottom>or decompose.</Typography>
            </Box>
            <br/>
            <Box sx={{ textAlign: 'left', display: "flex", flexDirection: 'column'  }}>
              <Typography variant="p" gutterBottom>i'll preserve them like flowers</Typography>
              <Typography variant="p" gutterBottom>in between the pages of my journal</Typography>
              <Typography variant="p" gutterBottom>so the colors are as vivid</Typography>
              <Typography variant="p" gutterBottom>as when we first picked them.</Typography>
            </Box>
            <br/>
            <Box sx={{ textAlign: 'left', display: "flex", flexDirection: 'column'  }}>
              <Typography variant="p" gutterBottom>when my hair is grey,</Typography>
              <Typography variant="p" gutterBottom>and my journal is full,</Typography>
              <Typography variant="p" gutterBottom>our memories will glow brighter</Typography>
              <Typography variant="p" gutterBottom>than i can actually see.</Typography>
            </Box>
            <br/>
            <br/>
            <Box sx={{ textAlign: 'left', display: "flex", flexDirection: 'column'  }}>
              <Typography variant="h6" gutterBottom sx={{color: 'darkred'}}>I love you, Reilly</Typography>
              </Box>

          </Box>
        </Grid>
      </Grid>

    </div>
  );
}

export default App;
