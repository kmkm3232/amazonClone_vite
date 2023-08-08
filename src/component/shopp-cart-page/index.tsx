import React from "react";
import { Link } from "react-router-dom";
interface ShoppingCartProps{
    shoppingCart: Array<{id:number, qty:number, options:Array<any>, depId: number, subDepId: number, checked: boolean, price:number}>,
    setShoppingCart: React.Dispatch<React.SetStateAction<any>>,
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

export const ShoppCartPage: React.FC<ShoppingCartProps> = (props) => {
    const { shoppingCart, setShoppingCart, items, departments } = props
    const [deleted, setDeleted] = React.useState({
        id: -1,
        depId: -1,
        subDepId: -1
    })
    const handleOnDelete = (id:number, depId: number, subDepId: number)=>{
        setDeleted({id: id, depId: depId, subDepId: subDepId})
        setShoppingCart(shoppingCart.filter((item)=> item.id !== id))
    }
    let qtyOption = new Array(9).fill(0)
    let itemNum = shoppingCart.reduce((prev, next)=> next.checked ? prev = prev + next.qty : prev, 0 )
    let totalPrice = shoppingCart.reduce((prev, next)=> next.checked ? prev = prev + next.qty * next.price : prev , 0)
    React.useEffect(()=>{
        localStorage.setItem("cart", JSON.stringify(shoppingCart))
    }, [shoppingCart])

    const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>,  good: {
        id: number;
        qty: number;
        options: Array<any>;
        depId: number;
        subDepId: number;
        checked: boolean;
    }) =>{
        let temp = [...shoppingCart]
        let curr = temp.find((item)=> item.id == good.id)
        curr!.qty = Number(e.target.value)
        setShoppingCart(temp)
    }
    const handleDecrement = (good: {
        id: number;
        qty: number;
        options: Array<any>;
        depId: number;
        subDepId: number;
        checked: boolean;
    }) =>{
        let temp = [...shoppingCart]
        let curr = temp.find((item)=> item.id == good.id)
        curr!.qty -= 1
        setShoppingCart(temp)
    }
    const handleIncrement = (good: {
        id: number;
        qty: number;
        options: Array<any>;
        depId: number;
        subDepId: number;
        checked: boolean;
    }) =>{
        let temp = [...shoppingCart]
        let curr = temp.find((item)=> item.id == good.id)
        curr!.qty += 1
        setShoppingCart(temp)
    }
    const handleOnCheck = (good: {
        id: number;
        qty: number;
        options: Array<any>;
        depId: number;
        subDepId: number;
        checked: boolean;
    }) =>{
        let temp = [...shoppingCart]
        let curr = temp.find((item)=> item.id == good.id)
        curr!.checked = !curr?.checked
        setShoppingCart(temp)
    }
    return (
        <div className="flex mt-[-70px] mx-[3%] min-h-[85vh]">
            <div className="grow basis-4/5">
                <h1 className="text-2xl font-bold">Shopping Cart</h1>
                <button className="text-xs mt-2 text-[#007185] hover:underline">Deselect all items</button>
                <hr className={deleted.id == -1 ? "hidden" : "my-2"}></hr>
                <div className={deleted.id == -1 ? "hidden" : "p-3"}> <Link className="hover:underline text-[#007185]" to={`/itempage/${deleted.depId}/${deleted.subDepId}/${deleted.id}`}>{items.find((item)=> item.itemId == deleted.id)?.itemName} </Link>was removed from Shopping Cart.</div>
                <hr className="my-2"></hr>
                <div>
                    {
                        shoppingCart.map((good)=>{
                            let item = items.find((item)=> item.itemId == good.id)
                            return(
                                <div key={item?.itemId} >
                                    <div className="flex">
                                        <input className="mx-5" type="checkbox" checked={good.checked} onChange={()=> handleOnCheck(good)}></input>
                                        <div className="grow basis-1/5 mx-2 bg-gray-300">image</div>
                                        <div className="grow basis-4/5">
                                            <h1>{item?.itemName}</h1>
                                            <h1>${(item!.price * item!.discount).toFixed(2)}</h1>
                                            <div className="flex">
                                                <div>
                                                    Quantity: 
                                                    <button onClick={()=> handleDecrement(good)} disabled={good.qty == 1} className="text-md ml-2 border border-gray-300 px-1 hover:border-orange-400 hover:first-letter:text-orange-400">-</button>
                                                    <input onChange={(e)=> handleOnchange(e, good)} className="text-center w-[35px] px-1 border border-gray-400" value={good.qty} type="number"></input>
                                                    <button onClick={()=> handleIncrement(good)} className="text-md border border-gray-300 px-1 hover:border-orange-400 hover:first-letter:text-orange-400">+</button>
                                                </div>
                                                <a className="text-gray-300 mx-2">|</a>
                                                <button className="text-[#007185] hover:underline" onClick={()=>handleOnDelete(good.id, good.depId, good.subDepId)}>Delete</button>
                                                <a className="text-gray-300 mx-2">|</a>
                                                <button className="text-[#007185] hover:underline">Save for Later</button>
                                                <a className="text-gray-300 mx-2">|</a>
                                                <button className="text-[#007185] hover:underline">Share</button>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className="my-1"/>
                                </div>
                            )
                        })
                    }
                    <div className="text-right text-lg">
                        <span>{`SubTotal (${itemNum} items):`}</span> <span className="font-bold">{`$ ${totalPrice}`}</span>
                    </div>
                </div>
                
            </div>
            <div className="grow basis-1/5">side</div>
        </div>
    )
}

export default ShoppCartPage;