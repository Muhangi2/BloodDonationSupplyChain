"use client"
import Image from "next/image"
import ThemeSwitch from "./ThemeSwitch"
import { usePathname } from "next/navigation"

export default function Navbar() {
    const pathname = usePathname()

    // function to generate page title according to the pathname
    const pageName = () => {
        if (pathname === "/") return "Home"
        if (pathname === "/admin") return "Admin Dashboard"
        if (pathname === "/hospitals") return "Hospital Dashboard"
        if (pathname === "/suppliers") return "Supplier Dashboard"
        else return ""
    }

    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900 ">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
                <Image src="/logo.png" width={32} height={32} alt="Logo" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                    {pageName()}
                </span>
            </a>
            <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                <ThemeSwitch />
            </div>
            </div>
        </nav>
    )
}
