 const firebaseConfig = {
    apiKey: "AIzaSyDhk_8bhmMUo2pclKIksTpbVgftyB_IFRY",
    authDomain: "register1-45164.firebaseapp.com",
    databaseURL: "https://register1-45164-default-rtdb.firebaseio.com",
    projectId: "register1-45164",
    storageBucket: "register1-45164.appspot.com",
    messagingSenderId: "614555310804",
    appId: "1:614555310804:web:47e87fd212f77b6b0db941"
  };
firebase.initializeApp(firebaseConfig);
var registerDB=firebase.database().ref('Registeration');
document.getElementById("Registeration").addEventListener('submit',submitForm);
function submitForm(e){
	e.preventDefault();
	var fname=getElementVal('firstName');
	var lname=getElementVal('lastName');
	var email=getElementVal('email');
	var Password=getElementVal('password');
	var number=getElementVal('number');
	 var ele = document.getElementsByName('gender');
    var gender;
            for (i = 0; i < ele.length; i++) {
                if (ele[i].checked)
                    gender=ele[i].value;
            }
        
	console.log(fname,lname,gender);
	saveMessage(fname,lname,email,Password,number,gender);
	alert("Registered Successfully");
}
const saveMessage=(firstName,lastName,email,Password,number,Gender)=>{
	var newRegister=registerDB.push();
	newRegister.set({
		FirstName:firstName,
		LastName:lastName,
		Email:email,
		Password:Password,
		MobileNumber:number,
		Gender:Gender,
		Date:Date(),
		
	})
};
const getElementVal = (id)=>{
	return document.getElementById(id).value;
};
