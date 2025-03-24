let difficulty = 3;
let offsetNum = 0;
let roles_list = [];
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
    traveller: false,
    fabled: false
};

const difficultyInput = document.getElementById('difficulty');
const offsetValue = document.getElementById('offset-value');
const nextCharacterBtn = document.getElementById('next-character');
const revealAnswerBtn = document.getElementById('reveal-answer');
const checkAnswerBtn = document.getElementById('check-answer');
const typeBtn = document.getElementById('type');
const editionBtn = document.getElementById('edition');
const spacingBtn = document.getElementById('spacing');
const decreaseBtn = document.querySelector('.decrease-btn');
const increaseBtn = document.querySelector('.increase-btn');

// Toggle hints
typeBtn.addEventListener('click', () => {
    document.getElementById('Type').classList.toggle('active');
});

editionBtn.addEventListener('click', () => {
    document.getElementById('Edition').classList.toggle('active');
});

spacingBtn.addEventListener('click', () => {
    document.getElementById('Spacing').classList.toggle('active');
});

// Increase/decrease difficulty
decreaseBtn.addEventListener('click', () => {
    if (difficultyInput.value > 1) {
        difficultyInput.value = parseInt(difficultyInput.value) - 1;
        difficulty = parseInt(difficultyInput.value);
    }
});

increaseBtn.addEventListener('click', () => {
    difficultyInput.value = parseInt(difficultyInput.value) + 1;
    difficulty = parseInt(difficultyInput.value);
});


// Check answer functionality
checkAnswerBtn.addEventListener('click', () => {
    const guessInput = document.getElementById('guess-input');
    const answerName = document.getElementById('AnswerName').textContent.toLowerCase();
    
    if (guessInput.value.toLowerCase() === answerName.toLowerCase()) {
        alert('Correct!');
    } else {
        alert('Incorrect. Try again!');
    }
});

// Toggle answer reveal
revealAnswerBtn.addEventListener('click', () => {
    document.getElementById('answer-section').classList.toggle('active');
});

// Next character functionality
nextCharacterBtn.addEventListener('click', () => {
    document.getElementById('answer-section').classList.remove('active');
    document.getElementById('guess-input').value = '';
    newRole(difficulty, options);
});

// Toggle checkboxes
document.querySelectorAll('.options').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        let name = this.id;
        options[name] = !options[name];
        console.log(options)
    });
});

// Format the ability text
function formatAbility(ability) {
    ability = ability.replace(/[[.'",\/#!$%\^\*;:{}=\_-`~()\+]/g,"");
    ability = ability.replace(/]/g,"");
    ability = ability.replace(/-/g," ");
    ability = ability.replace(/\ +/g," ");
    ability = ability.toLowerCase();
    return ability;
}

// Generate a new role
function newRole(difficulty, options) {
    // Clear previous role information
    document.getElementById('Type').textContent = '';
    document.getElementById('Edition').textContent = '';
    document.getElementById('Spacing').textContent = '';
    document.getElementById('AnswerAbility').textContent = '';
    document.getElementById('AnswerName').textContent = '';
    
    // Select a random role
    const roleNum = Math.floor(Math.random() * roles_list.length);
    const role = roles_list[roleNum];

    // Process edition info
    let roleEdition = role.edition || "exp";
    
    // Filter roles based on options
    const scripts = ["tb", "snv", "bmr", "exp"];
    const types = ["townsfolk", "outsider", "minion", "demon", "traveller", "fabled"];
    
    let scriptsFalse = scripts.every(element => options[element] === false);
    let typesFalse = types.every(element => options[element] === false);
    
    // Apply filters if necessary
    if ((options[roleEdition] === false && !scriptsFalse) || (options[role.team] === false && !typesFalse)) {
        return newRole(difficulty, options);
    }
    
    // Format and display ability
    let ability = formatAbility(role.ability);
    let words = ability.split(' ');
    let abilityDisplay = '';
    
    // Apply difficulty and offset
    if (options.offset) {
        offsetNum = Math.floor(Math.random()*difficulty)
    }

    for (let i = offsetNum; i < words.length; i += difficulty) {
        abilityDisplay += words[i] + ' ';
    }
    
    // Display ability with blanks
    let spacingDisplay = showSpacing(ability);
    
    // Update display
    document.getElementById('ability-text').textContent = abilityDisplay || "Select a new character";
    document.getElementById('Type').textContent = role.team[0].toUpperCase() + role.team.slice(1);
    document.getElementById('Edition').textContent = getEdition(role);
    document.getElementById('Spacing').textContent = spacingDisplay;
    
    // Update answer section
    document.getElementById('AnswerAbility').textContent = role.ability;
    document.getElementById('AnswerName').textContent = role.name;

    //Update hint section
    Type.classList.remove('active');
    Edition.classList.remove('active');
    Spacing.classList.remove('active');
    
    return role;
}

// Get formatted edition name
function getEdition(role) {
    if (role.edition === "tb") {
        return "Trouble Brewing";
    } else if (role.edition === "bmr") {
        return "Bad Moon Rising";
    } else if (role.edition === "snv") {
        return "Sects & Violets";
    } else {
        return "Experimental";
    }
}

// Create spacing display
function showSpacing(ability) {
    let words = ability.split(" ");
    let result = "";
    
    for (let i = 0; i < words.length; i++) {
        if (i % difficulty === offsetNum) {
            result += words[i];
        } else {
            result += "_".repeat(words[i].length);
        }
        result += " ";
    }
    
    return result;
}

// Fetch roles data
async function loadRoles() {
    try {
        const response = await fetch('roles.json');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        roles_list = await response.json();

        // Get the first role
        newRole(difficulty, options);
    } catch (error) {
        console.error("Error loading roles:", error);
    }
}

// Initialize the game when DOM is loaded
document.addEventListener("DOMContentLoaded", loadRoles);