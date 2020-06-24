import React, { useState, useEffect } from 'react'
import Quake from "./Quake";
import '../styles/app.css'

export default function Main() {
    const [earthQuakes, setEarthQuakes] = useState([])

    useEffect(() => {
        fetchEarthquakeData()
    }, [])

    const handleClick = event => {
        fetchEarthquakeData()
    }

    const fetchEarthquakeData = () => {
        const script = document.createElement('script');
        script.src = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojsonp?callback=eqfeed_callback';
        document.querySelector('head').appendChild(script);

        // jsonp callback, needs to be global
        window.eqfeed_callback = earthQuakes => {
            const isToday = date => (new Date().getDate() === new Date(date).getDate())
            const todaysQuakes = earthQuakes['features'].filter(e => isToday(e.properties.time))
            setEarthQuakes(todaysQuakes)
        }
    }

    return (
        <div>
            <button onClick={handleClick}>Update data</button>
            <h2>Today's US Earthquakes: {earthQuakes.length > 0 ? earthQuakes.length : " "}</h2>
            <div className="wrapper">
                {earthQuakes && earthQuakes.map(earthquake => {
                    console.log(earthquake)
                    return <Quake key={earthquake.id} data={earthquake}/>
                })}
            </div>
        </div>
    )
}
