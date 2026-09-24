import "./globals.css";

import { Home } from "lucide-react";
import Link from "next/link";

import { NotFoundIcon } from "@/shared/ui/icons";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <NotFoundIcon className="w-full max-w-4xl" />

      <Link href="/">
        <Home />
      </Link>
    </div>
  );
}
