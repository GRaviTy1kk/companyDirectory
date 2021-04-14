//onload operations
$(window).on('load', function() {
    
    //preloader
    if ($('#preloader').length) {
        $('#preloader').delay(100).fadeOut('slow', function () {
            $(this).remove();
        });
    }

});


//get all staff

$("#getAll").on("click", function() {
    $.get("./php/getAll.php",   function(result) {
        console.log(result.data[0]);
        $('#result').text(result.data[0].lastName);
    });
});


//get all departments

$("#getAllDep").on("click", function() {
    $.get("./php/getAllDepartments.php",  function(result) {
        console.log(result.data);

        result.data.forEach(dep => {
            $('#selectDepartmens').append(`<option value=1>${dep.name}</option>`);
        });

        $('#selectDepartmens').change(function(){ 
            $('#menu_dep').collapse('toggle');
        });

    });
});