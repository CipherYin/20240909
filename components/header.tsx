"use client"
import { HeaderLogo } from "./header-logo"
import { Navigation } from "./navigation"


export const Header = () => {
    return (
        <header className="px-5 py-6 flex justify-between w-full h-[70px] bg-[#ffffff] shadow-lg">
            <HeaderLogo/>
            <Navigation/>
        </header> 
    )
}