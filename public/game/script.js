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
  } else {
    rightPokemonInstance = tempStorage;
    rightPokemon.src = "Images/" + rightPokemonInstance.image;
  }
}

getPokemon("Left", "Carapute");
getPokemon("Right", "Kipachu");

let kipachuLife = 100;

charge.addEventListener("click", () => {
  kipachuLife -= 20;
  attackTarget(leftPokemon, rightPokemon, rightHealthbar, kipachuLife);
});

function attackTarget(attacker, target, targetLifeHTML, targetLife) {
  attacker.style.left = "40%";
  setTimeout(() => {
    attacker.style.left = "20%";
    targetLifeHTML.innerHTML = "Kipachu: " + targetLife + "Hp";
    targetLifeHTML.style.width = targetLife + "px";
    target.style.opacity = 0;
    setTimeout(() => {
      target.style.opacity = 1;
    }, 250);
  }, 500);
}
