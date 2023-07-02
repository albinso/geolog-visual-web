import { useEffect, useState } from "react";

export default function useAnimate({ locations, initSpeed }) {

    const [location, setLocation] = useState({ latitude: 59.378543, longitude: 18.004371, timestamp: 0 });
    const [locationInferred, setLocationInferred]: any[] = useState([]);
    const [index, setIndex] = useState(1);
    const [count, setCount] = useState(0);
    const [animating, setAnimating] = useState(false);
    const [speed, setSpeed] = useState(initSpeed);

    function delay(time, divisor = 1) {
        let actualTime = time / divisor;
        if (actualTime > 20000) {
            actualTime = 20000;
        }
        console.log("Delay of " + time / divisor + " ms");
        return new Promise(resolve => setTimeout(resolve, actualTime));
    }

    function startAnimation() {
        setAnimating(true);
        if (count > locationInferred.length) {
            console.log("Count reached!");
            return;
        }
        setCount(count + 1);
        setIndex(index + 1);
        let i = locationInferred.length - index;
        console.log("Delay of 1 sec finished");
        if (i > 0) {
            delay(locationInferred[i - 1].timestamp - locationInferred[i].timestamp, speed).then(() => {
                setLocation(locationInferred[i]);
            });
        }
    }

    function stopAnimation() {
        setAnimating(false);
    }

    useEffect(() => {
        if (animating) {
            startAnimation();
        }
    }, [location]);

    useEffect(() => {
        setSpeed(initSpeed);
    }, [initSpeed]);

    useEffect(() => {
        for (let i = 0; i < locations.length - 1; i++) {
            locationInferred.push(locations[i]);
            let timeDiff = locations[i].timestamp - locations[i + 1].timestamp;
            let latDiff = locations[i].latitude - locations[i + 1].latitude;
            let longDiff = locations[i].longitude - locations[i + 1].longitude;
            let numSteps = Math.floor(timeDiff / 1000);
            if (numSteps > 20) {
                numSteps = 20;
            }
            let latStep = latDiff / numSteps;
            let longStep = longDiff / numSteps;
            for (let j = 0; j < numSteps; j++) {
                locationInferred.push({
                    latitude: locations[i].latitude - latStep * j,
                    longitude: locations[i].longitude - longStep * j,
                    timestamp: locations[i].timestamp - 1000 * j,
                    accuracy: locations[i+1].accuracy
                });
            }
        }

    }, [locations]);

    return [location, startAnimation, stopAnimation];

}