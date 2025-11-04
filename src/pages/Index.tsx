import { MadeWithDyad } from "@/components/made-with-dyad";
import { Link } from "react-router-dom"; // Import Link
import { Button } from "@/components/ui/button"; // Import Button

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      {/* Header is now part of the Layout component, so removed from Index */}
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <img src="/bistrologobistrobot.png" alt="BistroBot Logo" className="mx-auto h-48 w-48 mb-6" /> {/* Increased logo size */}
          <h2 className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100">Welcome to BistroBot!</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Your intelligent assistant for automating restaurant review replies.
          </p>
          <p className="text-md text-gray-500 dark:text-gray-400 mt-4">
            Get started by navigating to your dashboard.
          </p>
          <Link to="/dashboard">
            <Button className="mt-6">Go to Dashboard</Button>
          </Link>
        </div>
      </main>
      <MadeWithDyad />
    </div>
  );
};

export default Index;