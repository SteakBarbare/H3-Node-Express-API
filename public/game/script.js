const charge = document.querySelector(".charge");
const carapute = document.querySelector(".carapute");
const kipachu = document.querySelector(".kipachu");
const rightHealthbar = document.querySelector(".rightHealthbar");
const leftHealthbar = document.querySelector(".leftHealthbar");

class Pokemon {
  constructor() {
    this.health = health;
    this.speed = speed;
    this.attack = attack;
    this.defense = defense;
    this.type = type;
    this.skills = skills;
  }
}

const url = "http://localhost:3000/frangipane";

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
  });

let kipachuLife = 100;

charge.addEventListener("click", () => {
  kipachuLife -= 20;
  attackTarget(carapute, kipachu, rightHealthbar, kipachuLife);
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
