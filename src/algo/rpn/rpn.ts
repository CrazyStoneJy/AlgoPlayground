function RPN() {

    const operators = ["+" , "-", "*", "/"]
    const brackets = ["(", ")"]

    function getPrior(operator: string): number {
        if (["+", "-"].includes(operator)) {
            return 0
        }
        if (["*", "/"].includes(operator)) {
            return 1
        }
        if (["(", ")"].includes(operator)) {
            return 2
        }
        return 0
    }
    
    const parse = (expression: string): string[] => {
        let result: string[] = []
        let stack: string[] = []
        let curNumber = ''

        for (let i = 0; i < expression.length; i++) {
            let c = expression[i]
            if (operators.includes(c)) {
                // 只有当curNumber不为空时才加入结果
                if (curNumber !== '') {
                    result.push(curNumber)
                    curNumber = ''
                }

                // 处理操作符
                while (stack.length > 0 && 
                       stack[stack.length - 1] !== '(' && 
                       getPrior(stack[stack.length - 1]) >= getPrior(c)) {
                    let operator = stack.pop()
                    if (operator) {
                        result.push(operator)
                    }
                }
                stack.push(c)
            } else if (brackets.includes(c)) {
                if ("(" === c) {
                    if (curNumber !== '') {
                        result.push(curNumber)
                        curNumber = ''
                    }
                    stack.push(c)
                } else if (")" === c) {
                    if (curNumber !== '') {
                        result.push(curNumber)
                        curNumber = ''
                    }
                    // 弹出栈内运算符直到遇到左括号
                    while (stack.length > 0 && stack[stack.length - 1] !== '(') {
                        let operator = stack.pop()
                        if (operator) {
                            result.push(operator)
                        }
                    }
                    // 弹出左括号
                    if (stack.length > 0 && stack[stack.length - 1] === '(') {
                        stack.pop()
                    } else {
                        throw new Error('Mismatched parentheses')
                    }
                }
            } else if (c !== ' ') { // 忽略空格
                curNumber += c
            }
        }

        // 处理最后的数字
        if (curNumber !== '') {
            result.push(curNumber)
        }

        // 处理剩余的操作符
        while (stack.length > 0) {
            const operator = stack.pop()
            if (operator === '(') {
                throw new Error('Mismatched parentheses')
            }
            if (operator) {
                result.push(operator)
            }
        }

        return result
    }
    
    /**
     * 计算逆波兰式
     * @param expression 
     * @returns 
     */
    function evaluate(expression: string[]): number | null {
        let stack: number[] = []
        expression.forEach((c) => {
            if (operators.includes(c)) {
                let prev = stack.pop()
                let lastPrev = stack.pop()
                switch (c) {
                    case '+':
                        stack.push(lastPrev!! + prev!!)
                        break
                    case "-":
                        stack.push(lastPrev!! - prev!!)
                        break
                    case "*":
                        stack.push(lastPrev!! * prev!!)
                        break
                    case "/":
                        stack.push(lastPrev!! / prev!!)
                        break
                    default:
                        break
                }
            } else {
                stack.push(parseFloat(c))
            }
        })
        return stack.pop() || null
    }
    

    return {
        parse: parse,
        evaluate: evaluate
    }
}

const rpn = RPN()
export {
    rpn
}