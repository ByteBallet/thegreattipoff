import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const LineChart = ({ data }) => {
    const svgRef = useRef();

    useEffect(() => {
        const width = 270;
        const height = 90;
        const margin = 10
        const yMinValue = d3.min(data, (d) => d.value);
        const yMaxValue = d3.max(data, (d) => d.value);
        const xMinValue = d3.min(data, (d) => d.label);
        const xMaxValue = d3.max(data, (d) => d.label);
        const svg = d3
            .select(svgRef.current)
            .style('overflow', 'visible')
            .append('g')
            .attr("width", width)
            .attr("height", height)
        //======
        const xScale = d3
            .scaleLinear()
            .domain([xMinValue, xMaxValue])
            .range([0 + margin, width - margin]);

        const yScale = d3
            .scaleLinear()
            .range([height, 0])
            .domain(d3.extent(data, function (d) { return d.value; }));

        const line = d3
            .line()
            .x((d) => xScale(d.label))
            .y((d) => yScale(d.value))
            .curve(d3.curveMonotoneX);
        //
        svg.append('g')
            .attr('transform', `translate(0,${height})`)
            .attr('stroke-width', '0.4')
            .attr('opacity', '.6')
        //

        svg.append('path')
            .datum(data)
            .attr('fill', 'none')
            .attr('stroke', '#94beeb')
            .attr('stroke-width', 2)
            .attr('class', 'line')
            .attr('d', line);
        svg.selectAll('.dot')
            .data(data)
            .enter()
            .append('circle')
            .attr('cx', (d) => xScale(d.label))
            .attr('cy', (d) => yScale(d.value))
            .attr('r', 2)
            .attr('fill', '#94beeb')
            .attr('stroke', '#94beeb')
            .attr('stroke-width', `${2}px`);
        //
        svg.append('g')
            .selectAll('text')
            .data(data)
            .enter()
            .append('text')
            .attr('x', function (d) {
                return xScale(d.label) + (d.label % 2 == 0 ? 15 : -15);
            })
            .attr('y', function (d) {
                return yScale(d.value) - (d.label % 2 == 0 ? +7 : +7);
            })
            .attr('fill', 'black')
            .attr('class', 'event-text')
            .text(function (d) {
                if (d.label === 1) {
                    return `$${d.value}`;
                } else if (d.label === data?.length) {
                    return `$${d.value}`;
                }
            })
            .style('color', 'red');
    }, []);

    return (
        <div>
            {/* <svg ref={svgRef} height="120" ></svg> */}
        </div>
    );
};

export default LineChart;
