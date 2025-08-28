// app/vote/page.tsx
import VoteForm from "@components/VoteForm";

interface PageProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function VotePage({ searchParams }: PageProps) {
  const edParam = searchParams?.ed;
  const ed = typeof edParam === "string" ? edParam : undefined;

  return (
    <div className="flex justify-center p-6">
      <div className="w-full max-w-3xl">
        <VoteForm ed={ed} />
      </div>
    </div>
  );
}
