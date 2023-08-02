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
    }[],
    setShoppingCart: React.Dispatch<React.SetStateAction<any>>,
    shoppingCart: Array<{id:number, qty:number, options?:Array<any>, depId: number, subDepId: number, checked: boolean, price: number}>,
}
const ItemPage: React.FC<ItemPageProp> = (props) => {
    const {itemId, currentDeparment, currentSubDepartment} = useParams()
    const {items, departments, setShoppingCart, shoppingCart} = props
    const qtyRef = React.useRef<HTMLSelectElement>(null)
    let currDep = departments.filter((dep)=> dep.departmentId == Number(currentDeparment))[0]
    let currentSubDep = currDep.subDepartment.filter((subdep)=> subdep.subDepartmentId == Number(currentSubDepartment))[0]
    let target = items.filter((item)=> item.itemId == Number(itemId))[0]
    // target.stock 
    let qtyOption = new Array(10).fill(0)
    const handleOnsubmit = (event:React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        /// [...] is a must to let react rerender
        let temp = [...shoppingCart]
        let curr = temp.find(item => item.id == target.itemId)
        if(curr){
            curr.qty += Number(qtyRef.current?.value)
        }else{
            temp.push({
                id:target.itemId,
                qty: Number(qtyRef.current?.value),
                options: [],
                depId: currDep.departmentId,
                subDepId: currentSubDep.subDepartmentId,
                checked: true,
                price: Number((target.price * target.discount).toFixed(2))
            })
        }
        setShoppingCart(temp)
    }
    React.useEffect(()=>{
        localStorage.setItem("cart", JSON.stringify(shoppingCart))
    }, [shoppingCart])
  return (
    <div className='mt-[-70px] mx-[2.5%] min-h-[85vh]'>
        <div className=''>Reserved for ads</div>
        <div className='text-xs p-2 text-gray-500'>{`${currDep.departmentName} > ${currentSubDep.subDepartmentName}`}</div>
        <div className='flex'>
            <div className='mt-2 grow basis-1/3'>
                <div className='h-[40rem] bg-slate-500'>
                    Image
                </div>
            </div>
            <div className='mt-2 grow basis-1/3 p-2'>
                <h1 className='text-xl font-bold'>{target.itemName}</h1>
                <div className='flex'>
                    <h2>{target.ratings} </h2>
                    <h2 className='mx-5'>{target.ratingCount} ratings</h2>
                </div>
                <hr className='mt-2'></hr>
                <div className='flex mt-2'>
                    <h1 className={target.discount < 1 ? "" : "hidden"}>-{((1-target.discount)*100).toFixed(1)}%</h1>
                    <h1 className='mx-2 text-2xl text-bold'>${(target.price * target.discount).toFixed(2)}</h1>
                </div>
                <div className={target.discount < 1 ? "flex text-xs mt-2" : 'hidden'}>
                    <h1 className='mr-1'>List Price: </h1>
                    <h1 className='line-through'>{target.price}</h1>
                </div>
                <div className='flex mt-2'>
                    {
                        target.options.map((option)=>{
                            return(
                                <div key={option.name}>
                                    <h1>{option.name}</h1>
                                    <ul>
                                        {
                                            option.choices.map((choice)=>{
                                                return(
                                                    <li key={choice.choiceId}>
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
                <hr className='mt-2'></hr>
                <div className='mt-2'>
                    <h1 className='font-bold'>About this item</h1>
                    <li>{target.about}</li>
                </div>
            </div>
            <div className='grow basis-1/6 border-2 rounded-md border-gray-300'>
                <form className='p-2' onSubmit={handleOnsubmit}>
                    <label>
                        <div className='flex mt-2'>
                            <h1 className={target.discount < 1 ? "" : "hidden"}>-{((1-target.discount)*100).toFixed(1)}%</h1>
                            <h1 className='mx-2 text-2xl text-bold'>${(target.price * target.discount).toFixed(2)}</h1>
                        </div>
                    </label>
                    <select ref={qtyRef} size={1} className='mt-3 drop-shadow-md border rounded-lg border-gray-300 bg-slate-100'>
                        {
                            qtyOption.map((qty, index)=>{
                                return(
                                    <option key={index} value={index+1}>Qty: {index+1}</option>
                                )
                            })
                        }
                    </select>
                    <div className='mt-2 rounded-3xl bg-yellow-400 p-2 text-center hover:bg-yellow-500'>
                        <button type='submit'>Add to Cart</button>
                    </div>
                </form>
            </div>
        </div>
        <div>Suggest</div>
    </div>
  )
}

export default ItemPage;