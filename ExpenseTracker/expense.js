var list=document.getElementById('list-items');
var incomelist=document.getElementById('list-income-items');
var leaderboardlist=document.getElementById('list-items2');
list.addEventListener('click' ,removeElement);
incomelist.addEventListener('click' ,removeElement);
const token = localStorage.getItem('token')
function getExpense(){
    list.innerHTML=''
    axios.get('http://localhost:5000/get-expense', { headers: {"authorization": token}})
    .then(
        (response)=>{
            for(var i=0;i<response.data.length;i++){
                showData(response.data[i]);
            }
        }
    )
    .catch(
        (err)=>console.log(err)
    )
}
function getSalary(){
    incomelist.innerHTML = "";
    axios.get('http://localhost:5000/get-income',{headers:{"authorization": token}})
    .then(
        (response)=>{
            for(var i=0;i<response.data.length;i++){
                showData(response.data[i]);
            }
        }
    )
    .catch(
        (err)=>console.log(err)
    )
}

window.addEventListener('DOMContentLoaded',()=>{
    axios.post('http://localhost:5000/ispremium',{}, { headers: {"authorization": token}})
    .then((res)=>{
        if(res.data.isPremium===true){
            document.getElementById('idk5').style.display= 'none'
            document.getElementById('idk6').style.display= 'block'

        }
    })
    .catch((err)=>console.log(err));
    getExpense();
    getSalary();

})

function tracker(){
    var expAmount_=document.getElementById('idk1').value;
    var desc_=document.getElementById('idk2').value;
    var categ_=document.getElementById('idk3').value;
    

    let myObj={
        amount: expAmount_,
        description: desc_,
        category: categ_
    };

    if(categ_=="salary"){
        axios.post('http://localhost:5000/insert-income',myObj,{headers:{"authorization": token}})
        .then((res)=>{
            console.log("about to print salary")
            getSalary();
        })
        .catch((err)=>console.log(err));
    }
    else{
        axios.post('http://localhost:5000/insert-expense',myObj,{headers:{"authorization": token}})
        .then((res)=>getExpense())
        .catch((err)=>console.log(err));
    }
    
} 

function showData(myObj){
    console.log(myObj)
    var newList=document.createElement('li');
    newList.className="list-group-item"
    var text=myObj.amount+" - "+myObj.description+" - "+myObj.category+" - ";
    newList.appendChild(document.createTextNode(text));
    var delButton=document.createElement('button');
    delButton.className="btn btn-danger btn-sm delete";
    delButton.appendChild(document.createTextNode('Delete'));
    newList.appendChild(delButton);
    newList.setAttribute('item-id',myObj.id);
    newList.setAttribute('item-amount',myObj.amount);
    newList.setAttribute('item-category',myObj.category);
    if(myObj.category=="salary"){
        incomelist.appendChild(newList);
    }
    else{
        list.appendChild(newList);
    }}


function removeElement(e){
    if(e.target.classList.contains('delete')){
        if(confirm('Are you sure to delete ?')){
            var li=e.target.parentElement;
           const id=li.getAttribute('item-id')
           const amount=li.getAttribute('item-amount')
           const categ=li.getAttribute('item-category')

           if(categ=="salary"){
            axios.delete(`http://localhost:5000/delete-income/${id}`,{params: {amount : amount},headers:{"authorization": token}})
            .then(res=>console.log(res))
            .catch(err=>console.log(err))
            incomelist.removeChild(li);
        }
        else{
            axios.delete(`http://localhost:5000/delete-expense/${id}`,{params: {amount : amount},headers:{"authorization": token}})
            .then(res=>console.log(res))
            .catch(err=>console.log(err))
            list.removeChild(li);
        }
        }
    }
   
}
document.getElementById('idk5').onclick= async function(e){
    const token= localStorage.getItem('token')
    const response= await axios.get('http://localhost:5000/premiummembership',{headers:  {"authorization": token}})
    console.log(response);
    var options=
    {
        "key":response.data.key_id,
        "order_id":response.data.order.id,
        "handler":async function (response){
            await axios.post('http://localhost:5000/updatetransactionstatus',{
                order_id: options.order_id,
                payment_id: response.razorpay_payment_id,
            },{ headers: {"authorization": token}})

            alert('You unlocked the premium features')
            document.getElementById('idk5').style.display= 'none'
            document.getElementById('idk6').style.display= 'block'

        }
    };
    const rzp1= new Razorpay(options);
    rzp1.open();
    e.preventDefault();

    rzp1.on('payment failed', function(response){
        console.log(response)
        alert('Something went wrong')
    });
}

document.getElementById('idk7').onclick= async function(e){
    const leaderboard= await axios.get('http://localhost:5000/premium/get-leaderboard')
    leaderboard.data.forEach(user => {
        var newList=document.createElement('li');
        newList.className="list-group-item"
        var text='name- '+user.username+ ' total expense- '+ (user.totalexpense || 0);
        newList.appendChild(document.createTextNode(text));    
        leaderboardlist.appendChild(newList);
        
    });
    document.getElementById('idk8').style.display= 'block'



}