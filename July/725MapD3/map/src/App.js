import { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import { geoPath, geoGraticule10, geoNaturalEarth1 } from 'd3-geo'

import countriesRaw from './countries.json'


const App = () => {
  const [clicked, setClicked] = useState(null)
  let ref = useRef()

  useEffect(() => {
    let rotation = [0,0]

    let projection = geoNaturalEarth1().rotate(rotation);
    let path = geoPath(projection);
    

    let svg = d3.select(ref.current)

    svg.append('defs').append('clipPath').attr('id', 'map-sphere').append('path').attr('d', path({type: 'Sphere'}))
    svg.append('path').attr('d', path({type: "Sphere"})).attr('fill', '#999999')

    let clippedMap = svg.append('g').attr('style', "clip-path: url(#map-sphere);");

    clippedMap.append('path').attr('d', path(geoGraticule10())).attr('stroke', '#aaaaaa').attr('fill', 'none')

    clippedMap.append('g').selectAll('path')
      .data(countriesRaw.features)
      .enter().append('path')
        .attr('d', path).attr('fill', '#fff').attr('stroke', '#000').attr('stroke-width', 0.5).attr('id', d => d.properties.iso_a3).on('click', (e) => setClicked(e.target.id)).on('click', (e) => e.target.attributes.fill = '#0000FF')
    

    // clippedMap.append('path').datum({type: "FeatureCollection", features: countriesRaw.features}).attr("d", path).attr('stroke', '#fff');
    // return () => svg.remove()
  }, [ref])

  return (
    <div
    style={{position: 'relative'}}>
      <svg
        ref={ref}
        viewBox='0 0 1350 900'
        width={'100%'}
      />
      <p style={{position: 'absolute', top: '16px', left: '16px'}}>{clicked}</p>
    </div>
  )
}
export default App;