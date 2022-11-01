let seg = [];
let total = 0;
function getHorizontal(dna) {
    let h = [undefined, 0]; // h[0,1] -> pos
    seg = [];
    total = 0;
    for (let i = 0; i < dna.length; i++) {
        let gen = dna[i];
        for (let index = 0; index < dna.length; index++) {
            const letra = gen[index];
            if (index == 0) {
                h[0] = letra;
            }
            if (h[0] == letra && index > 0) {
                h[1]++;
                if (h[1] == 4) {
                    seg.push(gen);
                    total++;
                    break;
                }
            } else {
                h[1] = 1;
            }
            h[0] = letra;
        }
    }
    console.log("sec horizontal: ", seg + " can secuancias: " + total);
    return total
}

function getVertical(dna) {
    let v = [undefined, 0];
    seg = [];
    total = 0;
    for (let i = 0; i < dna.length; i++) {

        let gen = dna[i];
        let g = "";

        for (let index = 0; index < gen.length; index++) {
            const letra = dna[index][i];
            if (index == 0) {
                v[0] = letra;
            }
            //acumulo letras
            g = g + letra;

            if (v[0] == letra && index > 0) {
                v[1]++;
                if (v[1] == 4) {
                    total++;
                    seg.push(g);
                    break;
                }
            } else {
                v[1] = 1
            }
            v[0] = letra;
        }
    }
    console.log("sec vertical: ", seg + " cant secuancias: " + total);
    return total
}

function getDiagonal(dna) {
    let d = [undefined, 0]
    seg = [];
    total = 0;
    let g = "";
    for (let i = 0; i < dna.length; i++) {
        const letra = dna[i][i];
        if (i == 0) {
            d[0] = letra;
            g = letra;
        }
        //acumulo letras
        g = g + letra;

        if (d[0] == letra) {
            d[1]++;
            if (d[1] == 4) {
                seg.push(g);
                total++;
                break;
            }
        }else{
            d[1]=1;
        }
        d[0] = letra;

    }
    console.log("Sec diagonal: ", seg + " cant secuancias: " + total);
    return total
}

module.exports = {
    getHorizontal,
    getVertical,
    getDiagonal
}