import React, { useState } from 'react';
import './styles.css';
import { rpn } from './rpn'

const RPNCalculator: React.FC = () => {
  const [infixExpr, setInfixExpr] = useState<string>('')
  const [rpnExpr, setRpnExpr] = useState<string>('')
  const [result, setResult] = useState<number | null>(null)
  const [error, setError] = useState<string>('')

  
  const handleConvert = () => {
    try {
      const rpnExpression = rpn.parse(infixExpr)
      if (rpnExpression && rpnExpression.length > 0) {
        setRpnExpr(rpnExpression.join(" "))
        setError('')
        setResult(null)
      }
    } catch (err: any) {
      setError(err.message)
      setRpnExpr('')
      setResult(null)
    }
  };

  const handleCalculate = () => {
    try {
      if (!rpnExpr) {
        throw new Error('Please convert expression first')
      }
      const calculatedResult = rpn.evaluate(rpnExpr.split(" "))
      setResult(calculatedResult)
      setError('')
    } catch (err: any) {
      setError(err.message)
      setResult(null)
    }
  };

  return (
    <div className="rpn-calculator">
      <h2>RPN Calculator</h2>
      
      <div className="calculator-section">
        <h3>Step 1: Convert Infix to RPN</h3>
        <p>Enter infix expression (e.g., "3+4*5" or "(3+4)*5")</p>
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

        {result !== null && (
          <div className="result">
            <h4>Final Result:</h4>
            <div className="result-value">{result}</div>
          </div>
        )}
      </div>

      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default RPNCalculator; 