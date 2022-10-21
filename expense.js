

function save(event) {
    event.preventDefault();
    let amm = document.getElementById('amount').value;
    let des = document.getElementById('description').value;
    let cat = document.getElementById('category').value;
    var obj = {
        amm,
        des,
        cat
    }
    const token=localStorage.getItem('token');
    axios.post('http://localhost:4000/expense/add-expense', obj,{headers:{'Authorization':token}})
        .then((response) => {

            seeOnScreen(response.data);
        }).catch(() => {
            console.log('somthing went wrong in post');
        })
}

window.addEventListener('DOMContentLoaded', () => {
    const token=localStorage.getItem('token')
    var g = axios.get('http://localhost:4000/expense/get-expense',{headers:{ 'Authorization':token}})
        .then((response) => {

            console.log(response)
            for (let i = 0; i < response.data.length; i++) {

                console.log(response)
                seeOnScreen(response.data[i]);
            }
        }).catch(() => {
            console.log('somthing went wrong in get');
        })

});


function seeOnScreen(obj) {


    var parent = document.getElementById('list');
    var childHTML = `<li id=${obj.id}>${obj.ammount} - ${obj.description} - ${obj.category}
             <button onclick=remove('${obj.id}') >Delete Expense</button> 
             <button onclick=edit('${obj.ammount}','${obj.description}','${obj.category}','${obj.id}')>Edit Expense</button></li>`;
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
    document.getElementById('amount').value = amm;
    document.getElementById('description').value = des;
    document.getElementById('category').value = cat;
    remove(id);
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
    const token=localStorage.getItem('token');
    const response  = await axios.get('http://localhost:4000/purchase/premiummembership', { headers: {"Authorization" : token} });
    console.log('123',response);
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
         console.log('456',response);
         console.log('789',options.order_id,response.razorpay_payment_id);
         axios.post('http://localhost:4000/purchase/updatetransactionstatus',{
             order_id: options.order_id,
             payment_id: response.razorpay_payment_id,
         }, { headers: {"Authorization" : token} }).then(() => {
             alert('You are a Premium User Now')
         }).catch(() => {
             alert('Something went wrong. Try Again!!!')
         })
     },
  };
  const rzp1 = new Razorpay(options);
  rzp1.open();
  e.preventDefault();

  rzp1.on('payment.failed', function (response){
  alert(response.error.code);
  alert(response.error.description);
  alert(response.error.source);
  alert(response.error.step);
  alert(response.error.reason);
  alert(response.error.metadata.order_id);
  alert(response.error.metadata.payment_id);
 });
}
