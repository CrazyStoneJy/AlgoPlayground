import { describe, expect, test } from 'vitest'          
import { rpn } from './rpn'

describe("rpn", () => {
    test("rpn parse", () => {
        const expression = "1+2*3+4"
        const r = rpn()
        const s = r.parse(expression)
        console.log("rpn parse: ", s)
        expect(s).toStrictEqual(["1", "2", "3", "*", "+", "4", "+"])
    })

    test("rpn evaluate", () => {
        const expression = ["1", "2", "3", "*", "+", "4", "+"]
        const r = rpn()
        const result = r.evaluate(expression)
        console.log("rpn evaluate: ", result)
        expect(result).toBe(11)
    })

})