var AppView = Backbone.View.extend({
    // el - stands for element. Every view has an element associated with HTML content, will be rendered. 
    el: '.main',
    template: _.template("<h3>Hello <%= who %></h3>"),
    slideIndex: null,
    // It's the first function called when this view is instantiated.
    initialize: function() {
        this.slideIndex = 0;
        // this.render();
    },
    events: {
        'click button#before': "plusDivs",
        'click button#after': "plusDivs",
        'click ul li': "onTab"
    },
    // $el - it's a cached jQuery object (el), in which you can use jQuery functions to push content.
    onTab: function(event) {
        var currentli = event.currentTarget.id;
        // var matcheddiv;
        var arr = [];
        var allDiv = document.querySelectorAll("div"),
            i;
        for (i = 0; i < allDiv.length; ++i) {
            if (allDiv[i].id.match(/Div_/i)) {
                arr.push(allDiv[i].id);
            }
        }
        for (var i = 0; i < arr.length; i++) {
            var fli = "Div_" + currentli;
            if (arr[i] == fli) {
                //$('#Div_' + currentli).css("display", "block");
                $('#Div_' + currentli).addClass("intro");
            } else {
                $('#' + arr[i]).removeClass("intro");
            }
        }
        // ON Rollover
        for (var i = 0; i < arr.length; i++) {
            // var elmnt = document.getElementById(arr[i]);
            // var elmntx = elmnt.offsetWidth;
            // var elmnty = elmnt.offsetHeight;
            var splitName = arr[i].split("_");
            var surname = splitName[splitName.length - 1];
            var c = arr[i];
            if ($('#' + c).hasClass("intro")) {
                var elmnt = $('#' + c).offset();
                var elmntx = elmnt.left;
                var elmnty = elmnt.top;
                $('#' + c).each(function() {
                    var context = $(this);
                    var conlength = context.length;
                    for (var i = 0; i < conlength; i++) {
                        $('div', context[i]).each(function() {
                            $(this).mouseover(function(e) {
                                var offset = $(this).offset();
                                console.log(e);
                                $("#popup").css("left", (e.pageX));
                                $("#popup").css("top", (e.pageY));
                                // p.html( "left: " + offset.left + ", top: " + offset.top );
                                $("#popup").css("display", "block");
                                $("#popup").css({
                                    "border-color": "#61758a",
                                    "border-width": "1px",
                                    "border-style": "solid"
                                });
                                $("#popup").append(this.innerHTML);
                            });
                            $(this).mouseout(function() {
                                $("#popup").css("display", "none");
                                $("#popup").empty();
                            });
                        });
                    }
                });
            }
        }
    },
    plusDivs: function(event) {
        var pancakes = $(event.currentTarget).data('pancakes');
        if ($('#Tabs').css('left') == '0px') {
            $('#before').attr("disabled", true);
        }
        this.showDivs(this.slideIndex += pancakes);
    },
    showDivs: function(pancakes) {
        // console.log(pancakes);
        // console.log("Transition up");
        var headerwidth = $(".header").width();
        var tabswidth = $("#Tabs").width();
        var remain = tabswidth - headerwidth;
        if (remain == $('#Tabs').css('left')) {
            $('#after').attr("disabled", true);
        }
        var tomovedivwidth = $(".mySlides").width();
        var tomovedivwidth = $(".mySlides").outerWidth();
        console.log("Move ", tomovedivwidth);
        var tomove = tomovedivwidth * pancakes;
        console.log(tomove);
        $("#Tabs").css({
            left: -tomove
        });
        if (tomove == 0) {
            $('#before').attr("disabled", true);
        } else {
            $('#before').attr("disabled", false);
        }
        var elem = document.getElementById("Tabs");
        var theCSSprop = window.getComputedStyle(elem, null).getPropertyValue("left");
        console.log("---CSS", theCSSprop);
        var disableright = tomove;
        var compare = parseInt(remain);
        if (Math.floor(disableright) == (Math.floor(compare))) {
            $('#after').attr("disabled", true);
        } else {
            $('#after').attr("disabled", false);
        }
    },
    //Like the Hello TutorialsPoint in this case.
    render: function() {
        // this.$el.html(this.template({ who: 'Dolly' }));
    }
});
var appView = new AppView();