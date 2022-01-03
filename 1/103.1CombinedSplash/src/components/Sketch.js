import React, { useEffect, useState } from 'react';
import { Rectangle, QuadTree, Vehicle } from '../utils';
import Sketch from "react-p5";

let qtree;
let textPoints1 = [];
let textPoints2 = [];
let vehiclePoints = [];
let font;
let vehicles = [];

export const P5Canvas = (props) => {

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setTimeout(() => { setIsLoaded(true) }, 2000)
    })

    const preload = (p5) => {
        font = p5.loadFont('./AvenirNextLTPro-Demi.otf');
    }

    const setup = (p5, canvasParentRef) => {
        // use parent to render the canvas in this ref
        // (without that p5 will render the canvas outside of your component)

        p5.createCanvas(window.innerWidth, window.innerHeight).parent(canvasParentRef);

        let boundary = new Rectangle(window.innerWidth / 2, window.innerHeight / 2, window.innerWidth / 2, window.innerHeight / 2)

        qtree = new QuadTree(p5, boundary, 4, 0);

        textPoints1 = font.textToPoints('moon', 100, 100, 100, {
            sampleFactor: 0.3
        })

        textPoints2 = font.textToPoints('stripe', 100, 200, 100, {
            sampleFactor: 0.3
        })

        textPoints1.forEach(pt => {
            const vehicle = new Vehicle(p5, pt.x, pt.y)
            vehicles.push(vehicle)
            qtree.insert(pt)
        });

        textPoints2.forEach(pt => {
            const vehicle = new Vehicle(p5, pt.x, pt.y)
            vehicles.push(vehicle)
            qtree.insert(pt)
        });

    };

    const draw = (p5) => {
        vehiclePoints = [];
        p5.background(40,40,40);
        vehicles.forEach((v, i) => {
            vehiclePoints.push(v);
            v.behaviors();
            v.update();
        });
        vehiclePoints.forEach((pt, i) => {
            qtree.insert({ x: pt.pos.x, y: pt.pos.y })
        })
        qtree.show();
        vehicles.forEach((v, i) => {
            v.show();
        });

    };


    return (
        <div>
            {isLoaded ? (<Sketch setup={setup} draw={draw} preload={preload} />) : (<h2>loading</h2>)}
        </div>
    )
};