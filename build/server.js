"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/env/index.ts
var import_config = require("dotenv/config");
var import_zod = require("zod");
var envSchema = import_zod.z.object({
  NODE_ENV: import_zod.z.enum(["development", "production", "test"]).default("development"),
  PORT: import_zod.z.number().default(3e3)
});
var _env = envSchema.safeParse(process.env);
if (!_env.success) {
  console.error("Vari\xE1veis de ambiente inv\xE1lidas", _env.error.format());
  throw new Error("Vari\xE1veis de ambiente inv\xE1lidas");
}
var env = _env.data;

// src/app.ts
var import_fastify = __toESM(require("fastify"));

// src/http/controllers/person/create.ts
var import_zod2 = require("zod");

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
  const registerBodySchema = import_zod2.z.object({
    cpf: import_zod2.z.string(),
    name: import_zod2.z.string(),
    birth: import_zod2.z.date(),
    email: import_zod2.z.string().email()
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

// src/http/controllers/person/routes.ts
async function personRoutes(app2) {
  app2.post("/person", create);
}

// src/app.ts
var app = (0, import_fastify.default)();
app.register(personRoutes);

// src/server.ts
app.listen({
  host: "0.0.0.0",
  port: env.PORT
}).then(() => {
  console.log("Servidor est\xE1 ativado em: (local aqui)");
});
