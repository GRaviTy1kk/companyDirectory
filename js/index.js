//onload operations
$(window).on('load', function() {
    
    //load data
    getAllDepartments();
    getAllStaff();
    getAllLocations();


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
            $('#selectDepartmens').append(`<option value=1>${dep.name}</option>`);
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

//get all locations

function getAllLocations() {

    $.get("./php/getAllLocations.php",  function(result) {
        console.log(result.data);

        result.data.forEach(loc => {
            $('#selectLocation').append(`<option value=1>${loc.name}</option>`);
        });

    });


}

