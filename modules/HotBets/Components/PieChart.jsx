import React, { useEffect, useRef } from 'react';
import { drawPieChart } from '@utils/graph';

const PieChart = ({ data }) => {
    const ref = useRef(null);

    useEffect(() => {
        if (ref.current) {
            drawPieChart(ref.current, data);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref]);

    return (
        <div className="graph-container">
            <div className="graph" ref={ref} />
        </div>
    );
};

export default React.memo(PieChart);
