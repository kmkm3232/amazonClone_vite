import React from 'react'
import { Link, useParams } from 'react-router-dom'
interface ItemsPageProp{
    items: {
        itemId: number,
        itemName: string,
        price: number,
        discount: number,
        subdepartmentId: number,
        options: {
            name: string,
            choices: {
                choiceId: number,
                name: string,
                price: number
            }[]
        }[],
        ratings: number,
        ratingCount: number,
        about: string
    }[],
    setItems: React.Dispatch<React.SetStateAction<any>>,
    departments: {
        departmentId: number, 
        departmentName: string, 
        subDepartment: {
            subDepartmentId: number,
            subDepartmentName: string
        }[]
    }[]
}

const ItemsPage: React.FC<ItemsPageProp> = (props) => {
    const { departmentId, subdepartmentId } = useParams()
    const { items, setItems, departments} = props
    let newItems = items.filter((item)=> item.subdepartmentId == Number(subdepartmentId))
    let currentDeparment = departments.filter((deparment)=> deparment.departmentId == Number(departmentId))[0]
    let currentSubDepartment = currentDeparment.subDepartment.filter((subDes)=> subDes.subDepartmentId == Number(subdepartmentId))[0]
  return (
    <div className='flex col min-h-[40rem] mt-[-70px]'>
        <div className='bg-yellow-500 w-[25%]'>
            <h1>Current Department: {currentDeparment.departmentName}</h1>
            <ul>
                {
                    currentDeparment.subDepartment.map((subDe)=>{
                        return(
                            <li key={subDe.subDepartmentId}>{subDe.subDepartmentName}</li>
                        )
                    })
                }
            </ul>
        </div>
        <div className=' w-full '>
            <div>
                <h1>Results</h1>
            </div>
            <div className='grid grid-cols-4 gap-2'>
                {
                    newItems.map((newItem)=>{
                        return (
                            <div key={newItem.itemId} className='min-h-[25rem]  border border-r-2 border-gray-200'>
                                <Link to={`/itempage/${currentDeparment.departmentId}/${currentSubDepartment.subDepartmentId}/${newItem.itemId}`}>
                                    <div className='bg-gray-300 h-[70%]'>Image</div>
                                    <div className='m-2'><a>{newItem.itemName}</a></div>
                                    <div className='m-2'><a>{newItem.ratings} | {newItem.ratingCount}</a></div>
                                    <div className='m-2'><a>${newItem.price}</a></div>
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
            
        </div>
    </div>
  )
}

export default ItemsPage