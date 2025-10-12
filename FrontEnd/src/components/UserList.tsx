"use client";

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/redux/store';
import { carregaUsuarios, fetchUserProfile } from '@/lib/redux/slices/userSlice';
import { IUser, UserRule } from '@/types/IUser';

type Props = {
    filterRule?: UserRule;
};

// export const UserList = ({ filterRule }: Props) => {
export const UserList = () => {
    
    const dispatch = useDispatch<AppDispatch>();
    const { users, profile, status, error } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        dispatch(carregaUsuarios());
    }, [dispatch]);

    if (status === 'loading') {
        return <div>Carregando lista de usuários...</div>;
    }

    if (status === 'failed') {
        return <div className="text-red-500">Erro ao carregar usuários cadastrados: {error}</div>;
    }

    if (!users) {
        return <div>Nenhum usuário encontrado.</div>;
    }

    return (
        <div>

            {/* <input
                type="text"
                name="searchText"
                id="searchText"
                placeholder="Procurar usuário"
                value={searchText}
                onChangeText={setSearchText}
                className="bg-white mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
                
            /> */}
            

            <ul>
                {users.map((user) => (
                    <li key={user.id} className="mb-4 p-4 border rounded shadow">
                        <div className="font-bold">{user.name}</div>
                        <div>{user.email}</div>
                        {/* <div>{getUserRuleLabel(item.rule)}</div> */}
                        {/* Add navigation logic if needed, e.g., with react-router */}
                    </li>
                ))}
            </ul>
        </div>


    );
};