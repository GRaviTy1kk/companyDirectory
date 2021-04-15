//onload operations
$(window).on('load', function() {
    
    //load data
    getAllDepartments();
    getAllStaff();  


});


//get all staff

$("#getAll").on("click", function() {
    $.get("./php/getAll.php",   function(result) {
        console.log(result.data[0]);
        $('#result').text(result.data[0].lastName);
    });
});


//select by department

$('#selectDepartmens').change(function(){ 
    $('#menu_dep').collapse('toggle');
    if (window.matchMedia('(max -width: 991px)').matches) {
        $('#nav_accordion').collapse('toggle');
      }
});



//reset button

$("#reset").on("click", function() {

    $.get("./php/getAll.php",   function(result) {
        console.log(result.data[0]);
        $('#result').text(result.data[0].lastName);
    });

    //getAllDepartments();

});






//functions 



//get all departments function 

function getAllDepartments() {

    $.get("./php/getAllDepartments.php",  function(result) {
        console.log(result.data);

        result.data.forEach(dep => {
            $('#selectDepartmens').append(`<option value=1>${dep.name}</option>`);
        });

        $('#selectDepartmens').change(function(){ 
            $('#menu_dep').collapse('toggle');
            if (window.matchMedia('(max -width: 991px)').matches) {
                $('#nav_accordion').collapse('toggle');
              }
        });

    });
}

//get all staff

function getAllStaff() {

    $.get("./php/getAll.php",   function(result) {
        console.log(result.data[0]);

        result.data.forEach(person => {
            $('#tableBody').append(`<tr><td>${person.firstName + " " + person.lastName}</td><td>${person.department}</td><td>${person.location}</td><td>${person.email}</td><td><button>Edit</button></td></tr>`);
        });
        
    });
    
}

