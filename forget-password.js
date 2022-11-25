


function forgetPassword(e){
    e.preventDefault();
    const email=e.target.email.value;
    const obj={
        email
    }
    axios.post('http://localhost:4000/password/forgotpassword',obj)
    .then(result=>{
        console.log(result.data.insertedId.toString())
        window.location.href=`http://localhost:4000/password/resetpassword/${result.data.insertedId.toString()}`;
    }).catch(err=>{
        console.log(err);
    })
}