import React from "react";
import { AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai"
import { CiLocationOn } from "react-icons/ci"
import { AiOutlineClose } from "react-icons/ai"
import { Link } from "react-router-dom";
interface FrontPageProps{
    departments: {
        departmentId: number, 
        departmentName: string, 
        subDepartment: {
            subDepartmentId: number,
            subDepartmentName: string
        }[]
    }[],
    setDepartments: React.Dispatch<React.SetStateAction<any>>,
    shoppingCart: Array<{id:number, qty:number, options?:Array<any>}>
}
export const NavBar: React.FC<FrontPageProps> = (props) => {
    const { departments, setDepartments, shoppingCart } = props
    const [currrentDepartment, setcurrrentDepartment] = React.useState(0)
    let totalItems = 0
    shoppingCart?.forEach((item)=> totalItems += item.qty)
    const [nav, setNav] = React.useState(false)
    return (
        <div className="bg-black h-24 text-white py-2 inline-block whitespace-nowrap min-w-[100%]">
            <div className="flex h-[60%]">
                <div className="flex">
                    <button className="text-2xl font-bold mx-2">amazon</button>
                    <div className="flex text-xs">
                        <CiLocationOn size={20} className="mt-5 ml-1" />
                        <div className="flex flex-col m-1 p-1">
                            <button className="text-md font-bold">Deliver to Dude</button>
                            <a>Mars</a>
                        </div>
                    </div>
                </div>
                <div className="text-black flex max-w-[950px] w-full hover py-1" >
                    <select className="px-1 bg-gray-200 rounded-l-md w-[5%] text-xs">
                        <option className="">All</option>
                        <option>Arts</option>
                        <option>Computers</option>
                        <option>Helath</option>
                        <option>Food</option>
                    </select>
                    <input className="px-1 min-w-[90%] border-none outline-none " placeholder="Search Amazon"></input>
                    <AiOutlineSearch className="w-[5%] p-2 bg-yellow-500 text-black rounded-r-md h-full" size={30} />
                </div>
                <div className="grow flex text-sm">
                    <select className="grow text-white bg-black text-center">
                        <option>EN</option>
                        <option>CN</option>
                        <option>JP</option>
                        <option>ES</option>
                    </select>
                    <button className="grow">
                        <p>Hello, Dude</p>
                        <p>Account & Lists</p>
                    </button>
                    <button className="grow">
                        <p>Returns</p>
                        <p>& Orders</p>
                    </button>
                    <div className="flex grow">
                        <div className="relative">
                        <div className={totalItems < 99 ?  " text-orange-400 text-2xl font-bold absolute top-[-3px] right-[10px]" :
                    " text-orange-400 text-xl font-bold absolute top-[-3px] right-[3px]"
                    }>{totalItems}</div>
                        <AiOutlineShoppingCart className="" size={40}/>
                        </div>
                        <Link to={`/shoppingcart`}><button className="mt-2">Cart</button></Link>
                    </div>
                </div>
            </div>
            <div className="h-[40%]">
                <ul className="flex p-2">
                    <li className="px-2" onClick={()=> setNav(!nav)} >All</li>
                    <li className="px-2">Today's Deal</li>
                    <li className="px-2">Gift Cards</li>
                    <li className="px-2">Buy Again</li>
                    <li className="px-2">Customer Service</li>
                    <li className="px-2">Browsing History</li>
                </ul>
            </div>
        <div className={ nav ? "fixed inset-0 bg-gray-500 bg-opacity-75 z-50 ease-in-out duration-300" : "invisible"}>   
            <div className={ nav ? "h-full fixed left-0 top-0 w-[22rem] border-r border-r-gray-900 bg-white ease-in-out duration-300 " : "left-[-100%]"}>
                <div className="bg-black h-[7%]">
                    <h1 className="text-xl font-bold py-3 px-[10%]">Hello, Dude</h1>
                </div>
                <div className="text-black">
                    <div className={ currrentDepartment == 0 ? "flex flex-col" : "hidden" }>
                        <h5 className="text-xl font-bold">Shop By Department</h5>
                        {/* 
                            make a state : curr department
                            import div as cur

                             possible ways : (state for selectedDeparemtn  => filter. == deparment id  => show subdepartment)
                        */}
                        {
                            departments.map((department)=>{
                                return(
                                    <a key={department.departmentId} onClick={()=> setcurrrentDepartment(department.departmentId)}>
                                        {department.departmentName}
                                    </a>
                                )
                            })
                        }
                    </div>
                    <div className={currrentDepartment > 0 ?  "flex flex-col" : "hidden" }>
                        <h5 className="text-xl font-bold" onClick={()=> setcurrrentDepartment(0)}>Main Menu</h5>
                        {
                            departments.filter((department) => department.departmentId == currrentDepartment).map((d)=>{
                                return(
                                    <div key={d.departmentId} className="flex flex-col">
                                        <h1>{d.departmentName}</h1>
                                        {
                                            d.subDepartment.map((sd)=>{
                                                return (
                                                    <a 
                                                        onClick={()=>{
                                                            setcurrrentDepartment(0)
                                                            setNav(!nav)
                                                        }} 
                                                        key={sd.subDepartmentId}>
                                                            <Link to={`/itemspage/${d.departmentId}/${sd.subDepartmentId}`} >{sd.subDepartmentName}</Link>
                                                    </a>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div className="text-white fixed top-4 left-80 mx-[2.5rem]">
                    <AiOutlineClose 
                    size={30} 
                    onClick={(

                    )=>{ 
                        setNav(!nav)
                        setcurrrentDepartment(0)
                        }}/>
            </div>
        </div>
        </div>
    )
}

export default NavBar;