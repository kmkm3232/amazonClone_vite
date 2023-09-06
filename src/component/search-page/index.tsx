import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
interface SearchPageProp{
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
            name: string,
            choices: {
                choiceId: number,
                name: string,
                price: number
            }[]
        }[],
        ratings: number,
        ratingCount: number,
        about: string,
        image: string
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
export const SearchPage: React.FC<SearchPageProp> = (props) => {
    const { departmentId, query } = useParams()
    const { items, departments } = props
    let baseItem = query ? items?.filter((item)=> item.itemName.toLocaleLowerCase().includes(query.toLocaleLowerCase()|| '')) : items
    if(Number(departmentId) !== 0){
        let targetDep = departments.find((dep)=> dep.departmentId == Number(departmentId))
        baseItem = baseItem?.filter((item)=> targetDep!.subDepartment.some((subdep)=> subdep.subDepartmentId == item.subdepartment.id)  )
    }
    const [newItems, setNewItems] = React.useState(baseItem)
    const [reviewFilter, setReviewFilter] = React.useState(0)
    const [priceFilter, setPriceFilter] = React.useState({min: 0, max: Infinity})
    const minRef = React.useRef<HTMLInputElement>(null)
    const maxRef = React.useRef<HTMLInputElement>(null)
    const sortRef = React.useRef<HTMLSelectElement>(null)
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
        let temp = items
        if(Number(departmentId) !== 0){
            let targetDep = departments.find((dep)=> dep.departmentId == Number(departmentId))
            temp = temp?.filter((item)=> targetDep!.subDepartment.some((subdep)=> subdep.subDepartmentId == item.subdepartment.id)  )
        }
        setNewItems(query ? temp?.filter((item)=> item.itemName.toLocaleLowerCase().includes(query.toLocaleLowerCase()|| '')) : temp)
    },[props, query, departmentId])

    React.useEffect(()=>{
        let results = sortItems(baseItem?.filter((item)=> item.ratings >= reviewFilter).filter((item) => (Number((item.price*item.discount).toFixed(2)) >= priceFilter.min && Number((item.price*item.discount).toFixed(2)) <= priceFilter.max )))
        setNewItems(results!)
    },[reviewFilter, priceFilter])

    return (
        <div className="flex col min-h-[40rem] mt-[-70px]">
            <h1 className={newItems?.length == 0 ? '' : 'hidden'}>No Result for {query}</h1>

            <div className={newItems?.length > 0 ?' w-[25%]' : 'hidden'}>
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
            <div className={newItems?.length > 0 ? 'w-full' : 'hidden'}>
                <div>
                    <h1>Results</h1>
                </div>
                <div className='grid grid-cols-4 gap-2'>
                    {
                        newItems?.map((newItem)=>{
                            let depId = Number(departmentId)
                            if(depId == 0){
                                depId = (departments.filter((dep)=> dep.subDepartment.some((subdep)=> subdep.subDepartmentId == newItem.subdepartment.id))[0].departmentId)
                            }
                            return (
                                <div key={newItem.id} className='min-h-[25rem]  border border-r-2 border-gray-200'>
                                    <Link to={`/itempage/${depId}/${newItem.subdepartment.id}/${newItem.id}`}>
                                        <div className=' h-[70%]'><img className='max-w-[50%] max-h-[100%] min-h-[100%] min-w-[50%] ml-auto mr-auto' src={`/assets/product-image/${newItem.image}.jpg`} alt={`image ${newItem.image}`} /></div>
                                        <div className='m-2 hover:text-orange-400'><a>{newItem.itemName}</a></div>
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

export default SearchPage;