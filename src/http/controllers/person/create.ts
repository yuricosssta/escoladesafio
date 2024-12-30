import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { PersonRepository } from '@/repositories/person.repository'
import { CreatePersonUseCase } from '@/use-cases/create-person'

export async function create(request: FastifyRequest, replay: FastifyReply) {
    const registerBodySchema = z.object({
        cpf: z.string(),
        name: z.string(),
        birth: z.coerce.date(),
        email: z.string().email(),
    })

    const { cpf, name, birth, email } = registerBodySchema.parse(request.body)

    try {
        const personRepository = new PersonRepository()
        const createPersonUseCase = new CreatePersonUseCase(personRepository)

        await createPersonUseCase.handler({ cpf, name, birth, email })

        return replay.status(201).send()

    } catch (error) {
        console.error(error)

        throw new Error('Erro interno do servidor')
    }
}