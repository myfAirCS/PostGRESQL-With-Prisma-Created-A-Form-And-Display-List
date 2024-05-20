document.addEventListener("DOMContentLoaded", () => {
  loadCountryOptions();
  settingDate();
  displayDataOnList();
});


document.getElementById("form").addEventListener("input", async () => {
  if (updateButtonClicked) {
      let data = await fetchSpecificUserData(updateUserId);
      console.log(updateUserId);
      console.log("CHECKING: ", updateButtonClicked);
      
      let newData = getDataAfterFormEdit();
      let bool = checkValsAfterEdit(data, newData);
      if (bool) {
          checkEditedData = true;
          console.log("CHECKING2 : ", checkEditedData)
      }
    }
});


document.getElementById("submit_button").addEventListener("click", async (event) => {
  event.preventDefault();
  if (!updateButtonClicked) {
    let dataToCheck=getDataAfterFormEdit();

      let check = checkFormFileds(dataToCheck.f_name,dataToCheck.l_name,dataToCheck.ph_Num,dataToCheck.dob,dataToCheck.country);
      if (check) {
          await accessingElements();
          submitBool=false;

          
          alert("User Inserted");
      } 
      
      else {
          alert("Please fill all the fields");
      
      
        }
  } else if (checkEditedData && updateButtonClicked) {
    let dataToCheck=getDataAfterFormEdit();

      let check = checkFormFileds(dataToCheck.f_name,dataToCheck.l_name,dataToCheck.ph_Num,dataToCheck.dob,dataToCheck.country);
      if (check) {
    let data = getDataAfterFormEdit();
      let newData = await putRequest(updateUserId, data);

      let { id } = newData;

      let msg = `User Having ID ${id} Was updated`;
      alert(msg);
      appendToList(newData);

      clearInputFields();

      submitBool=false; 
      updateButtonClicked=false;
      checkEditedData = false;
      }
      else{
        alert("Fields Can't be Empty ")
      }
  } else if(updateButtonClicked && !checkEditedData){
    

      let newData=getDataAfterFormEdit();
      newData={
        id:updateUserId,
        ...newData
      }
      alert("Nothing Changed");
      appendToList(newData);
      checkEditedData = false;
      updateButtonClicked=false;
      submitBool=false;
      clearInputFields();

    }
});
