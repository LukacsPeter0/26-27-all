let szamok = [1, 2, 3, 4, 67, 6, 7, 8, 9, 10]
let legnagyobb = 0

for (let i = 0; i < szamok.length; i++) {

    if (szamok[i] > legnagyobb) {

        legnagyobb = szamok[i]

    }

}
console.log(legnagyobb)