import React from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { FaStarHalfStroke } from 'react-icons/fa6'
import { Link, useParams } from 'react-router-dom'
interface ItemsPageProp{
    items: {
        id: number,
        itemName: string,
        price: number,
        discount: number,
        subdepartment:{
            id: number,
            subdepartmentName: string
        },
        options: {
            optionName: string,
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
    const { items, departments} = props
    let baseItem = items?.filter((item)=> item.subdepartment.id == Number(subdepartmentId))
    const [newItems, setNewItems] = React.useState(baseItem)
    const [reviewFilter, setReviewFilter] = React.useState(0)
    const [priceFilter, setPriceFilter] = React.useState({min: 0, max: Infinity})
    const minRef = React.useRef<HTMLInputElement>(null)
    const maxRef = React.useRef<HTMLInputElement>(null)
    const sortRef = React.useRef<HTMLSelectElement>(null)
    let currentDeparment = departments.filter((deparment)=> deparment.departmentId == Number(departmentId))[0]
    let currentSubDepartment = currentDeparment.subDepartment.filter((subDes)=> subDes.subDepartmentId == Number(subdepartmentId))[0]

    const handleOnGo = () =>{
        let min = minRef.current?.value || 0
        let max = maxRef.current?.value || Infinity
        setPriceFilter({min: Number(min), max: Number(max)})
    }

    const sortItems = (items: any) =>{
        let option = Number(sortRef.current?.value) || 0
        switch(option){
            case 0:
                return items
            case 1:
                return [...items].sort((a,b) => a.price*a.discount - b.price*b.discount)
            case 2:
                return [...items].sort((a,b) => b.price*b.discount - a.price*a.discount)
            case 3:
                return [...items].sort((a,b) => b.ratings - a.ratings)
        }
    }
    React.useEffect(()=>{
        setNewItems(baseItem)
    },[props])
    React.useEffect(()=>{
        let results = sortItems(baseItem?.filter((item)=> item.ratings >= reviewFilter).filter((item) => (Number((item.price*item.discount).toFixed(2)) >= priceFilter.min && Number((item.price*item.discount).toFixed(2)) <= priceFilter.max )))
        setNewItems(results!)
    },[reviewFilter, priceFilter])
    
    React.useEffect(()=>{
        baseItem = items?.filter((item)=> item.subdepartment.id == Number(subdepartmentId))
        setNewItems(baseItem)
        setReviewFilter(0)
        setPriceFilter({min: 0, max: Infinity})
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
                <button onClick={() => setReviewFilter(0)} className={reviewFilter > 0 ? "flex px-2 text-xs" : "hidden"}>{`<`}<a className='hover:text-orange-400'>Clear</a></button>
                <button className='flex hover:text-[#C7511F] px-2' onClick={() => setReviewFilter(4)}>
                    <AiFillStar className="text-orange-400 mt-1"/>
                    <AiFillStar className="text-orange-400 mt-1"/>
                    <AiFillStar className="text-orange-400 mt-1"/>
                    <AiFillStar className="text-orange-400 mt-1"/>
                    <AiOutlineStar className="text-orange-400 mt-1"/> & Up
                </button>
                <button className='flex hover:text-[#C7511F] px-2' onClick={() => setReviewFilter(3)}>
                    <AiFillStar className="text-orange-400 mt-1"/>
                    <AiFillStar className="text-orange-400 mt-1"/>
                    <AiFillStar className="text-orange-400 mt-1"/>
                    <AiOutlineStar className="text-orange-400 mt-1"/>
                    <AiOutlineStar className="text-orange-400 mt-1"/> & Up
                </button>
                <button className='flex hover:text-orange-400 px-2' onClick={() => setReviewFilter(2)}>
                    <AiFillStar className="text-orange-400 mt-1"/>
                    <AiFillStar className="text-orange-400 mt-1"/>
                    <AiOutlineStar className="text-orange-400 mt-1"/>
                    <AiOutlineStar className="text-orange-400 mt-1"/>
                    <AiOutlineStar className="text-orange-400 mt-1"/> & Up
                </button>
                <button className='flex hover:text-[#C7511F] px-2' onClick={() => setReviewFilter(1)}>
                    <AiFillStar className="text-orange-400 mt-1"/>
                    <AiOutlineStar className="text-orange-400 mt-1"/>
                    <AiOutlineStar className="text-orange-400 mt-1"/>
                    <AiOutlineStar className="text-orange-400 mt-1"/>
                    <AiOutlineStar className="text-orange-400 mt-1"/> & Up
                </button>
            </div>
            <div id="priceFilter" className='flex flex-col px-2 mt-1 text-md'>
                <h1>Price</h1>
                <button onClick={() => setPriceFilter({min: 0, max: Infinity})} className={(priceFilter.min > 0 || priceFilter.max < Infinity) ? "flex px-2 text-xs" : "hidden"}>{`<`}<a className='hover:text-orange-400'>Any Price</a></button>
                <span className={priceFilter.min == 0 && priceFilter.max == 25  ? 'font-black cursor-pointer hover:text-[#C7511F]':'cursor-pointer hover:text-[#C7511F]'} onClick={()=> setPriceFilter({min: 0, max: 25})}>Up to $25</span>
                <span className={priceFilter.min == 25 && priceFilter.max == 50  ? 'font-black cursor-pointer hover:text-[#C7511F]':'cursor-pointer hover:text-[#C7511F]'} onClick={()=> setPriceFilter({min: 25, max: 50})}>$25 to $50</span>
                <span className={priceFilter.min == 50 && priceFilter.max == 100  ? 'font-black cursor-pointer hover:text-[#C7511F]':'cursor-pointer hover:text-[#C7511F]'} onClick={()=> setPriceFilter({min: 50, max: 100})}>$50 to $100</span>
                <span className={priceFilter.min == 100 && priceFilter.max == 200  ? 'font-black cursor-pointer hover:text-[#C7511F]':'cursor-pointer hover:text-[#C7511F]'} onClick={()=> setPriceFilter({min: 100, max: 200})}>$100 to $200</span>
                <span className={priceFilter.min == 200? 'font-black cursor-pointer hover:text-[#C7511F]':'cursor-pointer hover:text-[#C7511F]'} onClick={()=> setPriceFilter({min: 200, max: Infinity})}>$200 & above</span>
                <div className='flex'>
                    <div>
                        <span className='absolute mt-[5px] pl-[4px]'>$</span>
                        <input className='outline outline-0 p-1 pl-[12px] mr-1 max-w-[60px] border rounded-[4px] border-[#888C8C] border-solid shadow-md focus:shadow-3xl' type="number" ref={minRef} placeholder='Min'></input>
                    </div>
                    <div>
                        <span className='absolute mt-[5px] pl-[4px]'>$</span>
                        <input className='outline outline-0 p-1 pl-[12px] mr-1 max-w-[60px] border rounded-[4px] border-[#888C8C] border-solid shadow-md focus:shadow-3xl' type="number" ref={maxRef} placeholder='Max'></input>
                    </div>
                    <button onClick={()=> handleOnGo()}>Go</button>
                </div>
            </div>
        </div>
        { baseItem ? 
        <div className=' w-full '>
            <div className='flex justify-between'>
                {
                    baseItem ? 
                    <h1 className='m-2'>1-{newItems?.length} of {newItems?.length} results for "{currentSubDepartment.subDepartmentName}"</h1>  :
                    <h1 className='m-2'>loading...</h1>
                }
                <div>
                    <label className='text-md my-2'>Sort by:</label>
                    <select onChange={()=>setNewItems(sortItems(newItems)!)} ref={sortRef} className='text-md m-2 border border-gray-400 rounded-lg shadow-md focus:shadow-3xl' placeholder='Sort by:'>
                        <option value={0}>Featured</option>
                        <option value={1}>Price: Low to High</option>
                        <option value={2}>Price: High to Low</option>
                        <option value={3}>Avg. Customer Review</option>
                    </select>
                </div>
            </div>
            <div className='grid grid-cols-4 gap-2'>
                {
                    newItems?.map((newItem)=>{
                        return (
                            <div key={newItem.id} className='min-h-[25rem]  border border-r-2 border-gray-200'>
                                <Link to={`/itempage/${currentDeparment.departmentId}/${currentSubDepartment.subDepartmentId}/${newItem.id}`}>
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
            
        </div> : <div className='w-full'>loading...</div>
        }
    </div>
  )
}

export default ItemsPage