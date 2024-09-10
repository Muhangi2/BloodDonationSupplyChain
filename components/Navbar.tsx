"use client"
import Image from "next/image"
import ThemeSwitch from "./ThemeSwitch"

export default function Navbar() {
    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900 ">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
                <Image src="https://flowbite.com/docs/images/logo.svg" width={32} height={32} alt="Logo" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                    Admin
                </span>
            </a>
            <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                <ThemeSwitch />
            </div>
            </div>
        </nav>
    )
}
