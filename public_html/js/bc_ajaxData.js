//this is modal windows to wait
bc_wait = (function () {
    var pleaseWaitDiv = $('#bct_pleaseWaitDialog');
    return {
        showPleaseWait: function () {
            pleaseWaitDiv.modal('toggle');
        },
        hidePleaseWait: function () {
            pleaseWaitDiv.modal('hide');
        }

    };
})();
//this varible ast server and get dada
var bc_ajaxData = {
    ask: $.ajax({
        url: "data.json",
        async: true,
        beforeSend: function () {
            bc_wait.showPleaseWait();
        },
        success: function (result) {
            var map = bc_timemap.tm.createDataset("battle", {
                title: "Battle",
                theme: "green"
            });

            var bands = [
                Timeline.createBandInfo({
                    eventSource: map.eventSource,
                    width: "0%",
                    intervalPixels: 20,
                    intervalUnit: Timeline.DateTime.YEAR
                }),
                Timeline.createBandInfo({
                    eventSource: map.eventSource,
                    width: "100%",
                    intervalPixels: 100,
                    intervalUnit: Timeline.DateTime.CENTURY,
                    trackGap: 0.2
                })
            ];
            // Initialize the timeline with the band info
            bc_timemap.tm.initTimeline(bands);
            //loads item from json
            map.loadItems(result.data);
            bc_timemap.tm.timeline.layout();
            bc_timemap.tm.timeline.getBand(0).setCenterVisibleDate(new Date(result.data[0].start));


            //init slider from first start date to last end date
            bc_timemap.timeSlider = bc_timemap.timesliderContent.slider({
                min: Date.parse(result.data[0].start),
                max: (result.data.slice(-1)[0].hasOwnProperty("end")) ? Date.parse(result.data.slice(-1)[0].end) : Date.parse(result.data.slice(-1)[0].start),
                step: 1,
                tooltip: 'always',
                value: Date.parse(result.data[0].start),
                formatter: function (value) {
                    bc_timemap.scrollEvent(value, true);
                    return (new Date(value)).getFullYear();
                }
            });

        },
        complete: function (jqXHR, textStatus) {
            bc_wait.hidePleaseWait();
        }

    })
};



