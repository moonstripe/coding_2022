import React, { useEffect, useRef } from 'react'
import p5 from 'p5';

export const Loading = (props) => {

    const { height } = props;


    let myRef = useRef()



    useEffect(() => {
        let isSubscribed = true;
        let w = myRef.current.offsetWidth

        let sketch = (s) => {

            let loadingX = Math.random() * 359;
            s.setup = () => {
                s.createCanvas(w, height);
            };


            s.draw = () => {
                // console.log(s.canvas)
                if (isSubscribed) {
                    s.background(s.map(s.sin(loadingX), 0, 1, 100, 150));
                    s.fill(255);
                    loadingX += 0.05
                } else {
                    s.noLoop();
                }
            };
        };

        let ref = myRef.current
        myRef = new p5(sketch, ref)
        // if (isSubscribed) {
        //     myRef = new p5(sketch, ref)
        // } else {
        //     myRef = new p5(done, ref)
        // }
        return () => {isSubscribed = false}
    })

    return (
        <div style={{ height: `${height}px` }} ref={myRef} />
    );
}