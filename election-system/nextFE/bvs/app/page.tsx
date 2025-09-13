import Start from "@components/Start";

export default function Home() {
  return (
    <div className="font-sans items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
       <main className="w-full max-w-3xl">
        <Start electionDistrict="default"  />
      </main>
    </div>
  );
}