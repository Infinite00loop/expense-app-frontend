function onlogin(){
    var email_=document.getElementById('idx1').value;
    var password_=document.getElementById('idx2').value;
   
    let myObj={
        email: email_,
        password: password_
    };
        if(email_!='' && password_!='' ){
            axios.post('http://localhost:5000/login-user',myObj)
            .then((res)=> {
                alert(res.data.message)
                localStorage.setItem('token', res.data.token)
                window.location.href="../ExpenseTracker/expense.html"
            })
            .catch((err)=> alert(err.response.data.message));
           
        }
       
}

document.getElementById('idx3').onclick= function(e){
     window.location.href="../reset/reset.html"

}