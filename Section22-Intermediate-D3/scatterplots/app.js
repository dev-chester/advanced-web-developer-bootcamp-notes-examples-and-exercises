let width   =   500, height = 500, padding = 30,
    yScale  =   d3.scaleLinear().domain(d3.extent(birthData2011,d=>d.lifeExpectancy)).range([height-padding,padding]),
    xScale  =   d3.scaleLinear().domain(d3.extent(birthData2011,d=>d.births/d.population)).range([padding,width-padding]),
    colorScale =   d3.scaleLinear().domain(d3.extent(birthData2011,d=>d.population/d.area)).range(["lightgreen","black"]),
    radiusScale = d3.scaleLinear().domain(d3.extent(birthData2011,d=>d.births)).range([2,40]),
    xAxis = d3.axisBottom(xScale).tickSize(-height+2*padding).tickSizeOuter(0),
    yAxis = d3.axisLeft(yScale).tickSize(-width+2*padding).tickSizeOuter(0);

let svg =   d3.select("svg")
                .attr("width",width)
                .attr("height",height);

let updateSelection =   svg
      .selectAll("circle")
      .data(birthData2011);

updateSelection
    .enter()
    .append("circle")
    .attr("cx",d=>xScale(d.births/d.population))
    .attr("cy",d=>yScale(d.lifeExpectancy))
    .attr("r",d=>radiusScale(d.births))
    .attr("fill",d=>colorScale(d.population/d.area));

svg
    .append("g")
    .attr("transform",`translate(0,${height-padding})`)
    .call(xAxis);

svg
    .append("g")
    .attr("transform",`translate(${padding},0)`)
    .call(yAxis);

    svg
        .append("text")
        .attr("x",width/2)
        .attr("y",padding-10)
        .text("Countries Birth Rate 2011")
        .style("text-anchor","middle")
        .attr("font-family","Arial")
        .attr("font-size","1.2em")
        .attr("fill","#444")
        .attr("font-weight","bold");

        svg
        .append("text")
        .attr("x",width/3)
        .attr("y",height-padding+5)
        .attr("dy","1.5em")
        .text("Births Per Capita")
        .attr("font-weight","bold");

        svg
        .append("text")
        .attr("x",height/3)
        .attr("y",0-0.18*padding)
        .attr("dy","0.22em")
        .text("Life Expectancy")
        .attr("transform","rotate(90)")
        .attr("font-weight","bold");


