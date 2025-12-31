// FrontEnd/src/components/color-mode-switcher.tsx
"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";

export function ColorModeSwitcher() {
  // 
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" disabled>
        <span className="sr-only">Carregando tema...</span>
      </Button>
    );
  }

  const toggleTheme = () => {
    // Se estiver escuro (seja por sistema ou manual), muda para claro. E vice-versa.
    if (resolvedTheme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };



  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        title="Alternar tema"
      // className="dark:hidden"
      >

        {/* Lógica dos ícones:
          - Se for Dark: Mostra a Lua (para indicar que está noite) ou o Sol (para indicar que o clique trará o dia)?
          
          Padrão UX comum: Mostre o ícone do estado ATUAL ou o ícone do estado FUTURO.
          Abaixo, vou usar a animação onde ambos existem, mas um está invisível.
      */}

        {resolvedTheme === "dark" ? (
          // Se está escuro, mostra a Lua (ou o Sol se preferir a lógica de "clique para virar sol")
          // Aqui mostro a Lua estática indicando "Modo Escuro Ativo"
          <Moon className="h-[1.2rem] w-[1.2rem] transition-all" />
        ) : (
          // Se está claro, mostra o Sol
          <Sun className="h-[1.2rem] w-[1.2rem] transition-all" />
        )}

        <span className="sr-only">Alternar tema</span>

        {/* <Moon /> */}
      </Button>

    </>
  );
}
