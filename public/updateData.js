var updateButtonClicked = false;
let checkEditedData=false;
let updateUserId;
let previousUserId;
let ISOdate;

async function dataInFormForUpdate(id) {
    if(submitBool==true){
        previousUserId=updateUserId;

      let oldData= await fetchSpecificUserData(previousUserId);

        appendToList(oldData);
     
    }

    updateUserId = id;

    console.log("Updated USER ID", id);
    const fetchedData = await fetchSpecificUserData(id);

    const fname = document.getElementById("f_name");
    const lname = document.getElementById("l_name");
    const mail = document.getElementById("email");
    const phone = document.getElementById("phone");
    const dob = document.getElementById("dob");
    const country = document.getElementById("country");

    const dateObject = new Date(fetchedData.dob);
    const formattedDateString = dateObject.toISOString().split('T')[0]; // Extracting yyyy-MM-dd format

    ISOdate = fetchedData.dob;

    // Values OF THE FIELDS of the form
    fname.value = fetchedData.f_name;
    lname.value = fetchedData.l_name;
    mail.value = fetchedData.email;
    phone.value = parseInt(fetchedData.ph_Num);
    dob.value = formattedDateString;
    country.value = fetchedData.country;

    deleteRow(id);

    updateButtonClicked = true;

    submitBool=true;
}

function getDataAfterFormEdit() {
    const fname = document.getElementById("f_name");
    const lname = document.getElementById("l_name");
    const mail = document.getElementById("email");
    const phone = document.getElementById("phone");
    const Dob = document.getElementById("dob");
    const cntry = document.getElementById("country");

    // Values OF THE FIELDS of the form
    const f_name = fname.value;
    const l_name = lname.value;
    const email = mail.value;
    const ph_Num = phone.value;
    const dob = ISOdate;
    const country = cntry.value;

    const data = {
        f_name,
        l_name,
        email,
        ph_Num,
        dob,
        country
    };

    return data;
}

function checkValsAfterEdit(data, newData) {
    for (const key in newData) {
        if (key == 'id' || key == 'dob') {
            continue;
        }
        if (data.hasOwnProperty(key) && newData.hasOwnProperty(key)) {
            if (newData[key] !== data[key]) {
                return true;
            }
        }
    }
    return false;
}


