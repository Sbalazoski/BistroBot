import React from "react";
import Link from "next/link";
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to BBot</h1>
      <div className="space-x-4">
        <Link href="/auth/login"><button className="btn">Login</button></Link>
        <Link href="/auth/signup"><button className="btn">Sign Up</button></Link>
      </div>
    </div>
  );
}
