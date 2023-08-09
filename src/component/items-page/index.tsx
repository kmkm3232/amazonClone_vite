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
    console.log(departmentId, subdepartmentId)
    const { items, setItems, departments} = props
    const [newItems, setNewItems] = React.useState(items.filter((item)=> item.subdepartmentId == Number(subdepartmentId)))
    //let newItems = items.filter((item)=> item.subdepartmentId == Number(subdepartmentId))
    const [onReviewFilter, setOnReviewFilter] = React.useState(false)
    const minRef = React.useRef<HTMLInputElement>(null)
    const maxRef = React.useRef<HTMLInputElement>(null)
    let currentDeparment = departments.filter((deparment)=> deparment.departmentId == Number(departmentId))[0]
    let currentSubDepartment = currentDeparment.subDepartment.filter((subDes)=> subDes.subDepartmentId == Number(subdepartmentId))[0]
    const handleReviewFilter = (stars: number) =>{
        //setNewItems(baseNewItems.filter((item)=> item.ratings >= stars))
        //setOnReviewFilter(true)
    }
    const handleClearReviewFilter = () =>{
        //setOnReviewFilter(false)
        //setNewItems(baseNewItems)
    }
    const handlePriceFilter = (min: number, max: number) =>{
        //setNewItems(baseNewItems.filter((item) => ( Number((item.price*item.discount).toFixed(2)) >= min && Number((item.price*item.discount).toFixed(2)) <= max )))
    }
    React.useEffect(()=>{
        setNewItems(items.filter((item)=> item.subdepartmentId == Number(subdepartmentId)))
    },[subdepartmentId])
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
            <div id="ratingFilter" className='flex flex-col'>
                <h1 className='px-2'>Customer Review</h1>
                <button onClick={() => handleClearReviewFilter()} className={onReviewFilter ? "px-2 text-xs" : "hidden"}>{`<`}<a className='hover:text-orange-400'>Clear</a></button>
                <button className='flex hover:text-[#C7511F] px-2' onClick={() => handleReviewFilter(4)}>
                    <AiFillStar className="text-orange-400 mt-1"/>
                    <AiFillStar className="text-orange-400 mt-1"/>
                    <AiFillStar className="text-orange-400 mt-1"/>
                    <AiFillStar className="text-orange-400 mt-1"/>
                    <AiOutlineStar className="text-orange-400 mt-1"/> & Up
                </button>
                <button className='flex hover:text-[#C7511F] px-2' onClick={() => handleReviewFilter(3)}>
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
                <button className='flex hover:text-[#C7511F] px-2' onClick={() => handleReviewFilter(1)}>
                    <AiFillStar className="text-orange-400 mt-1"/>
                    <AiOutlineStar className="text-orange-400 mt-1"/>
                    <AiOutlineStar className="text-orange-400 mt-1"/>
                    <AiOutlineStar className="text-orange-400 mt-1"/>
                    <AiOutlineStar className="text-orange-400 mt-1"/> & Up
                </button>
            </div>
            <div id="priceFilter" className='flex flex-col px-2 mt-1 text-md'>
                <h1>Price</h1>
                <span className='cursor-pointer hover:text-[#C7511F]' onClick={()=> handlePriceFilter(0, 25)}>Up to $25</span>
                <span className='cursor-pointer hover:text-[#C7511F]' onClick={()=> handlePriceFilter(25, 50)}>$25 to $50</span>
                <span className='cursor-pointer hover:text-[#C7511F]' onClick={()=> handlePriceFilter(50, 100)}>$50 to $100</span>
                <span className='cursor-pointer hover:text-[#C7511F]' onClick={()=> handlePriceFilter(100, 200)}>$100 to $200</span>
                <span className='cursor-pointer hover:text-[#C7511F]' onClick={()=> handlePriceFilter(200, Infinity)}>$200 & above</span>
                <div className='flex'>
                    <div>
                        <span className='absolute mt-[5px] pl-[4px]'>$</span>
                        <input className='outline outline-0 p-1 pl-[12px] mr-1 max-w-[60px] border rounded-[4px] border-[#888C8C] border-solid shadow-md focus:shadow-3xl' ref={minRef} placeholder='Min'></input>
                    </div>
                    <div>
                        <span className='absolute mt-[5px] pl-[4px]'>$</span>
                        <input className='outline outline-0 p-1 pl-[12px] mr-1 max-w-[60px] border rounded-[4px] border-[#888C8C] border-solid shadow-md focus:shadow-3xl' ref={maxRef} placeholder='Max'></input>
                    </div>
                    <button>Go</button>
                </div>
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