const charge = document.querySelector(".charge");
const leftPokemon = document.querySelector(".leftPokemon");
const rightPokemon = document.querySelector(".rightPokemon");
const leftHealthbar = document.querySelector(".leftHealthbar");
const rightHealthbar = document.querySelector(".rightHealthbar");

let leftPokemonInstance;
let rightPokemonInstance;

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

function createPokemon(direction, pokemonData) {
  console.log(pokemonData);
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

function setHealthbar(pokemon, healthbar) {
  healthbar.innerHTML =
    pokemon.name + ": " + pokemon.health + " / " + pokemon.maxHealth + " Hp";
  healthbar.style.width =
    String((pokemon.health / pokemon.maxHealth) * 100) + "px";
}

getPokemon("Left", "Testifeu");
getPokemon("Right", "Kipachu");

charge.addEventListener("click", () => {
  if (rightPokemonInstance.speed > leftPokemonInstance.speed) {
    attackTarget(
      leftPokemon,
      rightPokemon,
      rightHealthbar,
      rightPokemonInstance,
      leftPokemonInstance,
      false,
      "Right"
    );
  } else {
    attackTarget(
      rightPokemon,
      leftPokemon,
      rightHealthbar,
      leftPokemonInstance,
      rightPokemonInstance,
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
    target.health -= attacker.attack;
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
