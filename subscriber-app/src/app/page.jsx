import Link from "next/link";

export default function Home() {
  return (
    <>
        <div className="flex flex-col items-center gap-5 justify-center my-20">
            <Link className="rounded-md shadow-md bg-gray-700 text-white w-60 h-12 p-5" href="/all-subscriber">
            ALL SUBSCRIBER
            </Link>
            
        
        </div>
    </>
  );
}
