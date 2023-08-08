import React from "react";
import { AiOutlineArrowLeft, AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai"
import { CiLocationOn } from "react-icons/ci"
import { AiOutlineClose } from "react-icons/ai"
import { Link, useNavigate } from "react-router-dom";
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
    const navigate = useNavigate()
    const searchRef = React.useRef<HTMLInputElement>(null)
    const depSelectRef = React.useRef<HTMLSelectElement>(null)
    let totalItems = 0
    const handleOnSearch = () =>{
        navigate(`/searchpage/${depSelectRef.current!.value || 0}/${searchRef.current!.value || ''}`)
    }
    shoppingCart?.forEach((item)=> totalItems += item.qty)
    const [nav, setNav] = React.useState(false)
    return (
        <div className="bg-black h-24 text-white py-2 inline-block whitespace-nowrap min-w-[100%]">
            <div className="flex h-[60%]">
                <div className="flex">
                    <button className="text-2xl font-bold mx-2 hover:border"><Link to='/'>amazon</Link></button>
                    <div className="flex text-xs hover:border">
                        <CiLocationOn size={20} className="mt-5 ml-1" />
                        <div className="flex flex-col m-1 p-1">
                            <button className="text-md font-bold">Deliver to Dude</button>
                            <a>Mars</a>
                        </div>
                    </div>
                </div>
                <div className="text-black flex max-w-[950px] w-full hover py-1" >
                    <select id='depSelect' ref={depSelectRef} className="hover:bg-gray-300 px-1 bg-gray-200 rounded-l-md text-xs">
                        <option value={0}>All</option>
                        {
                            departments.map((dep)=>{
                                return(
                                    <option key={dep.departmentId} value={dep.departmentId}>{dep.departmentName}</option>
                                )
                            })
                        }
                    </select>
                    <input type="text" id='searchInput' className="px-1 grow  border-none outline-none " ref={searchRef}  placeholder="Search Amazon"></input>
                    <AiOutlineSearch onClick={()=> handleOnSearch()} className="hover:bg-yellow-600 p-2 bg-yellow-500 text-black rounded-r-md h-full" size={30} />
                </div>
                <div className="grow flex text-sm">
                    <select className="grow text-white bg-black text-center hover:border">
                        <option>EN</option>
                        <option>CN</option>
                        <option>JP</option>
                        <option>ES</option>
                    </select>
                    <button className="grow hover:border">
                        <p>Hello, Dude</p>
                        <p>Account & Lists</p>
                    </button>
                    <button className="grow hover:border">
                        <p>Returns</p>
                        <p>& Orders</p>
                    </button>
                    <div className="flex grow hover:border">
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
                <ul className="flex p-2 ">
                    <li className="px-2 hover:border" onClick={()=> setNav(!nav)} >All</li>
                    <li className="px-2 hover:border">Today's Deal</li>
                    <li className="px-2 hover:border">Gift Cards</li>
                    <li className="px-2 hover:border">Buy Again</li>
                    <li className="px-2 hover:border">Customer Service</li>
                    <li className="px-2 hover:border">Browsing History</li>
                </ul>
            </div>
        <div className={ nav ? "fixed inset-0 bg-gray-500 bg-opacity-75 z-50 ease-in-out duration-300" : "invisible"}>   
            <div className={ nav ? "h-full fixed left-0 top-0 w-[22rem] border-r border-r-gray-900 bg-white ease-in-out duration-300 " : "left-[-100%]"}>
                <div className="bg-black h-[7%]">
                    <h1 className="text-xl font-bold py-3 px-[10%]">Hello, Dude</h1>
                </div>
                <div className="text-black">
                    <div className={ currrentDepartment == 0 ? "flex flex-col" : "hidden" }>
                        <h5 className="text-xl font-bold p-2">Shop By Department</h5>
                        <hr></hr>
                        {/* 
                            make a state : curr department
                            import div as cur

                             possible ways : (state for selectedDeparemtn  => filter. == deparment id  => show subdepartment)
                        */}
                        {
                            departments.map((department)=>{
                                return(
                                    <a className="p-2 hover:bg-gray-200" key={department.departmentId} onClick={()=> setcurrrentDepartment(department.departmentId)}>
                                        {department.departmentName}
                                    </a>
                                )
                            })
                        }
                    </div>
                    <div className={currrentDepartment > 0 ?  "flex flex-col" : "hidden" }>
                        <div className="flex text-xl font-bold p-2 hover:bg-gray-200">
                            <AiOutlineArrowLeft className="mx-2 "/>
                            <h5 onClick={()=> setcurrrentDepartment(0)}> Main Menu</h5>
                        </div>
                        <hr></hr>
                        {
                            departments.filter((department) => department.departmentId == currrentDepartment).map((d)=>{
                                return(
                                    <div key={d.departmentId} className="flex flex-col">
                                        <h1 className="p-2 font-bold text-xl">{d.departmentName}</h1>
                                        {
                                            d.subDepartment.map((sd)=>{
                                                return (
                                                    <Link key={sd.subDepartmentId} to={`/itemspage/${d.departmentId}/${sd.subDepartmentId}`} >
                                                        <div  className="p-2 text-xs hover:bg-gray-200"
                                                            onClick={()=>{
                                                                setcurrrentDepartment(0)
                                                                setNav(!nav)
                                                            }} 
                                                            >
                                                            {sd.subDepartmentName}
                                                        </div>
                                                    </Link>
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