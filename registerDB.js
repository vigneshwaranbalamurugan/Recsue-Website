 //Firebase Configuration Key
 const firebaseConfig = {
    apiKey: "AIzaSyDhk_8bhmMUo2pclKIksTpbVgftyB_IFRY",
    authDomain: "register1-45164.firebaseapp.com",
    databaseURL: "https://register1-45164-default-rtdb.firebaseio.com",
    projectId: "register1-45164",
    storageBucket: "register1-45164.appspot.com",
    messagingSenderId: "614555310804",
    appId: "1:614555310804:web:47e87fd212f77b6b0db941"
  };
  
//Firebase Initialize
firebase.initializeApp(firebaseConfig);
var registerDB=firebase.database().ref('Registeration');
document.getElementById("Registeration").addEventListener('submit',submitForm);

//Get all values From form
function submitForm(e){
	e.preventDefault();
	var fname=getElementVal('firstName');
	var lname=getElementVal('lastName');
	var email=getElementVal('email');
	var number=getElementVal('number');
	 var ele = document.getElementsByName('gender');
    var gender;
            for (i = 0; i < ele.length; i++) {
                if (ele[i].checked)
                    gender=ele[i].value;
            }
     var teamname=getElementVal('teamName');
	 var webadd=getElementVal('websiteAddress');
	 var teamem=getElementVal('teamMembers');
	 var restype=getElementVal('restype');
	 var lat=getElementVal('lat');
	 var lon=getElementVal('long');
	 var city=getElementVal('city');
	 var district=getElementVal('district');
	 var missionval=getElementVal('missionValues');
	 var teamhis=getElementVal('teamHistory');
	 var teamequip=getElementVal('teamEquipment');
	 var teamtrain=getElementVal('teamTraining');
	console.log(fname,lname,gender,email,number,teamname,webadd,teamem,restype,lat,lon,city,district,missionval,teamhis,teamequip,teamtrain);
    //saveMessage(fname,lname,email,number,gender);
	
	//Save the inputs to cloud
	saveMessage(fname,lname,gender,email,number,teamname,webadd,teamem,restype,lat,lon,city,district,missionval,teamhis,teamequip,teamtrain);
        var form_reset=document.getElementById("Registeration");
	form_reset.reset();
	alert("Form Submitted Successfully");
}

//Function for cloud save
const saveMessage=(firstName,lastName,Gender,email,number,teamName,webadd,teammem,restype,lat,lon,city,district,missionval,teamhis,teamequip,teamtrain)=>{
	var newRegister=registerDB.push();
	newRegister.set({
		TeamName:teamName,
		FirstName:firstName,
		LastName:lastName,
		Email:email,
		MobileNumber:number,
		Gender:Gender,
		Website:webadd,
		Rescuetype:restype,
		TeamMembers:teammem,
		Latitude:lat,
		Longitude:lon,
		City:city,
		District:district,
		MissionValue:missionval,
		TeamHistory:teamhis,
		TeamEquipment:teamequip,
		TeamTraining:teamtrain,
		Date:Date(),
		
	})
};

//Function to get Values from input field
const getElementVal = (id)=>{
	return document.getElementById(id).value;
};

//Get latitude and longitude
const lon = document.getElementById("long");
const lat = document.getElementById("lat");
const x = document.getElementById("x");

function locationn() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  lat.value= position.coords.latitude;
  lon.value=position.coords.longitude;
}
