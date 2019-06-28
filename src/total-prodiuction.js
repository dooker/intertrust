import React, { useEffect } from 'react';
import Panel from './panel';

const TotalProduction = (props) => {
    console.log(props);

    return (
        <div className="total-production">
            Total production (kW): {props.power}
        </div>
    )
}

export default TotalProduction