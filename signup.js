function signUp(event){
    event.preventDefault();
    axios.post('http://localhost:4000/user/signup').then((result) => {
        console.log(result);
        console.log('routes is working well')
        
    }).catch((err) => {
        console.log(err);
    })
}