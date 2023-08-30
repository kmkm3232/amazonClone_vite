import { Route, Routes } from 'react-router-dom'
import './App.css'
import NavBar from './component/nav-bar'
import FrontPage from './component/front-page'
import  React from 'react'
import ItemsPage from './component/items-page'
import ItemPage from './component/item-page'
import ShoppCartPage from './component/shopp-cart-page'
import SearchPage from './component/search-page'
import { sampleItems } from './assets/items'
import { sampleDepartments } from './assets/departments'
import axios, { AxiosResponse } from 'axios'
import RegisterPage from './component/register-page'

function App() {
  const [departments, setDepartments] = React.useState(sampleDepartments)
  const [items, setItems] = React.useState<any | null>(null)
  const [shoppingCart, setShoppingCart] = React.useState(JSON.parse(localStorage.getItem("cart") || '[]'))
  React.useEffect(()=>{
    axios.get('http://localhost:3001/item').then((res)=>{
      setItems(res.data)
    })
  },[])
  return (
    <>
      <NavBar shoppingCart={shoppingCart} departments={departments} setDepartments={setDepartments}/>
      <Routes> 
        <Route path='/' element={ <FrontPage />} />
        <Route 
          path='itemspage/:departmentId/:subdepartmentId' 
          element={<ItemsPage items={items} setItems={setItems} departments={departments}/>} />
        <Route 
          path='itempage/:currentDeparment/:currentSubDepartment/:itemId' 
          element={<ItemPage items={items} departments={departments} shoppingCart={shoppingCart} setShoppingCart={setShoppingCart}/>} />
        <Route 
          path='shoppingcart' 
          element={ <ShoppCartPage shoppingCart={shoppingCart} setShoppingCart={setShoppingCart} items={items} departments={departments} />}/>
        <Route 
          path='searchpage/:departmentId/:query?'
          element={<SearchPage items={items} departments={departments}/>}
        />
        <Route 
          path='register'
          element={<RegisterPage/>}
        />
      </Routes>
    </>
  )
}

export default App;
