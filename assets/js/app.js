/* ========== AUTENTICACION FIREBASE =========== */

// SIGN UP:
var newUserName = $('#newUserName').val();
var newName = $('#newName').val();
var newLastName = $('#newLastName').val();
var newUserName = $('#newUserName').val();
var newEmail = $('#newEmail').val();
var newPassword = $('#newPassword').val();

function signUp() {
  firebase.auth().createUserWithEmailAndPassword(newEmail, newPassword)
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
}

// SIGN IN:
var email = $('#email').val();
var password = $('#password').val();

function signIn() {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .catch(function (error) {
      console.log('Ingreso exitoso!');
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
}

// OBSERVADOR DE ESTADO:
function watcher() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      console.log('Usuario activo!');
      console.log(user);
      $('#videoCover').hide();
      $('#catchPhrase').hide();
      $('#btnProfileUser').show();
      $('#logInBtn').hide();
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      // ...
    } else {
      // User is signed out.
      $('#videoCover').show();
      $('#catchPhrase').show();
      //$('#btnProfileUser').hide();
      $('#logInBtn').show();
      console.log('No hay usuario activo!');
    }
  });
}
watcher();

// Autenticación Google;
var provider = new firebase.auth.GoogleAuthProvider();

function google() {
  firebase.auth().signInWithPopup(provider).then(function (result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  }).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}

/* ========== FIN AUTENTICACION FIREBASE =========== */


$(document).ready(function () {

  // Inicializa plugins de Materialize
  $('.modal').modal();
  $('.dropdown-button').dropdown();
  $('.carousel').carousel();
  //Materialize.scrollFire(options);

  //Cambio de vistas
  $('#btnProfileUser').click(function () {
    $('#home').addClass("hide");
    $('footer').addClass("hide");
    $('#userProfile').removeClass("hide");
    $('#myList').addClass("hide");
  });

  $('#btnHome').click(function () {
    $('#home').removeClass("hide");
    $('footer').removeClass("hide");
    $('#userProfile').addClass("hide");
    $('#myList').addClass("hide");
  });

  $('#btnMylist').click(function () {
    $('#home').addClass("hide");
    $('footer').addClass("hide");
    $('#userProfile').addClass("hide");
    $('#myList').removeClass("hide");
  })

  // Funciones de búsqueda:
  $('.btnTop').click(function () {
    var yearValue = 2009;
    console.log(yearValue);
    var url = 'http://www.omdbapi.com/?apikey=942bd4df&s="a"&y=' + yearValue + '&type=' + this.id;
    console.log(this.id);
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.responseType = 'json';
    request.send();

    request.onload = function () {
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

        var groupButton = $('<div></div>')
          .addClass('horizontal right');
        groupButton.html('<a class="btn-floating red btnMylist"><i class="material-icons">add_circle_outline</i></a> \
          <a class="btn-floating yellow darken-1 btnPending"><i class="material-icons">access_time</i></a> \
          <a class="btn-floating green btnViewed"><i class="material-icons">check</i></a>');

        var collectionitem = $('<li></li>')
          .addClass('collection-item avatar')
          .append(m_image, m_title, groupButton);

        listAllMovies.append(collectionitem);
      }
    };
  });

  $('#btn_buscar').click(function () {
    console.log($('#title_input').val());
    var url = 'http://www.omdbapi.com/?apikey=942bd4df&t=' + $('#title_input').val();
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.responseType = 'json';
    request.send();
    $('.video-container').hide();

    request.onload = function () {
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

  $(document).on('click', '.btnMylist', function () {
    // Your Code
    var searchMylist = ($(this).parent().parent().find('.title').text());
    var urlMylist = 'http://www.omdbapi.com/?apikey=942bd4df&t=' + searchMylist;

    var request = new XMLHttpRequest();
    request.open('GET', urlMylist);
    request.responseType = 'json';
    request.send();
    request.onload = function () {
      var infoTitle = request.response;
      console.log(infoTitle);
      var PosterModal = infoTitle.Poster;
      var titleModal = infoTitle.Title;
      var yearModal = infoTitle.Year;
      var actorsModal = infoTitle.Actors;
      var directorModal = infoTitle.Director;
      var plotModal = infoTitle.Plot;
      // console.log(PosterModal, titleModal, yearModal, actorsModal, directorModal, plotModal);
      var newName = $('.modalList')
        .append(titleModal);
    };
  });

  $(document).on('click', '.btnPending', function () {
    // Your Code
    var searchPending = ($(this).parent().parent().find('.title').text());
    var urlPending = 'http://www.omdbapi.com/?apikey=942bd4df&t=' + searchPending;
    var request = new XMLHttpRequest();
    request.open('GET', urlPending);
    request.responseType = 'json';
    request.send();
    request.onload = function () {
      var infoTitlePending = request.response;
      console.log(infoTitlePending);
      var PosterModalPending = infoTitlePending.Poster;
      var titleModalPending = infoTitlePending.Title;
      var yearModalPending = infoTitlePending.Year;
      var actorsModalPending = infoTitlePending.Actors;
      var directorModalPending = infoTitlePending.Director;
      var plotModalPending = infoTitlePending.Plot;
      // console.log(PosterModal, titleModal, yearModal, actorsModal, directorModal, plotModal);
      var newName = $('.modalPending')
        .append(titleModalPending);
    };

  });
  $(document).on('click', '.btnViewed', function () {
    // Your Code
    var searchViewed = ($(this).parent().parent().find('.title').text());
    var urlViewed = 'http://www.omdbapi.com/?apikey=942bd4df&t=' + searchViewed;
    var request = new XMLHttpRequest();
    request.open('GET', urlViewed);
    request.responseType = 'json';
    request.send();
    request.onload = function () {
      var infoTitleViewed = request.response;
      console.log(infoTitleViewed);
      var PosterModalViewed = infoTitleViewed.Poster;
      var titleModalViewed = infoTitleViewed.Title;
      var yearModalViewed = infoTitleViewed.Year;
      var actorsModalViewed = infoTitleViewed.Actors;
      var directorModalViewed = infoTitleViewed.Director;
      var plotModalViewed = infoTitleViewed.Plot;
      // console.log(PosterModal, titleModal, yearModal, actorsModal, directorModal, plotModal);
      var newName = $('.modalViews')
        .append(titleModalViewed);
    };
  });
});