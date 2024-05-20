
//used it globally to assign Values to it
let data={};

//Using this for Update Error Fixing
let submitBool=false;


//Selectin Elements of Form to Use them later
async function accessingElements(){
const fname=document.getElementById("f_name");
const lname=document.getElementById("l_name");
const mail=document.getElementById("email");
const phone=document.getElementById("phone");
const dob=document.getElementById("dob");
const country=document.getElementById("country");

//VALUES OF THE FIELDS of the form
const f_name=  fname.value;
const l_name =lname.value;
const email = mail.value;
const phnumber = phone.value;
const DoB=dob.value;
const cntry=country.value;

if (checkFormFileds(f_name, l_name, email, phnumber, DoB, cntry)) {
    getData(f_name, l_name, email, phnumber, DoB, cntry);
   
    if (getData) clearInputFields();

    let postedData = await postingData(data);
   
    const { Data } = postedData;
   
    console.log("Posted Data", Data);

    appendToList(Data);

}


}

