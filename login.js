

function login(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const obj = {
        email,
        password
    }
    axios.post('http://localhost:4000/user/login', obj)
        .then(result => {
            console.log('login routes is working well')
            alert('Login successfully')
            window.location.href=`C:/Users/jaykp/Desktop/Expense_Tracker_FrontEnd/Expence_tracker2.htm`;
        }).catch(err => {
            if (err.response.status == 401) {
                alert('your password is not correct')
            }
            else {
                alert('user does not exist');
            }
            console.log(err);
        })
}