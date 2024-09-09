import { NavButton } from "./nav-button";
import { useMedia } from "react-use";
import { useState } from "react";
import {  Menu, X } from "lucide-react";
import Link from "next/link";
import { Separator } from "./ui/separator";
const routes =[
    {
        href: "https://pdf.ai/pricing",
        label: "Pricing"
    },
    {
        href: "https://pdf.ai/chrome-extension",
        label: "Chrome extension"
    },
    {
        href: "https://pdf.ai/use-cases",
        label: "Use cases"
    },
    {
        href: "https://pdf.ai/documents",
        label:  (
            <div className="flex items-center">
                Get started -&gt;
                {/* <ArrowRight className="ml-1 w-4 h-4" /> */}
            </div>
        )
    } 
];

export const Navigation = () => {
    const [open,setOpen] = useState(false)
    const isMobile = useMedia("(max-width: 1024px)",false)
    
    if(isMobile){
        return (
            <div className="flex">
                {/* Trigger Button */}
                <button
                    onClick={() => setOpen(!open)}
                    className="flex items-center overflow-x-auto"
                >
                    {open ? <X /> : <Menu />}
                </button>

                {open && (
                    <div className="absolute mt-10 border-t-1 border-black left-0 w-full bg-white shadow-md z-50">
                        <Separator/>
                        <div className="font-roboto font-normal p-4 gap-y-4 flex flex-col">
                            {routes.map((route) => (
                                <Link key={route.href} href={route.href}>
                                    {route.label}
                                </Link>
                            ))}
                        </div>
                        
                        
                    </div>
                )}
            </div>
        )

    }
    return (
        <nav className="hidden lg:flex items-center overflow-x-auto">
            {routes.map((route) => (
                <NavButton
                    key={route.href}
                    href={route.href}
                    label={route.label}
                />
            ))} 
    </nav> 
    )
}