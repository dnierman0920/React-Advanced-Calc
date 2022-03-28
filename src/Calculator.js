import React, { Component } from 'react'
import EquationBox from './EquationBox'
import CurrentValue from './CurrentValue'

// You will need to implement the following:

// AC (Clear) button (clear the state)
// 4 main operators + - / * (store operator in state)
// 0-9 buttons (store numerical value in state)


const operators = ['+', '-', '*', '/', '%']

class Calculator extends Component {
    // Declare state variables
    constructor(){
        super()

        this.state = {
            operator: '',
            number1: '',
            number2: '',
            equation: '',
            value : ''
        }
        
    }

    addChar = (char) => {
        this.setState(prevState =>{
            return {equation : prevState.equation+char}
        })
    }

    clear = () =>{
        this.setState({
            operator: '',
            number1: '',
            number2: '',
            equation: '',
            value : ''
        })
    }

    updateValue = (state) => {
        let value = ''
        console.log('OPERATOR: ', state.operator)
        switch(state.operator){
            case '+':
                value = this.state.number1 + this.state.number2
                break;
            case '-':
                value = this.state.number1 - this.state.number2
                break;
            case '*':
                value = this.state.number1 * this.state.number2
                break;
            case '/':
                value = this.state.number1 / this.state.number2
                break;
            case '%':
                value = this.state.number1 % this.state.number2
                break;
            default:
                console.log('we do not accept that operator')
        }
        console.log('VALUE: ', value)
        this.setState({
            value: value
        })
    }
 
    calculate = (equation) => {   
        const equationArray = equation.split('')
        equationArray.forEach((val, index, array) => {

            // if the char is an operator add the tempNumber and the operator to the equationSplitByOperator Array
            if (operators.includes(val)){
                this.setState(
                    {
                        operator: val,
                        number1: parseInt(array.slice(0,index).join('')),
                        number2: parseInt(array.slice(index+1).join(''))
                    }, () => {
                        this.updateValue(this.state)
                    }         
                )
            }
        })
    }
    

render(){

    return (
        <div className="container">
            <h1>React Calculator</h1>
            <div className="calc-container">
                <CurrentValue value = {this.state.value}/>
                <EquationBox equation = {this.state.equation}/>
                <div className="calc-row">
                    <button className="calc-button calc-button-top" onClick={this.clear} >AC</button>
                    <button className="calc-button calc-button-top" >+/-</button>
                    <button className="calc-button calc-button-top" onClick={()=>this.addChar('%')}>%</button>
                    <button className="calc-button calc-button-op" onClick={()=>this.addChar('/')}>/</button>
                </div>
                <div className="calc-row">
                    <button className="calc-button" onClick={()=>this.addChar(7)}>7</button>
                    <button className="calc-button" onClick={()=>this.addChar(8)}>8</button>
                    <button className="calc-button" onClick={()=>this.addChar(9)}>9</button>
                    <button className="calc-button calc-button-op" onClick={()=>this.addChar('*')}>x</button>
                </div>
                <div className="calc-row">
                    <button className="calc-button" onClick={()=>this.addChar(4)}>4</button>
                    <button className="calc-button" onClick={()=>this.addChar(5)}>5</button>
                    <button className="calc-button" onClick={()=>this.addChar(6)}>6</button>
                    <button className="calc-button calc-button-op" onClick={()=>this.addChar('-')}>-</button>
                </div>
                <div className="calc-row">
                    <button className="calc-button" onClick={()=>this.addChar(1)}>1</button>
                    <button className="calc-button" onClick={()=>this.addChar(2)}>2</button>
                    <button className="calc-button" onClick={()=>this.addChar(3)}>3</button>
                    <button className="calc-button calc-button-op" onClick={()=>this.addChar('+')}>+</button>
                </div>
                <div className="calc-row">
                    <button className="calc-button width-2" onClick={()=>this.addChar(0)}>0</button>
                    <button className="calc-button" onClick={()=>this.addChar('.')}>.</button>
                    <button className="calc-button calc-button-op" onClick={()=>{this.calculate(this.state.equation)}}>=</button>
                </div>
            </div>
        </div>
    )
}
}

export default Calculator