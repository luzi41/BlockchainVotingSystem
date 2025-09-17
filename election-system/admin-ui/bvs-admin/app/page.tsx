import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h2>Blockchain Voting Admin</h2>  
        <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
          <li className="mb-2 tracking-[-.01em]">New election or survey</li>
          <li className="mb-2 tracking-[-.01em]">Edit election or survey</li>
          <li className="mb-2 tracking-[-.01em]">User/Roles Administration</li>
          <li className="mb-2 tracking-[-.01em]">Help</li>
        </ol>

      </main>

    </div>
  );
}
