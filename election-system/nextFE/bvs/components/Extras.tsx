import Link from "next/link";
export default function Extras() {
    return (
    <div>
        <h3>Extras</h3>
        <nav className="menu">
            <ul className="lists-default">
                <li><Link href="http://localhost:25000" target="_blank">Explorer</Link></li>
                <li><Link href="/extras/settings">Einstellungen</Link></li>
            </ul>
        </nav>
    </div>
    );
}