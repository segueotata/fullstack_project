// src/components/ProfileItem.tsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import type { UserProfile } from "../interfaces/UserProfile";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Close";

const API_URL = "http://localhost:3000/profiles";

interface ProfileItemProps {
  profile: UserProfile;
  // Funções de callback para atualizar/remover no estado do componente pai
  onUpdate: (updatedProfile: UserProfile) => void;
  onDelete: (profileId: number) => void;
}

export const ProfileItem: React.FC<ProfileItemProps> = ({
  profile,
  onUpdate,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [draftProfile, setDraftProfile] = useState(profile);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 1. Sincroniza o rascunho (draft) ao iniciar a edição ou se o perfil mudar externamente
  useEffect(() => {
    setDraftProfile(profile);
  }, [profile]);

  const handleStartEdit = () => setIsEditing(true);

  const handleCancelEdit = () => {
    setIsEditing(false);
    setDraftProfile(profile); // Descarta as alterações, voltando ao original
    setError(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDraftProfile((prev) => ({
      ...prev!,
      [name]: value,
    }));
  };

  const handlePatchData = async () => {
    setLoading(true);
    setError(null);

    try {
      // 1. Faz a requisição PATCH para a rota do backend
      const response = await axios.patch(
        `${API_URL}/${draftProfile.id}`,
        draftProfile
      );

      // 2. Atualiza o estado local do Profiles (no componente pai)
      onUpdate(response.data);

      // 3. Cancela o modo de edição
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to update profile:", err);
      setError("Failed to update profile. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = async () => {
    if (
      window.confirm(
        `Sure you want to remove '${profile.username}'?`
      )
    ) {
      setLoading(true);
      try {
        await axios.delete(`${API_URL}/${profile.id}`);
        onDelete(profile.id); // Notifica o pai para remover da lista
      } catch (err) {
        console.error(`Erro ao remover perfil ${profile.id}:`, err);
        setError("Falha ao remover o perfil. Tente novamente.");
      } finally {
        setLoading(false);
      }
    }
  };

  // Funções auxiliares para renderização condicional (MUI)
  const renderField = (
    label: string,
    name: keyof UserProfile,
    type: string = "text"
  ) => (
    <Box display="flex" alignItems="center" mb={1}>
      <Typography
        variant="subtitle1"
        color="primary"
        component="strong"
      >
        {label}:
      </Typography>
      
      {isEditing ? (
        <TextField
          size="small"
          name={name as string}
          type={type}
          value={draftProfile[name]}
          onChange={handleChange}
          fullWidth
          variant="standard"
          disabled={loading}
        />
      ) : (
        <Typography variant="body1" color="text.secondary">
          {String(profile[name])}
        </Typography>
      )}
    </Box>
  );

  return (
    <Box
      component="li"
      sx={{
        border: `1px solid ${isEditing ? "orange" : "royalblue"}`,
        listStyle: "none",
        marginBottom: "1em",
        padding: "1em",
        borderRadius: "10px",
        opacity: loading ? 0.6 : 1,
        pointerEvents: loading ? "none" : "auto",
      }}
    >
      {error && (
        <Typography color="error" sx={{ mb: 1 }}>
          {error}
        </Typography>
      )}

      {/* Campos de Dados */}
      {renderField("ID", "id", "number")}
      {renderField("Name", "username")}
      {renderField("Email", "email", "email")}
      {renderField("Password Hash", "password_hash")}
      {renderField("Permission", "permissions")}

      <Box display="flex" alignItems="center" mb={1}>
        <Typography
          variant="subtitle1"
          color="primary"
          component="strong"
        >
          Created at:
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {new Date(profile.created_at).toLocaleDateString()}
        </Typography>
      </Box>

      {/* Botões de Ação */}
      <Box display="flex" gap={1} mt={2}>
        {loading && <CircularProgress size={24} />}

        {!isEditing ? (
          <>
            <Button
              onClick={handleDeleteClick}
              variant="outlined"
              color="error"
              size="small"
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
            <Button
              onClick={handleStartEdit}
              variant="outlined"
              color="primary"
              size="small"
              startIcon={<EditIcon />}
            >
              Edit
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={handlePatchData}
              variant="contained"
              color="success"
              size="small"
              startIcon={<CheckIcon />}
              disabled={loading}
            >
              Save
            </Button>
            <Button
              onClick={handleCancelEdit}
              variant="outlined"
              color="error"
              size="small"
              startIcon={<CancelIcon />}
              disabled={loading}
            >
              Cancel
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};
