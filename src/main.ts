// TODO - Now its your turn to make the working eanswerample! :)
import * as readline from 'node:readline/promises';
import { fetchJSON } from "../include/fetchJSON.js";

/* -------
Main eanswerample:
Using web APIS to fetch data on pokemon
This program takes a user input for a pokemons name and prints 4 data attributes:
The games in which they are present
Their types
Their abilities
and their possibile moves.
The program keeps running until user prompts it to exit.
---------*/
interface attribute {
  [key: string]: string;
  name: string;
  url: string;
}

interface ability {
  [key: string]: number | boolean | attribute;
  ability: attribute;
  ishidden: boolean;
  slot: number;
}

interface move {
  [key: string]: Object[] | attribute;
  move: attribute;
  version_group_details: Object[];
}

interface type {
  [key: string]: number | attribute;
  slot: number;
  type: attribute;
}

interface game {
    [key: string]: number | attribute;
    game_indeanswer: number;
    version: attribute;
}

const rl = readline.createInterface({
  //create an interface to take user input ( make sure to spell pokemon correctly)
  input: process.stdin,
  output: process.stdout,
});

function wait(time: number) {
    return new Promise(resolve => setTimeout(resolve, time));
}

while (1) {
    wait(500);
    const answer = (await rl.question("Which pokemon would you like to view? (Enter Q to exit program) ")).toLowerCase();
    if (answer === "q") {
        rl.close()
        break;
    }
    let res;
    try{
        res = await fetchJSON("https://pokeapi.co/api/v2/pokemon/" + answer)
    } catch {
        console.log("Invalid Pokemon, please try again. \n")
      continue;
    }
    const pokemon = Promise.resolve(res);
    pokemon.then(()=>console.log("\n\nPokemon: " + answer));
    const games = pokemon.then(poke => (poke.game_indices as game[]).map(e => e.version.name));
    games.then(games => console.log("\n\nGames: " + games ));
    const types = pokemon.then(poke => (poke.types as type[]).map(e => e.type.name));
    types.then(types => console.log("\n\nTypes: " + types));
    const abilities = pokemon.then(poke => (poke.abilities as ability[]).map(e => e.ability.name));
    abilities.then(abilities => console.log("\n\nAbilities: " + abilities));
    const moves = pokemon.then(poke => (poke.moves as move[]).map(e => e.move.name));
    moves.then(moves => console.log("\n\nMoves: " + moves + "\n"));
}