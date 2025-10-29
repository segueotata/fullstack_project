// src/components/ProfileList.tsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import type { UserProfile } from "../interfaces/UserProfile"; // Importe a interface criada

const API_URL = "http://localhost:3000/profiles"; // A URL do seu backend NestJS

export const ProfileList: React.FC = () => {
  // Estado para armazenar os dados e o estado de carregamento/erro
  const [editingId, setEditingId] = useState<number | null>(null);
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleStartEdit = (id: number) => {
    setEditingId(id);
  };

  // NOVO: Função para cancelar a edição
  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleDelete = async (profileId: number) => {
    try {
      // 1. Faz a requisição DELETE para a rota do backend
      await axios.delete(`${API_URL}/${profileId}`);

      // 2. ATUALIZAÇÃO DO ESTADO LOCAL:
      // Filtra o array 'profiles', mantendo apenas aqueles cujo ID é diferente do ID removido.
      setProfiles(profiles.filter((p) => p.id !== profileId));

      console.log(`Perfil com ID ${profileId} removido com sucesso.`);
    } catch (err) {
      console.error(`Erro ao remover perfil ${profileId}:`, err);
      // Exibe um erro amigável para o usuário
      setError("Falha ao remover o perfil. Tente novamente.");
    }
  };

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setLoading(true);
        setError(null);

        // 1. Faz a requisição GET
        const response = await axios.get<UserProfile[]>(API_URL);

        // 2. Armazena os dados no estado
        setProfiles(response.data);
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
        setError("Não foi possível carregar os perfis do servidor.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []); // O array vazio garante que o efeito só roda na montagem

  // Lógica de Renderização
  if (loading) {
    return <div>Carregando perfis...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>Erro: {error}</div>;
  }

  if (profiles.length === 0) {
    return <div>Nenhum perfil encontrado.</div>;
  }

  return (
    <div>
      <h2>Lista de Perfis ({profiles.length})</h2>
      <ul>
        {profiles.map((profile) => (
          // Usamos 'id' como chave, garantindo que é único
          <li
            key={profile.id}
            style={{
              border: "1px solid #fff",
              listStyle: "none",
              marginBottom: "1em",
              padding: "1em",
              borderRadius: "10px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <strong>NOME:&nbsp;</strong>
              <p>{profile.username}</p>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <strong>EMAIL:&nbsp;</strong>
              <p>{profile.email}</p>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <strong>PASSWORD HASH:&nbsp;</strong>
              <p>{profile.password_hash}</p>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <strong>CREATED AT:&nbsp;</strong>
              <p>{new Date(profile.created_at).toLocaleDateString()}</p>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <strong>PERMISSION LEVEL:&nbsp;</strong>
              <p>{profile.permissions}</p>
            </div>
            <div style={{ display: "flex", gap: "1em" }}>
              <button onClick={() => handleDelete(profile.id)}>🗑️</button>
              <button onClick={() => handleStartEdit(profile.id)}>✏️</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
