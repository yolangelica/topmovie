
$(document).ready( function (){
	$(".dropdown-button").dropdown();


var instance = M.Carousel.init({
    fullWidth: true
  });

  // Or with jQuery

  $('.carousel.carousel-slider').carousel({
    fullWidth: true
  });
  
});



//OCULTA PAGINA AL HACER CLICK
$('#btnProfileUser').click(function(){
         $('#home').addClass("hide");
         $('#userProfile').removeClass("hide");
     }); 