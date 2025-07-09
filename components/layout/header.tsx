import { ThemeToggle } from "@/components/ui/theme-toggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 dark:bg-gray-900/80 dark:border-gray-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <h1 className="text-xl font-bold text-black dark:text-white">
            Where in the world?
          </h1>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <span className="ml-1">Dark Mode</span>
          </div>
        </div>
      </div>
    </header>
  );
}
