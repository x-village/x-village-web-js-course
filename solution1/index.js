(function() {
  const ONLY_SHOW_TOP_NUM = 30;

  const margin = {
    top: 40,
    right: 100,
    bottom: 30,
    left: 40,
  };
  const width = 960 - margin.left - margin.right;
  const height = 550 - margin.top - margin.bottom;

  const svg = d3
    .select('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  const x = d3.scaleLinear().range([0, width]);
  const y = d3.scaleBand().range([height, 0]);

  const xAxis = d3.axisTop(x);
  const yAxis = d3.axisLeft(y);

  // Load data
  d3.csv('./data.csv', function(d) {
      return {
        date: d.交易年月日,
        price: +d['單價(元/平方公尺)'],
        area: d.鄉鎮市區,
      };
    }).then(function(data) {
      console.log(data);
      display({
        averageData:  getAverageLandPriceByArea(data) || [],
        medianData: getMedianLandPriceByArea(data) || [],
      });
    });

  function sortTopPrice(data, num) {
    return data
      .sort(function(a, b) {
        return a.price - b.price;
      })
      .slice(data.length - num);
  }

  function display(dataset) {
    console.log('AverageLandPriceByArea ->', dataset.averageData);
    console.log('MedianLandPriceByArea ->', dataset.medianData);

    const data = sortTopPrice(dataset.averageData, ONLY_SHOW_TOP_NUM);
    setDomain(data);

    svg
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + -2 + ')')
      .call(xAxis);

    svg
      .append('g')
      .attr('class', 'y axis')
      .call(yAxis);

    svg
      .append('text')
      .attr('transform', 'translate(' + width + ' , 0)')
      .attr('y', -25)
      .attr('x', margin.right - 30)
      .attr('dy', '1em')
      .style('font-size', '13px')
      .style('text-anchor', 'middle')
      .text('（元／坪）');

    svg
      .selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', 0)
      .attr('height', y.bandwidth())
      .attr('y', function(d) {
        return y(d.area);
      })
      .attr('width', function(d) {
        return x(d.price);
      })
      .on('mouseover', function() {
        tooltip.style('display', null);
      })
      .on('mouseout', function() {
        tooltip.style('display', 'none');
      })
      .on('mousemove', function(d) {
        var xPosition = d3.mouse(this)[0] - 10;
        var yPosition = d3.mouse(this)[1] - 30;
        tooltip.attr(
          'transform',
          'translate(' + xPosition + ',' + yPosition + ')'
        );
        tooltip.select('text').text(d.price.toFixed(2));
      });

    var tooltip = svg
      .append('g')
      .attr('class', 'tooltip')
      .style('display', 'none');

    tooltip
      .append('rect')
      .attr('width', 100)
      .attr('height', 20)
      .attr('fill', 'rgba(0, 0, 0, 0.8)');

    tooltip
      .append('text')
      .attr('x', 30)
      .attr('dy', '1.2em')
      .style('text-anchor', 'middle')
      .style('fill', 'red')
      .attr('font-size', '12px');

    document.getElementById('avg-btn').addEventListener('click', function() {
      update(sortTopPrice(dataset.averageData, ONLY_SHOW_TOP_NUM));
    });

    document.getElementById('median-btn').addEventListener('click', function() {
      update(sortTopPrice(dataset.medianData, ONLY_SHOW_TOP_NUM));
    });
  }

  function setDomain(data) {
    x.domain([
      0,
      d3.max(data, function(d) {
        return d.price;
      }),
    ]);

    y.domain(
        data.map(function(d) {
          return d.area;
        })
      )
      .paddingInner(0.1);
  }

  function update(data) {
    setDomain(data);

    svg
      .selectAll('.bar')
      .data(data)
      .transition()
      .duration(1000)
      .attr('y', function(d) {
        return y(d.area);
      })
      .attr('width', function(d) {
        return x(d.price);
      });

    // Update X Axis
    svg
      .select('.x.axis')
      .transition()
      .duration(1000)
      .call(xAxis);

    // Update Y Axis
    svg
      .select('.y.axis')
      .transition()
      .duration(100)
      .call(yAxis);
  }
})();