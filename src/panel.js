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
        cloud: null
    });

    useEffect(() => {
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
            fetchFakeWeatherset();

            // re-run
            loopWeatherFetch();
        }, Config.weatherRefreshRate)
    }

    /**
     * Generate fake data. Ideally from API but hopefully random generation does too
     */
    function fetchFakeDataset() {
        var title = props.point.replace(/_/g, ' ')
        var voltage = (Math.random(380)*1000).toFixed(Config.rounding);
        var wattage = (Math.random(50)*100000).toFixed(Config.rounding);

        props.onWattageChange(parseFloat(wattage));
        
        setState(state => {
            return { ...state, title: title, id: props.point, voltage: voltage, wattage: wattage };
        });
    }

    /**
     * Generate fake weather. Ideally from API but hopefully random generation does too
     */
    function fetchFakeWeatherset() {
        var solar = (Math.random(100)*10).toFixed(Config.rounding);
        var cloud = (Math.random(100)*100).toFixed(0);

        setState(state => {
            return { ...state, solar: solar, cloud: cloud };
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
            </div>
        </div>
    );
};

export default Panel;
