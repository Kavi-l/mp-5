import Link from "next/link"

export default function Header() {
    return (
        <header className="bg-black text-4xl font-bold p-4">
            <nav>
                <Link href="/"> CS 391 mp-5</Link>
            </nav>
        </header>
    )
}