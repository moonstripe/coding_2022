import './App.css';
import { Blog, Post } from './components'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path='/' element={<Blog/>}/>
          <Route path='/:slug' element={<Post />}/>
        </Routes>
      </header>
    </div>
  );
}

export default App;
