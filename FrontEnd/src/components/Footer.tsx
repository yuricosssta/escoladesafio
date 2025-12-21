"use client";
// import { config } from "@/config";
import { Rss } from "lucide-react";
import Link from "next/link";
import { FunctionComponent } from "react";
import { DarkModeToggle } from "./DarkModeToggle";
import { Button } from "./ui/button";

export const Footer: FunctionComponent = () => {
  return (
    <section>
      {/* --- FOOTER --- */}
      <footer className="py-10 text-center border-t border-stone-200 bg-stone-50">
        <p className="text-stone-500 text-sm font-medium">&copy; {new Date().getFullYear()} Grupo Cazuá.</p>
        {/* <p className="text-stone-400 text-xs mt-2">Barbacena, MG</p> */}
      </footer>
    </section>
  );
};
