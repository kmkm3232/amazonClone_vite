import React from "react";
import { AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai"
import { CiLocationOn } from "react-icons/ci"

export const NavBar: React.FC = () => {
    return (
        <div className="bg-black h-24 text-white py-2">
            <div className="flex  h-[60%]">
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
                        <option>All</option>
                        <option>Arts</option>
                        <option>Computers</option>
                        <option>Helath</option>
                        <option>Food</option>
                    </select>
                    <input className="px-1 w-[90%] border-none outline-none " placeholder="Search Amazon"></input>
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
                        <AiOutlineShoppingCart className="" size={40}/>
                        <button className="mt-2">Cart</button>
                    </div>
                </div>
            </div>
            <div className="h-[40%]">
                Bottom Nav
            </div>
        </div>
    )
}

export default NavBar;