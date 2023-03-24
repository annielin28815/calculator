import React from "react";
import { useState } from 'react';
import '../index.css';
import AutoScalingText from "../components/autoScalingText";
import CalculatorDisplay from "../components/calculatorDisplay";
import CalculatorKey from "../components/calculatorKey";
import CalculatorOperations from "../components/calculatorOperations";

const MainPage = (props) => {
  const [value, setValue] = useState(null);
  const [displayValue, setDisplayValue] = useState('0');
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const componentDidMount = () => {
    document.addEventListener('keydown', this.handleKeyDown)
  }
  
  const componentWillUnmount = () => {
    document.removeEventListener('keydown', this.handleKeyDown)
  }

  const clearAll = () => {
    setValue(null); 
    setDisplayValue('0');
    setOperator(null);
    setWaitingForOperand(false);
  }

  const clearDisplay = () => {
    setDisplayValue('0');
  }
  
  const clearLastChar = () => {
    setDisplayValue(displayValue.substring(0, displayValue.length - 1) || '0');
  }
  
  const toggleSign = () => {
    const newValue = parseFloat(displayValue) * -1;
    setDisplayValue(String(newValue));
  }
  
  const inputPercent = () => {
    const currentValue = parseFloat(displayValue)
    
    if (currentValue === 0){
      return
    }
    
    const fixedDigits = displayValue.replace(/^-?\d*\.?/, '')
    const newValue = parseFloat(displayValue) / 100
    
    setDisplayValue(String(newValue.toFixed(fixedDigits.length + 2)));
  }
  
  const inputDot = () => {
    if (!(/\./).test(displayValue)) {
      setDisplayValue(displayValue + '.');
      setWaitingForOperand(false);
    }
  }
  
  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplayValue(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? String(digit) : displayValue + digit)
    }
  }
  
  const performOperation = (nextOperator) => {    
    const inputValue = parseFloat(displayValue)
    
    if (value == null) {
      setValue(inputValue)
    } else if (operator) {
      const currentValue = value || 0
      const newValue = CalculatorOperations[operator](currentValue, inputValue)
      
      setValue(newValue);
      setDisplayValue(String(newValue));
    }
    
    setWaitingForOperand(true);
    setOperator(nextOperator);
  }
  
  const handleKeyDown = (event) => {
    let { key } = event
    
    if (key === 'Enter')
      key = '='
    
    if ((/\d/).test(key)) {
      event.preventDefault()
      this.inputDigit(parseInt(key, 10))
    } else if (key in CalculatorOperations) {
      event.preventDefault()
      this.performOperation(key)
    } else if (key === '.') {
      event.preventDefault()
      this.inputDot()
    } else if (key === '%') {
      event.preventDefault()
      this.inputPercent()
    } else if (key === 'Backspace') {
      event.preventDefault()
      this.clearLastChar()
    } else if (key === 'Clear') {
      event.preventDefault()
      
      if (this.state.displayValue !== '0') {
        this.clearDisplay()
      } else {
        this.clearAll()
      }
    }
  };

  clearDisplay = displayValue !== '0';
  const clearText = clearDisplay ? 'C' : 'AC';
  
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

