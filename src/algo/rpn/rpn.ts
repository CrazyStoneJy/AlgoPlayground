import { ParseProcedureResult, EvaluateProcedureResult } from "./types"

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

    const parse = (expression: string): ParseProcedureResult => {
        let procedureResult = []
        let procedureStack = []
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
                    // procedure
                    procedureResult.push([...result])
                    procedureStack.push([...stack])
                }

                // 处理操作符
                while (stack.length > 0 && 
                       stack[stack.length - 1] !== '(' && 
                       getPrior(stack[stack.length - 1]) >= getPrior(c)) {
                    let operator = stack.pop()
                    if (operator) {
                        result.push(operator)
                    }
                    // procedure
                    procedureResult.push([...result])
                    procedureStack.push([...stack])
                }
                stack.push(c)
                // procedure
                procedureResult.push([...result])
                procedureStack.push([...stack])
            } else if (brackets.includes(c)) {
                if ("(" === c) {
                    if (curNumber !== '') {
                        result.push(curNumber)
                        curNumber = ''
                    }
                    stack.push(c)
                    // procedure
                    procedureResult.push([...result])
                    procedureStack.push([...stack])
                } else if (")" === c) {
                    if (curNumber !== '') {
                        result.push(curNumber)
                        curNumber = ''
                        // procedure
                        procedureResult.push([...result])
                        procedureStack.push([...stack])
                    }
                    // 弹出栈内运算符直到遇到左括号
                    while (stack.length > 0 && stack[stack.length - 1] !== '(') {
                        let operator = stack.pop()
                        if (operator) {
                            result.push(operator)
                        }
                        // procedure
                        procedureResult.push([...result])
                        procedureStack.push([...stack])
                    }
                    // 弹出左括号
                    if (stack.length > 0 && stack[stack.length - 1] === '(') {
                        stack.pop()
                    } else {
                        throw new Error('Mismatched parentheses')
                    }
                    // procedure
                    procedureResult.push([...result])
                    procedureStack.push([...stack])
                }
            } else if (c !== ' ') { // 忽略空格
                curNumber += c
            }
        }

        // 处理最后的数字
        if (curNumber !== '') {
            result.push(curNumber)
            // procedure
            procedureResult.push([...result])
            procedureStack.push([...stack])
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
             // procedure
            procedureResult.push([...result])
            procedureStack.push([...stack])
        }

        return {
            result,
            procedureResult,
            procedureStack
        }
    }
    
    /**
     * 计算逆波兰式
     * @param expression 
     * @returns 
     */
    function evaluate(expression: string[]): EvaluateProcedureResult {
        let stack: number[] = [];
        let procedureStacks: number[][] = [];
        let procedureTokens: string[] = [];
        let procedureOperations: string[] = [];

        expression.forEach((token) => {
            if (operators.includes(token)) {
                const b = stack.pop()!;
                const a = stack.pop()!;
                let result: number;

                switch (token) {
                    case '+':
                        result = a + b;
                        stack.push(result);
                        procedureOperations.push(`${a} + ${b} = ${result}`);
                        break;
                    case "-":
                        result = a - b;
                        stack.push(result);
                        procedureOperations.push(`${a} - ${b} = ${result}`);
                        break;
                    case "*":
                        result = a * b;
                        stack.push(result);
                        procedureOperations.push(`${a} * ${b} = ${result}`);
                        break;
                    case "/":
                        if (b === 0) throw new Error('Division by zero');
                        result = a / b;
                        stack.push(result);
                        procedureOperations.push(`${a} / ${b} = ${result}`);
                        break;
                }
            } else {
                stack.push(parseFloat(token));
                procedureOperations.push(`Push number: ${token}`);
            }
            
            procedureTokens.push(token);
            procedureStacks.push([...stack]);
        });

        return {
            result: stack.pop() || null,
            procedureTokens,
            procedureStacks,
            procedureOperations
        };
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