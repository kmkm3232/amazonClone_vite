import { Route, Routes } from 'react-router-dom'
import './App.css'
import NavBar from './component/nav-bar'
import FrontPage from './component/front-page'
import  React from 'react'
import ItemsPage from './component/items-page'
import ItemPage from './component/item-page'
import ShoppCartPage from './component/shopp-cart-page'

function App() {
  const [departments, setDepartments] = React.useState([
    {
      departmentId: 1,
      departmentName: 'Automotive',
      subDepartment: [
        { 
          subDepartmentId: 1, 
          subDepartmentName:  'Car Care' 
        },
        { 
          subDepartmentId: 2,
          subDepartmentName: 'Car Electronics & Accessories' 
        },
        {
          subDepartmentId: 3, 
          subDepartmentName: 'Exterior Accessories'
        }
      ]
    },
    {
      departmentId: 2,
      departmentName: 'Baby',
      subDepartment: [
        { 
          subDepartmentId: 4, 
          subDepartmentName: 'Activity & Entertainment'
        }, 
        { 
          subDepartmentId: 5, 
          subDepartmentName: 'Apparel & Accessories'
        }, 
        {
          subDepartmentId: 6, 
          subDepartmentName: 'Baby & Toddler Toys'
        }
      ]
    },
    {
      departmentId: 3,
      departmentName: 'Womens Fashion',
      subDepartment: [
        { 
          subDepartmentId: 7, 
          subDepartmentName: 'Clothing'
        }, 
        {
          subDepartmentId: 8, 
          subDepartmentName:'Shoes'
        }, 
        { 
          subDepartmentId: 9, 
          subDepartmentName: 'Jewelry'
        }
      ]
    }
  ])
  const [currentSubDepartment, setcurrrentDepartment] = React.useState(0)
  const [items, setItems] = React.useState([
    {
        itemId: 1,
        itemName: 'FCLUSLL 18Pcs Car Wash Cleaning Kit',
        price: 39.99,
        discount: 1,
        subdepartmentId: 1,
        options:[{
          name: 'Size',
          choices:[{
            choiceId: 1,
            name: '18Pcs',
            price: 39.99
          },
          {
            choiceId: 2,
            name: '23Pcs',
            price: 45.99
          }
        ]
        }],
        ratings: 4.2,
        ratingCount: 23,
        about: 'Keep Your Car Clean: The grit trap at the bottom of the car wash bucket is effective in reducing swirls that occur during car washes.'
    },
    {
      itemId: 2,
      itemName: 'Item 2',
      price: 18,
      discount: 0.9,
      subdepartmentId: 2,
      options:[],
      ratings: 4.8,
      ratingCount: 92,
      about: 'About text',
    },
    {
      itemId: 3,
      itemName: 'Cotton',
      price: 38,
      discount: 0.6,
      subdepartmentId: 4,
      options:[],
      ratings: 3.8,
      ratingCount: 11,
      about: 'About text'
    },
    {
      itemId: 4,
      itemName: 'Water 2',
      price: 8,
      discount: 1,
      subdepartmentId: 5,
      options:[],
      ratings: 4.8,
      ratingCount: 31,
      about: 'About text'
    },
    {
      itemId: 5,
      itemName: 'Paper 2',
      price: 10,
      discount: 0.8,
      subdepartmentId: 5,
      options:[],
      ratings: 4.8,
      ratingCount: 31,
      about: 'About text'
    },
    {
      itemId: 6,
      itemName: 'Test 3',
      price: 10,
      discount: 0.8,
      subdepartmentId: 2,
      options:[],
      ratings: 4.8,
      ratingCount: 31,
      about: 'About text'
    },
    {
      itemId: 7,
      itemName: '13 3',
      price: 99,
      discount: 1,
      subdepartmentId: 7,
      options:[],
      ratings: 2.8,
      ratingCount: 1231,
      about: 'About text'
    },
    {
      itemId: 8,
      itemName: '13 3',
      price: 99,
      discount: 1,
      subdepartmentId: 9,
      options:[],
      ratings: 3.8,
      ratingCount: 1231,
      about: 'About text'
    },
    {
      itemId: 9,
      itemName: 'doiwahd',
      price: 99,
      discount: 1,
      subdepartmentId: 1,
      options:[],
      ratings: 3.8,
      ratingCount: 1231,
      about: 'About text'
    },
    {
      itemId: 10,
      itemName: 'ggs',
      price: 99,
      discount: 1,
      subdepartmentId: 2,
      options:[],
      ratings: 3.8,
      ratingCount: 1231,
      about: 'About text'
    },
    {
      itemId: 11,
      itemName: 'exicite',
      price: 99,
      discount: 1,
      subdepartmentId: 3,
      options:[],
      ratings: 3.8,
      ratingCount: 1231,
      about: 'About text'
    },
    {
      itemId: 12,
      itemName: 'Six',
      price: 99,
      discount: 1,
      subdepartmentId: 6,
      options:[],
      ratings: 3.8,
      ratingCount: 1231,
      about: 'About text'
    },
    {
      itemId: 13,
      itemName: 'Six 2',
      price: 102,
      discount: 1,
      subdepartmentId: 6,
      options:[],
      ratings: 5,
      ratingCount: 14,
      about: 'About text'
    },
    {
      itemId: 14,
      itemName: 'Four 2',
      price: 99.99,
      discount: 1,
      subdepartmentId: 4,
      options:[],
      ratings: 3,
      ratingCount: 15,
      about: 'About text'
    },
    {
      itemId: 15,
      itemName: 'Nine 2',
      price: 199.99,
      discount: 1,
      subdepartmentId: 9,
      options:[],
      ratings: 4.2,
      ratingCount: 37,
      about: 'About text'
    },
    {
      itemId: 16,
      itemName: 'Scream out 2',
      price: 199.99,
      discount: 1,
      subdepartmentId: 3,
      options:[],
      ratings: 4.2,
      ratingCount: 37,
      about: 'About text'
    },
    {
      itemId: 17,
      itemName: 'wastib out 2',
      price: 199.99,
      discount: 1,
      subdepartmentId: 2,
      options:[],
      ratings: 4.2,
      ratingCount: 37,
      about: 'About text'
    },
    {
      itemId: 18,
      itemName: 'chil out 2',
      price: 199.99,
      discount: 1,
      subdepartmentId: 2,
      options:[],
      ratings: 4.2,
      ratingCount: 37,
      about: 'About text'
    },
    {
      itemId: 19,
      itemName: 'bro 2',
      price: 2.99,
      discount: 1,
      subdepartmentId: 2,
      options:[],
      ratings: 4.2,
      ratingCount: 37,
      about: 'About text'
    },
    {
      itemId: 20,
      itemName: 'loud 2',
      price: 2.29,
      discount: 1,
      subdepartmentId: 2,
      options:[],
      ratings: 3.2,
      ratingCount: 37,
      about: 'About text'
    },
    {
      itemId: 21,
      itemName: 'so loud 2',
      price: 2.29,
      discount: 1,
      subdepartmentId: 2,
      options:[],
      ratings: 3.2,
      ratingCount: 37,
      about: 'About text'
    },
    {
      itemId: 22,
      itemName: 'last 2',
      price: 2.29,
      discount: 1,
      subdepartmentId: 2,
      options:[],
      ratings: 3.2,
      ratingCount: 37,
      about: 'About text'
    }
  ])
  const [shoppingCart, setShoppingCart] = React.useState(JSON.parse(localStorage.getItem("cart") || '{}'))
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
          <Route path='shoppingcart' element={ <ShoppCartPage shoppingCart={shoppingCart} setShoppingCart={setShoppingCart} items={items} departments={departments} />}/>
      </Routes>
    </>
  )
}

export default App;
