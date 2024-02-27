function onReset(){
    var email_=document.getElementById('idr1').value;   
    let myObj={
        email: email_
    };
        if(email_!='' ){
            axios.post(`${api_endpoint}password/forgotpassword`,myObj)
            .then((res)=> {
                alert('reset link send')
            })
            .catch((err)=> alert(err));
           
        }
       
}
async function onSet(e){
    e.preventDefault();
    try{
        const currentUrl = window.location.href;
    let paramString = currentUrl.split('?')[1];
    let uuid=currentUrl.split('=')[1];
    console.log('User ID:', uuid);
    var password_=document.getElementById('idp1').value;
    await axios.post(`${api_endpoint}password/newpassword`, {uuid: uuid, password:password_})
    }
    catch(err){
        alert('Something went wrong')
    }
    
       
}