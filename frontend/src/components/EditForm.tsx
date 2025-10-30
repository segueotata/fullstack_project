// src/components/EditForm.tsx

import React, { useState } from "react";
import type { UserProfile } from "../interfaces/UserProfile";
import { TextField } from "@mui/material";

interface EditFormProps {
  profile: UserProfile;
  onSave: (profile: UserProfile) => void;
  onCancel: () => void;
}

export const EditForm: React.FC<EditFormProps> = ({
  profile,
  onSave,
  onCancel,
}) => {
  // Estado para gerenciar os dados sendo editados no formulário
  const [formData, setFormData] = useState<UserProfile>(profile);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Chama a função de salvamento no componente pai (ProfileList)
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="New Username"
        required
      />
      <TextField
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Novo E-mail"
        required
      />

      {/* Você pode adicionar um campo para a permissão aqui */}
      {/* <input name="class" type="number" ... /> */}

      <button type="submit">Salvar</button>
      <button type="button" onClick={onCancel}>
        Cancelar
      </button>
    </form>
  );
};
