import { MadeWithDyad } from "@/components/made-with-dyad";
import AuthPage from "./AuthPage"; // Import AuthPage

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 dark:from-stone-900 dark:via-zinc-900 dark:to-neutral-900">
      <main className="flex-grow flex items-center justify-center p-4">
        <AuthPage /> {/* Render the AuthPage component directly */}
      </main>
      <MadeWithDyad />
    </div>
  );
};

export default Index;