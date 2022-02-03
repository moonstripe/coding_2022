import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Loader } from './components';
import './App.css';

function App() {
  const [loaded, setLoaded] = useState(false)
  const numPosts = 3
  const arr = Array.apply(null, Array(numPosts))
  const [posts, setPosts] = useState(arr)

  useEffect(() => {
    // posts.forEach(() => console.log('d'))
    axios
      .get(`https://picsum.photos/v2/list?limit=${numPosts}`, {
        mode: 'no-cors',
      })
      .then(results => {
        setPosts([...results.data])
      })
  })


  // useEffect(() => {
  //   console.log('turned on')
  //   console.log(posts)
  // }, [posts])


  return (
    <div className="App">
      <header className="App-header">
        <Loader loaded={loaded}/>
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
      </header>
    </div>
  );
}

export default App;
