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
        // getPoints();

        // remove debugger on build
        generatePanelsList(["noaa_blended_sea_winds_clim_global", "nasa_gldas_lwc_monthly", "noaa_etopo_global_1arcmin", "nasa_grctellus_land", "nasa_grctellus_ocean", "socat_v4_yearly", "noaa_rtofs_surface_1h_diag", "ncep_cfsr_global_03", "rss_ccmp_winds_v2", "noaa_swan_houston", "noaa_swan_corpus_christi", "noaa_swan_brownsville", "noaa_swan_lake_charles", "noaa_swan_miami", "noaa_swan_melbourne", "noaa_swan_san_juan", "noaa_swan_jacksonville", "noaa_swan_new_orleans", "noaa_swan_pensacola", "noaa_swan_tampa", "noaa_swan_tallahassee", "noaa_icoads_enhanced_1d_day", "hycom_glbu0.08_91.2_global_0.08d", "gpcc_first_guess_daily", "noaa_ww3_ak", "noaa-ncep_gefs", "dwd_wam_europe", "noaa_ww3_global_history", "cams_nrt_forecasts_global", "dwd_wam_global"]);
        // generatePanelsList(["noaa_blended_sea_winds_clim_global", "nasa_gldas_lwc_monthly", "noaa_etopo_global_1arcmin"]);
        // generatePanelsList(["noaa_blended_sea_winds_clim_global"]);
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
