import React, { useState } from 'react';
import './styles.css';
import { rpn } from './rpn'
import { ParseProcedureResult, EvaluateProcedureResult } from './types';

const RPNCalculator: React.FC = () => {
  const [infixExpr, setInfixExpr] = useState<string>('')
  const [rpnExpr, setRpnExpr] = useState<string>('')
  const [result, setResult] = useState<number | null>(null)
  const [error, setError] = useState<string>('')
  const [procedure, setProcedure] = useState<ParseProcedureResult | null>(null)
  const [evaluateProcedure, setEvaluateProcedure] = useState<EvaluateProcedureResult | null>(null)
  const [isParseExpanded, setIsParseExpanded] = useState<boolean>(true);
  const [isCalcExpanded, setIsCalcExpanded] = useState<boolean>(true);


  const handleConvert = () => {
    try {
      const parseResult = rpn.parse(infixExpr)
      if (parseResult.result && parseResult.result.length > 0) {
        setRpnExpr(parseResult.result.join(" "))
        setProcedure(parseResult)
        setError('')
        setResult(null)
      }
    } catch (err: any) {
      setError(err.message)
      setRpnExpr('')
      setResult(null)
      setProcedure(null)
    }
  };

  const handleCalculate = () => {
    try {
      if (!rpnExpr) {
        throw new Error('Please convert expression first')
      }
      const evaluateResult = rpn.evaluate(rpnExpr.split(" "))
      setResult(evaluateResult.result)
      setEvaluateProcedure(evaluateResult)
      setError('')
    } catch (err: any) {
      setError(err.message)
      setResult(null)
      setEvaluateProcedure(null)
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
          <>
            <div className="rpn-result">
              <h4>RPN Expression:</h4>
              <div className="rpn-expression">{rpnExpr}</div>
            </div>

            {procedure && (
              <div className="procedure-section">
                <div className="procedure-header" onClick={() => setIsParseExpanded(!isParseExpanded)}>
                  <h4>Parse Process</h4>
                  <button className={`collapse-btn ${isParseExpanded ? 'expanded' : ''}`}>
                    {isParseExpanded ? '▼' : '▶'}
                  </button>
                </div>
                {isParseExpanded && (
                  <div className="procedure-steps">
                    {procedure.procedureResult.map((step, index) => (
                      <div key={index} className="procedure-step">
                        <div className="step-number">Step {index + 1}</div>
                        <div className="step-content">
                          <div className="output-stack">
                            <div className="stack-label">Output:</div>
                            <div className="stack-content">
                              [{step.join(', ')}]
                            </div>
                          </div>
                          <div className="operator-stack">
                            <div className="stack-label">Operator Stack:</div>
                            <div className="stack-content">
                              [{procedure.procedureStack[index].join(', ')}]
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
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

        {evaluateProcedure && (
          <div className="procedure-section">
            <div className="procedure-header" onClick={() => setIsCalcExpanded(!isCalcExpanded)}>
              <h4>Calculation Process</h4>
              <button className={`collapse-btn ${isCalcExpanded ? 'expanded' : ''}`}>
                {isCalcExpanded ? '▼' : '▶'}
              </button>
            </div>
            {isCalcExpanded && (
              <div className="procedure-steps">
                {evaluateProcedure.procedureTokens.map((token, index) => (
                  <div key={index} className="procedure-step">
                    <div className="step-number">Step {index + 1}</div>
                    <div className="step-content">
                      <div className="current-token">
                        <div className="stack-label">Current Token:</div>
                        <div className="stack-content">{token}</div>
                      </div>
                      <div className="operation">
                        <div className="stack-label">Operation:</div>
                        <div className="stack-content">
                          {evaluateProcedure.procedureOperations[index]}
                        </div>
                      </div>
                      <div className="number-stack">
                        <div className="stack-label">Number Stack:</div>
                        <div className="stack-content">
                          [{evaluateProcedure.procedureStacks[index].join(', ')}]
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

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