import React from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { FaStarHalfStroke } from 'react-icons/fa6'
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
    const baseNewItems = items.filter((item)=> item.subdepartmentId == Number(subdepartmentId))
    const [newItems, setNewItems] = React.useState(baseNewItems)
    const [onReviewFilter, setOnReviewFilter] = React.useState(false)
    let currentDeparment = departments.filter((deparment)=> deparment.departmentId == Number(departmentId))[0]
    let currentSubDepartment = currentDeparment.subDepartment.filter((subDes)=> subDes.subDepartmentId == Number(subdepartmentId))[0]
    const handleReviewFilter = (stars: number) =>{
        setNewItems(baseNewItems.filter((item)=> item.ratings >= stars))
        setOnReviewFilter(true)
    }
    const handleClearReviewFilter = () =>{
        setOnReviewFilter(false)
        setNewItems(baseNewItems)
    }
  return (
    <div className='flex col min-h-[40rem] mt-[-79px]'>
        <div className=' w-[25%]'>
            <h1 className='p-2'>Current Department: {currentDeparment.departmentName}</h1>
            <ul>
                {
                    currentDeparment.subDepartment.map((subDe)=>{
                        return(
                            <li className='p-2' key={subDe.subDepartmentId}>{`<`}{subDe.subDepartmentName}</li>
                        )
                    })
                }
            </ul>
            <div>
                <h1 className='px-2'>Customer Review</h1>
                <button onClick={() => handleClearReviewFilter()} className={onReviewFilter ? "px-2 text-xs" : "hidden"}>{`<`}<a className='hover:text-orange-400'>Clear</a></button>
                <button className='flex hover:text-orange-400 px-2' onClick={() => handleReviewFilter(4)}>
                    <AiFillStar className="text-orange-400 mt-1"/>
                    <AiFillStar className="text-orange-400 mt-1"/>
                    <AiFillStar className="text-orange-400 mt-1"/>
                    <AiFillStar className="text-orange-400 mt-1"/>
                    <AiOutlineStar className="text-orange-400 mt-1"/> & Up
                </button>
                <button className='flex hover:text-orange-400 px-2' onClick={() => handleReviewFilter(3)}>
                    <AiFillStar className="text-orange-400 mt-1"/>
                    <AiFillStar className="text-orange-400 mt-1"/>
                    <AiFillStar className="text-orange-400 mt-1"/>
                    <AiOutlineStar className="text-orange-400 mt-1"/>
                    <AiOutlineStar className="text-orange-400 mt-1"/> & Up
                </button>
                <button className='flex hover:text-orange-400 px-2' onClick={() => handleReviewFilter(2)}>
                    <AiFillStar className="text-orange-400 mt-1"/>
                    <AiFillStar className="text-orange-400 mt-1"/>
                    <AiOutlineStar className="text-orange-400 mt-1"/>
                    <AiOutlineStar className="text-orange-400 mt-1"/>
                    <AiOutlineStar className="text-orange-400 mt-1"/> & Up
                </button>
                <button className='flex hover:text-orange-400 px-2' onClick={() => handleReviewFilter(1)}>
                    <AiFillStar className="text-orange-400 mt-1"/>
                    <AiOutlineStar className="text-orange-400 mt-1"/>
                    <AiOutlineStar className="text-orange-400 mt-1"/>
                    <AiOutlineStar className="text-orange-400 mt-1"/>
                    <AiOutlineStar className="text-orange-400 mt-1"/> & Up
                </button>
            </div>
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
                                    <div className='m-2 hover:text-orange-400'>{newItem.itemName}</div>
                                    <div className='m-2 flex'>
                                        <div className='flex'>
                                            {
                                                [...Array(Math.trunc(newItem.ratings))].map((e, i) =>{
                                                    return (
                                                        <AiFillStar key={i} className="text-orange-400 mt-1"/>
                                                    )
                                                })
                                            }
                                            {
                                                Number((newItem.ratings-Math.trunc(newItem.ratings)).toFixed(2)) >= 0.8 ? <AiFillStar className="text-orange-400 mt-1"/> :
                                                Number((newItem.ratings-Math.trunc(newItem.ratings)).toFixed(2)) > 0.2 ? <FaStarHalfStroke className="text-orange-400 mt-1"/> : ''
                                            }
                                        </div>
                                        <span className='ml-2'>{newItem.ratingCount}</span>
                                    </div>
                                    <div className='m-2'>${newItem.price}</div>
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