// app/vote/page.tsx
"use client";
//import dynamic from "next/dynamic";
import { use } from "react";
import VoteForm from "@components/VoteForm";

interface PageProps {
  //searchParams: Promise<{ ed?: string }>;
}

export default function VotePage() {
  // asynchrones searchParams via React.use() auflösen
  //const params = use(searchParams);

  const defaultDistrict =
    process.env.NEXT_PUBLIC_ELECTION_DISTRICT ?? "1";

 // Wert aus URL oder Fallback aus env
//const ed = params.ed ?? defaultDistrict;    

  // Wahlbezirke aus env (Liste)
  const districts = process.env.NEXT_PUBLIC_ELECTION_DISTRICTS
    ? process.env.NEXT_PUBLIC_ELECTION_DISTRICTS.split(",").map((d) => d.trim())
    : [defaultDistrict];

  // Aktueller Bezirk: entweder aus URL oder Default
  // Wert aus URL oder Fallback aus env
  //const ed = params.ed ?? defaultDistrict;

  return (
    <div className="font-sans items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="w-full max-w-3xl">
        <VoteForm electionDistrict="default" />
      </main>
    </div>
  );
}
