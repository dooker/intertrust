import React, { useEffect } from 'react';
import Panel from './panel';

const TotalProduction = () => {
    const totalkW = 0;

    useEffect(() => {
        getTotalFromPanels();
    }, [])

    function getTotalFromPanels() {
        console.log(Panel.state);
    }

    return (
        <div className="total-production">
            Total production (kW): {totalkW}
        </div>
    )
}

export default TotalProduction