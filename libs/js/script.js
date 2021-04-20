//global var
var btn;

//onload operations
$(window).on('load', function() {
    
    //load data
    getAllDepartments();
    getAllStaff();
    getAllLocations();

});


//copy button

$(document).on("click",".copyBtn", function(){

    if (btn) {
        $(btn).removeClass("btn-success");
        $(btn).addClass("btn-outline-info");
    }
    
    var $txt = $('<textarea />');
    $txt.val($(this).siblings("div:hidden").text()).appendTo('body');;
    $txt.select();
    document.execCommand("copy");
    $txt.remove();

    btn = $(this);
    $(btn).removeClass("btn-outline-info");
    $(btn).addClass("btn-success");

    
});

//insert Person

$('#addPerson').submit(function (e) {
    
    var confirmation = confirm('Do you want to add a new person?');

    if (confirmation) {

        $.ajax({
            type: 'post',
            url: window.location.href + 'libs/php/insert/insertPerson.php',
            data: $('#addPerson').serialize(),
            success: function (result) {
                console.log(result.status.code);
                $('#insertNewPerson').modal("toggle");
                getAllStaff();
                $('#addPerson')[0].reset();
            }
        });

        return false;
    }
    e.preventDefault();
    return false;
    
});

//update and delete person

$(document).on("click",".updatePer", function(){
    globalThis.id = $(this).next().val();
    var perDepId = $(this).next().next().val();
    
    $('#editPerson select').val(perDepId).trigger('change');

    var fullName = $($(this).closest("tr").find("td")[0]).children("div").text().split(/(?=[A-Z])/);
    
    $('#editPerson input[name="firstName"]').attr("value", fullName[0]);
    $('#editPerson input[name="lastName"]').attr("value", fullName[1]);
    $('#editPerson input[name="email"]').attr("value", $($(this).closest("tr").find("td")[3]).children("div").text());
    
});


$('#deletePerson').click(function (e) {

    var confirmation = confirm('Do you want to delete person\' details?');

    if (confirmation) {
        
        $.ajax({
            type: 'post',
            url: window.location.href + 'libs/php/delete/deletePerson.php',
            data: {id: id},
            success: function (result) {
                console.log(result.status.code);
                $('#updatePerson').modal("toggle");
                getAllStaff();
            }
        });

        return false;
    }

    e.preventDefault();
    return false;

});

$('#editPerson').submit(function (e) {

    var confirmation = confirm('Do you want to update details?');

    if (confirmation) {
    
        e.preventDefault();
        console.log($('#editPerson').serialize() + "&id=" + id);
        $.ajax({
            type: 'post',
            url: window.location.href + 'libs/php/update/updatePerson.php',
            data: $('#editPerson').serialize() + "&id=" + id,
            success: function (result) {
                console.log(result.status.code);
                $('#updatePerson').modal("toggle");
                getAllStaff();
            }
        });

        return false;
    }

    e.preventDefault();
    return false;

});


//insert department

$('#insertDepartment').submit(function (e) {

    var confirmation = confirm('Do you want to add a new department?');

    if (confirmation) {
    
        $.ajax({
            type: 'post',
            url: window.location.href + 'libs/php/insert/insertDepartment.php',
            data: $('#insertDepartment').serialize(),
            success: function (result) {
                console.log(result.status.code);
                getAllDepartments();
                $('#insertDepartment')[0].reset();
            }
        });

        return false;
    }

    e.preventDefault();
    return false;

});

//delete department

$('#deleteDepartment select').change(function() {

    $.ajax({
        type: 'post',
        url: window.location.href + 'libs/php/get/getAllbyDepID.php',
        data: {departmentID: $(this).val()},
        success: function (result) {
            console.log(result.data);
            if (result.data.length !== 0) {
                $('#deleteDepartment')[0].reset();
                alert("Imposible to delete department with allocated staff within!");
                return false;
            }

            $('#deleteDepartment').submit(function (e) {

                var confirmation = confirm('Do you want to delete selected department?');

                if (confirmation) {
            
                    $.ajax({
                        type: 'post',
                        url: window.location.href + 'libs/php/delete/deleteDepartmentByID.php',
                        data: $('#deleteDepartment').serialize(),
                        success: function (result) {
                            console.log(result.status.code);
                            getAllDepartments();
                            $('#deleteDepartment')[0].reset();
                        }
                    });
                
                    return false;
                }

                e.preventDefault();
                return false;

            });
            
        }
    });

});


//update department

$('#editDepartment').submit(function (e) {
    
    var confirmation = confirm('Do you want to update the department name?');

    if (confirmation) {

        $.ajax({
            type: 'post',
            url: window.location.href + 'libs/php/update/updateDepartment.php',
            data: $('#editDepartment').serialize(),
            success: function (result) {
                console.log(result.status.code);
                getAllDepartments();
                $('#editDepartment')[0].reset();
            }
        });

        return false;
    }

    e.preventDefault();
    return false;

});



//insert location

$('#insertLocation').submit(function (e) {
    
    var confirmation = confirm('Do you want to add a new location?');

    if (confirmation) {

        $.ajax({
            type: 'post',
            url: window.location.href + 'libs/php/insert/insertLocation.php',
            data: $('#insertLocation').serialize(),
            success: function (result) {
            console.log(result.status.code);
            getAllLocations();
            $('#insertLocation')[0].reset();
            }
        });

        return false;
    }

    e.preventDefault();
    return false;

});

//delete location

$('#deleteLocation select').change(function() {

    $.ajax({
        type: 'post',
        url: window.location.href + 'libs/php/get/getAllByLocID.php',
        data: {locationID: $(this).val()},
        success: function (result) {
            
            if (result.data.length !== 0) {
                $('#deleteLocation')[0].reset();
                alert("Imposible to delete location with allocated staff within!");
                return false;
            }

            $('#deleteLocation').submit(function (e) {
    
                var confirmation = confirm('Do you want to delete the selected location?');

                if (confirmation) {
            
                    $.ajax({
                        type: 'post',
                        url: window.location.href + 'libs/php/delete/deleteLocationbyID.php',
                        data: $('#deleteLocation').serialize(),
                        success: function (result) {
                            console.log(result.status.code);
                            getAllLocations();
                            $('#deleteLocation')[0].reset();
                        }
                    });
                
                    return false;
                }

                e.preventDefault();
                return false;

            });
        }
    });

});

//update location

$('#editLocation').submit(function (e) {
    
    var confirmation = confirm('Do you want to update the location name?');

    if (confirmation) {

        $.ajax({
            type: 'post',
            url: window.location.href + 'libs/php/update/updateLocation.php',
            data: $('#editLocation').serialize(),
            success: function (result) {
            console.log(result.status.code);
            getAllLocations();
            $('#editLocation')[0].reset();
            }
        });

        return false;
    }

    e.preventDefault();
    return false;

});



//select by department

$('#selectDepartmens').change(function(){ 
   
    $('#tableBody').text("");

    if ($(this).val() == "refreshTable") {

        getAllStaff();
        return;
    }

    $.post(window.location.href +"libs/php/get/getAllbyDepID.php", {departmentID: $(this).val()},  function(result) {
  
        result.data.forEach(person => {
            $('#tableBody').append(`<tr><td><div class='d-flex'>${person.firstName + " " + person.lastName}<i class="ms-auto bi bi-file-person"></i></div></td>
            <td><div class='d-flex'>${person.department}<i class=" ms-auto bi bi-briefcase"></i></div></td>
            <td><div class='d-flex'>${person.location}<i class="ms-auto bi bi-building"></i></div></td>
            <td><div class='d-none d-md-flex'>${person.email}<i class="ms-auto bi bi-envelope"></i></div><button type="button" class="btn btn-outline-info btn-sm d-sm-block d-md-none mx-auto copyBtn">Copy</button></td>
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
    
    $('#tableBody').text("");

    if ($(this).val() == "refreshTable") {

        getAllStaff();
        return;
    }
    
    $.post( window.location.href + "libs/php/get/getAllByLocID.php", {locationID: $(this).val()},  function(result) {
  
        result.data.forEach(person => {
            $('#tableBody').append(`<tr><td><div class='d-flex'>${person.firstName + " " + person.lastName}<i class="ms-auto bi bi-file-person"></i></div></td>
            <td><div class='d-flex'>${person.department}<i class=" ms-auto bi bi-briefcase"></i></div></td>
            <td><div class='d-flex'>${person.location}<i class="ms-auto bi bi-building"></i></div></td>
            <td><div class='d-none d-md-flex'>${person.email}<i class="ms-auto bi bi-envelope"></i></div><button type="button" class="btn btn-outline-info btn-sm d-sm-block d-md-none mx-auto copyBtn">Copy</button></td>
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


//sort table by columns

$('.sortTab').wrapInner('<span title="sort this column"/>').click(function(){
    var table = $('table').eq(0);
    var rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()));
    this.asc = !this.asc;
    if (!this.asc){rows = rows.reverse()};
    for (var i = 0; i < rows.length; i++){table.append(rows[i])};
})
function comparer(index) {
    return function(a, b) {
        var valA = getCellValue(a, index), valB = getCellValue(b, index);
        return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.toString().localeCompare(valB);
    }
}
function getCellValue(row, index){ return $(row).children('td').eq(index).text() }


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

//get all staff

function getAllStaff() {

    $('#tableBody').text("");

    $.get("libs//php/get/getAll.php",   function(result) {
        console.log(result.data[0]);

        result.data.forEach(person => {
            $('#tableBody').append(`<tr><td><div class='d-flex'>${person.firstName + " " + person.lastName}<i class="ms-auto bi bi-file-person"></i></div></td>
            <td><div class='d-flex'>${person.department}<i class=" ms-auto bi bi-briefcase"></i></div></td>
            <td><div class='d-flex'>${person.location}<i class="ms-auto bi bi-building"></i></div></td>
            <td><div class='d-none d-md-flex'>${person.email}<i class="ms-auto bi bi-envelope"></i></div><button type="button" class="btn btn-outline-info btn-sm d-sm-block d-md-none mx-auto copyBtn">Copy</button></td>
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

//get all departments 

function getAllDepartments() {

    $('.deparments').text("");
    $('.deparments').append(`<option value="refreshTable" selected>All Departments</option>`);
    $.get("libs//php/get/getAllDepartments.php",  function(result) {
        console.log(result.data);

        result.data.forEach(dep => {
            $('.deparments').append(`<option value=${dep.id}>${dep.name}</option>`);
        });

    });

}



//get all locations

function getAllLocations() {

    $('.locations').text("");
    $('.locations').append(`<option value="refreshTable" selected>All Locations</option>`);

    $.get("libs//php/get/getAllLocations.php",  function(result) {
        console.log(result.data);

        result.data.forEach(loc => {
            $('.locations').append(`<option value=${loc.id}>${loc.name}</option>`);
        });

    });

    $('#insertNewPerson select option[value="refreshTable"]').attr("value", "");
    $('#departmentModal select option[value="refreshTable"]').attr("value", "");
    $('#locationModal select option[value="refreshTable"]').attr("value", ""); 

}


