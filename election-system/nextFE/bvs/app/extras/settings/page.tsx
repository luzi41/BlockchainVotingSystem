"use client";
import SettingsForm from "@components/Settings";
import { use } from "react";

interface PageProps {
  searchParams: Promise<{ ed?: string }>;
}
export default function SettingsPage({ searchParams }: PageProps) {
  // asynchrones searchParams via React.use() auflösen
  const params = use(searchParams);
  const defaultDistrict =
    process.env.NEXT_PUBLIC_ELECTION_DISTRICT ?? "1";  
  // Aktueller Bezirk: entweder aus URL oder Default
  // Wert aus URL oder Fallback aus env
  // Wahlbezirke aus env (Liste)
  const districts = process.env.NEXT_PUBLIC_ELECTION_DISTRICTS
    ? process.env.NEXT_PUBLIC_ELECTION_DISTRICTS.split(",").map((d) => d.trim())
    : [defaultDistrict];
      
  const ed = params.ed ?? defaultDistrict;
    return (
    <div className="flex justify-center p-6">
        <div className="w-full max-w-3xl">
            <SettingsForm electionDistrict={ed} availableDistricts={districts} />
        </div>
    </div>		
    );
}
