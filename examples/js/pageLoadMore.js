/*! dataTables.pageLoadMore.js 1.0.1
 *  Copyright (c) Gyrocode LLC (www.gyrocode.com)
 *  License: MIT License
 */
(function($) {
    $.fn.dataTable.pageLoadMore = function(opts) {
        var conf = $.extend({
            url: "",
            data: null,
            method: "GET"
        }, opts);
        var cacheLastRequest = null;
        var cacheLastJson = null;
        return function(request, drawCallback, settings) {
            if (!settings.hasOwnProperty("pageLoadMore")) {
                var api = new $.fn.dataTable.Api(settings);
                var info = api.page.info();
                settings.pageLoadMore = {
                    pageLength: info.length
                };
            }
            var pageResetMore = false;
            if (cacheLastRequest) {
                if (JSON.stringify(request.order) !== JSON.stringify(cacheLastRequest.order) || JSON.stringify(request.columns) !== JSON.stringify(cacheLastRequest.columns) || JSON.stringify(request.search) !== JSON.stringify(cacheLastRequest.search)) {
                    pageResetMore = true;
                }
            }
            cacheLastRequest = $.extend(true, {}, request);
            if (pageResetMore) {
                cacheLastJson = null;
                request.length = settings.pageLoadMore.pageLength;
            }
            request.start = request.length - settings.pageLoadMore.pageLength;
            request.length = settings.pageLoadMore.pageLength;
            if ($.isFunction(conf.data)) {
                var d = conf.data(request);
                if (d) {
                    $.extend(request, d);
                }
            } else {
                if ($.isPlainObject(conf.data)) {
                    $.extend(request, conf.data);
                }
            }
            settings.jqXHR = $.ajax({
                "type": conf.method,
                "url": conf.url,
                "data": request,
                "dataType": "json",
                "cache": false,
                "success": function(json) {
                    if (cacheLastJson) {
                        json.data = cacheLastJson.data.concat(json.data);
                    }
                    cacheLastJson = $.extend(true, {}, json);
                    drawCallback(json);
                }
            });
        };
    };
    $.fn.dataTable.Api.register("page.resetMore()", function() {
        return this.iterator("table", function(settings) {
            var api = this;
            if (settings.hasOwnProperty("pageLoadMore")) {
                api.page.len(settings.pageLoadMore.pageLength);
            }
        });
    });
    $.fn.dataTable.Api.register("page.hasMore()", function() {
        var api = this;
        var info = api.page.info();
        return (info.pages > 1) ? true : false;
    });
    $.fn.dataTable.Api.register("page.loadMore()", function() {
        return this.iterator("table", function(settings) {
            var api = this;
            var info = api.page.info();
            if (info.pages > 1) {
                if (!settings.hasOwnProperty("pageLoadMore")) {
                    settings.pageLoadMore = {
                        pageLength: info.length
                    };
                }
                api.page.len(info.length + settings.pageLoadMore.pageLength).draw("page");
            }
        });
    });
})(jQuery);
