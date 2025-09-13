"use client";
//import dynamic from "next/dynamic";
//import { use } from "react";
import Results from "@components/Results";


export default function ResultsPage() {
  return (
    <div className="font-sans items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
       <main className="w-full max-w-3xl">
       <Results  />
      </main>
    </div>
  );
}