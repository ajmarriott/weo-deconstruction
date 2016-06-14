
var GMRCharts =
{
    BaseURL: "http://energyintel1.blob.core.windows.net/charts/",

    InitializeCharts: function (wrapper) {
        if (typeof wrapper === 'undefined') {
            wrapper = '';
        } else {
            wrapper = '#' + wrapper + ' ';
        }

        $(wrapper + 'div[data-type=chart]').each(function (key, value) {
            var chartId = 'dynamicChart' + key;
            var chartSelector = wrapper + '#dynamicChart' + key;
            var chartDataLink = GMRCharts.BaseURL + $(this).data('link');
            var chartType = $(this).data('charttype')
            $(this).html('<div id="' + chartId + '"' + ' class="gmrChart"></div>');

            GMRCharts.UploadChartData(chartSelector, chartType, chartDataLink);
        });
    },

    UploadChartData: function (chartSelector, chartType, chartDataLink) {

        $.support.cors = true;
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE ");

        if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
            $.ajax({
                type: 'GET',
                url: chartDataLink,
                dataType: 'json',
                contentType: 'application/json'
            }).done(function (response) {
                GMRCharts.DrawGMRChart(chartSelector, chartType, chartDataLink, response);
            })
                .fail(function (xhr, status, error) {
                    console.log(error);
                });

        } else {

            var xhr = createCORSRequest('GET', chartDataLink);
            if (!xhr) {
                console.log('CORS not supported');
            }

            xhr.onload = function () {
                var response = JSON.parse(xhr.responseText);
                GMRCharts.DrawGMRChart(chartSelector, chartType, chartDataLink, response);
            };

            xhr.onerror = function () {
                console.log('Error was occured while data load!');
            };

            xhr.send();
        }
    },

    DrawGMRChart: function (chartSelector, chartType, chartDataLink, response) {

        switch (chartType) {
            case 'gas-caiso':
                GMRCharts.drawGasEquivalentCaiso(chartSelector, response);
                break;
            case 'gas-ercot':
                GMRCharts.drawGasEquivalentErcot(chartSelector, response);
                break;
            case 'power-spark-spreads':
                GMRCharts.drawNaturalGasPowerSparkSpreads(chartSelector, response);
                break;
            case 'gas-replace':
                GMRCharts.drawGasNeededToReplaceOffLineNuclearCapacity(chartSelector, response);
                break;
            case 'gas-natural-futures':
                GMRCharts.drawNymexHenryHubFuturePriceCurves(chartSelector, response);
                break;
            case 'baker-hughes':
                GMRCharts.drawBakerHughesUSGasRigCount(chartSelector, response);
                break;
            case 'gas-critical-notices':
                GMRCharts.drawCriticalNoticesInLast7Days(chartSelector, response);
                break;
            case 'top5':
                GMRCharts.drawTop5UpwardDownward(chartSelector, response);
                break;
            case 'gas-natural-storage':
                GMRCharts.drawNorthAmericanNaturalGasStorage(chartSelector, response);
                break;
            case 'degree_days_chart':
                response.title = "Degree Days";//TODO: add title into degree days json generation method
                GMRCharts.drawWeatherDegreeDays(chartSelector, response);
                break;
        };

        $(GMRCharts.getSelector(chartSelector)).before('<div class="chart-title">' + response.title + '</div>');
        if (chartType == 'degree_days_chart') {
            $(GMRCharts.getSelector(chartSelector)).after('<div class="chart-footnote">' + GMRCharts.getFootNote(response) + '</div>');
        }
        else {
            var hostName = typeof EIGFBASiteURL != 'undefined' ? EIGFBASiteURL : "http://www.energyintel.com";
            $(GMRCharts.getSelector(chartSelector)).after('<div class="chart-footnote">' + GMRCharts.getFootNote(response) + '</div><div class="download-data-chart"><a href="' + hostName + '/create.csv?datalink=' + chartDataLink + '">Export Data</a></div>');
        }

    },
    getSelector: function (chartSelector, series) {
        if (typeof series === 'undefined') {
            return chartSelector + ' svg';
        }
        series = series.split(' ').join('-').replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '-');;
        return chartSelector + ' .c3-target-' + series;
    },
    getLineSelector: function (chartSelector, series) {
        if (typeof series === 'undefined') {
            return chartSelector + ' svg';
        }
        series = series.split(' ').join('-').split('/').join('-');
        return chartSelector + ' .c3-lines-' + series + ' path';
    },
    getFootNote: function (response) {
        if (typeof response.footnotes === 'undefined')
            return '';
        return 'Note: ' + response.footnotes
    },
    drawPrintCharts: function (wrapper, callback) {
        GMRCharts.InitializeCharts(wrapper);
        GMRTables.InitializeTablesForPrint(wrapper, true);
        GMRMaps.InitializeMaps();

        setTimeout(function () {
            if (typeof (callback) === 'function') {
                callback();
            }
        }, 1200);
    },
    drawWeatherDegreeDays: function (chartSelector, response) {

        var ddData = response;

        var chart = c3.generate({
            bindto: chartSelector,
            size: {
                width: 600,
                height: 400
            },
            data: {
                labels: {
                    format: {
                        data2: function (v, id, i, j) { return ddData.labels[i]; },
                    }
                },
                columns: [
     ['data1'].concat(ddData.data1),
     ['data2'].concat(ddData.data2),
     ['data3'].concat(ddData.data3),
     ['data4'].concat(ddData.data4Points),
                ],
                names: {
                    data1: 'CDD',
                    data2: 'HDD',
                    data3: 'CDD Avg',
                    data4: 'HDD Avg'
                },
                colors: {
                    data1: '#1f77b4',
                    data2: '#ff7f0e',
                    data3: '#0000ff',
                    data4: '#d62728'
                },
                order: null,
                types: {
                    data1: 'bar',
                    data2: 'bar'
                },
                groups: [
     ['data1', 'data2']
                ]
            },
            axis: {
                x: {
                    type: 'category',
                    categories: ddData.dates
                }
            },
            tooltip: {
                format: {

                    value: function (value, ratio, id, i) {
                        if (id === 'data4')
                            return ddData.data4[i];
                        else
                            return value;
                    }
                }
            },
            legend: {
                item: {
                    onclick: function (id) { return; }
                }
            }
        });

    },
    drawGasEquivalentCaiso: function (chartSelector, response) {

        var data = [];

        data.push(response.FieldNames);
        data = data.concat(response.Values);

        var colorCodes = ['#4f81bd', '#9bbb59', '#c0504d', 'black', 'grey'];

        colors = {};

        var xrow = data[0][0];
        var yrows = data[0].slice(1);

        var axes = {};

        axes[yrows[3]] = 'y2';
        axes[yrows[4]] = 'y2';

        var types = {};

        types[yrows[3]] = 'line';
        types[yrows[4]] = 'line';

        $.each(yrows, function (i, item) {
            colors[yrows[i]] = colorCodes[i];
        });

        var chart = c3.generate({
            bindto: chartSelector,
            size: {
                height: 300,
                width: 600
            },
            data: {
                rows: data,
                axes: axes,
                x: xrow,
                xFormat: '%Y-%m-%d',
                type: 'bar',
                types: types,
                colors: colors,
                groups: [
                    [yrows[0], yrows[1], yrows[2]]
                ]
            },
            grid: {
                y: {
                    show: true
                }
            },
            point: {
                show: false
            },
            axis: {
                y: {
                    show: true,
                    label: response.units_left[0]
                },
                y2: {
                    show: true,
                    label: response.units_right[0]
                },
                x: {
                    type: 'timeseries',
                    tick: {
                        fit: true,
                        format: "%e %b"
                    }
                }
            }
        });

        chart.load({

            done: function () {

            }
        });

        $(GMRCharts.getSelector(chartSelector, yrows[4])).css('stroke-dasharray', '5,5');
    },
    drawGasEquivalentErcot: function (chartSelector, response) {

        var data = [];

        data.push(response.FieldNames);
        data = data.concat(response.Values);

        var colorCodes = ['#4f81bd', 'black', 'grey'];

        colors = {};

        var xrow = data[0][0];
        var yrows = data[0].slice(1);

        var axes = {};

        axes[yrows[1]] = 'y2';
        axes[yrows[2]] = 'y2';

        var types = {};

        types[yrows[1]] = 'line';
        types[yrows[2]] = 'line';

        $.each(yrows, function (i, item) {
            colors[yrows[i]] = colorCodes[i];
        });

        var chart = c3.generate({
            size: {
                height: 300,
                width: 600
            },
            bindto: chartSelector,
            data: {
                rows: data,
                axes: axes,
                x: xrow,
                xFormat: '%Y-%m-%d',
                type: 'bar',
                types: types,
                colors: colors
            },
            grid: {
                y: {
                    show: true
                }
            },
            point: {
                show: false
            },
            axis: {
                y: {
                    show: true,
                    label: response.units_left[0]
                },
                y2: {
                    show: true,
                    label: response.units_right[0]
                },
                x: {
                    type: 'timeseries',
                    tick: {
                        fit: true,
                        format: "%e %b"
                    }
                }
            }
        });

        $(GMRCharts.getSelector(chartSelector, yrows[2])).css('stroke-dasharray', '5,5');
    },
    drawGasNeededToReplaceOffLineNuclearCapacity: function (chartSelector, response) {
        var data = [];

        data.push(response.FieldNames);
        data = data.concat(response.Values);


        var colorCodes = ['#404f57', '#00569c', '#4d8a94', '#eb5e2a', '#5c3a63', '#cf762d', '#875680'];

        colors = {};

        var xrow = data[0][0];
        var yrows = data[0].slice(1);

        var types = [];

        types[yrows[5]] = 'line';
        types[yrows[6]] = 'line';

        $.each(yrows, function (i, item) {
            colors[yrows[i]] = colorCodes[i];
        });

        var chart = c3.generate({
            size: {
                height: 300,
                width: 600
            },
            bindto: chartSelector,
            data: {
                rows: data,

                x: xrow,
                // xFormat: '%e %d',
                type: 'bar',
                types: types,
                colors: colors,
                groups: [[yrows[0], yrows[1], yrows[2], yrows[3], yrows[4]]],
                labels: {
                    format: function (v, id, i, j) {
                        return id == yrows[5] ? v : '';
                    }
                }
            },
            grid: {
                y: {
                    show: true
                }
            },
            point: {
                show: false
            },
            axis: {
                y: {
                    show: true,
                    label: response.units[0]
                },
                x: {
                    type: 'category',
                    //tick: {
                    //    fit: true,
                    //    format: "%e %b"
                    //}
                }
            }
        });

        $(GMRCharts.getSelector(chartSelector, yrows[6])).css('stroke-dasharray', '5,5');
    },
    drawNymexHenryHubFuturePriceCurves: function (chartSelector, response) {

        var data = [];

        data.push(response.FieldNames);
        data = data.concat(response.Values);


        var colorCodes = ['#4f81bd', 'grey', 'violet', 'orange', 'green'];

        colors = {};

        var xrow = data[0][0];
        var yrows = data[0].slice(1);

        var types = [];

        types[yrows[0]] = 'line';
        types[yrows[1]] = 'line';

        $.each(yrows, function (i, item) {
            colors[yrows[i]] = colorCodes[i];
        });

        var chart = c3.generate({
            size: {
                height: 300,
                width: 600
            },
            bindto: chartSelector,
            data: {
                rows: data,

                x: xrow,
                // xFormat: "%m'%Y",
                type: 'line',
                types: types,
                colors: colors
            },
            grid: {
                y: {
                    show: true
                }
            },
            point: {
                show: false
            },
            axis: {
                y: {
                    show: true,
                    label: response.units[0],
                    tick: {
                        format: function (d) {
                            var df = Number(d3.format('.2f')(d));
                            return df;
                        }
                    }
                },
                x: {
                    type: 'category'
                }
            }
        });

        $(GMRCharts.getSelector(chartSelector, yrows[1])).css('stroke-dasharray', '5,5');
        $(GMRCharts.getLineSelector(chartSelector, yrows[2])).css('stroke-width', '1');
        $(GMRCharts.getLineSelector(chartSelector, yrows[3])).css('stroke-width', '1');
        $(GMRCharts.getLineSelector(chartSelector, yrows[4])).css('stroke-width', '1');
    },
    drawBakerHughesUSGasRigCount: function (chartSelector, response) {

        var data = [];

        data.push(response.FieldNames);
        data = data.concat(response.Values);


        var colorCodes = ['#4f81bd', '#9bbb59', '#c0504d'];

        colors = {};

        var xrow = data[0][0];
        var yrows = data[0].slice(1);

        var types = [];

        types[yrows[0]] = 'line';
        types[yrows[1]] = 'line';

        $.each(yrows, function (i, item) {
            colors[yrows[i]] = colorCodes[i];
        });

        var chart = c3.generate({
            size: {
                height: 300,
                width: 600
            },
            bindto: chartSelector,
            data: {
                rows: data,

                x: xrow,
                xFormat: "%m/%d/%Y",
                type: 'line',
                types: types,
                colors: colors
            },
            grid: {
                y: {
                    show: true
                }
            },
            point: {
                show: false
            },
            axis: {
                y: {
                    show: true
                },
                x: {
                    type: 'timeseries',
                    tick: {
                        fit: true,
                        format: "%e %b %y"
                    }
                }
            }
        });

    },
    drawCriticalNoticesInLast7Days: function (chartSelector, response) {

        var data = [];

        data.push(response.FieldNames[0]);

        var categories = response.Values.map(function (value, index) {
            return value[0];
        });

        data = data.concat(response.Values.map(function (value, index) {
            return value[1];
        }));

        var chart = c3.generate({
            bindto: chartSelector,
            size: {
                height: 400,
                width: 600
            },
            data: {
                columns: [data],
                type: 'bar'
            },
            legend: {
                hide: true
            },
            grid: {
                y: {
                    show: true
                }
            },
            axis: {
                rotated: true,
                x: {
                    // tick: { width: 100 },
                    type: 'category',
                    categories: categories
                }
            }
        });

        $(GMRCharts.getSelector(chartSelector)).before('<span>Sort: </span><select id="critical-notice-sort"><option value="name">Name</option><option value="count">Count</option></select>')

        $('#critical-notice-sort').change(function () {
            var value = $("select#critical-notice-sort option:selected")[0].value;

            if (value == 'count') {
                var firstItem = data.shift();
                var sorted = false;
                while (!sorted) {
                    sorted = true;
                    for (var i = 0; i < data.length; i++) {
                        if (data[i] > data[i + 1]) {
                            sorted = false;

                            var temp = data[i];
                            data[i] = data[i + 1];
                            data[i + 1] = temp;

                            temp = categories[i];
                            categories[i] = categories[i + 1];
                            categories[i + 1] = temp;
                        }
                    }
                }
                data.unshift(firstItem);
                chart.load({
                    columns: [data],
                    categories: categories
                });

            } else if (value == 'name') {
                var firstItem = data.shift();
                var sorted = false;
                while (!sorted) {
                    sorted = true;
                    for (var i = 0; i < categories.length; i++) {
                        if (categories[i] > categories[i + 1]) {
                            sorted = false;

                            var temp = data[i];
                            data[i] = data[i + 1];
                            data[i + 1] = temp;

                            temp = categories[i];
                            categories[i] = categories[i + 1];
                            categories[i + 1] = temp;
                        }
                    }
                }
                data.unshift(firstItem);
                chart.load({
                    columns: [data],
                    categories: categories
                });

            }
        })
    },
    drawTop5UpwardDownward: function (chartSelector, response) {
        var data = [];

        //  response.FieldNames[1] = 'Top 5 Upward';
        //   response.FieldNames[2] = 'Top 5 Downward';

        data.push(response.FieldNames);
        data = data.concat(response.Values);

        var colorCodes = ['#4f81bd', '#c0504d'];


        var xrow = data[0][0];
        var yrows = data[0].slice(1);


        var chart = c3.generate({
            bindto: chartSelector,
            size: {
                height: 300,
                width: 600
            },
            data: {
                rows: data,
                x: xrow,
                type: 'bar',
                //   colors: colors
                color: function (color, d) {
                    if (typeof d.index === "undefined")
                       return null;
                    if (d.index >= 5)
                        return '#c0504d';
                    else return '#4f81bd'

                }
            },
            grid: {
                y: {
                    show: true
                }
            },
            point: {
                show: false
            },
            legend: {
                show: false
            },
            axis: {
                y: {
                    show: true,
                    tick: {
                        format: function (d) {
                            return d + "%";
                        },

                    }
                },
                x: {
                    tick: {
                        rotate: -25,
                        multiline: false
                    },
                    type: 'category',
                    height: 60
                }
            }
        });

    },
    drawNorthAmericanNaturalGasStorage: function (chartSelector, response) {

        var data = [];

        data.push(response.FieldNames);
        data = data.concat(response.Values);


        var colorCodes = ['#558ed4', '#dae4f0'];

        colors = {};
        percents = [];

        var xrow = data[0][0];
        var yrows = data[0].slice(1);

        yrows.splice(1, 1);

        $.each(data, function (i, item) {
            if (i > 0) {
                percents.push(Math.round(item[1] / (item[2] / 100)));
            }
            item.splice(2, 1);
        });

        $.each(yrows, function (i, item) {
            colors[yrows[i]] = colorCodes[i];
        });

        var chart = c3.generate({
            bindto: chartSelector,
            size: {
                height: 300,
                width: 600
            },
            data: {
                rows: data,
                x: xrow,
                type: 'bar',
                colors: colors,
                groups: [
                     [yrows[0], yrows[1]]
                ],
                order: 'asc',
                labels: {
                    format: function (v, id, i, j) {
                        return id == yrows[0] ? percents[i] + '%' : '';
                    }
                }
            },
            grid: {
                y: {
                    show: true
                }
            },
            point: {
                show: false
            },
            legend: {
                show: false
            },
            axis: {
                y: {
                    label: response.units[0],
                    show: true
                },
                x: {
                    tick: {
                        multiline: false
                    },
                    type: 'category'
                }
            }
        });

    },
    drawNaturalGasPowerSparkSpreads: function (chartSelector, response) {

        var data = [];

        data.push(response.FieldNames);
        data = data.concat(response.Values);

        var colorCodes = ['#4f81bd', 'grey', 'orange', 'green', 'violet', 'black'];

        colors = {};

        var xrow = data[0][0];
        var yrows = data[0].slice(1);

        $.each(yrows, function (i, item) {
            colors[yrows[i]] = colorCodes[i];
        });

        var chart = c3.generate({
            size: {
                width: 600,
                height: 300
            },
            bindto: chartSelector,
            data: {
                rows: data,
                xFormat: "%m/%d/%Y",
                x: xrow,
                type: 'line',
                colors: colors
            },
            grid: {
                y: {
                    show: true
                }
            },
            point: {
                show: false
            },
            axis: {
                y: {
                    show: true
                },
                x: {
                    type: 'timeseries',
                    tick: {
                        format: "%e %b %y"
                    }
                }
            }
        });

        $(GMRCharts.getLineSelector(chartSelector, yrows[0])).css('stroke-width', '5').css('opacity', '0.6');
        $(GMRCharts.getLineSelector(chartSelector, yrows[1])).css('stroke-width', '5').css('opacity', '0.6');
        $(GMRCharts.getLineSelector(chartSelector, yrows[2])).css('stroke-width', '5').css('opacity', '0.6');
        $(GMRCharts.getLineSelector(chartSelector, yrows[3])).css('stroke-width', '5').css('opacity', '0.6');
        $(GMRCharts.getLineSelector(chartSelector, yrows[4])).css('stroke-width', '5').css('opacity', '0.6');
        $(GMRCharts.getLineSelector(chartSelector, yrows[5])).css('stroke-width', '5').css('opacity', '0.6');
    }
}