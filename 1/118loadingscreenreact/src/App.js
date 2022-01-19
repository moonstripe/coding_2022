import { useEffect, useState } from 'react'
import { Grid, Card, CardMedia, Box } from '@mui/material'
import './App.css';


import { Loading } from './components'



function App() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true)
    }, 2000)
    return () => (clearTimeout(timer))
  })

  return (
    <Box className="App">
        <Grid container>
          <Grid item xs={6}>
            <Card>
              {
                loaded ? <CardMedia height='549' component='img' src={'./bird.jpeg'} /> : <CardMedia height='549' component={Loading} src={'./bird.jpeg'} />
              }
              
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card>
              {
                loaded ? <CardMedia height='549' component='img' src={'./bird.jpeg'} /> : <CardMedia height='549' component={Loading} src={'./bird.jpeg'} />
              }
              
            </Card>
          </Grid>
        </Grid>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
    </Box>
  );
}

export default App;
