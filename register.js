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
  const database = firebase.database();
  const createUserForm = document.getElementById('Register-form');
  const createUserBtn = document.getElementById('register-btn');
  let user,uid;
  
  createUserBtn.addEventListener('click', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    if(isvalidpass())
    {
    // Create new user in Firebase Authentication
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // User created successfully, proceed to the next step
        alert('Registered successfully!');
         user = userCredential.user;
         uid = user.uid;
        // Hide the registration form and show the additional details form
        const rem = document.getElementById('Register-form');
        const regis = document.getElementById('register');
        rem.style.display = 'none';
        regis.style.display = 'block';
      })
      .catch((error) => {
        console.error('Failed to create user:', error);
        alert('Failed to create user data:' + error.message);
      });
    }
    else{
      alert("Confirm-Password does not match");
    }
  });
        // Handle additional details form submission
        let verifednum=true;
        const submitbtn = document.getElementById('submit-btn');
        submitbtn.addEventListener('click', e => {
          
          e.preventDefault();
          // Collect additional user details
          var fname = getElementVal('firstName');
          var lname = getElementVal('lastName');
          var number = getElementVal('number');
          var gender;
          const ele = document.getElementsByName('gender');
          for (i = 0; i < ele.length; i++) {
            if (ele[i].checked) {
              gender = ele[i].value;
            }
          }
          var teamname = getElementVal('teamName');
          var webadd = getElementVal('websiteAddress');
          var teamem = getElementVal('teamMembers');
          var restype = getElementVal('restype');
          var lat = getElementVal('lat');
          var lon = getElementVal('long');
          var city = getElementVal('city');
          var district = getElementVal('district');
          var missionval = getElementVal('missionValues');
          var teamhis = getElementVal('teamHistory');
          var teamequip = getElementVal('teamEquipment');
          var teamtrain = getElementVal('teamTraining');
          
          // Create user data object
          const userData = {
            Email: email,
            TeamName: teamname,
            FirstName: fname,
            LastName: lname,
            MobileNumber: number,
            Gender: gender,
            Website: webadd,
            Rescuetype: restype,
            TeamMembers: teamem,
            Latitude: lat,
            Longitude: lon,
            City: city,
            District: district,
            MissionValue: missionval,
            TeamHistory: teamhis,
            TeamEquipment: teamequip,
            TeamTraining: teamtrain,
            Date: Date()
          };
  
          // Store user data in Firebase Realtime Database
          database.ref('users/' + uid).set(userData)
            .then(() => {
              console.log('User data created successfully!');
              alert('User data created successfully!');
              // Clear form inputs
              saveMessage(fname,lname,gender,email,number,teamname,webadd,teamem,restype,lat,lon,city,district,missionval,teamhis,teamequip,teamtrain);
              createUserForm.reset();
              const rem = document.getElementById('Register-form');
              const regis = document.getElementById('register');
              rem.style.display = 'block';
              regis.style.display = 'none';

            })
            .catch((error) => {
              console.error('Failed to create user data:', error);
              alert('Failed to create user data:' + error.message);
            });
        });
    

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
      Date:Date(),
      
    })
  };
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
  window.addEventListener(
    'beforeunload',
    event=>{
      event.preventDefault();
      event.returnValue='';
    }
  );
  const showps = document.getElementById("show-pass");

showps.addEventListener('click', e => {
  var x = document.getElementById("password");
  var y = document.getElementById("cnfrm-password");
  if (x.type === "password") {
    x.type = "text";
    y.type = "text";
  } else {
    x.type = "password";
    y.type = "password";
  }
});

var password = document.getElementById("password")
  , confirm_password = document.getElementById("cnfrm-password");

function validatePassword(){
  if(password.value != confirm_password.value) {
    confirm_password.setCustomValidity("Passwords Don't Match");
  } else {
    confirm_password.setCustomValidity('');
  }
}
function isvalidpass(){
  if(password.value != confirm_password.value) {
    return false;
  }
  else{
    return true;
  }
}
password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;
