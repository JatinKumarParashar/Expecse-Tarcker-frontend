function signUp(event){
    event.preventDefault();
    const user=event.target.name.value;
    const email=event.target.email.value;
    const pass=event.target.password.value;
    const obj={
        user,
        email,
        pass
    }
    console.log(obj);
    axios.post('http://localhost:4000/user/signup',obj).then((result) => {
        console.log(result);
        console.log('routes is working well')
        window.location.href="C:/Users/jaykp/Desktop/Expense_Tracker_FrontEnd/login.html"
        
    }).catch((err) => {
        console.log(err);
    })
}