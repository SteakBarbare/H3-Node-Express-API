const charge = document.querySelector(".charge");
const leftPokemon = document.querySelector(".leftPokemon");
const rightPokemon = document.querySelector(".rightPokemon");
const leftHealthbar = document.querySelector(".leftHealthbar");
const rightHealthbar = document.querySelector(".rightHealthbar");
let types = [];

let leftPokemonInstance;
let rightPokemonInstance;

// SETUP

class Pokemon {
  constructor(
    name,
    health,
    speed,
    attack,
    defense,
    type,
    type2,
    skills,
    image
  ) {
    this.name = name;
    this.health = health;
    this.maxHealth = health;
    this.speed = speed;
    this.attack = attack;
    this.defense = defense;
    this.type = type;
    this.type2 = type2;
    this.skills = skills;
    this.image = image;
  }
}

// Get pokemon data from database
function getPokemon(direction, name) {
  const url = "http://localhost:3000/getPokemonByName/" + name;
  fetch(url, {
    method: "get",
    headers: new Headers({
      "Content-Type": "application/json"
    })
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (jsonResponse) {
      console.log(jsonResponse);
      createPokemon(direction, jsonResponse.data[0]);
    });
}

// Load Pokemon data and set them up inside the page + create an instance
function createPokemon(direction, pokemonData) {
  let tempStorage = new Pokemon(
    pokemonData.name,
    pokemonData.health,
    pokemonData.speed,
    pokemonData.attack,
    pokemonData.defense,
    pokemonData.type,
    pokemonData.type2,
    pokemonData.skills,
    pokemonData.image
  );
  if (direction == "Left") {
    leftPokemonInstance = tempStorage;
    leftPokemon.src = "Images/" + leftPokemonInstance.image;
    setHealthbar(leftPokemonInstance, leftHealthbar);
  } else {
    rightPokemonInstance = tempStorage;
    rightPokemon.src = "Images/" + rightPokemonInstance.image;
    setHealthbar(rightPokemonInstance, rightHealthbar);
  }
}

// Initial Healthbar setup
function setHealthbar(pokemon, healthbar) {
  healthbar.innerHTML =
    pokemon.name + ": " + pokemon.health + " / " + pokemon.maxHealth + " Hp";
  healthbar.style.width =
    String((pokemon.health / pokemon.maxHealth) * 100) + "px";
}

// Get all types, then check for interactions
function getTypes() {
  const url = "http://localhost:3000/allTypes/";
  fetch(url, {
    method: "get",
    headers: new Headers({
      "Content-Type": "application/json"
    })
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (jsonResponse) {
      // Get All types, then map them into an array to load strengths & weaknesses
      console.log(jsonResponse);
      for (
        let currentType = 0;
        currentType < jsonResponse.data.length;
        currentType++
      ) {
        loadTypesInteraction(jsonResponse.data[currentType]);
      }
      console.log(types);
    });
}

// Load types & interactions inside the types array
function loadTypesInteraction(type) {
  const url = "http://localhost:3000/getTypesInteractionById/" + type.id;
  fetch(url, {
    method: "get",
    headers: new Headers({
      "Content-Type": "application/json"
    })
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (jsonResponse) {
      // For each type, add the different weaknesses & strengths
      types.push({ name: type.name, id: type.id, weakTo: [], strongTo: [] });
      for (
        let currentType = 0;
        currentType < jsonResponse.data.length;
        currentType++
      ) {
        if (jsonResponse.data[currentType].weakorstrong) {
          types[types.length - 1].strongTo.push(
            jsonResponse.data[currentType].secondTypeId
          );
        } else {
          types[types.length - 1].weakTo.push(
            jsonResponse.data[currentType].secondTypeId
          );
        }
      }
    });
}

getPokemon("Left", "Carapute");
getPokemon("Right", "Kipachu");
getTypes();

// INTERACTIONS

charge.addEventListener("click", () => {
  if (rightPokemonInstance.speed < leftPokemonInstance.speed) {
    attackTarget(
      leftPokemon,
      rightPokemon,
      rightHealthbar,
      leftPokemonInstance,
      rightPokemonInstance,
      false,
      "Right"
    );
  } else {
    attackTarget(
      rightPokemon,
      leftPokemon,
      rightHealthbar,
      rightPokemonInstance,
      leftPokemonInstance,
      false,
      "Left"
    );
  }
});

function attackTarget(
  attackerSprite,
  targetSprite,
  targetLifeHTML,
  attacker,
  target,
  isCounterAttack,
  direction
) {
  attackerSprite.style.left = "45%";
  setTimeout(() => {
    // Damage calcultation (check for super / not very effective)
    let damageMultiplier = 1;
    let attackId;

    // Get attacker type
    // This is bullshit, but I'm too lazy to fix this this early in the morning
    for (let currentType = 0; currentType < types.length; currentType++) {
      if (attacker.type == types[currentType].name) {
        attackId = types[currentType];
        break;
      }
    }

    // Check for types interaction, if strong to, then dmg * 2, if weak to, then dmg * 0.5
    for (currentType = 0; currentType < types.length; currentType++) {
      if (target.type == types[currentType].name) {
        if (types[currentType].weakTo.lastIndexOf(attackId.id) != -1) {
          damageMultiplier = 2;
        } else if (attackId.weakTo.lastIndexOf(types[currentType].id) != -1) {
          damageMultiplier = 0.5;
        }
      }
    }

    // Deal Damage with modifier
    target.health -= attacker.attack * damageMultiplier;

    // Animation
    if (direction == "Right") {
      attackerSprite.style.left = "20%";
    } else {
      attackerSprite.style.left = "65%";
    }
    targetLifeHTML.innerHTML =
      target.name + ": " + target.health + " / " + target.maxHealth + " Hp";
    targetLifeHTML.style.width =
      String((target.health / target.maxHealth) * 100) + "px";
    targetSprite.style.opacity = 0;
    setTimeout(() => {
      targetSprite.style.opacity = 1;
      if (!isCounterAttack) {
        if (direction == "Right") {
          attackTarget(
            targetSprite,
            attackerSprite,
            leftHealthbar,
            target,
            attacker,
            true,
            "Left"
          );
        } else {
          attackTarget(
            targetSprite,
            attackerSprite,
            leftHealthbar,
            target,
            attacker,
            true,
            "Right"
          );
        }
      }
    }, 250);
  }, 500);
}
