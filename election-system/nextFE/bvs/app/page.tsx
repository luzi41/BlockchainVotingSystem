import { use } from "react";
import Image from "next/image";
import Start from "@components/Start";

interface PageProps {
  searchParams: Promise<{ ed?: string }>;
}

export default function Home({ searchParams }: PageProps) {
  const params = use(searchParams);

  const defaultDistrict =
    process.env.NEXT_PUBLIC_ELECTION_DISTRICT ?? "1";

  // Wahlbezirke aus env (Liste)
  const districts = process.env.NEXT_PUBLIC_ELECTION_DISTRICTS
    ? process.env.NEXT_PUBLIC_ELECTION_DISTRICTS.split(",").map((d) => d.trim())
    : [defaultDistrict];
  // Aktueller Bezirk: entweder aus URL oder Default
  // Wert aus URL oder Fallback aus env
  const ed = params.ed ?? defaultDistrict;

  return (
    <div className="font-sans items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Start electionDistrict={ed} availableDistricts={districts} />
      </main>
    </div>
  );
}
