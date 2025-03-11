interface ParseProcedureResult {
    result: string[],   // reverse polish notation expression
    procedureResult: Array<string[]>,  // parse procedure 
    procedureStack: Array<string[]>   // operator stack
}

interface EvaluateProcedureResult {
    result: number | null,
    procedureTokens: string[],  // 当前处理的token
    procedureStacks: number[][],  // 每一步的数字栈状态
    procedureOperations: string[]  // 每一步执行的操作描述
}

export type {
    ParseProcedureResult,
    EvaluateProcedureResult
}