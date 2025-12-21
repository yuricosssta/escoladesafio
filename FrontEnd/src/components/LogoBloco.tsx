"use client";

import { FunctionComponent } from 'react';
import React from 'react';
import Image from 'next/image';
import { Link } from 'lucide-react';

export default function LogoBloco() {

    return (
        <div>
            <a href="/">
                {/* Bloco do Logo */}
                <div className="flex items-center gap-3">
                    {/* Imagem do Logo */}
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border border-stone-200 shadow-sm">
                        <Image
                            src="/logo-cazua.jpg" // Caminho relativo à pasta public
                            alt="Logo Cazuá"
                            fill // Preenche o container pai
                            className="object-cover" // Garante que não distorça
                            priority // Carrega rápido por ser prioridade
                        />
                    </div>

                    {/* Texto do Logo */}
                    <div className="font-bold text-xl tracking-tighter text-stone-900 leading-none">
                        cazuá<span className="text-stone-400 font-normal">.tech</span>
                    </div>
                </div>
            </a>
        </div>
    );
};