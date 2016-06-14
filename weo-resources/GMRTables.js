var GMRTables = 
{
    BaseURL: "https://energyintel1.blob.core.windows.net/tables/",

    InitializeTables: function (wrapper, forPrint) {

        if (wrapper != '') wrapper = '#' + wrapper + ' ';

        $(wrapper + 'div[data-type=table]').each(function (key, value) {

            var tableId = forPrint ? 'printTable' : 'dynamicTable';
            tableId += key;
            $('#' + tableId + "_wrapper").remove();
            var tableDataLink = GMRTables.BaseURL + $(this).data('link');
            var tableType = $(this).data('tabletype');

            if (typeof forPrint === 'undefined') {
                forPrint = false;
            }

            var showPagination = forPrint ? false : $(this).data('pagination');
            var showSearch = forPrint ? false : $(this).data('search');
            var showOrder = forPrint ? false : $(this).data('sort');
            var complexHeader = $(this).data('complexheader');
            var hostName =  typeof EIGFBASiteURL  != 'undefined' ? EIGFBASiteURL : "http://www.energyintel.com";
            $(this).html('<div id="' + tableId + '_title" class="table-header"></div><div class="download-data-table"><a href="' + hostName + '/create.csv?datalink=' + tableDataLink + '">Export Data</a></div><table id="' + tableId + '" class="display"><thead></thead></table><div id="' + tableId + '_footnotes" class="table-footnotes"></div>');
            GMRTables.UploadTableData(tableId, tableType, tableDataLink, showPagination, showSearch, showOrder, complexHeader);
        });
    },

    InitializeTablesForPrint: function (wrapper, callback) {

        GMRTables.InitializeTables(wrapper, true);

        setTimeout(function () {
            if (typeof (callback) === 'function') {
                callback();
            }
        }, 1000);

    },

    UploadTableData: function (tableId, tableType, tableDataLink, showPagination, showSearch, showOrder, complexHeader) {

        $.support.cors = true;

        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE ");

        if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {

        $.ajax({
            type: 'GET',
            url: tableDataLink,
            dataType: 'json',
                contentType: 'application/json'
            }).done(function (response) {
                GMRTables.DrawTable(tableId, tableType, tableDataLink, showPagination, showSearch, showOrder, complexHeader, response)
            })
           .fail(function (xhr, status, error) {
               console.log(error);
           });

        } else {

            var xhr = createCORSRequest('GET', tableDataLink);
            if (!xhr) {
                console.log('CORS not supported');
            }

            xhr.onload = function () {
                var response = JSON.parse(xhr.responseText);
                GMRTables.DrawTable(tableId, tableType, tableDataLink, showPagination, showSearch, showOrder, complexHeader, response)
            };

            xhr.onerror = function () {
                console.log('Error was occured while data load!');
            };

            xhr.send();
        }
    },

    DrawTable: function (tableId, tableType, tableDataLink, showPagination, showSearch, showOrder, complexHeader, data) {

        var columnsList = [];
                var title = data.title;
                var groupingColumnId = data.groupingColumnIndex ? parseInt(data.groupingColumnIndex[0]) : -1;
                var dataSet = data.Values;
                var footnotes = data.footnotes;                
                var itemPerPage = 50;
                showPagination = showPagination == true ? (dataSet.length <= itemPerPage ? false : true) : false;

                for (var i = 0; i < data.FieldNames.length; i++) {
                    var item = { "title": data.FieldNames[i] };
                    columnsList.push(item);
                }


                var aoColumnDefs;
                if (tableType == "degree_days_table") {
                    aoColumnDefs = [
                        { className: "dt-body-left", "targets": [0] },
                        { className: "dt-body-center", "targets": "_all" },
                        { "width": "145px", "targets": 0 },
                        {
                            "aTargets": Array.apply(null, { length: columnsList.length }).map(Number.call, Number),
                            "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
                                if (!isNaN(sData)) {
                                    if (parseInt(sData) < 0) {
                                        $(nTd).css('color', '#3232ca')
                                    }
                                    else {
                                        $(nTd).html('+' + sData);
                                        $(nTd).css('color', '#f25c5a')
                                    }
                                }
                            }
                        }
                    ];
                }

                var table;
                var options = {                  
                    "columns": columnsList,
                    data: dataSet,
                    paging: showPagination,
                    searching: showSearch,
                    "pageLength": itemPerPage,
                    ordering: showOrder,                  
                    "aoColumnDefs": aoColumnDefs
                }
                if (groupingColumnId != -1) {
                    options.columnDefs = [
                            { "visible": false, "targets": groupingColumnId },
                            { className: "dt-body-left", "targets": [1] },
                            { className: "dt-body-center", "targets": "_all" },
                                {
                                "aTargets": Array.apply(null, { length: columnsList.length }).map(Number.call, Number),
                                "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
                                    if (!isNaN(sData)) {
                                        if (sData % 1 != 0) {
                                            var leftPart = sData.toString().split(".")[0];
                                            var rightPart = sData.toString().split(".")[1];
                                            leftPart = leftPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                            if (rightPart === 'undefined') $(nTd).html(leftPart);
                                            else $(nTd).html(leftPart + '.' + rightPart);
                                        } else {
                                            if (sData) $(nTd).html(sData.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
                                        }
                                    }
                                }
                            }
                    ];

                    options.drawCallback = function (settings) {
                            var api = this.api();
                            var rows = api.rows({ page: 'current' }).nodes();
                            var last = null;

                            api.column(groupingColumnId, { page: 'current' }).data().each(function (group, i) {
                                if (last !== group) {
                                    $(rows).eq(i).before(
                                        '<tr class="group"><td colspan="' + columnsList.length + '">' + group + '</td></tr>'
                                    );
                                    last = group;
                                }
                            });
                    };
                } else {
                    options.columnDefs = [
                            { className: "dt-body-left", "targets": [0] },
                            { className: "dt-body-center", "targets": "_all" },
                                {
                            "aTargets": Array.apply(null, { length: columnsList.length }).map(Number.call, Number),
                            "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
                                    if (!isNaN(sData)) {
                                    if (sData % 1 != 0) {
                                        var leftPart = sData.toString().split(".")[0];
                                        var rightPart = sData.toString().split(".")[1];
                                        leftPart = leftPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                        if (rightPart === 'undefined') $(nTd).html(leftPart);
                                        else $(nTd).html(leftPart + '.' + rightPart);
                                    } else {
                                        if (sData) $(nTd).html(sData.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
                                    }
                                    }
                                }
                            }
                    ];
                }

                table = $("#" + tableId).DataTable(options);

                if (!showPagination && !showSearch && !showOrder) $('#' + tableId + '_wrapper .dataTables_info').hide();
                if (complexHeader) {
                    if (tableType == "gasforwardsreport") {
                        var dateHeader = data.date;
                        var headerColumns;
                        for (var i = 1; i < columnsList.length; i++) {
                            headerColumns += '<th>' + columnsList[i].title + '</th>';
                        }
                        table.tables().header().to$().html('<tr><th colspan="4">' + dateHeader + '</th></tr><tr>' + headerColumns + '</tr>');
                    } else if (tableType = "northamericanweeklygasstorage") {
                        var units = data.units;
                        var headerColumns;
                        headerColumns += '<tr>';
                        for (var i = 1; i < 3; i++) {
                            headerColumns += '<th rowspan="2">' + columnsList[i].title + '</th>';
                        }
                        headerColumns += '<th colspan="7">' + units + '</th></tr><tr>';
                        for (var i = 3; i < columnsList.length; i++) {
                            headerColumns += '<th>' + columnsList[i].title + '</th>';
                        }
                        headerColumns += '</tr>';
                        table.tables().header().to$().html(headerColumns);
                    } else {
                        table.tables().header().to$().html(header);
                    }
                }
                if (typeof footnotes !== 'undefined') {
                    $("#" + tableId + "_footnotes").append("<div>" + footnotes + "</div>");
                }
                
                if (Array.isArray(title) && title.length > 0) {
                    $("#" + tableId + "_title").html(title[0]);
                }
    }
}