$(window).on('load', function() {

  //preloader
  if ($('#preloader').length) {
    $('#preloader').delay(100).fadeOut('slow', function () {
        $(this).remove();
    });
  }

  functionality();
      
});

//rotation

if(window.innerHeight > window.innerWidth){ //portrait
  functionality();
}
if(window.innerWidth > window.innerHeight){ //landscape
  functionality();
}

function functionality() {
  //department modal
  $('#btnradioAddDep').click(function() {
    //divisions
    $(".aadDep").removeClass("d-none");
    $(".aadDep").addClass("d-block");
    $(".editDep").addClass("d-none");
    $(".delDep").addClass("d-none");

    //buttons
    $('#addDepBtn').removeClass("d-none");
    $("#addDepBtn").addClass("d-block");
    $("#editDepBtn").addClass("d-none");
    $("#delDepBtn").addClass("d-none");
  });
  
  $('#btnradioEditDep').click(function() {
    //divisions
    $(".editDep").removeClass("d-none");
    $(".editDep").addClass("d-block");
    $(".delDep").addClass("d-none");
    $(".aadDep").addClass("d-none");

    //buttons
    $('#editDepBtn').removeClass("d-none");
    $("#editDepBtn").addClass("d-block");
    $("#addDepBtn").addClass("d-none");
    $("#delDepBtn").addClass("d-none");
  });
  
  $('#btnradioDeleteDep').click(function() {
    //divisions
    $(".delDep").removeClass("d-none");
    $(".delDep").addClass("d-block");
    $(".editDep").addClass("d-none");
    $(".aadDep").addClass("d-none");

    //buttons
    $('#delDepBtn').removeClass("d-none");
    $("#delDepBtn").addClass("d-block");
    $("#editDepBtn").addClass("d-none");
    $("#addDepBtn").addClass("d-none");
  });
  
  
  //location modal
  $('#btnradioAddLoc').click(function() {
    //divisions
    $(".aadLoc").removeClass("d-none");
    $(".aadLoc").addClass("d-block");
    $(".editLoc").addClass("d-none");
    $(".delLoc").addClass("d-none");

    //buttons
    $('#aadLocBtn').removeClass("d-none");
    $("#aadLocBtn").addClass("d-block");
    $("#editLocBtn").addClass("d-none");
    $("#delLocBtn").addClass("d-none");
  });
  
  $('#btnradioEditLoc').click(function() {
    //divisions
    $(".editLoc").removeClass("d-none");
    $(".editLoc").addClass("d-block");
    $(".delLoc").addClass("d-none");
    $(".aadLoc").addClass("d-none");

    //buttons
    $('#editLocBtn').removeClass("d-none");
    $("#editLocBtn").addClass("d-block");
    $("#aadLocBtn").addClass("d-none");
    $("#delLocBtn").addClass("d-none");
  });
  
  $('#btnradioDeleteLoc').click(function() {
    //divisions
    $(".delLoc").removeClass("d-none");
    $(".delLoc").addClass("d-block");
    $(".editLoc").addClass("d-none");
    $(".aadLoc").addClass("d-none");

    //buttons
    $('#delLocBtn').removeClass("d-none");
    $("#delLocBtn").addClass("d-block");
    $("#aadLocBtn").addClass("d-none");
    $("#editLocBtn").addClass("d-none");
  });


  //search
  

  if (window.matchMedia('(min-width: 991px)').matches) {
    $('#searchNav').addClass('searchInput');
    $('#searchNav').attr('onkeyup', "searchTable()");
    $('#searchMain').removeClass('searchInput');
    $('#searchMain').removeAttr('onkeyup');
    
  }

  if (window.matchMedia('(max-width: 991px)').matches) {
    $('#searchMain').addClass('searchInput');
    $('#searchMain').attr('onkeyup', "searchTable()");
    $('#searchNav').removeClass('searchInput');
    $('#searchNav').removeAttr('onkeyup');
    }

  $(window).resize(function() {
      if (window.matchMedia('(min-width: 991px)').matches) {
        $('#searchNav').addClass('searchInput');
        $('#searchNav').attr('onkeyup', "searchTable()");
        $('#searchMain').removeClass('searchInput');
        $('#searchMain').removeAttr('onkeyup');
        $('#searchMain').val('');
        $( "#searchNav" ).trigger("keyup");
      }
  });
  
  $(window).resize(function() {
      if (window.matchMedia('(max-width: 991px)').matches) {
        $('#searchMain').addClass('searchInput');
        $('#searchMain').attr('onkeyup', "searchTable()");
        $('#searchNav').removeClass('searchInput');
        $('#searchNav').removeAttr('onkeyup');
        $('#searchNav').val('');
        $("#searchMain").trigger("keyup");
      }
  });

  

  //navigation hide on modal click
  
  if (window.matchMedia('(max-width: 991px)').matches) {
    $('#mainNav button[data-bs-toggle="modal"]').click(function() {
      $('#mainNav button[class="navbar-toggler"]').click();
    });
  }

  $(window).resize(function() {
      if (window.matchMedia('(max-width: 991px)').matches) {
        $('#mainNav button[data-bs-toggle="modal"]').click(function() {
          $('#mainNav button[class="navbar-toggler"]').click();
        });
      }
  });

}