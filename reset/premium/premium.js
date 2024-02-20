
const monthly=document.getElementById('monthly');
const yearly=document.getElementById('yearly');

async function getMonthlyReport(){
    const report=await axios.get('http://localhost:5000/premium/monthlyreport');
    let totalIncome=0
    let totalExpense=0
    report.forEach(data => {
        var tr=document.createElement('tr');
        var td1=document.createElement('td');
        td1.appendChild(document.createTextNode(data.date))
        var td2=document.createElement('td');
        td2.appendChild(document.createTextNode(data.description))
        var td3=document.createElement('td');
        td3.appendChild(document.createTextNode(data.category))
        var td4=document.createElement('td');
        td4.appendChild(document.createTextNode(data.income))
        var td5=document.createElement('td');
        td5.appendChild(document.createTextNode(data.expense))
        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)
        tr.appendChild(td4)
        tr.appendChild(td5)
        monthly.appendChild(tr)
        totalIncome=totalIncome+(+data.income)
        totalExpense=totalExpense+(+data.expense)
    });
    var tr=document.createElement('tr');
    var td=document.createElement('td');

    var td4=document.createElement('td');
    td4.appendChild(document.createTextNode(totalIncome))
    var td5=document.createElement('td');
    td5.appendChild(document.createTextNode(totalExpense))
    tr.appendChild(td)
    tr.appendChild(td)
    tr.appendChild(td)
    tr.appendChild(td4)
    tr.appendChild(td5)
    monthly.appendChild(tr) 
}


async function getYearlyReport(){
    const report=await axios.get('http://localhost:5000/premium/yearlyreport');
    let totalIncome=0
    let totalExpense=0
    let totalSavings=0
    report.forEach(data => {
        var tr=document.createElement('tr');
        var td1=document.createElement('td');
        td1.appendChild(document.createTextNode(data.month))
        var td2=document.createElement('td');
        td2.appendChild(document.createTextNode(data.income))
        var td3=document.createElement('td');
        td3.appendChild(document.createTextNode(data.expense))
        var td4=document.createElement('td');
        td4.appendChild(document.createTextNode(data.savings))
        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)
        tr.appendChild(td4)
        monthly.appendChild(tr)
        totalIncome=totalIncome+(+data.income)
        totalExpense=totalExpense+(+data.expense)
        totalSavings=totalSavings+(+data.savings)
    });
    var tr=document.createElement('tr');
    var td=document.createElement('td');
    var td2=document.createElement('td');
    td2.appendChild(document.createTextNode(totalIncome))
    var td3=document.createElement('td');
    td3.appendChild(document.createTextNode(totalExpense))
    var td4=document.createElement('td');
    td4.appendChild(document.createTextNode(totalSavings))
    tr.appendChild(td)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.appendChild(td4)
    monthly.appendChild(tr) 
}

window.addEventListener('DOMContentLoaded',()=>{
   getMonthlyReport();
   getYearlyReport(); 
   
})