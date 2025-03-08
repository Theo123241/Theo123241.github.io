
let difficulty = 3
let options = {
    offset: false,
    tb: false,
    snv: false,
    bmr: false,
    exp: false,
    townsfolk: false,
    outsider: false,
    minion: false,
    demon: false,
    traveller:  false}

roles_list = fetch("roles.json")
    .then(response => response.json())
    .then(roles => roles_list = roles);


function display(difficulty, offset, script, type) {
    document.getElementById("Ability").innerHTML = '';
    document.getElementById("Answer").innerHTML = '';
    document.getElementById("Answer2").innerHTML = '';
    roleNum = Math.floor(Math.random() * roles_list.length);
    role = roles_list[roleNum]
    if (role.edition == "") {
        role.edition = "exp"
    }
    console.log(role.name)
    console.log(role.edition)
    console.log(options[role.edition])
    console.log(role.team)
    console.log(options[role.team])

    scripts = ["tb", "snv", "bmr", "exp"]
    types = ["townsfolk", "outsider", "minion", "demon", "traveller"]
    let scriptsFalse = scripts.every(element => options[element] === false)
    let typesFalse = types.every(element => options[element] === false)


    while ((options[role.edition] == false && ! scriptsFalse) || (options[role.team] == false && ! typesFalse)) {
        roleNum = Math.floor(Math.random() * roles_list.length);
        role = roles_list[roleNum]
        if (role.edition == "") {
            role.edition = "exp"
        }
    }



    let ability = []
    ability = (role.ability)
    ability = ability.replace(/[[.'",\/#!$%\^\*;:{}=\_-`~()\+]/g,"")
    ability = ability.replace(/]/g,"")
    ability = ability.replace(/-/g," ")
    ability = ability.toLowerCase()
    ability = ability.split(' ')
    let words = ability.length;
    let offsetNum = 0
    if (options[offset] == true) {
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


document.getElementById('difficulty_button').onclick = getDifficulty

const Button = document.getElementById('Button');
    Button.addEventListener('click', function() {
      document.getElementById("Answer").innerHTML = role.ability;
      document.getElementById("Answer2").innerHTML = role_name;
    })



function changeCheckBox() {
    let name = this.id
    options[name] = ! options[name]
    console.log("Full dictionary:", JSON.stringify(options, null, 2));
    return 
}

const Again = document.getElementById('Again');
    Again.addEventListener('click', function() {
      role = display(difficulty, offset, options)
      role_name = (role.name)
      edition = (role.edition)
    })


document.querySelectorAll('.options').forEach(checkbox => {
    checkbox.addEventListener('change', changeCheckBox);
});