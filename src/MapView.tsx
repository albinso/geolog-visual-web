import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { GoogleMap, Marker, MarkerClusterer, Polyline, useLoadScript } from "@react-google-maps/api";
import { useLocations } from './UseLocations.ts';
import ReactSlider from 'react-slider';
import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker';
import Calendar from './Calendar.js';
import useAnimate from './useAnimate.ts';
import moment from 'moment';

export default function MapView() {

    const [num, setNum] = useState(400);
    const [date, setDate] = useState([moment(1688259968489), moment(1688259968489)]);
    const [speed, setSpeed] = useState(6);

    const { status, data, updateFunc, updateNoCache } = useLocations({ timeRange: [date[0].valueOf(), date[1].valueOf()], latitudeRange: [-90, 90], longitudeRange: [-180, 180], num: num });

    const [location, startAnimation, stopAnimation] = useAnimate({ locations: data, initSpeed: speed });
    const center = useMemo(() => ({ lat: location.latitude, lng: location.longitude }), [location]);


    useEffect(() => {
        console.log("Updating");
    }, [location]);

    return (
        <div className='map-container'>

            <div className='settings'>
                <h1>Map View</h1>
                { location && 
                (<div><h2>{moment(location.timestamp).format()}</h2>
                 <h2>{location.accuracy}</h2></div>)
                }

                <ReactSlider
                    className="horizontal-slider"
                    thumbClassName="example-thumb"
                    trackClassName="example-track"
                    min={1}
                    max={1000}
                    renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
                    value={num} onChange={(n, t) => setNum(n)}
                />
                <ReactSlider
                    className="horizontal-slider"
                    thumbClassName="example-thumb"
                    trackClassName="example-track"
                    min={1}
                    max={100}
                    renderThumb={(props, state) => <div {...props}>Hello: {state.valueNow}</div>}
                    value={speed} onChange={(n, t) => setSpeed(n)}
                />
                <button onClick={updateFunc}>Update</button>
                <button onClick={updateNoCache}>Update No Cache</button>
                <button onClick={startAnimation}>Animate</button>
                <button onClick={stopAnimation}>Stop</button>
                <Calendar callback={(e) => {
                    console.log("Setting dates");
                    console.log(e[0].format());
                    console.log(e[1].format());
                    setDate(e);
                }} />
            </div>

            <GoogleMap
                mapContainerClassName="map-container"
                center={center}
                zoom={10}
            >
                {
                    data.length >= 1 && location &&
                    <div>
                        <Marker position={{ lat: location.latitude, lng: location.longitude }} />
                        <Polyline path={data.map((d) => ({ lat: d.latitude, lng: d.longitude }))} />
                    </div>
                }

            </GoogleMap>
        </div>
    );
}