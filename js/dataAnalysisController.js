	$( document ).ready(function() {
		var margin = {top: 60, right: 100, bottom: 50, left: 60};
		var w = 580 ;
		var h = 300 ;

		var dataset = [
			[ 
				{x: "2007", y: 106898}, 
				{x: "2008", y: 103937}, 
				{x: "2009", y: 99492}, 
				{x: "2010", y: 87213}, 
				{x: "2011", y: 101943},
				{x: "2012", y: 118848},
				{x: "2013", y: 103120}
			],
			[
				{x: "2007", y: 97516}, 
				{x: "2008", y: 94796}, 
				{x: "2009", y: 91818}, 
				{x: "2010", y: 79673}, 
				{x: "2011", y: 94684},
				{x: "2012", y: 110633}, 
				{x: "2013", y: 95993}
			],
		];
	
		var color_hash = {  0 : ["Men", "DodgerBlue"],
							1 : ["female", "black"]  
		}   
	
	
	
		var xScale = d3.scale.linear().domain([2007,2013]).range([50, w-50]);
		var yScale = d3.scale.linear().domain([70000,130000]).range([h, 0]);

		// Create SVG element
		var svg = d3.select('body').append('svg')
			.attr('width', w + margin.left + margin.right) 
			.attr('height', h + margin.top + margin.bottom)
			.attr("border",1)
			.append('g')
			.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');



		var line = d3.svg.line()
			.x(function(d,i) { 
				return xScale(d.x);
			})
			.y(function(d) { 
				return yScale(d.y);
			});

		var pathContainers = svg.selectAll('g.line').data(dataset);

		pathContainers.enter().append('g')
		    .attr('class', 'line')
		    .attr("style", function(d) {
			return "stroke: " + color_hash[dataset.indexOf(d)][1]; 
		});

		pathContainers.selectAll('path')
		.data(function (d) { return [d]; })
		.enter().append('path')
		  .attr('d', d3.svg.line()
			.x(function (d) { return xScale(d.x); })
			.y(function (d) { return yScale(d.y); })
		);

		// add circles
		pathContainers.selectAll('circle')
		.data(function (d) { return d; })
		.enter().append('circle')
		.attr('cx', function (d) { return xScale(d.x); })
		.attr('cy', function (d) { return yScale(d.y); })
		.attr('r', 3); 
	  

		var xAxis = d3.svg.axis().scale(xScale).orient("bottom").ticks(7);
		var yAxis = d3.svg.axis().scale(yScale).ticks(7).tickSize(-w).orient('left');

		svg.append('g')
			.attr('class', 'x axis')
			.attr('transform', 'translate(0,' + h + ')')
			.call(xAxis);


		svg.append('g')
			.attr('class', 'y axis')
			.attr('transform', 'translate(0,0)')
			.call(yAxis);

		// add legend   
		var legend = svg.append("g")
		    .attr("class", "legend")
		    .attr("x", w+15)
		    .attr("y", 25)
		    .attr("height", 100)
		    .attr("width", 100);

		legend.selectAll('g').data(dataset)
		  .	enter()
			.append('g')
			.each(function(d, i) {
				var g = d3.select(this);
				g.append("rect")
				  .attr("x", w+15)
				  .attr("y", (i+5)*25)
				  .attr("width", 10)
				  .attr("height", 10)
				  .style("fill", color_hash[String(i)][1]);
				
				g.append("text")
				  .attr("x", w +30)
				  .attr("y", (i+5) * 25 + 8)
				  .attr("height",30)
				  .attr("width",100)
				  .style("fill", color_hash[String(i)][1])
				  .text(color_hash[String(i)][0]);
			});
		
		
		
		svg.append("text")
        .attr("x", (w/2))             
        .attr("y", 0 - (margin.top/2))
        .attr("text-anchor", "middle") 
        .attr('fill', '#000')
        .style("font-size", "16px")
        .text("Birth in Taiwan");
		
		svg.append("text")
        .attr("x", (w/2))             
        .attr("y", 0 -( margin.top/4))
        .attr("text-anchor", "middle") 
        .attr('fill', '#000')
        .style("font-size", "12px")
        .text("Source: Ministry of the Interior");	
		
		svg.append("text")
		.attr("x", 0-(h/2)) 
		.attr("y", 0 -(margin.left/4)*3)
		.attr("text-anchor", "middle")
		.attr('fill', '#000')
		.attr("transform", "rotate(-90)")
		.style("font-size", "12px")
		.text("people");
		
  });
  


