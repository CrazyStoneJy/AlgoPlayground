import { describe, expect, it } from 'vitest'          
import { rpn } from '.'

describe("rpn", () => {
    it("rpn parse and evaulate", () => {
        const expression = "1+2*3+4"
        const r = rpn()
        const s = r.parse(expression)
        expect(s).toBe(["1", "2", "3", "*", "+", "4", "+"])
        const result = r.evaluate(s)
        expect(r).toBe(11)
    })
})