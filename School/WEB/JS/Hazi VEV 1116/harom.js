let szamok = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
let osszeg = szamok[0]
let hanyados = szamok[0]

for (let i = 1; i < szamok.length; i++) {

    osszeg += szamok[i]
    hanyados /= szamok[i] //ez igy jo?

}

console.log(osszeg, hanyados)