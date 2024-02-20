function onreset(){
    var email_=document.getElementById('idr1').value;   
    let myObj={
        email: email_
    };
        if(email_!='' ){
            axios.post('http://localhost:5000/password/forgotpassword',myObj)
            .then((res)=> {
                alert('reset link send')
                // localStorage.setItem('token', res.data.token)
                // window.location.href="../ExpenseTracker/expense.html"
            })
            .catch((err)=> alert(err.response.data.message));
           
        }
       
}