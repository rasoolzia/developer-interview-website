import "./globals.css";

import { Home } from "lucide-react";
import Link from "next/link";

import { ROUTES } from "@/shared/config";
import { NotFoundIcon } from "@/shared/ui/icons";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center select-none">
      <NotFoundIcon className="w-full max-w-4xl" />

      <Link href={ROUTES.home}>
        <Home />
      </Link>
    </div>
  );
}
