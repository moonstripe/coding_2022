import React, { useRef, useEffect, useState } from 'react'
import {
    Box
} from '@mui/material'
import p5 from 'p5'

export const Gate = (props) => {
    const [size, setSize] = useState({ w: 400, h: 400 })
    let myRef = useRef(null)

    let magicAngle = -Math.asin(1 / Math.sqrt(3))

    useEffect(() => {
        let newSize = {
            x: myRef.current.offsetWidth,
            y: myRef.current.offsetHeight
        }
        setSize(newSize);

        myRef = new p5((s) => {

            s.setup = () => {
                s.createCanvas(props.width ? props.width : size.w, props.width ? props.width : size.h, s.WEBGL);
                s.ortho(-s.width / 2, s.width / 2, s.height / 2, -s.height / 2, -300, 8000)
            }

            s.draw = () => {
                s.ambientLight(255)
                s.background(props.bg);

                s.rotateX(s.QUARTER_PI);
                s.rotateY(magicAngle);


                let offset = 0
                s.translate(0, 40, 0)
                for (let x = 0; x < 3; x++) {
                    for (let y = 0; y < 3; y++) {
                        s.push();
                        

                        if (y === 1 && x === 1) {
                            
                            s.translate((s.tan((s.frameCount / 45) - offset) * 50) + s.width / 6, -y * 50 + s.height / 6, x * 50);
                            if ((s.tan((s.frameCount / 45) - offset) * 50) > 1) {
                                s.ambientMaterial(0)
                            } else {
                                s.normalMaterial()
                            }
                            s.box(s.sin((s.frameCount / 45) - offset) * 60, 45, 45);
                        } else {
                            s.translate( s.width / 6, -y * 50 + s.height / 6, x * 50);
                            s.box(s.sin((s.frameCount / 45) - offset) + 1 * 60, 45, 45);
                        }

                        s.pop();
                        offset -= 0.01
                    }
                }
            }

        }, myRef.current)
    }, [props])

    return <Box component='div' ref={myRef} />
}
