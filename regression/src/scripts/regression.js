var regression = function () {
    "use strict";

    var containerId = "";
    var w = 700;
    var h = 500;

    var colors = ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'];

    var headline = "";                               // headline text
    var headlineColor = "black";                     // default headline text color
    var headlineSize = 18;                           // default headline text size
    var boldFlag = "normal";                         // default headline text bold

    var subHeadline = "";                            // subheadline text
    var subHeadlineColor = "black";                  // default subheadline text color
    var subHeadlineSize = 12;                        // default subheadline text size
    var subBoldFlag = "normal";                      // default subheadline text bold

    var seriesArray = [];
    var legendData = [];
    var xMaxData = 0;
    var xMinData = 1000000;
    var yMaxData = 0;
    var yMinData = 1000000;

    var smoothFlag = true;
    var borderWidth = 1;

    function Regression($container, RegressionData, options) {

        checkOptions(options);
        generateData(RegressionData);
        drawChart();

        function drawChart() {

            var option = {
                backgroundColor: '#fff',
                title: {
                    text: headline,
                    textStyle: {
                        fontWeight: boldFlag,
                        color: headlineColor,
                        fontSize: headlineSize
                    },
                    subtext: subHeadline,
                    subtextStyle: {
                        color: subHeadlineColor,
                        fontWeight: subBoldFlag,
                        fontSize: subHeadlineSize
                    },
                    x: 'left',
                    y: 0
                },
                grid: [
                    {
                        show: true,
                        x: '10%',
                        y: '10%',
                        width: '80%',
                        height: '70%',
                        top: '15%'
                    }
                ],
                toolbox: {
                    show: true,
                    feature: {
                        saveAsImage: {
                            show: true
                        }
                    }
                },
                tooltip: {
                    formatter: '{a}: ({c})'
                },
                legend: {
                    show: true,
                    data: legendData,
                    top: 0
                },
                xAxis: [
                    {
                        gridIndex: 0,
                        min: xMinData,
                        max: xMaxData
                    }
                ],
                yAxis: [
                    {
                        gridIndex: 0,
                        min: yMinData,
                        max: yMaxData
                    }
                ],
                series: seriesArray

            };

            //$container.height(h).width(w);
            $container.attr("style", "width: "+ w +"px; height: "+ h +"px;");

            //var dom = document.getElementById(containerId);
            var myChart = echarts.init($container.get(0));
            myChart.setOption(option, true);
            return $container;
        }
    }

    function checkOptions(options) {
        containerId = options.containerId || containerId;

        w = options.width || w;
        h = options.height || h;

        headline = options.title.text || headline;
        subHeadline = options.title.subText || subHeadline;

        if (options.title) {

            if ("" !== options.title.text) {
                headline = options.title.text || headline;
            } else {
                headline = "";
            }
            if ("" !== options.title.subText) {
                subHeadline = options.title.subText || subHeadline;
            } else {
                subHeadline = "";
            }
            if (options.title.textStyle) {
                headlineColor = options.title.textStyle.color || headlineColor;
                headlineSize = options.title.textStyle.fontSize || headlineSize;
                boldFlag = options.title.textStyle.fontWeight || boldFlag;
            }

            if (options.title.subTextStyle) {
                subHeadlineColor = options.title.subTextStyle.color || subHeadlineColor;
                subHeadlineSize = options.title.subTextStyle.fontSize || subHeadlineSize;
                subBoldFlag = options.title.subTextStyle.fontWeight || subBoldFlag;
            }
        }
    }

    function generateData(RegressionData) {
        var data = RegressionData.data;

        if ("linear" == RegressionData.type ) {
            smoothFlag = false;
        } else if ("ridge" == RegressionData.type) {
            borderWidth = 5;
        }

        data.forEach(function (d, index) {

            if (d.points && d.points.length > 0) {
                d.points.forEach(function (v) {
                    xMinData = xMinData < v[0] ? xMinData : v[0];
                    xMaxData = xMaxData > v[0] ? xMaxData : v[0];

                    yMinData = yMinData < v[1] ? yMinData : v[1];
                    yMaxData = yMaxData > v[1] ? yMaxData : v[1];
                });
            }

            if (d.line && d.line.length > 0) {
                d.line.forEach(function (v) {
                    xMinData = xMinData < v[0] ? xMinData : v[0];
                    xMaxData = xMaxData > v[0] ? xMaxData : v[0];

                    yMinData = yMinData < v[1] ? yMinData : v[1];
                    yMaxData = yMaxData > v[1] ? yMaxData : v[1];
                });
            }


            legendData.push({
                name: d.name
            });

            seriesArray.push(
                {
                    name: d.name,
                    type: 'scatter',
                    data: d.points,
                    itemStyle: {
                        normal: {
                            color: colors[index]
                        }
                    }
                },
                {
                    name: d.name,
                    type: 'line',
                    smooth: smoothFlag,
                    data: d.line,
                    lineStyle: {
                        normal: {
                            width: 1.5,
                            color: colors[index]
                        }
                    },
                    itemStyle: {
                        normal: {
                            borderWidth: borderWidth,
                            color: colors[index]
                        }
                    }
                }
            );
        });

        if (xMinData < 5 && xMinData > 0) {
            xMinData = 0;
        } else {
            if (xMinData < 0) {
                xMinData = xMinData - 5 - xMinData % 5
            } else {
                xMinData = xMinData - xMinData % 5;
            }
        }

        if (yMinData < 5 && yMinData > 0) {
            yMinData = 0;
        } else {
            if (yMinData < 0) {
                yMinData = yMinData - 5 - yMinData % 5
            } else {
                yMinData = yMinData - yMinData % 5;
            }
        }

        if (0 != xMaxData % 5) {
            xMaxData = xMaxData - xMaxData % 5 + 5;
        }

        if (0 != yMaxData % 5) {
            yMaxData = yMaxData - yMaxData % 5 + 5;
        }

    }

    return {
        createGraph: Regression
    }
}();