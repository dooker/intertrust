import React, { useEffect, useState } from 'react';
import Config from './config';
import cloud from './images/cloud.svg';
import solar from './images/solar.svg';

const Panel = (props) => {
    const [state, setState] = useState({
        title: '',
        id: null,
        voltage: null,
        wattage: null,
        solar: null,
        cloud: null,
        forecast: null
    });

    useEffect(() => {
        // fetchDataset();
        fetchFakeDataset();
        fetchFakeWeatherset();

        loopDataFetch();
        loopWeatherFetch();
    }, [])

    /**
     * Get data (title, voltage, wattage) of panel in loop
     */
    function loopDataFetch() {
        setTimeout(() => {
            // fetchDataset();
            fetchFakeDataset();

            // re-run
            loopDataFetch();
        }, Config.dataRefreshRate)
    }

    /**
     * Get weather (solar power, cloud coverage) of panel in loop
     */
    function loopWeatherFetch() {
        setTimeout(() => {
            // fetchWeatherset();
            fetchFakeWeatherset();

            // re-run
            loopWeatherFetch();
        }, Config.weatherRefreshRate)
    }

    function fetchFakeDataset() {
        console.log("data generation");
        var title = props.point.replace(/_/g, ' ')
        var voltage = (Math.random(380)*1000).toFixed(Config.rounding);
        var wattage = (Math.random(50)*100000).toFixed(Config.rounding);

        // add to commented part!!!
        props.onWattageChange(parseFloat(wattage));
        
        // setSolar();
        setState(state => {
            return {...state, title: title, id: props.point, voltage: voltage, wattage: wattage };
        });
    }

    function fetchFakeWeatherset() {
        var solar = (Math.random(100)*10).toFixed(Config.rounding);
        var cloud = (Math.random(100)).toFixed(Config.rounding);

        setState(state => {
            return {...state, solar: solar, cloud: cloud };
        });
    }

    function fetchDataset() {
        var currentEndPoint = Config.endPoint + '/' + props.point;

        var request = require("request");
        var options = {
            method: 'GET',
            url: currentEndPoint,
            qs: {
                apikey: Config.apiKey
            },
        };

        request(options, function (error, response, body) {
            if (error) {
                throw new Error(error);
            }

            var result = JSON.parse(body);
            var positionArray = result.SpatialExtent.coordinates;

            var pointPosition = getLongLAt(positionArray)

            debugger;

            setState({ title: result.Title, id: result.DataVendorKey })

            setSolar(pointPosition.lat, pointPosition.lon);
        });
    }

    /**
     * Not quite sure how to get point position as point query needs long/lat
     * Will get "random" first position set
     * @param {object} array - coordinates list from request
     */
    function getLongLAt(array) {
        var element = array[0];

        while (element.length !== 2) {
            element = element[0];
        }

        return { lat: element[0], lon: element[1] };
    }

    function setSolar() {
        // http://api.planetos.com/v1/datasets/bom_access-g_global_40km/point?lon=-50.5&lat=49.5&apikey=4d40032a9f2549f7927414be1293d0b1&var=av_swsfcdown&csv=true&count=50

        var request = require("request");
        // var currentEndPoint = Config.endPoint + '/' + props.point + '/point';
        var currentEndPoint = Config.endPoint + '/bom_access-g_global_40km/point';

        var options = {
            method: 'GET',
            url: currentEndPoint,
            qs: {
                lon: -50.5,
                lat: 49.5,
                apikey: Config.apiKey,
                var: "av_swsfcdown",
                count: 50
            },
        };
        
        request(options, function (error, response, body) {
            if (error) throw new Error(error);
        
            var result = JSON.parse(body);
            debugger;

            // setState({ title: result.Title, id: result.DataVendorKey })
        });
    }

    return (
        <div className="panel">
            <div className="panel-section identification">
                <div className="title">{state.title}</div>
                <div className="id">{state.id}</div>
            </div>
            <div className="panel-section values">
                <div className="voltage">{state.voltage} V</div>
                <div className="wattage">{state.wattage} kW</div>
            </div>
            <div className="panel-section weather">
                <div className="solar">
                    <img src={solar} alt="solar" />
                    <span>{state.solar}</span>
                </div>
                <div className="clouds">
                    <span>{state.cloud} %</span>
                    <img src={cloud} alt="cloud" />
                </div>
                {state.forecast}
            </div>
        </div>
    );
};

export default Panel;
