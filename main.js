//const roles_list = JSON.parse(roles)

roles_list = fetch("roles.json")
    .then(response => response.json())
    .then(roles => roles_list = roles);

console.log(roles_list)

function display(difficulty, offset, script, type) {
    document.getElementById("Ability").innerHTML = '';
    document.getElementById("Answer").innerHTML = '';
    document.getElementById("Answer2").innerHTML = '';
    let role = Math.floor(Math.random() * 180);
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
let tb = false
let snv = false
let bmr = false
let exp = false
let town = false
let outsider = false
let minion = false
let demon = false
let traveler = false
script = [tb, snv, bmr, exp]
type = [town, outsider, minion, demon, traveler]

document.getElementById('difficulty_button').onclick = getDifficulty

const Button = document.getElementById('Button');
    //Add on click listener for button
    Button.addEventListener('click', function() {
      document.getElementById("Answer").innerHTML = roles_list[role].ability;
      document.getElementById("Answer2").innerHTML = role_name;
    })


function getScript(tb, snv, bmr, exp) {
    script = [null, null, null, null]
    if (tb) {
        script[o] = 'tb'
    }
    if (snv) {
        script[1] = 'snv'
    }
    if (bmr) {
        script[2] = 'bmr'
    }
    if (exp) {
        script[3] = 'exp'
    }
    return script
}

function getType(town, outsider, minion, demon, traveler) {
    type = [null, null, null, null, null]
    if (town) {
        type[o] = 'town'
    }
    if (outsider) {
        type[1] = 'outsider'
    }
    if (minion) {
        type[2] = 'minion'
    }
    if (demon) {
        type[3] = 'demon'
    }
    if (traveler) {
        type[4] = 'traveler'
    }
    return type
}


const Again = document.getElementById('Again');
    //Add on click listener for button
    Again.addEventListener('click', function() {
      script = getScript()
      type = getType()
      role = display(difficulty, offset, script, type)
      role_name = (roles_list[role].name)
      edition = (roles_list[role].edition)
    })

const Offset = document.getElementById('offset');
    //Add on click listener for button
    Offset.addEventListener('click', function() {
      offset != offset
    })

const TBbox = document.getElementById('tb');
    //Add on click listener for button
    TBbox.addEventListener('click', function() {
      tb != tb
    })

const SNVbox = document.getElementById('snv');
    //Add on click listener for button
    SNVbox.addEventListener('click', function() {
      snv != snv
    })

const BMRbox = document.getElementById('bmr');
    //Add on click listener for button
    BMRbox.addEventListener('click', function() {
      bmr != bmr
    })

const EXPbox = document.getElementById('exp');
    //Add on click listener for button
    EXPbox.addEventListener('click', function() {
      exp != exp
    })

const Townbox = document.getElementById('town');
    //Add on click listener for button
    Townbox.addEventListener('click', function() {
      town != town
    })
  
const Outsiderbox = document.getElementById('outsider');
    //Add on click listener for button
    Outsiderbox.addEventListener('click', function() {
      outsider != outsider
    })

const Minionbox = document.getElementById('minion');
    //Add on click listener for button
    Minionbox.addEventListener('click', function() {
      minion != minion
    })

const Demonbox = document.getElementById('demon');
    //Add on click listener for button
    Demonbox.addEventListener('click', function() {
      demon != demon
    })
  
const Travelerbox = document.getElementById('traveler');
    //Add on click listener for button
    Travelerbox.addEventListener('click', function() {
      traveler != traveler
    })
