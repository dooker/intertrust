import React from 'react';

const TotalProduction = (props) => {
    var nf = new Intl.NumberFormat();
    var power = nf.format(props.power);

    return (
        <div className="total-production">
            Total production (kW): {power}
        </div>
    )
}

export default TotalProduction