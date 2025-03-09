function rpn() {

    const operators = ["+" , "-", "*", "/"]

    function getPrior(operator: string): number {
        if (["+", "-"].includes(operator)) {
            return 0
        }
        if (["*", "/"].includes(operator)) {
            return 1
        }
        return 0
    }
    
    function compareToPrior(operator1: string, operator2: string): number {
        return getPrior(operator1) - getPrior(operator2)
    }
    
    const parse = (expression: string): string[] => {
        // 表达式生成
        let result: string[] = []
        // 存放操作符
        let stack: string[] = []
        let curNumber = ''
        for (let i = 0; i < expression.length; i++) {
            let c = expression[i]
            if (operators.includes(c)) {
                // setp1 将暂存在curNumber中的数字，存放到最终`result`中
                result.push(curNumber)
                // step2 重制curNumber
                curNumber = ''
    
                // step3 开始处理操作符
                // 判断stack是否为空
                if (stack.length > 0) {
                    // 判断当前的操作符的优先级是不是不高于上个操作符的优先级，
                    // for example: `current operator`为+  `previous operator`为x, current <= previous，则将`current operator`
                    // 压入到stack顶部，否则将stack中的操作符弹出，准备进行表达式生成
                    const prev = stack[stack.length - 1]
                    if (compareToPrior(c, prev) > 0) {
                        let index = stack.length - 1
                        while (compareToPrior(c, stack[index]) > 0) {
                            let operator: string | undefined = stack.pop()
                            if (operator) {
                                result.push(operator)
                            }
                        }
                        stack.push(c)
                    } else {
                        stack.push(c)
                    }
                } else {
                    // 如果stack为空，则将该操作符压入到stack顶
                    stack.push(c)
                }
            } else {
                // 处理数字部分
                curNumber += c
            }
        }
        // 最后`stack`中可能还有存放的操作符，将其弹出
        while (stack.length > 0) {
            let operator = stack.pop()
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
    function evaluate(expression: string[]) {
        let i = 0
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
        return stack.pop()
    }
    

    return {
        parse: parse,
        evaluate: evaluate
    }
}

export {
    rpn
}