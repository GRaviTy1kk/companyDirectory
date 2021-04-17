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


//department modal
$('#btnradioAddDep').click(function() {
  $(".aadDep").removeClass("d-none");
  $(".aadDep").addClass("d-block");
  $(".editDep").addClass("d-none");
  $(".delDep").addClass("d-none");
});

$('#btnradioEditDep').click(function() {
  $(".editDep").removeClass("d-none");
  $(".editDep").addClass("d-block");
  $(".delDep").addClass("d-none");
  $(".aadDep").addClass("d-none");
});

$('#btnradioDeleteDep').click(function() {
  $(".delDep").removeClass("d-none");
  $(".delDep").addClass("d-block");
  $(".editDep").addClass("d-none");
  $(".aadDep").addClass("d-none");
});


//location modal
$('#btnradioAddLoc').click(function() {
  $(".aadLoc").removeClass("d-none");
  $(".aadLoc").addClass("d-block");
  $(".editLoc").addClass("d-none");
  $(".delLoc").addClass("d-none");
});

$('#btnradioEditLoc').click(function() {
  $(".editLoc").removeClass("d-none");
  $(".editLoc").addClass("d-block");
  $(".delLoc").addClass("d-none");
  $(".aadLoc").addClass("d-none");
});

$('#btnradioDeleteLoc').click(function() {
  $(".delLoc").removeClass("d-none");
  $(".delLoc").addClass("d-block");
  $(".editLoc").addClass("d-none");
  $(".aadLoc").addClass("d-none");
});


