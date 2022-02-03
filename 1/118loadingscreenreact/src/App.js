import { useEffect, useState } from 'react'
import { Grid, Card, CardMedia, Box, CardContent } from '@mui/material'
import axios from 'axios'
import './App.css';


import { Loading } from './components'



function App() {
  const [loaded, setLoaded] = useState(false)
  const [posts, setPosts] = useState([])
  const numPosts = Math.floor(Math.random() * (6 - 2) + 2)

  useEffect(() => {

    axios(`https://picsum.photos/v2/list?limit=${numPosts}`)
      .then((r) => {
        console.log(r.data[0])
        setPosts([...r.data])
        setLoaded(true)
      })
      .catch(e => console.log(e))


    // const timer = setTimeout(() => {
    //   setLoaded(true)
    // }, 2000)
    // return () => (clearTimeout(timer))


  }, [])

  return (
    <Box className="App" sx={{ mx: 1, my: 1 }}>
    <Loading/>
{
        false? (
          <Grid container spacing={2}>
            {
              posts.map(p => (
                <Grid item xs={12 / posts.length}>
                  <Card>
                    <CardMedia height='549' component='img' src={p.download_url} />
                    <CardContent>
                      <p>This is the content. Above is an image from <a href='https://picsum.photos/'>Lorem Picsum</a>.</p>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            }
          </Grid>
        ) : (
          <Grid container spacing={2}>
            {
              Array(numPosts).map(() => (
                <Grid item xs={12 / numPosts}>
                  <Card>
                    <CardMedia height='549' component={Loading} />
                    <CardContent component={Loading} />
                  </Card>
                </Grid>
              ))
            }
          </Grid>

        )
      }
    </Box >
  );
}

export default App;
