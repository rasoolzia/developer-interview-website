import { ThemeSwitcher } from "@/features/theme-switcher/ui/theme-switcher";

export const Header = () => {
  return (
    <header>
      <ThemeSwitcher />
      <div className="bg-white p-10 text-black dark:bg-black dark:text-white">
        Theme Test
      </div>
    </header>
  );
};
