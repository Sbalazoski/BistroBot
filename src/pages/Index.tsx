import { MadeWithDyad } from "@/components/made-with-dyad";
import AuthPage from "./AuthPage"; // Import AuthPage

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-300 via-rose-300 to-purple-300 dark:from-indigo-950 dark:via-purple-950 dark:to-pink-950">
      <main className="flex-grow flex items-center justify-center p-4">
        <AuthPage /> {/* Render the AuthPage component directly */}
      </main>
      <MadeWithDyad />
    </div>
  );
};

export default Index;