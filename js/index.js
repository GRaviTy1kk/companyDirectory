//onload operations
$(window).on('load', function() {
    
    //load data
    getAllDepartments();
    getAllStaff();
    getAllLocations();



});


//test post 

$("#insertNew").on("click", function(){
    console.log("did");
    $.post("./php/insertPerson.php", {
        
        firstname: $("#firstname").val(),
        lastname: $("#lastname").val(),
        jobTitle: $("#jobTitle").val(),
        email: $("#email1").val(),
        departmentID: $("#departmentID").val()

    }, function(data, status){
        console.log(data.status.code);
        
    });
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
    if (window.matchMedia('(max-width: 991px)').matches) {
        $('#nav_accordion').collapse('toggle');
      }
});

//select by location

$('#selectLocation').change(function(){ 
    $('#menu_loc').collapse('toggle');
    if (window.matchMedia('(max-width: 991px)').matches) {
        $('#nav_accordion').collapse('toggle');
      }
});




//reset button

$("#reset").on("click", function() {

    $('#tableBody').text("");
    $('#selectDepartmens').text("");
    $('#selectLocation').text("");

    getAllStaff();
    getAllDepartments();
    getAllLocations();

});


//sort table columns


const getCellValue = (tr, idx) => tr.children[idx].innerText || tr.children[idx].textContent;

const comparer = (idx, asc) => (a, b) => ((v1, v2) => 
    v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2)
    )(getCellValue(asc ? a : b, idx), getCellValue(asc ? b : a, idx));

document.querySelectorAll('th').forEach(th => th.addEventListener('click', (() => {
    
    Array.from($("tr").slice(1))
        .sort(comparer(Array.from(th.parentNode.children).indexOf(th), this.asc = !this.asc))
        .forEach(tr => $('table').append(tr) );
})));




//functions 

//get all departments function 

function getAllDepartments() {

    $.get("./php/getAllDepartments.php",  function(result) {
        console.log(result.data);

        result.data.forEach(dep => {
            $('#selectDepartmens').append(`<option value=${dep.id}>${dep.name}</option>`);
        });

    });
}

//get all staff

function getAllStaff() {

    $.get("./php/getAll.php",   function(result) {
        console.log(result.data[0]);

        result.data.forEach(person => {
            $('#tableBody').append(`<tr><td><div class='d-flex'>${person.firstName + " " + person.lastName}<i class="ms-auto bi bi-file-person"></i></div></td>
            <td><div class='d-flex'>${person.department}<i class=" ms-auto bi bi-briefcase"></i></div></td>
            <td><div class='d-flex'>${person.location}<i class="ms-auto bi bi-building"></i></div></td>
            <td><div class='d-flex'>${person.email}<i class="ms-auto bi bi-envelope"></div></i></td>
            <td><button>Edit</button></td></tr>`);
        });
        
    });
    
}

//get all locations

function getAllLocations() {

    $.get("./php/getAllLocations.php",  function(result) {
        console.log(result.data);

        result.data.forEach(loc => {
            $('#selectLocation').append(`<option value=${loc.id}>${loc.name}</option>`);
        });

    });


}

