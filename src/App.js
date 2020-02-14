import React, { useState, useEffect } from 'react';
import './App.css';
import ExpenseList from './components/ExpenseList'
import ExpenseForm from './components/ExpenseForm'
import Alert from './components/Alert'
import uuid from 'uuid'

const initialExpenses = localStorage.getItem('expenses')? JSON.parse(localStorage.getItem('expenses')):[]

function App() {
  const [expenses, setExpenses] = useState(initialExpenses)
  
  const [ charge, setCharge ] = useState("")

  const [ amount, setAmount ] = useState("")

  const [alert, setAlert ] = useState({show:false})

  const [edit, setEdit] = useState(false)

  const [id, setId] = useState(0)

  useEffect( () => {
    console.log('we called useEffect')
    localStorage.setItem("expenses", JSON.stringify(expenses))
  },[expenses])

  const handleCharge = e =>{
    setCharge(e.target.value)
    
  }
  const handleAmount = e =>{
    setAmount(e.target.value)

  }
  const handleAlert =({type, text}) =>{
    setAlert({show:true, type, text});
    setTimeout(() => {
      setAlert({show:false})
    }, 4000);
  }

  const handleSubmit  = e =>{
    e.preventDefault()
    if(charge !== "" && amount > 0 ){
      if(edit){
        let tempExpenses = expenses.map(item => {
          return item.id === id ?{...item, charge, amount} :item
        })
        setExpenses(tempExpenses)
        setEdit(false)
        handleAlert({type:"success", text:"item edited"})
      }else{

      const singleExpense = {id: uuid(), charge, amount}
      setExpenses([...expenses, singleExpense])
      handleAlert({type:"success", text:"add more item"})
      setCharge("")
      setAmount("")
      }
    }else{
      handleAlert({type:"danger", text:"can't be empty please try to write some thing"})
    }
  }
  const clearItem = () =>{
    setExpenses([])
    handleAlert({type:'danger', text: " All items is deleted"})
  }
  
  const handleDelete = (id) =>{
    let temExpenses = expenses.filter(item => item.id !== id)
    setExpenses(temExpenses)
    handleAlert({type:'danger', text: "item is deleted"})
  }

  const handleEdit = (id) =>{
    let expense = expenses.find(item => item.id === id)
    let {charge, amount} = expense
    setCharge(charge)
    setAmount(amount)
    setEdit(true)
    setId(id)
  }

  return (

    <>
      {alert.show && <Alert type={alert.type} text={alert.text}/>}
      <Alert/>
      <h1>Budget calculator</h1>
      <main className="App">
        <ExpenseForm charge={charge} amount={amount} 
        handleCharge={handleCharge} handleAmount={handleAmount}
        handleSubmit={ handleSubmit} edit={edit}/>
        <ExpenseList expenses={expenses} clearItem={clearItem} 
        handleDelete={handleDelete} handleEdit={handleEdit}/>
      </main>
      <h1>
        total spending : <span className="total">
          $ {expenses.reduce((acc, cur) => {
            return ( acc += parseInt(cur.amount))
          }, 0)}
        </span>
      </h1>
      
    </>
  );
}

export default App;
