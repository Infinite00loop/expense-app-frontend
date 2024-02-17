function onsignup(){
    var username_=document.getElementById('id1').value;
    var email_=document.getElementById('id2').value;
    var password_=document.getElementById('id3').value;
   
    let myObj={
        username: username_,
        email: email_,
        password: password_,
    };
        if(username_!='' && email_!='' && password_!='' ){
            console.log(myObj);
            axios.post('http://localhost:5000/insert-user',myObj)
            .then((res)=> console.log(res))
            .catch((err)=> console.log(err));
        }
       
}