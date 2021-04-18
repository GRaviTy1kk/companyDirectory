//onload operations
$(window).on('load', function() {
    
    //load data
    getAllDepartments();
    getAllStaff();
    getAllLocations();

});

//insert Person

$('#addPerson').submit(function (e) {
    
    e.preventDefault();

    $.ajax({
        type: 'post',
        url: window.location.href + 'php/insert/insertPerson.php',
        data: $('#addPerson').serialize(),
        success: function (result) {
        console.log(result.status.code);
        getAllStaff();
        $('#addPerson')[0].reset();
        }
    });

    return false;
});

//update and delete person

/*$(document).on("click",".updatePer", function(){
    $(this).closest("tr").find("td").each(function(column, td) {
        console.log($(td).find("div").text());
    });
    console.log($(this).closest("tr").find("td")[0]);
});*/

$(document).on("click",".updatePer", function(){
    globalThis.id = $(this).next().val();

    var fullName = $($(this).closest("tr").find("td")[0]).children("div").text().split(" ");
    
    $('#editPerson input[name="firstName"]').attr("value", fullName[0]);
    $('#editPerson input[name="lastName"]').attr("value", fullName[1]);
    $('#editPerson input[name="email"]').attr("value", $($(this).closest("tr").find("td")[3]).children("div").text());
    
});

$('#deletePerson').click(function (e) {
    
    e.preventDefault();
    
    $.ajax({
        type: 'post',
        url: window.location.href + 'php/delete/deletePerson.php',
        data: {id: id},
        success: function (result) {
        console.log(result.status.code);
        $('#updatePerson').modal("toggle");
        getAllStaff();
        $('#deletePerson')[0].reset();
        }
    });

    return false;
});

$('#editPerson').submit(function (e) {
    
    e.preventDefault();
    console.log($('#editPerson').serialize() + "&id=" + id);
    $.ajax({
        type: 'post',
        url: window.location.href + 'php/update/updatePerson.php',
        data: $('#editPerson').serialize() + "&id=" + id,
        success: function (result) {
        console.log(result.status.code);
        $('#updatePerson').modal("toggle");
        getAllStaff();
        $('#editPerson')[0].reset();
        }
    });

    return false;
});



//insert department

$('#insertDepartment').submit(function (e) {
    
    e.preventDefault();

    $.ajax({
        type: 'post',
        url: window.location.href + 'php/insert/insertDepartment.php',
        data: $('#insertDepartment').serialize(),
        success: function (result) {
        console.log(result.status.code);
        getAllDepartments();
        $('#insertDepartment')[0].reset();
        }
    });

    return false;
});

//delete department

$('#deleteDepartment').submit(function (e) {
    
    e.preventDefault();

    $.ajax({
        type: 'post',
        url: window.location.href + 'php/delete/deleteDepartmentByID.php',
        data: $('#deleteDepartment').serialize(),
        success: function (result) {
        console.log(result.status.code);
        getAllDepartments();
        $('#deleteDepartment')[0].reset();
        }
    });

    return false;
});

//update department

$('#editDepartment').submit(function (e) {
    
    e.preventDefault();

    $.ajax({
        type: 'post',
        url: window.location.href + 'php/update/updateDepartment.php',
        data: $('#editDepartment').serialize(),
        success: function (result) {
        console.log(result.status.code);
        getAllDepartments();
        $('#editDepartment')[0].reset();
        }
    });

    return false;
});







//insert location

$('#insertLocation').submit(function (e) {
    
    e.preventDefault();

    $.ajax({
        type: 'post',
        url: window.location.href + 'php/insert/insertLocation.php',
        data: $('#insertLocation').serialize(),
        success: function (result) {
        console.log(result.status.code);
        getAllLocations();
        $('#insertLocation')[0].reset();
        }
    });

    return false;
});

//delete location

$('#deleteLocation').submit(function (e) {
    
    e.preventDefault();

    $.ajax({
        type: 'post',
        url: window.location.href + 'php/delete/deleteLocationbyID.php',
        data: $('#deleteLocation').serialize(),
        success: function (result) {
        console.log(result.status.code);
        getAllLocations();
        $('#deleteLocation')[0].reset();
        }
    });

    return false;
});

//update location

$('#editLocation').submit(function (e) {
    
    e.preventDefault();

    $.ajax({
        type: 'post',
        url: window.location.href + 'php/update/updateLocation.php',
        data: $('#editLocation').serialize(),
        success: function (result) {
        console.log(result.status.code);
        getAllLocations();
        $('#editLocation')[0].reset();
        }
    });

    return false;
});



//select by department

$('#selectDepartmens').change(function(){ 
    $('#menu_dep').collapse('toggle');
    if (window.matchMedia('(max-width: 991px)').matches) {
        $('#nav_accordion').collapse('toggle');
      }


    $('#tableBody').text("");

    $.post("./php/get/getAllbyDepID.php", {departmentID: $(this).val()},  function(result) {

        if (result.data.length == 0 ) {
            $('#tableBody').append("<tr><td class='text-center' colspan=5>No Results</td></tr>");
        }
  
        result.data.forEach(person => {
            $('#tableBody').append(`<tr><td><div class='d-flex'>${person.firstName + " " + person.lastName}<i class="ms-auto bi bi-file-person"></i></div></td>
            <td><div class='d-flex'>${person.department}<i class=" ms-auto bi bi-briefcase"></i></div></td>
            <td><div class='d-flex'>${person.location}<i class="ms-auto bi bi-building"></i></div></td>
            <td><div class='d-flex'>${person.email}<i class="ms-auto bi bi-envelope"></div></i></td>
            <td d-flex><button type="button" class="d-block updatePer mx-auto" data-bs-toggle="modal" data-bs-target="#updatePerson">Edit</button>
            <input class="d-none perIdVal" type="number" value=${person.id} /></td></tr>`);
        });
          
    });
    
});

//select by location

$('#selectLocation').change(function(){ 
    $('#menu_loc').collapse('toggle');
    if (window.matchMedia('(max-width: 991px)').matches) {
        $('#nav_accordion').collapse('toggle');
    }

    $('#tableBody').text("");

    $.post("./php/get/getAllbyLocID.php", {locationID: $(this).val()},  function(result) {


        if (result.data.length == 0 ) {
            $('#tableBody').append("<tr><td class='text-center' colspan=5>No Results</td></tr>");
        }
  
        result.data.forEach(person => {
            $('#tableBody').append(`<tr><td><div class='d-flex'>${person.firstName + " " + person.lastName}<i class="ms-auto bi bi-file-person"></i></div></td>
            <td><div class='d-flex'>${person.department}<i class=" ms-auto bi bi-briefcase"></i></div></td>
            <td><div class='d-flex'>${person.location}<i class="ms-auto bi bi-building"></i></div></td>
            <td><div class='d-flex'>${person.email}<i class="ms-auto bi bi-envelope"></div></i></td>
            <td d-flex><button type="button" class="d-block updatePer mx-auto" data-bs-toggle="modal" data-bs-target="#updatePerson">Edit</button>
            <input class="d-none perIdVal" type="number" value=${person.id} /></td></tr>`);
        });
          
    });

});




//reset button

$("#reset").on("click", function() {

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



//search engine
function searchTable() {

    var filter, table, tr, td, i, txtValue;
    filter = $(".searchInput").val().toUpperCase();
    tr = $("#tableBody tr");
     
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }


//functions 

//get all departments 

function getAllDepartments() {

    $('.deparments').text("");
    $('.deparments').append(`<option disabled selected>Choose Department</option>`);
    $.get("./php/get/getAllDepartments.php",  function(result) {
        console.log(result.data);

        result.data.forEach(dep => {
            $('.deparments').append(`<option value=${dep.id}>${dep.name}</option>`);
        });

    });
}

//get all staff

function getAllStaff() {

    $('#tableBody').text("");

    $.get("./php/get/getAll.php",   function(result) {
        console.log(result.data[0]);

        if (result.data.length == 0 ) {
            $('#tableBody').append("<tr><td class='text-center' colspan=5>No Results</td></tr>");
        }

        result.data.forEach(person => {
            $('#tableBody').append(`<tr><td><div class='d-flex'>${person.firstName + " " + person.lastName}<i class="ms-auto bi bi-file-person"></i></div></td>
            <td><div class='d-flex'>${person.department}<i class=" ms-auto bi bi-briefcase"></i></div></td>
            <td><div class='d-flex'>${person.location}<i class="ms-auto bi bi-building"></i></div></td>
            <td><div class='d-flex'>${person.email}<i class="ms-auto bi bi-envelope"></div></i></td>
            <td d-flex><button type="button" class="d-block updatePer mx-auto" data-bs-toggle="modal" data-bs-target="#updatePerson">Edit</button>
            <input class="d-none perIdVal" type="number" value=${person.id} /></td></tr>`);
        });
        
    });
}

//get all locations

function getAllLocations() {

    $('.locations').text("");
    $('.locations').append(`<option disabled selected>Choose Location</option>`);

    $.get("./php/get/getAllLocations.php",  function(result) {
        console.log(result.data);

        result.data.forEach(loc => {
            $('.locations').append(`<option value=${loc.id}>${loc.name}</option>`);
        });

    });


}

