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
    </Box >
  );
}

export default App;
