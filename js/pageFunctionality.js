$(window).on('load', function() {
    
       
        if (window.matchMedia('(min-width: 992px)').matches) {
          $('#toggleSort').removeAttr('data-bs-toggle');
          $('#toggleSort').removeAttr('data-bs-target');
          $('#nav_accordion').removeClass('collapse');
        }

        if (window.matchMedia('(max-width: 992px)').matches) {
            $('#toggleSort').attr('data-bs-toggle', "collapse");
            $('#toggleSort').attr('data-bs-target', "#nav_accordion");
            $('#nav_accordion').addClass('collapse');
          }
   

});


$(window).resize(function() {
    if (window.matchMedia('(min-width: 992px)').matches) {
      $('#toggleSort').removeAttr('data-bs-toggle');
      $('#toggleSort').removeAttr('data-bs-target');
      $('#nav_accordion').removeClass('collapse');
    }
});

$(window).resize(function() {
    if (window.matchMedia('(max-width: 992px)').matches) {
        $('#toggleSort').attr('data-bs-toggle', "collapse");
        $('#toggleSort').attr('data-bs-target', "#nav_accordion");
        $('#nav_accordion').addClass('collapse');
    }
});