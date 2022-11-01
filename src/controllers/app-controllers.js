const { getHorizontal, getVertical, getDiagonal } = require('../functions/utils')
const { human_dna } = require('../functions/database')

const dnaAnalysis = async (req, resp) => {
    const dna = req.body.dna;
    let result = false;
    console.log("dna: ", dna);

    if (Array.isArray(dna)) {
        result = isMutant(dna);
        //it is verified if there is already a DNA record
        const r = human_dna.find({ dna: dna })

        if ((await r).length > 0) {
            console.log("DNA ya existe en la base de datos");
        } else {
            saveResult(dna, result);
        }

    } else {
        resp.status(500).json({
            message: "El body no es correcto"
        })
    }

    resp.status(200).json({
        isMutant: result
    })
};


function isMutant(dna) {
    let countMutant = 0;
    //let result = ""
    ///*******Pritn matrix****** */
    /*for (let x = 0; x < dna.length; x++) {
        t = ""
        for (let y = 0; y < dna[x].length; y++) {
            // t += x + "-" + y + dna[x][y] + "\t";;
            t += dna[x][y] + "\t";;
        }
        console.log(t);
    }*/
    //************ */

    let h_tal = getHorizontal(dna);
    if (h_tal > 1) {
        return true;
    }
    countMutant = h_tal;
    console.log(countMutant);

    let v_tal = getVertical(dna);
    if (v_tal > 1) {
        return true;
    }
    countMutant += v_tal;
    console.log(countMutant);

    let d_nal = getDiagonal(dna)
    if (countMutant > 1 || d_nal > 1) {
        return true;
    }
    countMutant += d_nal;
    console.log(countMutant);
    if (countMutant > 1) {
        return true;
    }

    return false;
}

function saveResult(dna, result) {
    var result_dna_human = new human_dna({
        dna: dna,
        mutant: result
    });

    result_dna_human.save();
}
module.exports = {
    dnaAnalysis,
    isMutant
}
