import { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => (
  <main className="flex min-h-screen items-center justify-center">
    <div className="flex flex-col gap-4 p-5 max-w-xs w-full bg-slate-800 rounded-md">
      <div className="text-center my-4">
        <h1>Content</h1>
      </div>
      <div>
        <Link href="/signin" className="bg-slate-900 my-4 p-3 rounded-lg block">
          Sign In
        </Link>
      </div>
      <div>
        <Link href="/signup" className="bg-slate-900 my-4 p-3 rounded-lg block">
          Sign Up
        </Link>
      </div>
    </div>
  </main>
);

export default Home;
