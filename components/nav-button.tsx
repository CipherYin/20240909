import Link from "next/link"
import { ReactNode } from "react"

type Props = {
    href: string,
    label: string | ReactNode,
} 

export const NavButton = ({
    href,
    label}: Props
) => {
    return (
        <button
            className="w-full font-roboto font-normal px-2.5 lg:w-auto justify-between hover:underline
                        focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-blac"
        >
            <Link href={href}>
                {label}
            </Link>

        </button>
    )
}