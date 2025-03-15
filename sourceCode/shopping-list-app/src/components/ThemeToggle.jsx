import * as Toggle from "@radix-ui/react-toggle";
import { useTheme } from "./ThemeProvider";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Toggle.Root
      onClick={toggleTheme}
      className="flex items-center justify-center rounded-full transition-colors duration-300 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700"
      style={{
        width: "24px",  
        height: "24px", 
        padding: "4px", 
      }}
    
    >
      {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
    </Toggle.Root>
  );
}
