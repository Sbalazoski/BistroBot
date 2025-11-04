import { MadeWithDyad } from "@/components/made-with-dyad";
import LandingHeader from "@/components/LandingHeader"; // Use the renamed LandingHeader
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      <LandingHeader /> {/* Use the LandingHeader component */}
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100">Welcome to BistroBot!</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Your intelligent assistant for automating restaurant review replies.
          </p>
          <p className="text-md text-gray-500 dark:text-gray-400 mt-2">
            Let's build something amazing together.
          </p>
          <Button asChild className="mt-6">
            <Link to="/dashboard">Go to Dashboard</Link>
          </Button>
        </div>
      </main>
      <MadeWithDyad />
    </div>
  );
};

export default Index;