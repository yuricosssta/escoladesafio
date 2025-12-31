// src/components/PostForm.tsx
"use client";

import { useState, FormEvent, useEffect } from 'react';
import { IPost } from '@/types/IPost';
import MarkdownPreview from './MarkdownPreview';
// import markdownExample from '@/lib/markdownExample'; // Se não estiver usando, pode remover ou descomentar
import { AudioTranscriber } from './AudioTranscriber';
import { summarizeTextAPI } from '@/lib/api/summaryService';
import { Wand2, Save } from 'lucide-react'; // Adicionei ícones para melhorar a UX

interface PostFormProps {
  onSubmit: (post: Omit<IPost, 'id'> | IPost) => void;
  initialData?: IPost | null;
  isLoading: boolean;
}

export default function PostForm({ onSubmit, initialData, isLoading }: PostFormProps) {
  const [post, setPost] = useState({
    title: '',
    image: '',
    description: '',
    content: '',
    published: true,
  });

  const [isLoadingText, setIsLoadingText] = useState<boolean>(false);
  const [organizeError, setOrganizeError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setPost({
        title: initialData.title,
        image: initialData.image || '',
        description: initialData.description || '',
        content: initialData.content,
        published: initialData.published !== undefined ? initialData.published : true,
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setPost(prev => ({ ...prev, [name]: checked }));
    } else {
      setPost(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(initialData ? { ...initialData, ...post } : post);
  };

  const organizaTexto = async (e: React.MouseEvent) => {
    e.preventDefault();

    const textToOrganize = post.content;

    if (!textToOrganize || !textToOrganize.trim()) {
      setOrganizeError('Por favor, insira um texto no conteúdo para organizar.');
      return;
    }

    setIsLoadingText(true);
    setOrganizeError(null);

    try {
      console.log('Carregando texto...');
      const result = await summarizeTextAPI(textToOrganize);
      setPost(prev => ({ ...prev, content: result }));
    } catch (err: any) {
      setOrganizeError("Erro ao organizar: " + err.message);
    } finally {
      setIsLoadingText(false);
    }
  };

  // Classe padrão para inputs no estilo Shadcn
  const inputClass = "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-foreground transition-all";

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-card p-6 rounded-xl border border-border shadow-sm">
      
      {/* Campo Título */}
      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
            Título
        </label>
        <input
          type="text"
          name="title"
          id="title"
          value={post.title}
          onChange={handleChange}
          className={inputClass}
          placeholder="Digite o título do post..."
          required
        />
      </div>

      {/* Campo Imagem */}
      <div className="space-y-2">
        <label htmlFor="image" className="text-sm font-medium leading-none text-foreground">
            URL da Imagem
        </label>
        <input
          type="url"
          name="image"
          id="image"
          value={post.image}
          onChange={handleChange}
          placeholder="https://exemplo.com/imagem.png"
          className={inputClass}
        />
      </div>

      {/* Campo Conteúdo */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
            <label htmlFor="content" className="text-sm font-medium leading-none text-foreground">
                Conteúdo
            </label>
            <div className="text-xs text-muted-foreground">
                Suporta Markdown
            </div>
        </div>
        
        {/* Transcritor de Áudio */}
        <div className="p-4 border border-dashed border-border rounded-lg bg-muted/30">
            <AudioTranscriber />
        </div>

        <textarea
          name="content"
          id="content"
          rows={12}
          value={post.content}
          onChange={handleChange}
          className={`${inputClass} min-h-[200px] h-auto font-mono`}
          placeholder="# Comece a escrever aqui..."
          required
        />

        {/* Botão Organizar com IA */}
        <div className="flex flex-col gap-2">
          <button
            type="button"
            id="organize-button"
            disabled={isLoadingText}
            onClick={organizaTexto}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 px-4 py-2 w-full sm:w-auto self-start gap-2"
          >
            <Wand2 size={16} />
            {isLoadingText ? 'Organizando...' : 'Organizar conteúdo com IA'}
          </button>
          
          {organizeError && (
              <div className="p-3 text-sm text-destructive-foreground bg-destructive/10 border border-destructive/20 rounded-md">
                  {organizeError}
              </div>
          )}
        </div>
      </div>

      <div className="border-t border-border my-6"></div>

      {/* Dicas e Preview */}
      <div className="space-y-4">
          <div className="flex justify-between items-center">
             <p className="text-sm font-medium text-foreground">Prévia do conteúdo:</p>
             <a href="https://www.markdownguide.org/cheat-sheet/" target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline">
                Dicas de Markdown
             </a>
          </div>
          
          {/* Caixa de Preview com a classe typography */}
          <div className="rounded-md border border-border bg-background p-6 min-h-[150px]">
              <div className="typography">
                 <MarkdownPreview markdown={post.content || "*A prévia aparecerá aqui...*"} />
              </div>
          </div>
      </div>

      {/* Checkbox Publicado */}
      <div className="flex items-center space-x-2">
        <input
          id="published"
          name="published"
          type="checkbox"
          checked={post.published}
          onChange={handleChange}
          className="h-4 w-4 rounded border-border text-primary focus:ring-ring"
        />
        <label htmlFor="published" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground cursor-pointer">
          Publicar imediatamente
        </label>
      </div>

      {/* Botão Salvar */}
      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 gap-2 shadow-sm"
        >
          <Save size={18} />
          {isLoading ? 'Salvando...' : 'Salvar Publicação'}
        </button>
      </div>
    </form>
  );
}


// //src/components/PostForm.tsx
// "use client";

// import { useState, FormEvent, useEffect } from 'react';
// import { IPost } from '@/types/IPost';
// import MarkdownPreview from './MarkdownPreview';
// import markdownExample from '@/lib/markdownExample';
// import { AudioTranscriber } from './AudioTranscriber';
// import { summarizeTextAPI } from '@/lib/api/summaryService';

// interface PostFormProps {
//   onSubmit: (post: Omit<IPost, 'id'> | IPost) => void;
//   initialData?: IPost | null;
//   isLoading: boolean;
// }

// export default function PostForm({ onSubmit, initialData, isLoading }: PostFormProps) {
//   const [post, setPost] = useState({
//     title: '',
//     image: '',
//     description: '',
//     content: '',
//     published: true,
//   });

//   const [isLoadingText, setIsLoadingText] = useState<boolean>(false);
//   const [organizeError, setOrganizeError] = useState<string | null>(null);

//   useEffect(() => {
//     if (initialData) {
//       setPost({
//         title: initialData.title,
//         image: initialData.image || '',
//         description: initialData.description || '',
//         content: initialData.content,
//         published: initialData.published !== undefined ? initialData.published : true,
//       });
//     }
//   }, [initialData]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value, type } = e.target;

//     // Se for um checkbox, usamos a propriedade 'checked', senão, 'value'
//     if (type === 'checkbox') {
//       // É preciso garantir ao TypeScript que este input tem a propriedade 'checked'
//       const { checked } = e.target as HTMLInputElement;
//       setPost(prev => ({ ...prev, [name]: checked }));
//     } else {
//       setPost(prev => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSubmit = (e: FormEvent) => {
//     e.preventDefault();
//     onSubmit(initialData ? { ...initialData, ...post } : post);
//   };

//   const organizaTexto = async (e: React.MouseEvent) => {
//     e.preventDefault();

//     const textToOrganize = post.content;

//     if (!textToOrganize || !textToOrganize.trim()) {
//       setOrganizeError('Por favor, insira um texto no conteúdo para organizar.');
//       return;
//     }

//     setIsLoadingText(true);
//     setOrganizeError(null);

//     try {
//       console.log('Carregando texto...');
//       const result = await summarizeTextAPI(textToOrganize);
//       setPost(prev => ({ ...prev, content: result }));
//     } catch (err: any) {
//       setOrganizeError("Erro ao organizar: " + err.message);
//     } finally {
//       setIsLoadingText(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6" >
//       <div>
//         <label htmlFor="title" className="block text-sm font-medium text-white-700">Título</label>
//         <input
//           type="text"
//           name="title"
//           id="title"
//           value={post.title}
//           onChange={handleChange}
//           className="bg-white mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
//           required
//         />
//       </div>

//       <div>
//         <label htmlFor="image" className="block text-sm font-medium text-white-700">URL da Imagem</label>
//         <input
//           type="url"
//           name="image"
//           id="image"
//           value={post.image}
//           onChange={handleChange}
//           placeholder="https://exemplo.com/imagem.png"
//           className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
//         />
//       </div>

//       {/* <div>
//         <label htmlFor="description" className="block text-sm font-medium text-white-700">Descrição Curta</label>
//         <input
//           type="text"
//           name="description"
//           id="description"
//           value={post.description}
//           onChange={handleChange}
//           className="bg-white mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
//           required
//         />
//       </div> */}
//       <div>
//         <label htmlFor="content" className="block text-sm font-medium text-white-700">Conteúdo</label>
//         <AudioTranscriber />
//         <textarea
//           name="content"
//           id="content"
//           rows={10}
//           value={post.content}
//           onChange={handleChange}
//           className="bg-white mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
//           required
//           defaultValue={markdownExample()}
//         />
//         <div className="mt-2">
//           <button
//             type="button"
//             id="organize-button"
//             disabled={isLoadingText}
//             onClick={organizaTexto}
//             className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed"
//           >
//             {isLoadingText ? 'Organizando...' : 'Organizar conteúdo com IA'}
//           </button>
//           {organizeError && <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">{organizeError}</div>}
//         </div>
//       </div>
//       <p className="text-sm text-gray-500">
//         Dica: Você pode usar <a href="https://www.markdownguide.org/cheat-sheet/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Markdown</a> para formatar o conteúdo.
//       </p>
//       <p className="block text-sm font-medium text-white-700"> Prévia do conteúdo a ser publicado: </p>
//       <MarkdownPreview markdown={post.content} />

//       <div className="flex items-center">
//         <input
//           id="published"
//           name="published"
//           type="checkbox"
//           checked={post.published}
//           onChange={handleChange}
//           className="h-4 w-4 text-indigo-600 border-white-300 rounded focus:ring-white-500"
//         />
//         <label htmlFor="published" className="ml-2 block text-sm text-white-900">
//           Publicado
//         </label>
//       </div>

//       <div>
//         <button
//           type="submit"
//           disabled={isLoading}
//           className="w-full flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium text-white bg-neutral-950 hover:bg-neutral-700 disabled:bg-neutral-300"
//         >
//           {isLoading ? 'Salvando...' : 'Salvar Publicação'}
//         </button>
//       </div>
//     </form>
//   );
// }