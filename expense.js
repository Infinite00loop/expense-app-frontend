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
            axios.get(`http://localhost:5000/get-user/${email_}`)
            .then((result)=> {
                if(result.data==""){
                    axios.post('http://localhost:5000/insert-user',myObj)
                    .then((res)=> console.log(res))
                    .catch((err)=> console.log(err));
                }
                else{
                    alert('User already exists')
                }
            })
            .catch((err)=> console.log(err))
           
        }
       
}
function onlogin(){
    var email_=document.getElementById('idx1').value;
    var password_=document.getElementById('idx2').value;
   
    let myObj={
        email: email_,
        password: password_
    };
        if(email_!='' && password_!='' ){
            axios.post('http://localhost:5000/login-user',myObj)
            .then((res)=> alert(res.data))
            .catch((err)=> alert(err.response.data));
           
        }
       
}