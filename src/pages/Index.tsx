import { MadeWithDyad } from "@/components/made-with-dyad";
import { Link } from "react-router-dom"; // Import Link
import { Button } from "@/components/ui/button"; // Import Button

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 dark:from-stone-900 dark:via-zinc-900 dark:to-neutral-900">
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg animate-fade-in">
          <img src="/bistrologobistrobot.png" alt="BistroBot Logo" className="mx-auto h-48 w-48 mb-6" />
          <h2 className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100">Elevate Your Restaurant's Reputation with BistroBot</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Intelligent AI-powered replies for every customer review, effortlessly.
          </p>
          <p className="text-md text-gray-500 dark:text-gray-400 mt-4">
            Ready to transform your online presence?
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