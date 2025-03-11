import { describe, expect, test } from 'vitest'          
import { rpn } from './rpn'

describe("rpn", () => {
    test("rpn parse", () => {
        const expression = "1+2*3+4"
        const s = rpn.parse(expression)
        console.log("rpn parse: ", s)
        expect(s).toStrictEqual(["1", "2", "3", "*", "+", "4", "+"])
    })

    test("rpn parse with brackets", () => {
        const expression = "2+3*(2-1)+3"
        const s = rpn.parse(expression)
        console.log("rpn parse with brackets: ", s)
        expect(s).toStrictEqual(["2", "3", "2", "1", "-", "*", "+", "3", "+"])
    })

    test("rpn evaluate", () => {
        const expression = ["1", "2", "3", "*", "+", "4", "+"]
        const result = rpn.evaluate(expression)
        console.log("rpn evaluate: ", result)
        expect(result).toBe(11)
    })

})