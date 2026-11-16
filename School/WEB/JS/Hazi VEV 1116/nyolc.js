let nevek = ["Benhamin", "DZSÉMI", "VEV", "patyis", "Norbi(Candy)Love"]

lista = document.getElementById("lista");

for (let i = 0; i < nevek.length; i++) {

    let elem = document.createElement("li");

    elem.textContent = nevek[i]

    lista.appendChild(elem)

}