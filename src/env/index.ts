import "dotenv/config";
import { z } from 'zod'

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    PORT: z.coerce.number().default(3000),
    DATABASE_USER: z.string(),
    DATABASE_HOST: z.string(),
    DATABASE_NAME: z.string(),
    DATABASE_PASSWORD: z.string(),
    DATABASE_PORT: z.coerce.number().default(5432),
})

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
    console.error("Variáveis de ambiente inválidas", _env.error.format());

    throw new Error("Variáveis de ambiente inválidas");
}

export const env = _env.data;