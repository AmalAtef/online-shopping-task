// import { i18n, initI18n } from "./i18n";

// const createPageContent = () => {
//   document.querySelector("#logo").innerHTML = i18n.t("nav.logo");
// }
// initI18n(createPageContent);

// input_validation
(function () {
    'use strict'
    let forms = document.querySelectorAll('.needs-validation')
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
           
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }

  
          form.classList.add('was-validated')
        }, false)
      })
  })()

const phone = document.getElementById("validationPhone");
const name = document.getElementById("validationName");
const userphone = document.getElementById("userPhone");
const username = document.getElementById("userName");
const saveBtn=document.getElementById("saveBtn");
const addAddress=document.getElementById("addAddress");
const nameForAddress=document.getElementById("nameForAddress");
const finalSave=document.getElementById("finalSave");

const shipGiftCheck=document.getElementById("shipGiftCheck");
const standartDelivery=document.getElementById("standartDelivery");
const addressContainer=document.getElementById("addressContainer");
const selectedAddress= document.querySelector('input[name="userAddress"]:checked');
const selectedDelivery=document.querySelector('input[name="deliveryValue"]:checked');

var validPhone = false;
var validName = false;
var addressData=[];
var count=0
name.addEventListener("keypress", () => {
    let regex = /^[a-zA-Z]{1,}$/;
    let str = name.value;
    if (regex.test(str)) {
        name.classList.remove("is-invalid");
        validName = true;
        username.innerHTML=str
    } else {
        name.classList.add("is-invalid");
        validName = false;

    }
});
phone.addEventListener("keypress", () => {
    let regex = /^[0-9]{1,11}$/;
    let str = phone.value;
    if (regex.test(str)) {
        phone.classList.remove("is-invalid");
        userphone.innerHTML=str
        validPhone=true
    } else {
        phone.classList.add("is-invalid");
        validPhone=false
    }
});

saveBtn.addEventListener("click", () => {
    addressContainer.insertAdjacentHTML("afterend",
    `<div class="accordion-item">
    <h2 class="accordion-header" id="headingOne${count}">
    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne${count}" aria-expanded="true" aria-controls="collapseOne${count}">
    <input class="form-check-input" type="radio" name="userAddress" id="flexRadioDefault${count}"/> 
    <span>${nameForAddress.value}</span>
    </button>
    </h2><div id="collapseOne${count}" class="accordion-collapse collapse show" aria-labelledby="headingOne${count}" data-bs-parent="#addressContainer">
    <div class="accordion-body"></div></div></div>`)
});

///tabs
var triggerTabList = [].slice.call(document.querySelectorAll('#pills-tab button'))
triggerTabList.forEach(function (triggerEl) {
  var tabTrigger = new bootstrap.Tab(triggerEl)

  triggerEl.addEventListener('click', function (event) {
    event.preventDefault()
    if(!validPhone&&!validName){
        name.classList.add("is-invalid");
        phone.classList.add("is-invalid");
    }else if(validName && !validPhone){
        phone.classList.add("is-invalid");
    }
    else if(!validName && validPhone){
        name.classList.add("is-invalid");
    }else{
        tabTrigger.show()
    }
  })
})


// Initialize and add the map

let map, infoWindow;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 6,
  });
  infoWindow = new google.maps.InfoWindow();

  const locationButton = document.createElement("button");

  locationButton.textContent = "Pan to Current Location";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent("Location found.");
          infoWindow.open(map);
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}


addAddress.addEventListener("click",()=>{
    initMap()
})



// function initMap() {
//     // The location of Uluru
//     const uluru = { lat: -25.344, lng: 131.036 };
//     // The map, centered at Uluru
//     const map = new google.maps.Map(document.getElementById("map"), {
//       zoom: 4,
//       center: uluru,
//     });
//     // The marker, positioned at Uluru
//     const marker = new google.maps.Marker({
//       position: uluru,
//       map: map,
//     });
//   }


//////// 
finalSave.addEventListener("click",()=>{
    let reqPromise = new Promise(function(resolve, reject) {
        let req = new XMLHttpRequest();
        req.open('POST', "/FakeApi");
        req.onload = function() {
          if (req.status == 200) {
            resolve(req.response);
          } else {
            reject("No data added");
          }
        };
        req.send({userName:name,userPhone:phone,userAddress:ad,selectedAddress:selectedAddress.value,selectedDelivery:selectedDelivery.value,shipGiftCheck});
      });
      reqPromise.then(
        function(value) {console.log(value)},
        function(error) {console.log(error)}
      );
})


