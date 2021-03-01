import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3';


const StackedBarChart = (props) => {
  const d3Ref = useRef(null);
  const { width, height, state, dispatch } = props
  useEffect(
    () => {
      if (state.data && d3Ref.current) {
        const svg = d3.select(d3Ref.current);

        // Bind D3 data
        const update = svg
          .append('g')
          .selectAll('text')
          .data(props.data);

        // Enter new D3 elements
        update.enter()
          .append('text')
          .attr('x', (d, i) => i * 25)
          .attr('y', 40)
          .style('font-size', 64)
          .text((d) => d);

        // Update existing D3 elements
        update
          .attr('x', (d, i) => i * 40)
          .text((d) => d);

        // Remove old D3 elements
        update.exit()
          .remove();
      }
    }, [props.data, d3Ref.current])
  return (
    <svg
      className="d3-component"
      width={width}
      height={height}
      ref={d3Ref}
    />
  )
}

export default StackedBarChart
