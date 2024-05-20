function createOptionElement(name){
    const select=document.getElementById("country");
    const option=document.createElement("option");
    option.value=name;
    option.text=name;
    if(name=="Pakistan"){
        option.selected="Selected";
    }
    select.appendChild(option);
}

function loadCountryOptions(){
    for (let i=0;i<countries.length;i++) {
        const name=countries[i];
        const country=name;

        createOptionElement(country);
}
}

function checkFormFileds(f_name,
    l_name,
    email,
    phnumber,
    DoB,
   cntry) {
    
    if(  f_name===""||
        l_name===""||
        email===""||
        phnumber===""||
        DoB===""||
       cntry===""){
            return false;
       }
       else{
        return true;
       }
}

function getData(f_name,l_name,email,phnumber,DoB,cntry){
data={ "f_name": f_name,
"l_name": l_name,
"ph_Num": String(phnumber),
"email": email,
"dob": `${DoB}T00:00:00.000Z`,
"country": cntry,};
return true;
}

function settingDate(){

        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");
        const formattedDate = `${year-18}-${month}-${day}`;
      
        const dateInput = document.getElementById("dob");
        dateInput.value = formattedDate;
}


function clearInputFields(){
    document.getElementById("f_name").value="";
    document.getElementById("l_name").value="";
    document.getElementById("email").value="";
    document.getElementById("phone").value="";
    document.getElementById("country").value="Pakistan";
    settingDate()
}


async function postingData(object){
    let options={
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(object)
    };
let response = await fetch("/api/data",options).then((response)=>{
    return response.json();
}).catch((error)=>{
    console.log("Error ",error);
})
return response;
}

async function fetchingData(){
    let response = await fetch("/api/data")
    .then((response)=>
        {      return  response.json(); })
    
    return response;
}


function deleteRow(id){
    const row=document.getElementById(id);

    const parent=row.parentElement;
    

    parent.remove();

 }
function appendToList(dataObject){
    const table = document.getElementById("details");
    const row = document.createElement("tr");

    const cell1=document.createElement("td");
    const cell2=document.createElement("td");
    const cell3=document.createElement("td");
    const cell4=document.createElement("td");
    

    cell4.innerHTML=`<button onclick="dataInFormForUpdate(${dataObject.id})" class="edit-btn">
    &#x270E;
    </button>
    <button class="del-btn" onclick="deleteRequest(${dataObject.id})">
    &#x2717;
    </button>`

    cell1.innerText=`${dataObject.id}`;
    cell1.id=dataObject.id;
    cell2.textContent=`${dataObject.f_name} ${dataObject.l_name}`;
    cell2.id=dataObject.id;
    cell3.textContent=dataObject.email;

    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);
    row.appendChild(cell4);

    table.appendChild(row)

}


function appendDataToList(array) {
    // Loop through each object in the array
    array.forEach(object => {
        // Create an empty array to store data from object properties
        let objectData = {};

        // Iterate over each key in the current object
        for (const key in object) {
            
            console.log(object[key])
            // Push the value corresponding to the key into objectData array
            objectData[key]=object[key]
        }

        // Call appendToList function to append displayData to the listElement
        appendToList(objectData);
    })};


    async function displayDataOnList(){
      try{  let fetchedObject =await fetchingData();

        let { Data }=fetchedObject;


        appendDataToList(Data);


    }catch(err){
        console.error(err.message)
     }
     }

     

     async function deleteRequest(id){
        const url=`/api/data/${id}`;
        const options={
            method:'DELETE',
            headers:{'Content-Type':'application/json'},
        }

        deleteRow(id);
        console.log(id)

        const response=await fetch(url,options);
        const value=await response.json();

        alert(value.msg);
     }

     async function fetchSpecificUserData(id){

        const url=`/api/data/${id}`;

        const fetchedData=await fetch(url);

        const data=await fetchedData.json();

        const {Data}=data;

        return(Data);
     }

     async function putRequest(id,Data){
        const url=`/api/data/update/${id}`;

        const options={
            method:'PUT',
            headers:{'Content-Type':'application/json',
            'Authorization': 'Bearer your_access_token'
            },
            body:JSON.stringify(Data)};
        

        const response=await fetch(url,options);
        const{newData}=await response.json();
        
        return newData;
     }

    
     function toReturnValue(bool){

        return bool;

     }