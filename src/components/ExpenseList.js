import React from 'react'
import ExpenseItem from './ExpenseItem'
import { MdDelete } from 'react-icons/md'
function ExpenseList({expenses, clearItem, handleDelete, handleEdit}) {
    return (
        <>
            <ul className="list">
                {expenses.map( (expense) =>{
                    return <ExpenseItem  key={expense.id} expense={expense} 
                    handleDelete={handleDelete} handleEdit={handleEdit}/>
                })}
            </ul>
            {
                expenses.length > 0 && <button className="btn" onClick={clearItem}>
                    clear expenses
                    <MdDelete className="btn-icon"/>
                </button>
            }
            
        </>
    )
}

export default ExpenseList
