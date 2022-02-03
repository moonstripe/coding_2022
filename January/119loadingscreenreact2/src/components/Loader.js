import React, { useRef, useEffect } from 'react'
import p5 from 'p5'

export const Loader = (props) => {

    const { loaded, setLoaded, p } = props

    let myRef = useRef(null)

    useEffect(() => {
        console.log(loaded)

        myRef = new p5((s) => {
                    s.setup = () => {
                        // console.log(p)
                        s.createCanvas(200,200)
                        s.background(51)
                    }
                    s.draw = () => {
        
                    }
                }, myRef.current)

    

        // const timer = setTimeout(() => {
        //     setLoaded()
        // }, 2000)

        // return () => clearTimeout(timer)

        // if (p !== undefined) {
        //     myRef = new p5((s) => {
        //         console.log('loading')
        //         s.setup = () => {
        //             console.log(p)
        //             s.createCanvas(200,200)
        //             s.loadImage(p.url, img => {
        //                 s.image(img,0,0)
        //             })
        //             setLoaded()
        //         }
        //         s.draw = () => {
    
        //         }
        //     }, myRef.current)
            
        // } else {
        //     console.log('loading')
        //     myRef = new p5((s) => {
        //         console.log('loading')
        //         s.setup = () => {
        //             // console.log(p)
        //             s.createCanvas(200,200)
        //             s.background(51)
        //         }
        //         s.draw = () => {
    
        //         }
        //     }, myRef.current)
        //     setLoaded()
        // }

    
    },[loaded])

    return (
        <div ref={myRef}/>
    )
}