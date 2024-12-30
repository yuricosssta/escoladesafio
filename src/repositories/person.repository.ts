import { Person } from "@/entities/personal.entity";

export class PersonRepository {
    async findById(id: number): Promise<Person> {
        return {
            id,
            cpf: '10247598589',
            name: 'João Niguém',
            birth: new Date('1990-01-01'),
            email: 'teste@gmail.com',
            user_id: 1,
        }
    }

    async create(person: Person): Promise<Person> {
        return person
    }

}