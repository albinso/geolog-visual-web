import { useEffect, useState } from "react";

export default function useAnimate({ locations, initSpeed }) {

    const [location, setLocation] = useState({ latitude: 59.378543, longitude: 18.004371, timestamp: 0 });
    const [index, setIndex] = useState(1);
    const [count, setCount] = useState(0);
    const [animating, setAnimating] = useState(false);
    const [speed, setSpeed] = useState(initSpeed);

    function delay(time, divisor = 1) {
        let actualTime = time/divisor;
        if (actualTime > 20000) {
            actualTime = 20000;
        }
        console.log("Delay of " + time/divisor + " ms");
        return new Promise(resolve => setTimeout(resolve, actualTime));
    }

    function startAnimation() {
        setAnimating(true);
        if (count > locations.length) {
            console.log("Count reached!");
            return;
        }
        setCount(count + 1);
        setIndex(index + 1);
        let i = locations.length-index;
        delay(10).then(() => {
            console.log("Delay of 1 sec finished");
            if (i > 0) {
                delay(locations[i-1].timestamp - locations[i].timestamp, speed).then(() => {
                    setLocation(locations[i]);
                });
            }
        });
    }

    useEffect(() => {
        if (animating) {
            startAnimation();
        }
    }, [location]);

    useEffect(() => {
        setSpeed(initSpeed);
    }, [initSpeed]);

    return [location, startAnimation];

}