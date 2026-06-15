"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

const SearchBar = () => {
    const [search, setSearch] = useState("")
    const router = useRouter()

    const handleSearch = () => {
        if (search.trim()) {
            router.push(`/${search}`)
        }
    }

    return (
        <form
            className="w-full md:w-1/3 mx-auto"
            onSubmit={(e) => {
                e.preventDefault()
                handleSearch()
            }}
        >
            <label
                htmlFor="search"
                className="block mb-2.5 text-sm font-medium text-heading sr-only"
            >
                Search
            </label>

            <div className="relative">
                <div className="absolute inset-y-0 inset-s-0 flex items-center px-3 pointer-events-none">
                    <svg
                        className="w-4 h-4 text-body"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeWidth="2"
                            d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                        />
                    </svg>
                </div>

                <input

                    type="search"
                    id="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="block  w-full p-3 px-9 text-white bg-gray-950 border border-gray-700 rounded-lg"
                    placeholder="Search creator username"
                    required
                />

                <button
                    type="submit"
                    className="absolute inset-e-1.5 bottom-1.5 text-white bg-purple-600 hover:bg-purple-700 rounded px-3 py-2 mb-1 text-xs"
                >
                    Search
                </button>
            </div>
        </form>
    )
}

export default SearchBar