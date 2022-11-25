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


document.getElementById('rzp-button1').onclick = async function (e) {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:4000/purchase/premiummembership', { headers: { "Authorization": token } });
    console.log('123', response);
    var options =
    {
        "key": response.data.key_id, // Enter the Key ID generated from the Dashboard
        "name": "Test Company",
        "order_id": response.data.order.id, // For one time payment
        "prefill": {
            "name": "Test User",
            "email": "test.user@example.com",
            "contact": "7003442036"
        },
        "theme": {
            "color": "#3399cc"
        },
        // This handler function will handle the success payment
        "handler": function (response) {
            console.log('456', response);
            console.log('789', options.order_id, response.razorpay_payment_id);
            axios.post('http://localhost:4000/purchase/updatetransactionstatus', {
                order_id: options.order_id,
                payment_id: response.razorpay_payment_id,
            }, { headers: { "Authorization": token } }).then(() => {
                alert('You are a Premium User Now');
                window.location.href = 'C:/Users/jaykp/Desktop/Expense_Tracker_FrontEnd/login.html'
            }).catch(() => {
                alert('Something went wrong. Try Again!!!')
            })
        },
    };
    const rzp1 = new Razorpay(options);
    rzp1.open();
    e.preventDefault();

    rzp1.on('payment.failed', function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
    });
}

const token = localStorage.getItem('token');

document.getElementById('downloadexpense').onclick = async function (e) {
    axios.get('http://localhost:4000/expense/download', { headers: { "Authorization": token } })
        .then((response) => {
            console.log(response.data);
            //window.location.replace(`${response.data}`);

        }).catch(err => {
            console.log(err);
        })


}

parentNode = document.getElementById('list');

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