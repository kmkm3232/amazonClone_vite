import React from 'react'
import { useParams } from 'react-router-dom'
interface ItemPageProp{
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
    departments: {
        departmentId: number, 
        departmentName: string, 
        subDepartment: {
            subDepartmentId: number,
            subDepartmentName: string
        }[]
    }[]
}
const ItemPage: React.FC<ItemPageProp> = (props) => {
    const {itemId, currentDeparment, currentSubDepartment} = useParams()
    const {items, departments} = props
    let currDep = departments.filter((dep)=> dep.departmentId == Number(currentDeparment))[0]
    let currentSubDep = currDep.subDepartment.filter((subdep)=> subdep.subDepartmentId == Number(currentSubDepartment))[0]
    let target = items.filter((item)=> item.itemId == Number(itemId))[0]
  return (
    <div className='mt-[-70px] mx-[2.5%] min-h-[85vh]'>
        <div className=''>Reserved for ads</div>
        <div className='text-xs p-2 text-gray-500'>{`${currDep.departmentName} > ${currentSubDep.subDepartmentName}`}</div>
        <div className='flex'>
            <div className='grow basis-1/2'>
                <div className='h-[40rem] bg-slate-500'>
                    Image
                </div>
            </div>
            <div className='grow basis-1/3 p-2'>
                <h1 className='text-xl font-bold'>{target.itemName}</h1>
                <div className='flex'>
                    <h2>{target.ratings} </h2>
                    <h2 className='mx-5'>{target.ratingCount} ratings</h2>
                </div>
                <hr className='mt-2'></hr>
                <div className='flex'>
                    <h1 className={target.discount < 1 ? "" : "hidden"}>-{((1-target.discount)*100).toFixed(1)}%</h1>
                    <h1 className='mx-2 text-2xl text-bold'>${(target.price * target.discount).toFixed(2)}</h1>
                </div>
                <div className={target.discount < 1 ? "flex text-xs" : 'hidden'}>
                    <h1 className='mr-1'>List Price: </h1>
                    <h1 className='line-through'>{target.price}</h1>
                </div>
                <div className='flex'>
                    {
                        target.options.map((option)=>{
                            return(
                                <div>
                                    <h1>{option.name}</h1>
                                    <ul>
                                        {
                                            option.choices.map((choice)=>{
                                                return(
                                                    <li>
                                                        {choice.name}
                                                        {choice.price}
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className='grow basis-1/6'>Buy</div>
        </div>
        <div>Suggest</div>
    </div>
  )
}

export default ItemPage;