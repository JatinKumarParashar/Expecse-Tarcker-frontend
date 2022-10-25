

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
            console.log('response from post login >>>>>', result.data.result[0].ispremiumuser)
            localStorage.setItem('token', result.data.token);
            //console.log('login status>>>', result.response.status);
            if (result.data.result[0].ispremiumuser) {
                window.location.href='C:/Users/jaykp/Desktop/Expense_Tracker_FrontEnd/premium.html'
            }
            else {
                window.location.href = `C:/Users/jaykp/Desktop/Expense_Tracker_FrontEnd/Expence_tracker2.htm`;
                
                //window.location.href = 'http://www.google.com'
            }
        }).catch(err => {
            //console.log(err);
            if (err.response.status == 401) {
                alert('your password is not correct')
            }
            else {
                alert('user does not exist');
            }
            console.log(err);
        })
}

const forgetpasswrord=document.getElementById('forget-password')

forgetpasswrord.addEventListener('click',(e)=>{
     console.log(e.target.id)
    if(e.target.id='forget-password'){
       window.location.href='C:/Users/jaykp/Desktop/Expense_Tracker_FrontEnd/forget-password.html'
    }
})