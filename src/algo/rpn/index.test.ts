import { describe, expect, it } from 'vitest'          
import { rpn } from '.'

describe("rpn", () => {
    it("rpn parse", () => {
        const expression = "1+2*3+4"
        const s = rpn().parse(expression)
        expect(s).toBe(["1", "2", "3", "*", "+", "4", "+"])
    })
})