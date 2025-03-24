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


function checkAnswer() {

    const guessInput = document.getElementById('guess-input');
    const answerName = document.getElementById('AnswerName').textContent.toLowerCase();
    const guessSection = document.getElementById('guess-section');
    
    const correct = spellingMatch(guessInput.value, answerName)
    if (correct) {
        document.getElementById('answer-section').classList.toggle('active');
        guessSection.classList.add('flash-green');
        setTimeout(() => {
            guessSection.classList.remove('flash-green');
        }, 500);
    } else {
        document.getElementById('guess-input').value = '';
        guessSection.classList.add('flash-red');
        setTimeout(() => {
            guessSection.classList.remove('flash-red');
        }, 500);
    }
}
// Check answer functionality
checkAnswerBtn.addEventListener('click', () => {
    checkAnswer()
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        checkAnswer()
    }
});


//Spell Check
function levenshteinDistance(s1, s2) {
    const len1 = s1.length;
    const len2 = s2.length;

    // Initialize a 2D array (dp) for dynamic programming
    const dp = [];
    for (let i = 0; i <= len1; i++) {
        dp[i] = [];
        for (let j = 0; j <= len2; j++) {
            dp[i][j] = 0;
        }
    }

    for (let i = 0; i <= len1; i++) dp[i][0] = i;
    for (let j = 0; j <= len2; j++) dp[0][j] = j;

    for (let i = 1; i <= len1; i++) {
        for (let j = 1; j <= len2; j++) {
            const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
            dp[i][j] = Math.min(
                dp[i - 1][j] + 1,      // Deletion
                dp[i][j - 1] + 1,      // Insertion
                dp[i - 1][j - 1] + cost // Substitution
            );
        }
    }
    return dp[len1][len2];
}

function spellingMatch(guess, answer, maxDistance = 3) {
    guess = guess.toLowerCase()
    const distance = levenshteinDistance(guess, answer.toLowerCase());
    
    if (distance <= maxDistance) {
        return answer;
    }
    return null;
}

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
    const types = ["townsfolk", "outsider", "minion", "demon", "traveller"];
    
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