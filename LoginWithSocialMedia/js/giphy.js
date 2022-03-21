var PageOffset = 0;
var responseArray = [];
var ajaxRequest = null;

window.fbAsyncInit = function () {
    FB.init({
        appId: '692896381738448',
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v13.0'
    });

    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
}



function statusChangeCallback(response) {
    if (response.status === 'connected') {
        TrendingScroll();
    }
    else {
        window.location = "/Index";

    }// Returns the login status.
}

function CheckLogin() {
    var sessionTimeout = 1; //hours
    var loginDuration = new Date();
    loginDuration.setTime(loginDuration.getTime() + (sessionTimeout * 60 * 60 * 1000));
    document.cookie = "CrewCentreSession=Valid; " + loginDuration.toGMTString() + "; path=/";
    // Put this at the top of index page
};

$(document).ready(function () {
    $(window).on('scroll', function () {
        if ($(window).scrollTop() >= $(
            '.div').offset().top + $('.div').
                outerHeight() - window.innerHeight) {
            //$("#dImg").append(SearchInfiniteScroll());
            // responseArray.push(offsetValue);
            //SearchInfiniteScroll();
            PageOffset = PageOffset + 10;
            if ($("#SearchInput").val() == "") {
                TrendingScroll();
            }
            else {
                InputSearchScroll();
            }
        }
    })
})


function TrendingScroll() {

    $("#ImageText").text("Trending Gifs");
    if (ajaxRequest != null) {
        ajaxRequest.abort();
    }
    var offsetValue = PageOffset;
    if (offsetValue == 0 || (!responseArray.includes(offsetValue) && responseArray.includes(offsetValue - 10))) {
        $.ajax({
            type: "GET",
            url: "https://api.giphy.com/v1/gifs/trending?api_key=izV5X2YE3sY71qcdptseUwhja3ZFdKzv&offset=" + PageOffset + "&limit=10",
            dataType: "json",
            success: function (Imagedata) {

                for (var i = 0; i < Imagedata.data.length; i++) {
                    $("#dImg").append("<img src=\"" + Imagedata.data[i].images.original.url + "\"/>")

                }
                responseArray.push(Imagedata.pagination.offset);

            }
        });
    }
    else {
        PageOffset = PageOffset - 10;
    }
};


function InputSearchScroll() {

    if (ajaxRequest != null) {
        ajaxRequest.abort();
    }
    var SearchValue = $("#SearchInput").val();
    ajaxRequest = $.ajax({
        type: "GET",
        url: "https://api.giphy.com/v1/gifs/search?api_key=izV5X2YE3sY71qcdptseUwhja3ZFdKzv&q=" + SearchValue + "&limit=10" + "&offset=" + PageOffset,
        dataType: "json",
        success: function (Imagedata) {

            var offsetValue = Imagedata.pagination.offset;
            if (!responseArray.includes(offsetValue)) {
                console.log(Imagedata);
                for (var i = 0; i < Imagedata.data.length; i++) {
                    //console.log(Imagedata);
                    // console.log(Imagedata.data[i].images.original.url);
                    $("#dImg").append("<img src=\"" + Imagedata.data[i].images.original.url + "\"/>")

                }
                responseArray.push(offsetValue);
            }
        }
    });

    //responseArray = [];
};



function GiphyLoad() {
    console.log(PageOffset);
    responseArray = [];
    PageOffset = 0;
    $("#dImg").empty();
    var SearchValue = $("#SearchInput").val();
    if (SearchValue == "") {
        TrendingScroll();
    }

    else {
        $("#ImageText").text("Search Result for" + " " + SearchValue);
        InputSearchScroll();
    }
    //  console.log(SearchValue);
};
