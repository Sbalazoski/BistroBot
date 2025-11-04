import { MadeWithDyad } from "@/components/made-with-dyad";
import AuthPage from "./AuthPage"; // Import AuthPage

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-orange-100 to-red-100 dark:from-blue-950 dark:via-indigo-950 dark:to-orange-950">
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="max-w-2xl text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-50 mb-4">
            Automate Your Restaurant's Reputation
          </h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300">
            BistroBot is your AI-powered assistant for automating restaurant review replies. Efficiently manage your online reputation, generate contextually relevant responses, and maintain authenticity with human-in-the-loop controls.
          </p>
        </div>
        <AuthPage /> {/* Render the AuthPage component directly */}
      </main>
      <MadeWithDyad />
    </div>
  );
};

export default Index;