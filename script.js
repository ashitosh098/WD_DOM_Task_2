// get table data from parsing external JSON filedata
let jsondata = JSON.parse(data);

const heading = document.createElement('h1');
heading.innerText="Pagination Demo";
document.body.append(heading);
//table
const div1 = document.createElement('div');
div1.setAttribute("class", "table");
div1.innerHTML = `<table>
<thead>
    <tr>
        <th>Id</th>
        <th>Name</th>
        <th>E-mail</th>
    </tr>
</thead>
<tbody></tbody>
</table>`;
document.body.append(div1);

//pagination buttton
const div2 = document.createElement('div');
div2.setAttribute("class", "pagination");
document.body.append(div2);
const ul = document.createElement('ul');
div2.append(ul);
//total page and initial current page
let totalPages = Math.ceil(jsondata.length / 10);
let page = 1; 

//call pagination function
createPagination(totalPages, page);

//pagination function
function createPagination(totalPages, page)
{
    let liTag = '';
    let active;
    let beforePage = page - 2;
    let afterPage = page + 2;


    //first and previous button
    if (page > 1) {
        liTag += ` <li class="first btn" onclick="createPagination( ${totalPages}, ${1})">First</li>
        <li class="prev btn" onclick="createPagination( ${totalPages}, ${page - 1})">Prev</li>`
    } 


    //page number to be displayed if active page number is 1 &2
    if (page == 1) {
        beforePage = 1;
        afterPage = 5;
    } else if (page == 2) {
        beforePage = 1;
        afterPage = 5;
    }

    //page number to be displayed if active page number is last& last second
    if (page == totalPages) {
        beforePage = totalPages - 4;
        afterPage = totalPages;
    } else if (page == totalPages - 1) {
        beforePage = totalPages - 4;
        afterPage = totalPages;
    }

  //page number to be displayed if pages are less than 5
    if (totalPages < 5) {
        beforePage = 1;
        afterPage = totalPages;
    } 

// number buttons.
    for (let pLen = beforePage; pLen <= afterPage; pLen++) {
        if (page === pLen) {
            active = "active";
        } else {
            active = "";
        }

        liTag += `<li class="number ${active}" onclick="createPagination(${totalPages}, ${pLen})">${pLen}</li>`
    }  

    // next and last page
    if (page < totalPages) {
        liTag += ` <li class="next btn" onclick="createPagination( ${totalPages}, ${page + 1})">Next</li>
        <li class="last btn" onclick="createPagination( ${totalPages}, ${totalPages})">Last</li>`
    }

    console.log(totalPages, page);
    
    //Create row element and appends table row and data 
    document.querySelector("tbody").innerHTML = "";

    let dataPerPage =Math.ceil(jsondata.length / 10);
    let rowFirst = page * (+dataPerPage) - (+dataPerPage);
    let rowLast = rowFirst + (+dataPerPage);
    try {
        for (let i = rowFirst; i < rowLast; i++) {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${jsondata[i].id}</td>
                        <td>${jsondata[i].name}</td>
                        <td>${jsondata[i].email}</td>`;
            document.querySelector("tbody").append(tr);
        }
    }
    catch (err) {
        console.log("No Data Found");
    }

    ul.innerHTML = liTag;
}

