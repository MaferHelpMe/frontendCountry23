import { Metadata } from "next";
import { countryService } from "@/lib/api/countries";
import { HomePage } from "@/components/pages/home-page";

export const metadata: Metadata = {
  title: "Home | Where in the world?",
  description:
    "Discover countries around the world. Search and filter by region to explore detailed information about population, capitals, and more.",
};

// Esta página es un Server Component que hace fetch de los datos iniciales
export default async function Home() {
  try {
    // Fetch inicial de todos los países en el servidor
    const countries = await countryService.getAllCountries();

    return <HomePage initialCountries={countries} />;
  } catch (error) {
    console.error("Error fetching countries:", error);

    // Página de error personalizada
    return (
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="text-6xl mb-4">🌍</div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Unable to load countries
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
            We're having trouble connecting to our data source. Please check
            your internet connection and try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
}
