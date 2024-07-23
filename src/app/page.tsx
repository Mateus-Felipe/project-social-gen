'use client'
import { useRouter } from "next/navigation";
import { useEffect } from "react";



export default function App() {
  const router = useRouter()

  useEffect(() => {
    // Verify Auth Cookies
    const loadAuth = () => {
      // ...
      // Has Cookie ? Got to page Home : Go to Page Login
      // ...
      router.push('/dashboard/home')
    }
    loadAuth()
  }, [])

  return (
    <div className="flex w-full h-screen justify-center items-center">
      <h1>Wait a moment...</h1>
    </div>
  );
}