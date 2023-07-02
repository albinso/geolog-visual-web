import React, { Fragment, useMemo, useState } from 'react';
import { GoogleMap, Marker, MarkerClusterer, Polyline, useLoadScript } from "@react-google-maps/api";
import { useLocations } from './UseLocations.ts';
import ReactSlider from 'react-slider';
import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker';
import Calendar from './Calendar.js';

export default function MapView() {

    const [num, setNum] = useState(5);
    const [date, setDate] = useState([new Date(), new Date()]);

    const center = useMemo(() => ({ lat: 59.378543, lng: 18.004371 }), []);
    const { status, data, updateFunc, updateNoCache } = useLocations({ timeRange: [date[0].valueOf(), date[1].valueOf()], latitudeRange: [-90, 90], longitudeRange: [-180, 180], num: num });


    return (
        <div className='map-container'>

            <div className='settings'>
                <h1>Map View</h1>

                <ReactSlider
                    className="horizontal-slider"
                    thumbClassName="example-thumb"
                    trackClassName="example-track"
                    min={1}
                    max={1000}
                    renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
                    value={num} onChange={(n, t) => setNum(n)}
                />
                <button onClick={updateFunc}>Update</button>
                <button onClick={updateNoCache}>Update No Cache</button>
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
                    data.length >= 1 &&
                    <div>
                        <Marker position={{ lat: data[0].latitude, lng: data[0].longitude }} />
                        <Marker position={{ lat: data[data.length - 1].latitude, lng: data[data.length - 1].longitude }} />
                        <Polyline path={data.map((d) => ({ lat: d.latitude, lng: d.longitude }))} />
                    </div>
                }

            </GoogleMap>
        </div>
    );
}