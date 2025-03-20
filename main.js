
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


function formatAbility(ability) {
    ability = ability.replace(/[[.'",\/#!$%\^\*;:{}=\_-`~()\+]/g,"")
    ability = ability.replace(/]/g,"")
    ability = ability.replace(/-/g," ")
    ability = ability.replace(/\ +/g," ")
    ability = ability.toLowerCase()
    return ability
}
function newRole(difficulty, options) {
    document.getElementById("Ability").innerHTML = '';
    document.getElementById("AnswerAbility").innerHTML = '';
    document.getElementById("AnswerName").innerHTML = '';
    document.getElementById("Type").innerHTML = '';
    document.getElementById("Edition").innerHTML = '';
    document.getElementById("Spacing").innerHTML = '';
    roleNum = Math.floor(Math.random() * roles_list.length);
    role = roles_list[roleNum]
    console.log(roles_list)
    if (role.edition == "") {
        role.edition = "exp"
    }

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

    let ability = formatAbility(role.ability)
    ability = ability.split(' ')
    
    let words = ability.length;
    offsetNum = 0
    difficulty = getDifficulty()
    if (options.offset == true) {
        offsetNum = Math.floor(Math.random() * difficulty);
    } 
    for (let i = offsetNum; i < words; i += difficulty) {
        document.getElementById("Ability").innerHTML += ability[i];
        document.getElementById("Ability").innerHTML += ' ';
    }

    ability = formatAbility(role.ability)
    document.getElementById("Edition").innerHTML = getEdition(role);

    document.getElementById("Type").innerHTML = role.team[0].toUpperCase() + role.team.slice(1);

    ability = showSpacing(ability)
    document.getElementById("Spacing").innerHTML = ability;

    document.getElementById("AnswerAbility").innerHTML = role.ability;
    document.getElementById("AnswerName").innerHTML = role.name;
    
    return(role)
}

function getDifficulty() {
    difficulty = parseInt(document.getElementById('difficulty').value)
    if (isNaN(difficulty)) {
        difficulty = 3
    }
    else if (difficulty <= 0) {
        difficulty = 1
    } 
    return difficulty
}


const answer = document.getElementById('answer');
    answer.addEventListener('click', function() {
    })



function changeCheckBox() {
    let name = this.id
    options[name] = ! options[name]
    console.log("Full dictionary:", JSON.stringify(options, null, 2));
    return 
}

const display = document.getElementById('newRole');
    display.addEventListener('click', function() {
        getDifficulty()
        role = newRole(difficulty, options)
    })

function getEdition(role) {
    if (role.edition == "tb") {
        edition = "Trouble Brewing"
    }
    if (role.edition == "bmr") {
        edition = "Bad Moon Rising"
    }
    if (role.edition == "snv") {
        edition = "Sects & Violets"
    }
    else {
        edition = "Expiremental"
    }
    return edition
}


const type = document.getElementById('type');
    type.addEventListener('click', function() {
        
    })

const editionButton = document.getElementById('edition');
    editionButton.addEventListener('click', function() {
        
    })


function showSpacing(ability) {
        return ability.split(" ").map((word, index) => 
            index % difficulty !== offsetNum ? "_".repeat(word.length) : word
        ).join(" ");
    }



const spacing = document.getElementById('spacing');
    spacing.addEventListener('click', function() {
    })


document.querySelectorAll('.options').forEach(checkbox => {
    checkbox.addEventListener('change', changeCheckBox);
});

function showHeadings(...ids) {
    ids.forEach(id => {
        document.getElementById(id).classList.add("visible");
    });
}

function hideAllHeadings() {
    document.querySelectorAll("h2").forEach(heading => {
        heading.classList.remove("visible");
    });
}
async function loadRoles() {
    let response = await fetch("roles.json");
    roles_list = await response.json(); // Now roles_list contains the actual data
    role = newRole(3, options)
}

document.addEventListener("DOMContentLoaded", loadRoles);