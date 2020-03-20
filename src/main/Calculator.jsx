import React, { Component } from 'react'
import './Calculator.css'
 
import Button from '../components/Button'
import Display from '../components/Display'
 
const initialState = {
    displayValue: '0',      //Valor sendo exibido atualmente
    currentValue: 0,        //valor atual digitado
    resultValue: 0,         //resultado da ultima operação efetuada
    clearDisplay: false,    //limpar o display
    nextOperation: '+',     //Próxima operação à ser executada
    lastOperation: ''       //Ultima operação executada
}
 
export default class Calculator extends Component {
 
    state = { ...initialState }
 
    constructor(props) {
        super(props)
 
        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
    }
 
    clearMemory() {
        if (this.state.displayValue === '0') {
            this.setState({ ...initialState })
        } else {
            this.setState({ displayValue: '0', currentValue: 0 })
        }
    }
 
    setOperation(newOperation) {
 
        const operation = this.state.nextOperation
        const resultValue = this.state.resultValue
        const currentValue = this.state.currentValue
 
        let newResult = resultValue
 
        if (operation !== '=') {
            try {
                newResult = eval(`${resultValue} ${operation} ${currentValue}`)
            } catch(e) {
                newResult = resultValue 
            }
        }
 
        this.setState({
            lastOperation: operation,
            nextOperation: newOperation,
            resultValue: newResult,
            displayValue: newResult,
            currentValue: 0,
            clearDisplay: true
        })
    }
 
    addDigit(n) {
        if (n === '.' && this.state.displayValue.includes('.')) {
            return
        }
 
        const clearDisplay = (n !== '.' && this.state.displayValue === '0')
            || this.state.clearDisplay
 
        const value = clearDisplay ? '' : this.state.displayValue
        const newValue = value + n
 
        this.setState({ displayValue: newValue, clearDisplay: false })
 
        if (n !== '.') {
            const floatValue = parseFloat(newValue)
 
            this.setState({ currentValue: floatValue })
        }
    }
 
    render() {
 
        return (
            <div className="calculator">
                <Display value={this.state.displayValue} />
                <Button label="AC" click={this.clearMemory} triple />
                <Button label="/" click={this.setOperation} operation />
                <Button label="7" click={this.addDigit} />
                <Button label="8" click={this.addDigit} />
                <Button label="9" click={this.addDigit} />
                <Button label="*" click={this.setOperation} operation />
                <Button label="4" click={this.addDigit} />
                <Button label="5" click={this.addDigit} />
                <Button label="6" click={this.addDigit} />
                <Button label="-" click={this.setOperation} operation />
                <Button label="1" click={this.addDigit} />
                <Button label="2" click={this.addDigit} />
                <Button label="3" click={this.addDigit} />
                <Button label="+" click={this.setOperation} operation />
                <Button label="0" click={this.addDigit} double />
                <Button label="." click={this.addDigit} />
                <Button label="=" click={this.setOperation} operation />
            </div>
        )
    }
}