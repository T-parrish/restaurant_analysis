import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3';

function getDrawDims(width, height, margins) {
  return {
    drawWidth: (width - margins.left - margins.right) || 80,
    drawHeight: (height - margins.top - margins.bottom) || 40,
  }
}


const ScatterPlot = ({ width, height, state, dispatch }) => {
  const d3Ref = useRef(null);
  const drawDims = getDrawDims(width, height, state.margins)
  const padding = 50

  var xScale = d3.scaleLinear()
    .domain([d3.min(state.items, d => d.cook_time) - 20, d3.max(state.items, d => d.cook_time)])
    .range([padding, drawDims.drawWidth - padding * 2]);

  var yScale = d3.scaleLinear()
    .domain([d3.min(state.items, d => d.price_per_unit) - 20, d3.max(state.items, d => d.price_per_unit)])
    .range([drawDims.drawHeight - padding, padding * 2]);

  var diffScale = d3.scaleLinear().domain([0, d3.max(state.items, d => d.avg_diff)]).range(['#3281a8', '#38ff63']).interpolate(d3.interpolateHcl);

  // Paints the chart area, bubbles
  useEffect(() => {
    const svg = d3.select(d3Ref.current)

    try {
      console.log('trying to unmount nodes.... ')
      // svg.selectAll('circle').remove()
      svg.selectAll('g').remove()
    } catch (e) {
      console.log(e)
    }

    console.log('drawing graph....')
    const bubbles = svg.append("g")

    bubbles.selectAll('circle')
      .data(state.items)
      .join(
        enter => (
          enter.append("circle")
            .attr("cx", (d) => xScale(d.cook_time))
            .attr("cy", (d) => yScale(d.price_per_unit))
            .attr("r", (d) => 1)
            .attr("fill", (d) => { return diffScale(d.avg_diff) })
            .call(enter => (
              enter.transition().duration(1200)
                .attr('r', (d) => { return ((d['net_revenue (usd)'] / d.quantity) * 1.4) })
                .style("opacity", 1)
            ))
        ),
        update => (
          update.attr("fill", "lightgrey")
        ),
        exit => (
          exit.attr("fill", "tomato")
            .call(exit => (
              exit.transition().duration(1200)
                .attr("r", 0)
                .style("opacity", 0)
                .remove()
            ))
        ),
      )
      .on("mouseover", (d) => {
        const { quantity, net_revenue, avg_diff, name } = d.srcElement.__data__
        var xPosition = d.layerX;
        var yPosition = d.layerY;
        d3.select("#tooltip")
          .style("left", `${xPosition}px`)
          .style("top", `${yPosition}px`)
          .select("#dishName")
          .text(name)

        d3.select("#tooltip")
          .select("#netRev")
          .text(`$${(net_revenue / 100).toFixed(2)} total revenue`)

        d3.select("#tooltip")
          .select("#quantitySold")
          .text(`${quantity} sold`)

        d3.select("#tooltip")
          .select("#avgTip")
          .text(`$${(avg_diff / 100).toFixed(2)} average tip`)

        d3.select("#tooltip").classed('hidden', false)
      })
      .on("mouseout", () => {
        d3.select("#tooltip").classed('hidden', true)
      })

  }, [state.items, height, width])

  // Paints the axes
  useEffect(
    () => {
      const { drawWidth, drawHeight } = drawDims
      const svg = d3.select(d3Ref.current)
        .append('g')

      svg.append('g')
        .attr("transform", `translate(0, ${drawDims.drawHeight - padding})`)
        .call(d3.axisBottom(xScale).ticks(10))

      svg.append("text")
        .attr("transform", `translate(${drawWidth / 2}, ${drawHeight})`)
        .style("text-anchor", "middle")
        .text("Time to make (seconds)")

      svg.append('g')
        .attr("transform", `translate(${padding}, 0)`)
        .call(d3.axisLeft(yScale).ticks(5))

      svg.append("text")
        .attr("x", `-${drawHeight / 2}`)
        .attr("y", `-${2}`)
        .attr("transform", "rotate(-90)")
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Cost Per Item (cents)");
    }, [height, width])

  return (
    <>
      <svg width={drawDims.drawWidth} height={drawDims.drawHeight} ref={d3Ref} />
      <div id='tooltip' className='hidden'>
        <p><span id="dishName"></span></p>
        <p><span id="quantitySold"></span></p>
        <p><span id="netRev"></span></p>
        <p><span id="avgTip"></span></p>
      </div>
    </>
  )
}

export default ScatterPlot