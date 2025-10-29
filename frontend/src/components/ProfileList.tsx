// src/components/ProfileList.tsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import type { UserProfile } from "../interfaces/UserProfile";
import {
  Box,
  CircularProgress,
  TextField,
  Typography,
  Button,
} from "@mui/material";
// Importe o novo formulário e o novo item
import { NewProfileForm } from "./NewProfileForm";
import { ProfileItem } from "./ProfileItem";

const API_URL = "http://localhost:3000/profiles";
type ViewState = "list" | "create"; // Para simular a navegação

export const ProfileList: React.FC = () => {
  // 🛑 REMOVEMOS: editingUser e isEditing (agora estão no ProfileItem)
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<ViewState>("list");

  // --- Callbacks de Ação ---

  const handleUpdateProfile = (updatedProfile: UserProfile) => {
    // Atualiza o perfil no estado global (lista) após o PATCH
    setProfiles((prevProfiles) =>
      prevProfiles.map((p) => (p.id === updatedProfile.id ? updatedProfile : p))
    );
  };

  const handleDelete = (profileId: number) => {
    // Remove o perfil do estado global após o DELETE
    setProfiles(profiles.filter((p) => p.id !== profileId));
  };

  const handleRegistrationSuccess = (newProfile: UserProfile) => {
    setProfiles((prevProfiles) => [newProfile, ...prevProfiles]);
    setCurrentView("list");
  };

  // --- Efeito de Busca (Fetch) ---

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get<UserProfile[]>(API_URL);
        setProfiles(response.data);
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
        setError("Não foi possível carregar os perfis do servidor.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfiles();
  }, []);

  // --- Lógica de Renderização Condicional (Navegação) ---

  if (currentView === "create") {
    return (
      <NewProfileForm
        onSuccess={handleRegistrationSuccess}
        onCancel={() => setCurrentView("list")}
      />
    );
  }

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">Erro: {error}</Typography>;
  }

  // --- Renderização da Lista ---

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-around"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h4" color="primary">
          Lista de Perfis ({profiles.length})
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setCurrentView("create")}
        >
          + New User
        </Button>
      </Box>

      <TextField
        variant="outlined"
        size="small"
        label="Filter profiles... (by: ID, Name, Email, Permission and Created at)"
        placeholder="Filter profiles... (by: ID, Name, Email, Permission and Created at)"
        fullWidth
        sx={{ mb: 3 }}
      />

      {profiles.length === 0 ? (
        <Typography variant="h6" color="textSecondary">
          Nenhum perfil encontrado.
        </Typography>
      ) : (
        <Box component="ul">
          {profiles.map((profile) => (
            <ProfileItem
              key={profile.id}
              profile={profile}
              onUpdate={handleUpdateProfile}
              onDelete={handleDelete}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};
