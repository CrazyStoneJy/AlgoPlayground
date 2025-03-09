import { describe, expect, it } from 'vitest'          
import { rpn } from '.'

describe("rpn", () => {
    it("rpn parse", () => {
        const expression = "1+2*3+4"
        const r = rpn()
        const s = r.parse(expression)
        console.log("rpn parse: ", s)
        expect(s).toBe(["1", "2", "3", "*", "+", "4", "+"])
    })

    it("rpn evaluate", () => {
        const expression = ["1", "2", "3", "*", "+", "4", "+"]
        const r = rpn()
        const result = r.evaluate(expression)
        console.log("rpn evaluate: ", result)
        expect(result).toBe(11)
    })
})