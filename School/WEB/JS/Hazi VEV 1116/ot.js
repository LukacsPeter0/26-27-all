let mondat = "67 a legjobb meme a a á á"
let szamlalo = 0

for (let i = 0; i < mondat.length; i++) {

    if (mondat[i] == "a" ||
        mondat[i] == "á") {

        szamlalo += 1 //imadom ezt a nyelvet

    }

}
console.log(szamlalo)