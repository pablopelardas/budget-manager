import React from 'react'

const OperationList = ({ operations }) => {
  return (
    <div>
      <ul>
        {operations?.map((operation, index) => (
          <li key={index}>{operation.date} | {operation.concept} | {operation.type} | {operation.amount} </li>
        ))}
      </ul>
    </div>
  )
}

export default OperationList
