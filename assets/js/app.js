
 $(document).ready(function(){
      $('.carousel').carousel(); /*funcion carrusel */
      Materialize.scrollFire(options); 
  
  
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




    


