import React, { useState } from 'react';
import './styles.css';

const RPNCalculator: React.FC = () => {
  const [infixExpr, setInfixExpr] = useState<string>('');
  const [rpnExpr, setRpnExpr] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string>('');

  // 检查是否为运算符
  const isOperator = (c: string): boolean => {
    return ['+', '-', '*', '/', '(', ')'].includes(c);
  };

  // 获取运算符优先级
  const getPrecedence = (operator: string): number => {
    switch (operator) {
      case '+':
      case '-':
        return 1;
      case '*':
      case '/':
        return 2;
      default:
        return 0;
    }
  };

  // 中缀表达式转RPN
  const convertToRPN = (expr: string): string => {
    const output: string[] = [];
    const stack: string[] = [];
    let number = '';

    try {
      // 添加空格来分隔数字和运算符
      const input = expr.replace(/([+\-*/()])/g, ' $1 ').trim();
      const tokens = input.split(/\s+/);

      for (const token of tokens) {
        if (!token) continue;

        if (!isOperator(token)) {
          // 数字直接输出
          if (isNaN(Number(token))) {
            throw new Error('Invalid number');
          }
          output.push(token);
        } else if (token === '(') {
          stack.push(token);
        } else if (token === ')') {
          while (stack.length > 0 && stack[stack.length - 1] !== '(') {
            output.push(stack.pop()!);
          }
          if (stack.length === 0) {
            throw new Error('Mismatched parentheses');
          }
          stack.pop(); // 移除左括号
        } else {
          while (
            stack.length > 0 &&
            stack[stack.length - 1] !== '(' &&
            getPrecedence(stack[stack.length - 1]) >= getPrecedence(token)
          ) {
            output.push(stack.pop()!);
          }
          stack.push(token);
        }
      }

      // 处理栈中剩余的运算符
      while (stack.length > 0) {
        const op = stack.pop()!;
        if (op === '(' || op === ')') {
          throw new Error('Mismatched parentheses');
        }
        output.push(op);
      }

      return output.join(' ');
    } catch (err: any) {
      throw new Error(`Conversion error: ${err.message}`);
    }
  };

  // 计算RPN表达式
  const calculateRPN = (expr: string): number => {
    const stack: number[] = [];
    const tokens = expr.trim().split(/\s+/);

    try {
      for (const token of tokens) {
        if (!isNaN(Number(token))) {
          stack.push(Number(token));
        } else {
          const b = stack.pop();
          const a = stack.pop();
          
          if (a === undefined || b === undefined) {
            throw new Error('Invalid expression');
          }

          switch (token) {
            case '+':
              stack.push(a + b);
              break;
            case '-':
              stack.push(a - b);
              break;
            case '*':
              stack.push(a * b);
              break;
            case '/':
              if (b === 0) throw new Error('Division by zero');
              stack.push(a / b);
              break;
            default:
              throw new Error('Invalid operator');
          }
        }
      }

      if (stack.length !== 1) {
        throw new Error('Invalid expression');
      }

      return stack[0];
    } catch (err) {
      throw err;
    }
  };

  // 处理转换按钮点击
  const handleConvert = () => {
    try {
      const rpnExpression = convertToRPN(infixExpr);
      setRpnExpr(rpnExpression);
      setError('');
    } catch (err: any) {
      setError(err.message);
      setRpnExpr('');
      setResult(null);
    }
  };

  // 处理计算按钮点击
  const handleCalculate = () => {
    try {
      if (!rpnExpr) {
        throw new Error('Please convert expression first');
      }
      const calculatedResult = calculateRPN(rpnExpr);
      setResult(calculatedResult);
      setError('');
    } catch (err: any) {
      setError(err.message);
      setResult(null);
    }
  };

  return (
    <div className="rpn-calculator">
      <h2>RPN Calculator</h2>
      <div className="calculator-section">
        <h3>Step 1: Convert Infix to RPN</h3>
        <p>Enter infix expression (e.g., "3 + 4 * 5" or "(3 + 4) * 5")</p>
        <div className="input-group">
          <input 
            type="text" 
            value={infixExpr}
            onChange={(e) => setInfixExpr(e.target.value)}
            placeholder="Enter infix expression"
          />
          <button onClick={handleConvert}>Convert to RPN</button>
        </div>

        {rpnExpr && (
          <div className="rpn-result">
            <h4>RPN Expression:</h4>
            <div className="rpn-expression">{rpnExpr}</div>
          </div>
        )}
      </div>

      <div className="calculator-section">
        <h3>Step 2: Calculate RPN</h3>
        <div className="input-group">
          <button 
            onClick={handleCalculate}
            disabled={!rpnExpr}
          >
            Calculate Result
          </button>
        </div>

        {error && <div className="error">{error}</div>}
        {result !== null && (
          <div className="result">
            <h4>Result:</h4>
            <div className="result-value">{result}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RPNCalculator; 