import React from "react";
import '../index.css';

const MainPage = (props) => {

  const clearDisplay = displayValue !== '0'
  const clearText = clearDisplay ? 'C' : 'AC'
  
  return (
    <main className="calculator">
      <CalculatorDisplay value={displayValue}/>
      <div className="calculator-keypad">
        <div className="input-keys">
          <div className="function-keys">
            <CalculatorKey className="key-clear" onPress={() => clearDisplay ? this.clearDisplay() : this.clearAll()}>{clearText}</CalculatorKey>
            <CalculatorKey className="key-sign" onPress={() => this.toggleSign()}>±</CalculatorKey>
            <CalculatorKey className="key-percent" onPress={() => this.inputPercent()}>%</CalculatorKey>
          </div>
          <div className="digit-keys">
            <CalculatorKey className="key-0" onPress={() => this.inputDigit(0)}>0</CalculatorKey>
            <CalculatorKey className="key-dot" onPress={() => this.inputDot()}>●</CalculatorKey>
            <CalculatorKey className="key-1" onPress={() => this.inputDigit(1)}>1</CalculatorKey>
            <CalculatorKey className="key-2" onPress={() => this.inputDigit(2)}>2</CalculatorKey>
            <CalculatorKey className="key-3" onPress={() => this.inputDigit(3)}>3</CalculatorKey>
            <CalculatorKey className="key-4" onPress={() => this.inputDigit(4)}>4</CalculatorKey>
            <CalculatorKey className="key-5" onPress={() => this.inputDigit(5)}>5</CalculatorKey>
            <CalculatorKey className="key-6" onPress={() => this.inputDigit(6)}>6</CalculatorKey>
            <CalculatorKey className="key-7" onPress={() => this.inputDigit(7)}>7</CalculatorKey>
            <CalculatorKey className="key-8" onPress={() => this.inputDigit(8)}>8</CalculatorKey>
            <CalculatorKey className="key-9" onPress={() => this.inputDigit(9)}>9</CalculatorKey>
          </div>
        </div>
        <div className="operator-keys">
          <CalculatorKey className="key-divide" onPress={() => this.performOperation('/')}>÷</CalculatorKey>
          <CalculatorKey className="key-multiply" onPress={() => this.performOperation('*')}>×</CalculatorKey>
          <CalculatorKey className="key-subtract" onPress={() => this.performOperation('-')}>−</CalculatorKey>
          <CalculatorKey className="key-add" onPress={() => this.performOperation('+')}>+</CalculatorKey>
          <CalculatorKey className="key-equals" onPress={() => this.performOperation('=')}>=</CalculatorKey>
        </div>
      </div>
    </main>
  )

}

export default MainPage;

