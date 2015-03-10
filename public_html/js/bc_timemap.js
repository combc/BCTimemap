var bc_timemap = {
    //Default play animation
    play: true,
    speed: 10e9,
    timeGlobal: new Date(),
    //Content where is the message text
    messageContent: $('#bct_textMsg'),
    //Buttons to play, pause animation
    playbtn: $('#bct_playBtn'),
    pausebtn: $('#bct_pauseBtn'),
    //Content where is timeslider
    timesliderContent: $('#bct_timeSlider'),
    timeSlider: null,
    //Main timemap object
    tm: TimeMap.init({
        mapId: "bct_map", // Id of map div element (required)
        timelineId: "bct_timeline", // Id of timeline div element (required)
        options: {
            eventIconPath: "bower_components/timemap/images/",
            theme: "orange"
        },
        datasets: [
            {
                id: "none",
                // note that the lines below are now the preferred syntax
                type: "basic",
                options: {
                }
            }
        ],
        bandIntervals: [
            Timeline.DateTime.YEAR,
            Timeline.DateTime.CENTURY
        ]
    }),
    styledMapType: new google.maps.StyledMapType([
        {
            featureType: "water",
            elementType: "all",
            stylers: [
                {saturation: 0},
                {lightness: 100}
            ]
        },
        {
            featureType: "all",
            elementType: "all",
            stylers: [
                {saturation: -100}
            ]
        }
    ], {
        name: "white"
    }),
    mapOptions: {
        mapTypeControl: false,
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.LARGE,
            position: google.maps.ControlPosition.LEFT_CENTER
        },
        scaleControl: true, // fixed to BOTTOM_RIGHT
    },
    //initialization function. Here we start
    init: function () {
        // set the map to our custom style
        var gmap = this.tm.getNativeMap();
        gmap.setOptions(this.mapOptions);
        gmap.mapTypes.set("white", this.styledMapType);
        gmap.setMapTypeId("white");

        //send ajax request
        bc_ajaxData.ask;

        this.pausebtn.click(this.playAnime);
        this.playbtn.click(this.pauseAnime);
    },
    //Function to scrollime
    start: function () {
        function timeFun() {
            setTimeout(function () {
                if (bc_timemap.play) {
                    time = bc_timemap.getActualTime(bc_timemap.tm).getTime() + (bc_timemap.speed);
                    bc_timemap.scrollEvent(time);
                }
                timeFun();
            }, 20);
        }
        timeFun();
    },
    //Function get time from timeline
    getActualTime: function (timeObj) {
        return timeObj.timeline._bands[0].getCenterVisibleDate();
    },
    //function to show dialog massage
    showMsg: function () {
        $(bc_timemap.tm.getItems().reverse()).each(function (i) {
            if ((this.opts.tags.indexOf('msg') >= 0) && (this.onVisibleTimeline())) {
                bc_timemap.messageContent.html(this.getInfoHtml());
                return false;
            }
        });
    },
    //function to play time anime
    playAnime: function () {
        bc_timemap.play = false;
        bc_timemap.playbtn.removeClass("active");
        bc_timemap.pausebtn.addClass("active");
    },
    //function to pause time anime
    pauseAnime: function () {
        bc_timemap.play = true;
        bc_timemap.playbtn.addClass("active");
        bc_timemap.pausebtn.removeClass("active");
    },
    //function to scrol timeline and scroller
    scrollEvent: function (value, slider) {
        slider = typeof slider !== 'undefined' ? true : false;
        bc_timemap.timeGlobal.setTime(value);

        bc_timemap.showMsg();
        bc_timemap.tm.scrollToDate(bc_timemap.timeGlobal);
        if (!slider && bc_timemap.timeSlider !== null) {
            bc_timemap.timeSlider.slider('setValue', value);
        }
    }
};