import React, { useEffect, useState } from 'react';
import Config from './config';
import Panel from './panel';
import TotalPoduction from './total-prodiuction';

const Dashboard = () => {
    const panels = [];
    const [panelsList, setPanelsList] = useState([]);
    const [totalWattage, setTotalWattage] = useState(0);
    let newWattage = 0;

    useEffect(() => {
        getPoints();
    }, [])

    /**
     * Get first 30 points from API
     */
    function getPoints() {
        var request = require("request");
        var options = {
            method: 'GET',
            url: Config.endPoint,
            qs: {
                apikey: Config.apiKey
            },
        };

        request(options, function (error, response, body) {
            if (error) {
                throw new Error(error.statusText);
            }

            var result = JSON.parse(body);
            var points = result.slice(0, Config.resultsLimit);

            generatePanelsList(points);
        });
    }

    /**
     * Generate panels grid
     * @param {Array.<String>} points - array of point IDs
     */
    function generatePanelsList(points) {
        for (let i = 0; i < points.length; i++) {
            panels.push(<Panel point={points[i]} className="panel" key={i} totalWattage={totalWattage} onWattageChange={updateTotalWattage}/>)
        }

        setPanelsList(panels);
    }

    /**
     * Collect all panels wattage and compine it for total value
     * @param {Number} value - panel wattage
     */
    function updateTotalWattage(value) {
        newWattage = newWattage + value;

        setTotalWattage(parseFloat(newWattage).toFixed(Config.rounding));
    }

    return (
        <div>
            <div className="solar-panels">
                {panelsList}
            </div>
            <TotalPoduction power={totalWattage} />
        </div>
    );
};

export default Dashboard;
