// VARIABLES //
const container = document.querySelector('.grid-container');
const modal = document.querySelector('.modal');
const modalBtn = document.querySelector('.close-modal');
const modalContainer = document.querySelector('.modal-content');
const search = document.querySelector('.search');


// Search Function
search.addEventListener('keyup', () =>{
    let value = search.value.toLowerCase();
    let names = document.querySelectorAll(".name");
    names.forEach(name => {
        if (name.innerHTML.indexOf(value) < 0) {
            let card = name.closest(".card");
            card.classList.add("card-hidden")
        } else {
            let card = name.closest(".card");
            card.classList.remove("card-hidden")
        }
    });
})



// Fetch Array of 12 Random People //
let employees = [];
fetch('https://randomuser.me/api/?exc=login,nat,id,registered&results=12')
   .then(res => res.json()) // parse
   .then(data => {employees = data.results;
    })
    .then(data => generateInfo(data));


// Generate User Info //
function generateInfo(data) {
  employees.forEach((employee, index) => {

// Create 12 Divs //
let card = document.createElement('div');
  card.classList.add("card", "employee" + index);
  container.appendChild(card);


let textContainer = document.createElement('div');
  textContainer.className = "text-container";
  card.appendChild(textContainer);

generateImage(employee, textContainer);

// Store Info Inside Divs //
let employeeInfo = document.createElement('div');
  employeeInfo.className = "employee_info";
  $(container.appendChild(employeeInfo));
  const name = `${employee.name.title}.` + ' ' + `${employee.name.first}` + ' ' + `${employee.name.last }`;
  const email = `${employee.email}`;
  const city = `${employee.location.city}`;
  let userInfo =  `
    <p class="name"> ${name} </p>
    <p class="email"> ${email} </p>
    <p class="city"> ${city} <p>
    `;
    employeeInfo.innerHTML = userInfo;
    $(textContainer.appendChild(employeeInfo));
    });
  }


// Generate User Image //
function generateImage(employee, card) {

let avatarContainer = document.createElement('div');
  avatarContainer.className = "avatar-container";
  card.appendChild(avatarContainer);

  const avatar = employee.picture.large;
  let picture = `
                    <img src='${avatar}' alt="employee photo"> </img>
                  `;
  avatarContainer.innerHTML = picture;
  }

// Overlay //

function generateModalInfo(index) {
    const employee = employees[index];
    const avatar = `${employee.picture.large}`;
    const name = `${employee.name.title}.` + ' ' + `${employee.name.first}` + ' ' + `${employee.name.last }`;
    const email = `${employee.email}`;
    const city = `${employee.location.city}`;
    const phone = `${employee.phone}`;
    const address = `${employee.location.street}` + ', ' +`${employee.location.city}` + ', ' + `${employee.location.state}`;
    const birthday = `${employee.dob.date}`.slice(0,10);

    let modalInfo = `
                          <div class="modal-content" data-index=${index}>
                          <img src='${avatar}' alt="employee photo"> </img>
                          <p class="name-overlay">${name} </p>
                          <p class="email-overlay">${email} </p>
                          <p class="city-overlay">${city} <p>
                          <p class="phone">${phone} </p>
                          <p class="address">${address} </p>
                          <p class="birthday">Birthday: ${birthday} </p>
                          <button class="close-modal">X</button
                          </div>`;

   modal.innerHTML = modalInfo;

  }

// Open modal when user clicks a card //
$(document).on('click', ".card", function(index) {
  generateModalInfo($('.card').index(this));
  modal.style.display = 'block';
});



// Close modal when user clicks 'X' //
$(document).on('click', '.close-modal', function(employee, index) {
    modal.style.display = "none";
});
