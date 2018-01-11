$(document).ready(function() {
    $('.carousel').carousel(); /*funcion carrusel */
    //Materialize.scrollFire(options);


});


//Cambio de vistas
$('#btnProfileUser').click(function() {
    $('#home').addClass("hide");
    $('footer').addClass("hide");
    $('#userProfile').removeClass("hide");
});

$('#btnHome').click(function() {

    $('#home').removeClass("hide");
    $('footer').removeClass("hide");
    $('#userProfile').addClass("hide");
});

$('.btnTop').click(function() {
    var yearValue = 2009;
    console.log(yearValue);
    var url = 'http://www.omdbapi.com/?apikey=942bd4df&s="a"&y=' + yearValue + '&type=' + this.id;
    console.log(this.id);
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.responseType = 'json';
    request.send();

    request.onload = function() {
        var movies = request.response;
        console.log(movies);
        console.log(movies.Search);
        //Busqueda por año. Todas las peliculas del año que introduce el usuario que contengan la letra a
        var listAllMovies = $('#collection-id');
        listAllMovies.html("");
        for (let i = 0; i < movies.Search.length; i++) {
            const element = movies.Search[i].Title;
            const element2 = movies.Search[i].Poster;
            //const element2 = 'assets/img/Popcorn (1).png';
            // console.log(element);
            //console.log(element2);

            var m_image = $('<img>')
                .attr({
                    'src': element2,
                    'alt': ""
                })
                .addClass("responsive-img circle")
                .css("max-height", "100%");

            var m_title = $('<span></span>')
                .addClass('title')
                .text(element);

            var collectionitem = $('<li></li>')
                .addClass('collection-item avatar')
                .append(m_image, m_title);

            listAllMovies.append(collectionitem);
        }
    };
});

$('#btn_buscar').click(function() {

    console.log($('#title_input').val());
    var url = 'http://www.omdbapi.com/?apikey=942bd4df&t=' + $('#title_input').val();
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.responseType = 'json';
    request.send();
    $('.video-container').hide();

    request.onload = function() {
        var titulo = request.response;
        console.log(titulo);



        var listatitulos = $('#listatitulos');
        listatitulos.html("");

        var element = titulo.Title;
        var element2 = titulo.Poster;
        var element3 = titulo.Plot;
        //const element2 = 'assets/img/Popcorn (1).png';
        // console.log(element);
        //console.log(element2);

        var m_image = $('<img>')
            .attr({
                'src': element2,
                'alt': ""
            })
            .addClass("responsive-img ")
            .css("max-height", "100%");

        var m_title = $('<h2></h2>')
            .addClass('title')
            .text(element);
        var m_plot = $('<span></span>')
            .addClass('plot')
            .text(element3);

        var collectionitem = $('<div></div>')
            .addClass('collection-item avatar')
            .append(m_image, m_title, m_plot);

        listatitulos.append(collectionitem);

    };
});