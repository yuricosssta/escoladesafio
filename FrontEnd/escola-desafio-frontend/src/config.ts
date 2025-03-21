const buildConfig = () => {
  const blogId = process.env.NEXT_PUBLIC_BLOG_ID;
  if (!blogId) throw new Error("NEXT_PUBLIC_BLOG_ID is missing");

  const name = process.env.NEXT_PUBLIC_BLOG_DISPLAY_NAME || "Travel.";
  const copyright = process.env.NEXT_PUBLIC_BLOG_COPYRIGHT || "Samantha";
  const defaultTitle =
    process.env.NEXT_DEFAULT_METADATA_DEFAULT_TITLE || "Travel with Samantha";
  const defaultDescription = process.env.NEXT_PUBLIC_BLOG_DESCRIPTION || "Blog about travel and lifestyle.";

  // Nova configuração para API
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";

  return {
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
    api: {
      baseUrl: apiBaseUrl, // Adicionando a URL da API
      endpoints: {
        posts: `${apiBaseUrl}/posts`, // Endpoint para posts
        users: `${apiBaseUrl}/post`, // Exemplo de outro endpoint
      },
    },
    blog: {
      name,
      copyright,
      metadata: {
        title: {
          absolute: defaultTitle,
          default: defaultTitle,
          template: `%s - ${defaultTitle}`,
        },
        description: defaultDescription,
      },
    },
    ogImageSecret:
      process.env.OG_IMAGE_SECRET ||
      "secret_used_for_signing_and_verifying_the_og_image_url",
    wisp: {
      blogId,
    },
  };
};

export const config = buildConfig();
