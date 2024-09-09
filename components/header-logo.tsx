import Image from "next/image"
import Link from "next/link"

export const HeaderLogo = () => {
    return (
        <div className="shrink-0">
            <Link href="https://pdf.ai/">
                    <div className="items-center flex">
                        <Image
                            src="/logo.svg"
                            alt="Logo"
                            width={32}
                            height={32}
                        />
                        <p className="font-robotoSlab text-black text-xl font-medium">
                            PDF.ai
                        </p>
                    </div>
                </Link> 
        </div>
        
    )
}