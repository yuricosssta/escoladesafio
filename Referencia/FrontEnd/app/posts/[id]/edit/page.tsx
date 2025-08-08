'use client';

import { useState, useEffect } from 'react';
import { PostsRepository } from '@/repositories/PostsRepository';
import { useRouter } from 'next/navigation';

export default function EditPost({ params }: { params: { id: string } }) {
  const [post, setPost] = useState({
    title: '',
    content: '',
    description: '',
    published: false
  });
  const router = useRouter();
  const repo = new PostsRepository();

  useEffect(() => {
    if (params.id !== 'new') {
      repo.getPost(params.id).then(data => setPost(data));
    }
  }, [params.id, repo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (params.id === 'new') {
        await repo.createPost(post);
      } else {
        await repo.updatePost(params.id, post);
      }
      router.push('/posts');
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        {params.id === 'new' ? 'Criar Novo Post' : 'Editar Post'}
      </h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Título</label>
          <input
            type="text"
            value={post.title}
            onChange={(e) => setPost({...post, title: e.target.value})}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="block mb-2">Descrição</label>
          <textarea
            value={post.description}
            onChange={(e) => setPost({...post, description: e.target.value})}
            className="textarea textarea-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="block mb-2">Conteúdo</label>
          <textarea
            value={post.content}
            onChange={(e) => setPost({...post, content: e.target.value})}
            className="textarea textarea-bordered w-full h-64"
            required
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={post.published}
            onChange={(e) => setPost({...post, published: e.target.checked})}
            className="checkbox mr-2"
          />
          <span>Publicado</span>
        </div>

        <button type="submit" className="btn btn-primary">
          Salvar
        </button>
      </form>
    </div>
  );
}