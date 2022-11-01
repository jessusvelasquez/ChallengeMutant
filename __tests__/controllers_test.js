const { dnaAnalysis, isMutant } = require("../src/controllers/app-controllers");
const { human_dna } = require('../src/functions/database');
const mockingoose = require('mockingoose');
const { getStats } = require("../src/controllers/stats-controllers");

const mockRequest = () => {
    return {
        body: {
            dna: ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"]
        },
    };
};
const mockRequestNoMatch = () => {
    return {
        body: {
            dna: ["ATGCGF", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"]
        },
    };
};
const mockRequestNoArray = () => {
    return {
        body: {
            dna: ""
        },
    };
};

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};
const mockResponseStats = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe("Test app-controllers", () => {
    beforeEach(() => {
        mockingoose.resetAll();
    });

    it("test_dnaAnalysis(200-true) without save", async () => {
        const req = mockRequest();
        const resp = mockResponse();
        mockingoose(human_dna).toReturn([
            {
                _id: "636081f1e684dac3c177dc55",
                dna: ['ATGCTT', 'CAGTGC', 'TTATGT', 'AGAAGG', 'CCCCTA', 'TCACTT'],
                mutant: true,
                __v: 0
            },
            {
                _id: "636081f1e684dac3c177dc55",
                dna: ['ATGCTT', 'CAGTGC', 'TTATGT', 'AGAAGG', 'CCCCTA', 'TCACTT'],
                mutant: true,
                __v: 0
            }
        ], 'find');

        await dnaAnalysis(req, resp);
        expect(resp.status).toHaveBeenCalledWith(200);
        expect(resp.json).toHaveBeenCalledWith({
            isMutant: true
        });
    });
    it("test_dnaAnalysis(200-true) with save", async () => {
        const req = mockRequest();
        const resp = mockResponse();
        mockingoose(human_dna).toReturn([], 'find');
        mockingoose(human_dna).toReturn(null, 'save');

        await dnaAnalysis(req, resp);
        expect(resp.status).toHaveBeenCalledWith(200);
        expect(resp.json).toHaveBeenCalledWith({
            isMutant: true
        });
    });
    it("test_dnaAnalysis(500-false)", async () => {
        const req = mockRequestNoArray();
        const resp = mockResponse();

        await dnaAnalysis(req, resp);
        expect(resp.status).toHaveBeenCalledWith(500);
        expect(resp.json).toHaveBeenCalledWith({
            isMutant: false
        });

    });
    it("test_dnaAnalysis(500-no match DNA)", async () => {
        const req = mockRequestNoMatch();
        const resp = mockResponse();

        await dnaAnalysis(req, resp);
        expect(resp.status).toHaveBeenCalledWith(500);
        expect(resp.json).toHaveBeenCalledWith({
            errorMessage:"Secuencia de DNA incorrecta"
        });

    });
    it("test_isMutant(False)", async () => {
        expect(isMutant(["", ""])).toBe(false)
    });

    it("test_isMutant(true)", async () => {

        const dnaH = ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "CCCCTA"];
        expect(isMutant(dnaH)).toBe(true);

        const dnaV = ["ATGCGA", "AAGTGC", "ATATGT", "AGAAGG", "ACCCTA", "CCACTA"];
        expect(isMutant(dnaV)).toBe(true);

        const dnaD = ["ATGCGA", "AAGTGC", "ATATGT", "TGAAGG", "CCTCTA", "CCACTA"];
        expect(isMutant(dnaD)).toBe(true);

    });

    // test stats
    it("test_getStats", async () => {
        const req = "";
        const resp = mockResponseStats();
        mockingoose(human_dna).toReturn([
            {
                _id: "636081f1e684dac3c177dc55",
                dna: ['ATGCTT', 'CAGTGC', 'TTATGT', 'AGAAGG', 'CCCCTA', 'TCACTT'],
                mutant: true,
                __v: 0
            },
            {
                _id: "636081f1e684dac3c177dc55",
                dna: ['ATGCTT', 'CAGTGC', 'TTATGT', 'AGAAGG', 'CCCCTA', 'TCACTT'],
                mutant: false,
                __v: 0
            }
        ], 'find');

        await getStats(req, resp);
        expect(resp.status).toHaveBeenCalledWith(200);
        expect(resp.json).toHaveBeenCalledWith({
            stats_dna:  { "count_mutant_dna": 1, "count_human_dna": 2, "ratio": 0.5 }
        });
    });
});