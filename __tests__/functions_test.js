const { getHorizontal, getVertical, getDiagonal } = require("../src/functions/utils");

 const dna= ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]
 const dna2= ["TTGCGA","CAGGGC","TTATGT","AGAAGG","CCCCTA","TCACTT"]

 describe("Test Functions",()=>{

    it("test_getHorizontal(1)",()=>{
        expect(getHorizontal(dna)).toBe(1)
    });
    it("test_getVertical(1)",()=>{
        expect(getVertical(dna)).toBe(1)
    });
    it("test_getDiagonal(1)",()=>{
        expect(getDiagonal(dna)).toBe(1)
    });
    it("test_getDiagonal(0)",()=>{
        expect(getDiagonal(dna2)).toBe(0)
    });
 });
 
 // 3146723358
 // 1101441859 cc