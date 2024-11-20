import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function App() {
  const [productName,setProductName] = useState('')
  const [amount,setAmount] = useState('')
  const [quantity,setQuantity] = useState('')
  const [sales,setSales] = useState([])

  const api = "http://localhost:9000"

  const addSale = async()=>{
    await axios.post(`${api}/add`,{productName,amount,quantity})
    fetchSales()
    setAmount('')
    setProductName('')
    setQuantity('')
  }

  const fetchSales = async()=>{
    const response = await axios.get(`${api}/findall`)
    setSales(response.data)
  }

  const handleDelete = async(id)=>{
    await axios.delete(`${api}/delete/${id}`)
    fetchSales()
  }

  const handleUpdate = async(id)=>{
    const newProductName = prompt("Enter ProductName")
    const newAmount = prompt("Enter Amount")
    const newQuantity = prompt("Enter Quantity")

    if(!newProductName || !newAmount || !newQuantity){
      alert("All Fields are Required!")
      return;
    }
    await axios.put(`${api}/update/${id}`,{
      productName:newProductName,
      amount: parseInt(newAmount),
      quantity: parseInt(newQuantity)
    })
    fetchSales()
  }

  useEffect(()=>{
    fetchSales()
  },[])
  return (
    <div>
      <h1>sales management</h1>
      <input type="text" placeholder='ProductName' value={productName} onChange={(e)=>setProductName(e.target.value)} /><br/>
      <input type="number" placeholder='Amount' value={amount} onChange={(e)=>setAmount(e.target.value)} /><br/>
      <input type="number" placeholder='Quantity' value={quantity} onChange={(e)=>setQuantity(e.target.value)} /><br/>
      <button onClick={addSale}>Add</button>

      <h2>All Sales</h2>
      <ul>
        {sales.map(item=>{
          return (
          <li key={item._id}>
            <p>ID: {item._id}</p>
            <p>ProductName: {item.productName}</p>
            <p>Amount: {item.amount}</p>
            <p>Quantity: {item.quantity}</p>
            <button onClick={() =>handleDelete(item._id)}>Delete</button>
            <button onClick={()=>handleUpdate(item._id)}>Update</button>
          </li>
        )})}
      </ul>
    </div>
  )
}
