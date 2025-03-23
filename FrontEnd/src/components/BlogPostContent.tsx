"use client";
import { IPost } from "@/lib/types/IPost";
import sanitize, { defaults } from "sanitize-html";
import NotFound, {} from "../../app/not-found"

export const PostContent = ({ content }: { content: string }) => {
  const sanitizedContent = sanitize(content, {
    allowedTags: [
      "b", "br", "i", "em", "strong", "a", "img", "h1", "h2", "h3",
      "code", "pre", "p", "li", "ul", "ol", "blockquote",
      "td", "th", "table", "tr", "tbody", "thead", "tfoot",
      "small", "div", "iframe"
    ],
    allowedAttributes: {
      ...defaults.allowedAttributes,
      "*": ["style"],
      iframe: ["src", "allowfullscreen", "style"],
    },
    allowedIframeHostnames: ["www.youtube.com", "www.youtube-nocookie.com"],
  });

  return (
    <div className="blog-content mx-auto" dangerouslySetInnerHTML={{ __html: sanitizedContent }}></div>
  );
};

export const BlogPostContent = ({ post }: { post: IPost | null }) => {
  if (!post) return <p>Página não encontrada</p>;

  return (
    <div>
      <div className="prose lg:prose-xl dark:prose-invert mx-auto lg:prose-h1:text-4xl mb-10 lg:mt-20 break-words">
        <h1>{post.title}</h1>
        <PostContent content={post.description || ""} />

        <div className="text-sm opacity-40 mt-4">
          {Intl.DateTimeFormat("pt-br").format(
            new Date(post.modified_at || post.created_at || new Date())
          )}
        </div>
      </div>
    </div>
  );
};