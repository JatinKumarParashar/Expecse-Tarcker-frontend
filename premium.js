const token = localStorage.getItem('token')
const compare = document.getElementById('user');
const expense = document.getElementById('expense');
parentNode = document.getElementById('list');
var Edit = 0;

function save(event) {
    event.preventDefault();
    let amm = document.getElementById('amount').value;
    let des = document.getElementById('description').value;
    let cat = document.getElementById('category').value;
    let id = document.getElementById('expenseId').value;
    var obj = {
        amm,
        des,
        cat,
        id
    }
    const token = localStorage.getItem('token');
    if (Edit) {

        axios.post('http://localhost:4000/expense/add-expense', obj, { headers: { 'Authorization': token } })
            .then((response) => {
                console.log('response of add/edit expense', response);
                obj.id=response.data.insertedId.toString();

                seeOnScreen(obj);
            }).catch(() => {
                console.log('somthing went wrong in post 5616516');
            })
    }
    else {
        axios.post('http://localhost:4000/expense/add-expense', obj, { headers: { 'Authorization': token } })
            .then((response) => {
                console.log('response of add/edit expense', response);
                obj.id=response.data.insertedId.toString();
                seeOnScreen(obj);
            }).catch(() => {
                console.log('somthing went wrong in post');
            })
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token')
    const objUrlParams = new URLSearchParams(window.location.search);
    const page = objUrlParams.get('page') || 1;
    // const items=localStorage.getItem('items')
    // console.log('checking items',items);
    var g = axios.get(`http://localhost:4000/expense/get-expense?page=${page}`, { headers: { 'Authorization': token } })
        .then((response) => {

              console.log('getresponse',response.data);
            for (let i = 0; i < response.data.length; i++) {

                //console.log(response)
                loadScreen(response.data[i]);
            }
           // showPagination(response.data);
        }).catch(() => {
            console.log('somthing went wrong in get,loading');
        })

});

function loadScreen(obj){
    console.log('id of added expense',obj._id.toString())
    var parent = document.getElementById('list');
    var childHTML = `<li id=${obj._id.toString()}>${obj.ammount} - ${obj.description} - ${obj.category}
             <button onclick=remove('${obj._id.toString()}') >Delete Expense</button> 
             <button onclick=edit('${obj.ammount}','${obj.description}','${obj.category}','${obj._id.toString()}')>Edit Expense</button></li>`;
    parent.innerHTML = parent.innerHTML + childHTML;
}


function seeOnScreen(obj) {

console.log('id of added expense',obj.id)
    var parent = document.getElementById('list');
    var childHTML = `<li id=${obj.id}>${obj.amm} - ${obj.des} - ${obj.cat}
             <button onclick=remove('${obj.id}') >Delete Expense</button> 
             <button onclick=edit('${obj.amm}','${obj.des}','${obj.cat}','${obj.id}')>Edit Expense</button></li>`;
    parent.innerHTML = parent.innerHTML + childHTML;
}

function remove(id) {
    axios.delete(`http://localhost:4000/expense/delete/${id}`)
        .then(() => {
            console.log('Expense has been deleted');
        }).catch(() => {
            console.log('somthing went wrong in delete');
        })
    removefromscreen(id);
}

function edit(amm, des, cat, id) {
    Edit = 1;
    document.getElementById('amount').value = amm;
    document.getElementById('description').value = des;
    document.getElementById('category').value = cat;
    document.getElementById('expenseId').value = id;
    removefromscreen(id)
    // axios.post(`http://localhost:4000/expense/edit/${id}`)

}




function removefromscreen(id) {
    let parent = document.getElementById('list');
    let deletechild = document.getElementById(id);
    if (deletechild) {
        parent.removeChild(deletechild);
    }
}



document.addEventListener('click', (event) => {
    if (event.target.className == 'compare') {

        const token = localStorage.getItem('token')
        axios.get('http://localhost:4000/expense/get-all-expense', { headers: { 'Authorization': token } })
            .then(result => {
                //console.log('result.data', result.data[0]._id.toString());
                compare.innerHTML = "";
                for (let i = 0; i < result.data.length; i++) {
                    //console.log('result.data[i]',result.data.result.result[i]);
                    showUserOnScreen(result.data[i]);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

})


function showUserOnScreen(user) {

    const cost = `<button onclick="showExpenseOfUser(event,'${user._id.toString()}')">${user.name}</button><br>`;
    compare.innerHTML += cost;

}

function showExpenseOfUser(event, id) {
    expense.innerHTML = "";
    var g = axios.get(`http://localhost:4000/expense/getexpense?id=${id}`, { headers: { 'Authorization': token } })
        .then((response) => {
            console.log('getresponse', response);
            for (let i = 0; i < response.data.length; i++) {

                console.log(response)
                seeExpenseScreen(response.data[i]);
            }

        }).catch(() => {
            console.log('somthing went wrong in get');
        })

}


function seeExpenseScreen(obj) {


    // var parent = document.getElementById('list');
    var childHTML = `<li id=${obj.id}>${obj.ammount} - ${obj.description} - ${obj.category}
             </li>`;
    expense.innerHTML = expense.innerHTML + childHTML;
}


const toggle = document.getElementById('toggle');
toggle.addEventListener('change', (e) => {
    document.body.classList.toggle('dark', e.target.checked);
})



const pagination = document.querySelector('.pagination');

function showPagination({
    currentPage,
    hasNextPage,
    nextPage,
    hasPreviousPage,
    previousPage,
    lastPage
}) {
    pagination.innerHTML = "";

    if (hasPreviousPage) {

        const btn2 = document.createElement('button');
        btn2.innerHTML = previousPage;
        btn2.addEventListener('click', () => {
            parentNode.innerHTML = "";
            getProducts(previousPage)
        });
        pagination.appendChild(btn2);

    }
    const btn1 = document.createElement('button');
    btn1.innerHTML = `<h3>${currentPage}</h3>`;
    btn1.addEventListener('click', () => {
        parentNode.innerHTML = "";

        getProducts(currentPage)
    });
    pagination.appendChild(btn1);

    if (hasNextPage) {

        const btn3 = document.createElement('button');
        btn3.innerHTML = nextPage;
        btn3.addEventListener('click', () => {
            parentNode.innerHTML = "";
            getProducts(nextPage)
        });
        pagination.appendChild(btn3);
    }
}



function getProducts(page) {
    var g = axios.get(`http://localhost:4000/expense/get-expense?page=${page}`, { headers: { 'Authorization': token } })
        .then((response) => {

            console.log('getresponse', response);
            for (let i = 0; i < response.data.expense.length; i++) {

                console.log(response)
                seeOnScreen(response.data.expense[i]);
            }
            showPagination(response.data);
        }).catch(() => {
            console.log('somthing went wrong in get');
        })
}


    const download=document.getElementById('downloadexpense')
document.getElementById('downloadexpense').onclick = async function (e) {
    axios.get('http:localhost:4000/expense/download', { headers: { "Authorization": token } })
        .then((response) => {
            console.log(response.data);
           // download.location.replace(`${response.data}`);

        }).catch(err=>{
            console.log(err);
        })


}
