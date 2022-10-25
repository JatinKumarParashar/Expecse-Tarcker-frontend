
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

            console.log('getresponse',response);
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

document.addEventListener('click',(event)=>{
    if(event.target.className=='compare'){
        const token=localStorage.getItem('token')
        axios.get('http://localhost:4000/expense/get-all-expense',{headers:{ 'Authorization':token}})
        .then(result=>{
            console.log(result.data);
            for(let i=0;i<result.data.result.result.length;i++){
                console.log('result.data[i]',result.data.result.result[i]);
            }
        })
        .catch(err=>{
            console.log(err);
        })
    }
   
})

const toggle=document.getElementById('toggle');
 toggle.addEventListener('change',(e)=>{
    document.body.classList.toggle('dark',e.target.checked);
 })