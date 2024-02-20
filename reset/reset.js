function onReset(){
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
async function onSet(){
    try{
        const currentUrl = window.location.href;
    let paramString = currentUrl.split('?')[1];
    let uuid=currentUrl.split('=')[1];
    console.log('User ID:', uuid);
    var password_=document.getElementById('idp1').value;
    await axios.post('http://localhost:5000/password/forgotpassword', {uuid: uuid, password:password_})
    }
    catch(err){
        alert('Something went wrong')
    }
    
       
}