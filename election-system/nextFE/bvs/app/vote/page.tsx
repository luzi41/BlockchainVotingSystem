"use client";
import * as React from 'react';
import VoteForm from "@components/VoteForm";

interface PageProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function VotePage({ searchParams }: PageProps) {
  // Optional: ed aus query params lesen
  //const ed = typeof searchParams?.ed === "string" ? searchParams.ed : undefined;
  const ed = React.use(searchParams);

  return <VoteForm ed={ed} />;
}
