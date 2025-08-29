import { PostList } from "@/components/PostList";

export default function HomePage() {
  return (

    <div className="container mx-auto px-5 mb-10">
          <PostList /> 
        </div>

    // <main className="p-8">

    //   <h1 className="text-4xl font-bold mb-8">Página de Teste do Tailwind</h1>

    //   {/* Bloco de Teste do Prose */}
    //   <article className="prose border-2 p-4">
    //     <h1>Este é um título H1 dentro do prose.</h1>
    //     <p>Este é um parágrafo. Se o plugin de tipografia estiver funcionando, este texto terá um estilo bonito, com margens e tamanho de fonte adequados.</p>
    //     <ul>
    //       <li>Item de lista 1</li>
    //       <li>Item de lista 2</li>
    //     </ul>
    //     <p>Este texto deveria estar bem diferente de um texto normal sem a classe prose.</p>
    //   </article>

    //   <hr className="my-8" />

    //   {/* Bloco de comparação sem o prose */}
    //   <div className="border-2 p-4">
    //     <h1>Este é um título H1 normal (sem prose).</h1>
    //     <p>Este é um parágrafo normal. Compare o estilo dele com o de cima.</p>
    //     <ul>
    //       <li>Item de lista 1</li>
    //       <li>Item de lista 2</li>
    //     </ul>
    //   </div>
    // </main>
  );
}