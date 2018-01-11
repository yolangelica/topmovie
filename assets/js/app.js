
$(document).ready( function (){

var instance = M.Carousel.init({
    fullWidth: true
  });

  // Or with jQuery

  $('.carousel.carousel-slider').carousel({
    fullWidth: true
  });
  
});

//Cambio de vistas
$('#btnProfileUser').click(function(){
   $('#home').addClass("hide");
   $('footer').addClass("hide");
   $('#userProfile').removeClass("hide");
}); 

$('#btnHome').click(function(){
   $('#home').removeClass("hide");
   $('footer').removeClass("hide");
   $('#userProfile').addClass("hide");
}); 
