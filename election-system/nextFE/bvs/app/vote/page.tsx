// app/vote/page.tsx
"use client";
import dynamic from "next/dynamic";
import { use } from "react";
import VoteForm from "@components/VoteForm";

interface PageProps {
  searchParams: Promise<{ ed?: string }>;
}

export default function VotePage({ searchParams }: PageProps) {
  // asynchrones searchParams via React.use() auflösen
  const params = use(searchParams);

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
  const ed = params.ed ?? defaultDistrict;

  return (
    <div className="flex justify-center p-6">
      <div className="w-full max-w-3xl">
        <VoteForm electionDistrict={ed} availableDistricts={districts} />
      </div>
    </div>
  );
}
