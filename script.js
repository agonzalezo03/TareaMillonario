const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');


// Vector para almacenar los usuarios


const local = localStorage.getItem("usuarios");
if(local !== null){
  var userList = JSON.parse(local);
  updateDOM();
  calculateWealth();
}else{
  var userList = [];
}





// Función que obtiene de la API un nombre aleatorio,
// genera una cantidad de dinero aleatoria cuyo máximo es 1.000.000
// y añade al usuario con ambos datos
async function getRandomUser() {
  let res = await fetch('https://randomuser.me/api');
  let data = await res.json();
  let user = data.results[0];

  // TODO: Crea un objeto usuario (newUser) que tenga como atributos: name y money
  let newUser = new Object
  newUser.nombre = `${user.name.first} ${user.name.last}`;
  newUser.money = Math.floor(Math.random() * 1000001);
  
  addData(newUser);
}

// TODO: Función que añade un nuevo usuario (objeto) al listado de usuarios (array)
function addData(obj) {
    
    userList.push(obj);
    for(i = 0; i < userList.length; i++){
      console.log(userList[i]);
    }
    updateDOM();
}

// TODO: Función que dobla el dinero de todos los usuarios existentes
function doubleMoney() {
  // TIP: Puedes usar map()
  userList = userList.map(usuario => ({

      nombre: usuario.nombre,
      money: usuario.money * 2
  }));
  updateDOM();
}

// TODO: Función que ordena a los usuarios por la cantidad de dinero que tienen
function sortByRichest() {
  // TIP: Puedes usar sort()
  userList.sort((a, b) => b.money - a.money);
  updateDOM();
}

// TODO: Función que muestra únicamente a los usuarios millonarios (tienen más de 1.000.000)
function showMillionaires() {
  // TIP: Puedes usar filter()
  userList = userList.filter(usuario => usuario.money >= 1000000);
  updateDOM();
}

// TODO: Función que calcula y muestra el dinero total de todos los usuarios
function calculateWealth() {
  // TIP: Puedes usar reduce ()
  let valorInicial = 0;
  let wealth = userList.reduce((accumulator, currentUser) => accumulator + currentUser.money, valorInicial);
  let wealthElement = document.createElement("div");
  let wealthFormated = formatMoney(wealth);
  wealthElement.innerHTML = `<h3>Dinero total: <strong>${wealthFormated}</strong></h3>`;
  const moneyToJSON = JSON.stringify(wealth);
  localStorage.setItem('money', moneyToJSON);

  main.appendChild(wealthElement);
}

// TODO: Función que actualiza el DOM
function updateDOM() {
  // TIP: Puedes usar forEach () para actualizar el DOM con cada usuario y su dinero
  main.innerHTML = '<h2><strong>Persona</strong> Dinero</h2>';
  
  for(i = 0; i < userList.length; i++){
    var div = document.createElement('div');
    div.classList.add("person");
    var usuario = userList[i];
    var nombre = usuario.nombre;
    var dinero = usuario.money;
    div.innerHTML = `<strong>${nombre}</strong>${formatMoney(dinero)}`;
    main.appendChild(div);
  }

  const usuariosToJSON = JSON.stringify(userList);
  localStorage.setItem('usuarios', usuariosToJSON);

  const carritoJSON = localStorage.getItem('usuarios');

  console.log(carritoJSON);
}

// Función que formatea un número a dinero
function formatMoney(number) {
  return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + '€';
}

// Obtenemos un usuario al iniciar la app
if(localStorage.getItem("usuarios") === null){
  getRandomUser();
}


// TODO: Event listeners
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
showMillionairesBtn.addEventListener("click", showMillionaires);
sortBtn.addEventListener("click", sortByRichest);
calculateWealthBtn.addEventListener("click", calculateWealth);
