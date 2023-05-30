import React, { useEffect, useRef } from 'react'
import p5 from 'p5'
import { Box } from '@mui/material'

import { Circle } from '../utils/circle';

export const MainSketch = (props) => {
    let founderRef = useRef(null)
    useEffect(() => {
        founderRef = new p5((s) => {
            let img;
            let circles;

            function newCircle() {
                var x = s.random(0, img.width);
                var y = s.random(0, img.height);

                var valid = true;
                for (var i = 0; i < circles.length; i++) {
                    var circle = circles[i];
                    var d = s.dist(x, y, circle.x, circle.y);
                    if (d - 1 < circle.r) {
                        valid = false;
                        break;
                    }
                }
                if (valid) {
                    var index = (s.int(x) + s.int(y) * img.width) * 4;
                    var r = img.pixels[index];
                    var g = img.pixels[index + 1];
                    var b = img.pixels[index + 2];
                    var c = s.color(r, g, b);
                    return new Circle(s, x, y, s.color(c));
                } else {
                    return null;
                }
            }

            s.preload = () => {
                img = s.loadImage(`assets/${Math.floor(Math.random() * (Math.floor(48) - Math.ceil(1)) + Math.ceil(1))}.jpeg`);
            }
            s.setup = () => {
                if (img.width > img.height) {
                    img.resize(window.innerWidth, 0)
                } else {
                    img.resize(0, window.innerHeight)
                }
                s.createCanvas(img.width, img.height);
                var density = s.displayDensity();
                s.pixelDensity(1);
                img.loadPixels();
                circles = [];

                console.log('pixels', img.pixels.length);
                console.log(density);

                var total = Math.floor(img.pixels.length / 100);

                for (let i = 0; i < total; i++) {
                    var newC = newCircle();
                    if (newC !== null) {
                        circles.push(newC);
                    }
                }


            }
            s.draw = () => {
                s.background(255);


                for (var i = 0; i < circles.length; i++) {
                    var circle = circles[i];


                    for (var j = 0; j < circles.length; j++) {
                        var other = circles[j];
                        if (circle !== other) {
                            var d = s.dist(circle.x, circle.y, other.x, other.y);
                            var distance = circle.r + other.r;

                            if (d - 1 < distance) {
                                circle.growing = false;
                                break;
                            }
                        }
                    }

                    circle.show();
                }
                if (props.setLoaded) {
                    props.setLoaded()
                }
                s.noLoop();
            }
        }, founderRef.current)
    }, [])



    return <Box ref={founderRef} />
}