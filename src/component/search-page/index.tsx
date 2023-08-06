import React from "react";
import { Link, useParams } from "react-router-dom";
interface SearchPageProp{
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
export const SearchPage: React.FC<SearchPageProp> = (props) => {
    const { departmentId, query } = useParams()
    const { items, departments } = props
    let newItems = query ? items.filter((item)=> item.itemName.toLocaleLowerCase().includes(query.toLocaleLowerCase()|| '')) : items
    if(Number(departmentId) !== 0){
        let targetDep = departments.find((dep)=> dep.departmentId == Number(departmentId))
        newItems = newItems.filter((item)=> targetDep!.subDepartment.some((subdep)=> subdep.subDepartmentId == item.subdepartmentId)  )
    }
    return (
        <div className="flex col min-h-[40rem] mt-[-70px]">
            <h1 className={newItems.length == 0 ? '' : 'hidden'}>No Result for {query}</h1>

            <div className={newItems.length > 0 ?'bg-yellow-500 w-[25%]' : 'hidden'}>
                <h1>Filters</h1>
            </div>
            <div className={newItems.length > 0 ? 'w-full' : 'hidden'}>
                <div>
                    <h1>Results</h1>
                </div>
                <div className='grid grid-cols-4 gap-2'>
                    {
                        newItems.map((newItem)=>{
                            let depId = Number(departmentId)
                            if(depId == 0){
                                depId = (departments.filter((dep)=> dep.subDepartment.some((subdep)=> subdep.subDepartmentId == newItem.subdepartmentId))[0].departmentId)
                            }
                            return (
                                <div key={newItem.itemId} className='min-h-[25rem]  border border-r-2 border-gray-200'>
                                    <Link to={`/itempage/${depId}/${newItem.subdepartmentId}/${newItem.itemId}`}>
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

export default SearchPage;