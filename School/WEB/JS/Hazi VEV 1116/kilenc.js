let nevek = ["Benjamin", "DZSÉMI", "VEV", "patyis", "Norbi(Candy)Love"];

let lista = document.getElementById("lista");
let kereso = document.getElementById("kereso");

function listaFrissites(szurtNevek) {

    lista.innerHTML = "";

    for (let i = 0; i < szurtNevek.length; i++) {

        let elem = document.createElement("li");

        elem.textContent = szurtNevek[i];

        lista.appendChild(elem);
    }
}

kereso.addEventListener("input", function() {

    let keresett = kereso.value.toLowerCase();

    let szurtNevek = nevek.filter(function(nev) {
        return nev.toLowerCase().includes(keresett);
    });

    listaFrissites(szurtNevek);
});

listaFrissites(nevek);

//ehhez kozom sincs