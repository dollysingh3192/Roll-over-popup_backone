var AppView = Backbone.View.extend({
    // el - stands for element. Every view has an element associated with HTML content, will be rendered. 
    el: '.main',

    template: _.template("<h3>Hello <%= who %></h3>"),
    slideIndex : null,
    // It's the first function called when this view is instantiated.
    initialize: function() {
        this.slideIndex = 0;
        this.render();
    },
    events:{
        'click button#before': "plusDivs",
        'click button#after': "plusDivs"
    },
    // $el - it's a cached jQuery object (el), in which you can use jQuery functions to push content.

    plusDivs :function(event) {
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
  
        if (tomove ==0) {
            $('#before').attr("disabled", true);
        } else {
            $('#before').attr("disabled", false);
        }

         var elem = document.getElementById("Tabs");
         var theCSSprop = window.getComputedStyle(elem,null).getPropertyValue("left");
         console.log("---CSS",theCSSprop);

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
