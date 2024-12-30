"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/http/controllers/person/create.ts
var create_exports = {};
__export(create_exports, {
  create: () => create
});
module.exports = __toCommonJS(create_exports);
var import_zod = require("zod");

// src/repositories/person.repository.ts
var PersonRepository = class {
  async findById(id) {
    return {
      id,
      cpf: "10247598589",
      name: "Jo\xE3o Nigu\xE9m",
      birth: /* @__PURE__ */ new Date("1990-01-01"),
      email: "teste@gmail.com",
      user_id: 1
    };
  }
  async create(person) {
    return person;
  }
};

// src/use-cases/create-person.ts
var CreatePersonUseCase = class {
  constructor(personRepository) {
    this.personRepository = personRepository;
  }
  handler(person) {
    return this.personRepository.create(person);
  }
};

// src/http/controllers/person/create.ts
async function create(request, replay) {
  const registerBodySchema = import_zod.z.object({
    cpf: import_zod.z.string(),
    name: import_zod.z.string(),
    birth: import_zod.z.date(),
    email: import_zod.z.string().email()
  });
  const { cpf, name, birth, email } = registerBodySchema.parse(request.body);
  try {
    const personRepository = new PersonRepository();
    const createPersonUseCase = new CreatePersonUseCase(personRepository);
    await createPersonUseCase.handler({ cpf, name, birth, email });
    return replay.status(201).send();
  } catch (error) {
    console.error(error);
    throw new Error("Erro interno do servidor");
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  create
});
