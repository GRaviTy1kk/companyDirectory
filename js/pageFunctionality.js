$(window).on('load', function() {

  //preloader
  if ($('#preloader').length) {
    $('#preloader').delay(100).fadeOut('slow', function () {
        $(this).remove();
    });
  } 
      
  if (window.matchMedia('(min-width: 991px)').matches) {
    $('#toggleSort').removeAttr('data-bs-toggle');
    $('#toggleSort').removeAttr('data-bs-target');
    $('#nav_accordion').removeClass('collapse');
  }

  if (window.matchMedia('(max-width: 991px)').matches) {
      $('#toggleSort').attr('data-bs-toggle', "collapse");
      $('#toggleSort').attr('data-bs-target', "#nav_accordion");
      $('#nav_accordion').addClass('collapse');
    }
   

});


$(window).resize(function() {
    if (window.matchMedia('(min-width: 991px)').matches) {
      $('#toggleSort').removeAttr('data-bs-toggle');
      $('#toggleSort').removeAttr('data-bs-target');
      $('#nav_accordion').removeClass('collapse');
    }
});

$(window).resize(function() {
    if (window.matchMedia('(max-width: 991px)').matches) {
        $('#toggleSort').attr('data-bs-toggle', "collapse");
        $('#toggleSort').attr('data-bs-target', "#nav_accordion");
        $('#nav_accordion').addClass('collapse');
    }
});