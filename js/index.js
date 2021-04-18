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

$(document).on("click",".updatePer", function(){
    globalThis.id = $(this).next().val();
    var perDepId = $(this).next().next().val();
    
    $('#editPerson select').val(perDepId).trigger('change');

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

    if ($(this).val() == "refreshTable") {

        getAllStaff();
        return;
    }

    $.post("./php/get/getAllbyDepID.php", {departmentID: $(this).val()},  function(result) {
  
        result.data.forEach(person => {
            $('#tableBody').append(`<tr><td><div class='d-flex'>${person.firstName + " " + person.lastName}<i class="ms-auto bi bi-file-person"></i></div></td>
            <td><div class='d-flex'>${person.department}<i class=" ms-auto bi bi-briefcase"></i></div></td>
            <td><div class='d-flex'>${person.location}<i class="ms-auto bi bi-building"></i></div></td>
            <td><div class='d-flex'>${person.email}<i class="ms-auto bi bi-envelope"></div></i></td>
            <td d-flex><button type="button" class="d-block updatePer mx-auto" data-bs-toggle="modal" data-bs-target="#updatePerson">Edit</button>
            <input class="d-none perIdVal" type="number" value=${person.id} /><input class="d-none perIdDep" type="number" value=${person.departmentId} /></td></tr>`);
        });

        $('#tableBody').append("<tr class='hideDataRow d-none'><td class='text-center' colspan=5>No Results</td></tr>");

        if (result.data.length == 0 ) {
            $('#tableBody .hideDataRow').removeClass("d-none");
        } else {
            $('#tableBody .hideDataRow').addClass("d-none");
        }
          
    });
    
});

//select by location

$('#selectLocation').change(function(){ 
    $('#menu_loc').collapse('toggle');
    if (window.matchMedia('(max-width: 991px)').matches) {
        $('#nav_accordion').collapse('toggle');
    }

    $('#tableBody').text("");

    if ($(this).val() == "refreshTable") {

        getAllStaff();
        return;
    }
    
    $.post("./php/get/getAllbyLocID.php", {locationID: $(this).val()},  function(result) {
  
        result.data.forEach(person => {
            $('#tableBody').append(`<tr><td><div class='d-flex'>${person.firstName + " " + person.lastName}<i class="ms-auto bi bi-file-person"></i></div></td>
            <td><div class='d-flex'>${person.department}<i class=" ms-auto bi bi-briefcase"></i></div></td>
            <td><div class='d-flex'>${person.location}<i class="ms-auto bi bi-building"></i></div></td>
            <td><div class='d-flex'>${person.email}<i class="ms-auto bi bi-envelope"></div></i></td>
            <td d-flex><button type="button" class="d-block updatePer mx-auto" data-bs-toggle="modal" data-bs-target="#updatePerson">Edit</button>
            <input class="d-none perIdVal" type="number" value=${person.id} /><input class="d-none perIdDep" type="number" value=${person.departmentId} /></td></tr>`);
        });

        $('#tableBody').append("<tr class='hideDataRow d-none'><td class='text-center' colspan=5>No Results</td></tr>");

        if (result.data.length == 0 ) {
            $('#tableBody .hideDataRow').removeClass("d-none");
        } else {
            $('#tableBody .hideDataRow').addClass("d-none");
        }
          
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

    var table = $('#tableBody');

    table.find('tr').each(function(index, row) {
        var allCells = $(row).find('td');
        if(allCells.length > 0) {
            var found = false;
            allCells.each(function(index, td) {
                var regExp = new RegExp($(".searchInput").val(), 'i');
                if(regExp.test($(td).text())) {
                    found = true;
                    return false;
                }
            });

        if(found == true)$(row).show();else $(row).hide();
    };
        
    }); 

    if ($('#tableBody').find(':visible').length === 0) {
        $('#tableBody .hideDataRow').removeClass("d-none"); 
        $('#tableBody .hideDataRow').toggle();
    }else{
        $('#tableBody .hideDataRow').addClass("d-none");
    }
}

//functions 

//get all departments 

function getAllDepartments() {

    $('.deparments').text("");
    $('.deparments').append(`<option value="refreshTable" selected>All Departments</option>`);
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

        result.data.forEach(person => {
            $('#tableBody').append(`<tr><td><div class='d-flex'>${person.firstName + " " + person.lastName}<i class="ms-auto bi bi-file-person"></i></div></td>
            <td><div class='d-flex'>${person.department}<i class=" ms-auto bi bi-briefcase"></i></div></td>
            <td><div class='d-flex'>${person.location}<i class="ms-auto bi bi-building"></i></div></td>
            <td><div class='d-flex'>${person.email}<i class="ms-auto bi bi-envelope"></div></i></td>
            <td d-flex><button type="button" class="btn btn-secondary d-block updatePer mx-auto" data-bs-toggle="modal" data-bs-target="#updatePerson">Edit</button>
            <input class="d-none perIdVal" type="number" value=${person.id} /><input class="d-none perIdDep" type="number" value=${person.departmentId} /></td></tr>`);
        });

        $('#tableBody').append("<tr class='hideDataRow d-none'><td class='text-center' colspan=5>No Results</td></tr>");

        if (result.data.length == 0 ) {
            $('#tableBody .hideDataRow').removeClass("d-none");
        } else {
            $('#tableBody .hideDataRow').addClass("d-none");
        }
        
    });
}

//get all locations

function getAllLocations() {

    $('.locations').text("");
    $('.locations').append(`<option value="refreshTable" selected>All Locations</option>`);

    $.get("./php/get/getAllLocations.php",  function(result) {
        console.log(result.data);

        result.data.forEach(loc => {
            $('.locations').append(`<option value=${loc.id}>${loc.name}</option>`);
        });

    });


}

