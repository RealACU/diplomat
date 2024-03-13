import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <div>Hello Model Diplomat! This is the landing page.</div>
      <Link href="/admin/create-tournament">
        (Admin only) create tournament
      </Link>
      <div>Search tournaments</div>
      <Link href="/tournament/12345">Tourney</Link>
      <div>Timer</div>
    </main>
  );
}
