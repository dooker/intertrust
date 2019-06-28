import React, { useEffect, useState } from 'react';
import Config from './config';

const Panel = (props) => {
    const [state, setState] = useState({
        title: '',
        id: null,
        voltage: null,
        wattage: null,
        forecast: null
    });

    useEffect(() => {
        // fetchDataset();
        fetchFakeDataset();

        loopDataFetch();
    }, [])

    function loopDataFetch() {
        setTimeout(() => {
            // fetchDataset();
            fetchFakeDataset();

            // rerun
            loopDataFetch();
        }, Config.dataRefreshRate)
    }

    function fetchFakeDataset() {
        console.log("data generation");
        var title = props.point.replace(/_/g, ' ')
        var voltage = (Math.random(380)*1000).toFixed(Config.rounding);
        var wattage = (Math.random(50)*100000).toFixed(Config.rounding);

        // add to commented part!!!
        props.onWattageChange(parseFloat(wattage));

        setState({ title: title, id: props.point, voltage: voltage, wattage: wattage })
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

        // console.log(options);

        request(options, function (error, response, body) {
            if (error) {
                throw new Error(error);
            }

            var result = JSON.parse(body);
            var positionArray = result.SpatialExtent.coordinates;

            var pointPosition = getLongLAt(positionArray)

            debugger;

            setState({ title: result.Title, id: result.DataVendorKey })

            setCloudSolar(pointPosition.lat, pointPosition.lon);
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

    function setCloudSolar(lat, lon) {
        // http://api.planetos.com/v1/datasets/bom_access-g_global_40km/point?lon=-50.5&lat=49.5&apikey=<apikey>&var=av_ttl_cld&csv=true&count=50

        var request = require("request");
        var currentEndPoint = Config.endPoint + '/' + props.point + '/point';

        var options = {
            method: 'GET',
            url: currentEndPoint,
            qs: {
                count: 50,
                lon: lat,
                lat: lon,
                apikey: Config.apiKey
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
            <div className="panel-section forecast">{state.forecast}</div>
        </div>
    );
};

export default Panel;
