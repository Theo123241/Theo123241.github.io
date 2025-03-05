//const roles_list = JSON.parse(roles)

roles_list = fetch("roles.json")
    .then(response => response.json())
    .then(roles => roles_list = roles);

console.log(roles_list)

function display(difficulty, offset, script, type) {
    document.getElementById("Ability").innerHTML = '';
    document.getElementById("Answer").innerHTML = '';
    document.getElementById("Answer2").innerHTML = '';
    let role = Math.floor(Math.random() * 129);
    if (script.every((val, i, arr) => val === arr[0]) == true) {
      if (type.every((val, i, arr) => val === arr[0]) == false) {
        while (type.includes(roles_list[role].team) == false) {
          role = Math.floor(Math.random() * 129);
        }
      }
    } else {
      if (type.every((val, i, arr) => val === arr[0]) == true) {
        while (script.includes(roles_list[role].edition) == false) {
          role = Math.floor(Math.random() * 129);
        }
      }
      else {
        while (script.includes(roles_list[role].edition) == false || type.includes(roles_list[role].team) == false) {
          role = Math.floor(Math.random() * 129);
        }
      }
    }

    let ability = []
    ability = (roles_list[role].ability)
    ability = ability.replace(/[[.'",\/#!$%\^\*;:{}=\_`~()]/g,"")
    ability = ability.replace(/]/g,"")
    ability = ability.replace(/-/g," ")
    ability = ability.toLowerCase()
    ability = ability.split(' ')
    let words = ability.length;
    let offsetNum = 0
    if (offset == true) {
      offsetNum = Math.floor(Math.random() * difficulty);
    } 
    for (let i = offsetNum; i < words; i += difficulty) {
        document.getElementById("Ability").innerHTML += ability[i];
        document.getElementById("Ability").innerHTML += ' ';
    }
    return(role)
}

function getDifficulty() {
  difficulty = parseInt(document.getElementById('difficulty').value)
  if (difficulty <= 0) {
    difficulty = 1
  }
  console.log(difficulty)
}

let difficulty = 3
let offset = false
let tb = null
let snv = null
let bmr = null
let ks = null
let town = null
let outsider = null
let minion = null
let demon = null
let traveler = null
script = [tb, snv, bmr, ks]
type = [town, outsider, minion, demon, traveler]

document.getElementById('difficulty_button').onclick = getDifficulty

const Button = document.getElementById('Button');
    //Add on click listener for button
    Button.addEventListener('click', function() {
      document.getElementById("Answer").innerHTML = roles_list[role].ability;
      document.getElementById("Answer2").innerHTML = role_name;
    })

const Again = document.getElementById('Again');
    //Add on click listener for button
    Again.addEventListener('click', function() {
      script = [tb, snv, bmr, ks]
      type = [town, outsider, minion, demon, traveler]
      role = display(difficulty, offset, script, type)
      role_name = (roles_list[role].name)
      edition = (roles_list[role].edition)
    })

const Offset = document.getElementById('offset');
    //Add on click listener for button
    Offset.addEventListener('click', function() {
      if (offset == true){
        offset = false
      } else {
         offset = true
      }
    })

const TBbox = document.getElementById('tb');
    //Add on click listener for button
    TBbox.addEventListener('click', function() {
      if (tb == 'tb'){
        tb = null
      } else {
         tb = 'tb'
      }
    })

const SNVbox = document.getElementById('snv');
    //Add on click listener for button
    SNVbox.addEventListener('click', function() {
      if (snv == 'snv'){
        snv = null
      } else {
         snv = 'snv'
      }
    })

const BMRbox = document.getElementById('bmr');
    //Add on click listener for button
    BMRbox.addEventListener('click', function() {
      if (bmr == 'bmr'){
        bmr = null
      } else {
         bmr = 'bmr'
      }
    })

const KSbox = document.getElementById('ks');
    //Add on click listener for button
    KSbox.addEventListener('click', function() {
      if (ks == ''){
        ks = null
      } else {
         ks = ''
      }
    })

const Townbox = document.getElementById('town');
    //Add on click listener for button
    Townbox.addEventListener('click', function() {
      if (town == 'townsfolk'){
        town = null
      } else {
         town = 'townsfolk'
      }
    })
  
const Outsiderbox = document.getElementById('outsider');
    //Add on click listener for button
    Outsiderbox.addEventListener('click', function() {
      if (outsider == 'outsider'){
        outsider = null
      } else {
        outsider = 'outsider'
      }
    })

const Minionbox = document.getElementById('minion');
    //Add on click listener for button
    Minionbox.addEventListener('click', function() {
      if (minion == 'minion'){
        minion = null
      } else {
        minion = 'minion'
      }
    })

const Demonbox = document.getElementById('demon');
    //Add on click listener for button
    Demonbox.addEventListener('click', function() {
      if (demon == 'demon'){
        demon = null
      } else {
        demon = 'demon'
      }
    })
  
const Travelerbox = document.getElementById('traveler');
    //Add on click listener for button
    Travelerbox.addEventListener('click', function() {
      if (traveler == 'traveler'){
        traveller = null
      } else {
        traveler = 'traveler'
      }
    })
