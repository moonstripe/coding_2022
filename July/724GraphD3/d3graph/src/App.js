import * as d3 from "d3";
import { useRef, useLayoutEffect } from 'react'

const nodes = [
  {
    id: 0,
    x: 150,
    y: 150
  },
  {
    id: 1,
    x: 300,
    y: 150
  },
  {
    id: 2,
    x: 450,
    y: 450
  }
]

const edges = [
  {
    from: 0,
    to: 1
  },
  {
    from: 2,
    to: 1
  },
  {
    from: 0,
    to: 2
  }
]

function App() {
  let ref = useRef()

  useLayoutEffect(() => {
    let svg = d3.select("svg")

    nodes.map((n) => {
      return svg.append('circle').attr('cx', n.x).attr('cy', n.y).attr('r', 5).attr('fill', '#000')
    })

    edges.map((e) => {
      return svg.append('link')
    })
    
  }, [ref])


  return (
    <svg
      ref={ref}
      viewBox="0 0 1000 1000"
      width={'100%'}
      height={'100%'}
    />
  );
}

export default App;
