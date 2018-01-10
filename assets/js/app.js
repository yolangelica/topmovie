
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



//aparece pagina perfil usuario
$('#btnProfileUser').click(function(){
         $('#home').addClass("hide");
         $('#userProfile').removeClass("hide");
     }); 
//aparece pagina home
$('#btnHome').click(function(){
	$('#userProfile').addClass("hide");
	$('#home').removeClass("hide");
})