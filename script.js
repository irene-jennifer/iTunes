console.log("i work")
$(document).ready(function () {
    $('.parallax').parallax();
});
///no escaping 

$("form").submit(function (event) {
    event.preventDefault();
    var userInput = $("#search").val();
    $("form")[0].reset();
    $("input").blur();
    $("#searchTerm").html(userInput);


    $.ajax({
        url: "https://itunes.apple.com/search?term=" + userInput,
        dataType: 'JSONP'
    })
        .done(function (data) {
            console.log(data);
            $("#col0,#col1,#col2,#col3").html("");
            for (var i = 0; i < data.results.length; i++) {
                if (data.results[i].trackName) {
                    // MAKE THIS SONG LIST BETTER
                    $(`#col${i % 4}`).append(`
                    <div class="card blue-grey darken-1">
                    <div class="card-image">
                    <img src="${data.results[i].artworkUrl100.replace("100x100", "300x300")}">
                        <span class="card-title">Card Title</span>
                  </div >
                        <div class="card-content white-text">
                            <span class="card-title">${data.results[i].trackName}</span>
                            <p>The song <b>${data.results[i].trackName}</b> is from the album
                            <b>${data.results[i].trackName}</b>. It was released in the year <b>${data.results[i].releaseDate.split("-")[0]}</b> in
                            <b>${data.results[i].country}</b>.</p>
                            <audio controls>
                                <source src="${data.results[i]. previewUrl}" type="audio/mpeg">
                                Your browser does not support the audio element.
                             </audio>
                        </div>
                        <div class="card-action">
                            <a href="${data.results[i].trackViewUrl}">Buy Now</a>
                        </div>
                  </div`)
                }
            }
            smoothScroll();
            oneSongAtaTime();
        })
        .fail(function (data) {
            console.log(data);
            $('#songs').append(data.status);
        })


})


function smoothScroll() {
    $('html, body').animate(
        {
            scrollTop: $("h2").offset().top,
        },
        500,
        'linear'
    )
}


function oneSongAtaTime (){
    $("audio").on("play", function() {
        $("audio").not(this).each(function(index, audio) {
            audio.pause();
        });
    })
}