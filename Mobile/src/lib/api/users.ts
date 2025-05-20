// lib/api/users.ts
import axios from "axios";
import Constants from "expo-constants";
import { IUser } from "../types/IUser";

const { API_BASE_URL } = Constants.expoConfig?.extra || {};

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post('${API_BASE_URL}/auth/login', {
    email,
    password,
  });

  return response.data; // Esperado: { token, user }
};

export const getUsers = async () => {
    const dado = await axios.get(`${API_BASE_URL}/users`);
    if (dado.status !== 200) {
        throw new Error("Erro ao buscar os usuários");
    }
    return dado.data;
};

const transformUser = (data: any): IUser => ({
    ...data,
    id: data._id || data.id,
    name: data.name || '',
    email: data.email || '',
    password: data.password || '',
    rule: data.rule || '',
    created_at: new Date(data.created_at),
    modified_at: data.modified_at ? new Date(data.modified_at) : undefined,
});

export const getUserById = async (id: string): Promise<IUser> => {
    const response = await axios.get(`${API_BASE_URL}/users/${id}`);
    return transformUser(response.data);
};

// Criação de novo usuário
// O usuário deve ser enviado com os campos: name, email, password e rule
// O campo rule deve ser um dos seguintes: 'admin', 'teacher' ou 'student'
export const createUser = async (user: Partial<IUser>): Promise<IUser> => {
    const response = await axios.post(`${API_BASE_URL}/users`, user);

    if (response.status !== 201 && response.status !== 200) {
        throw new Error('Erro ao criar o usuário');
    }

    const userData = {
        name: user.name,
        email: user.email,
        password: user.password,
        rule: user.rule,
    }
    console.log('Enviando usuário para cadastro (create).');

    return response.data;
};

// Atualização de usuário existente
export const updateUser = async (id: string, user: Partial<IUser>): Promise<IUser> => {
    const response = await axios.put(`${API_BASE_URL}/users/${id}`, user);

    if (response.status !== 200) {
        throw new Error('Erro ao atualizar o usuário');
    }

    return response.data;
};
