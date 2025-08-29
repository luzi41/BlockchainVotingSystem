import Link from 'next/link';
interface PageProps {
	searchParams: Promise<{ ed?: string }>;
}

export default function ExtrasPage({ searchParams }: PageProps) {
	<div>
		<h3>Extras</h3>
		<nav className="menu">
			<ul>
				<li><Link href="http://localhost:25000" target="_blank">Explorer</Link></li>
				<li><Link href="/extras/settings">Einstellungen</Link></li>
			</ul>
		</nav>
	</div>
}