const { human_dna } = require('../functions/database')

const getStats = async (req, resp) => {
    const data = [];
    var mutant = 0;
    const dd = human_dna.find();
    (await dd).forEach((d) => {
        data.push(d)
    });
    data.forEach((e) => {
        if (e.mutant) {
            mutant++;
        }
    });

    resp.status(200).json({
        stats_dna: { "count_mutant_dna": mutant, "count_human_dna": data.length, "ratio": mutant / data.length }
    });
}

module.exports = {
    getStats
}