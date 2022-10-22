


function forgetPassword(e){
    e.preventDefault();
    const email=e.target.value;
    const obj={
        email
    }
    axios.get('http://localhost:4000/password/forgetpasswrord',obj)
    .then(result=>{
        console.log(result)
    }).catch(err=>{
        console.log(err);
    })
}