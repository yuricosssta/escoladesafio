"use client";

import { FunctionComponent } from "react";

export const Footer: FunctionComponent = () => {
  return (
    <section>
      {/* --- FOOTER --- */}
      {/* CORREÇÕES APLICADAS:
          1. border-stone-200 -> border-border (Borda sutil adaptável)
          2. bg-stone-50      -> bg-background (Ou bg-muted se quiser um cinza leve)
          3. text-stone-500   -> text-muted-foreground (Texto secundário padrão)
      */}
      <footer className="py-10 text-center border-t border-border bg-muted/30 transition-colors duration-300">
        <p className="text-muted-foreground text-sm font-medium">
          &copy; {new Date().getFullYear()} Grupo Cazuá.
        </p>
        {/* <p className="text-muted-foreground text-xs mt-2">Barbacena, MG</p> */}
      </footer>
    </section>
  );
};

// "use client";
// // import { config } from "@/config";
// import { Rss } from "lucide-react";
// import Link from "next/link";
// import { FunctionComponent } from "react";
// import { DarkModeToggle } from "./DarkModeToggle";
// import { Button } from "./ui/button";

// export const Footer: FunctionComponent = () => {
//   return (
//     <section>
//       {/* --- FOOTER --- */}
//       <footer className="py-10 text-center border-t border-stone-200 bg-stone-50">
//         <p className="text-stone-500 text-sm font-medium">&copy; {new Date().getFullYear()} Grupo Cazuá.</p>
//         {/* <p className="text-stone-400 text-xs mt-2">Barbacena, MG</p> */}
//       </footer>
//     </section>
//   );
// };
