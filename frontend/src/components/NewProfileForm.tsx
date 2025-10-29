// src/components/NewProfileForm.tsx

import React, { useState } from "react";
import axios from "axios";
// Certifique-se de que esses tipos existam e estejam corretos:
import type { NewUserProfileForm, UserProfile } from "../interfaces/UserProfile"; 
import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";

const API_URL = "http://localhost:3000/profiles";

interface NewProfileFormProps {
  onSuccess: (newProfile: UserProfile) => void;
  onCancel: () => void;
  // Note: Não é necessário passar API_URL se for uma constante
}

export const NewProfileForm: React.FC<NewProfileFormProps> = ({ onSuccess, onCancel }) => {
  const [formData, setFormData] = useState<NewUserProfileForm>({
    username: "",
    email: "",
    password_hash: "",
    permissions: 1, // Assumindo que 'permissions' é um número (1 ou 2)
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // Estado para o erro

  // 1. FUNÇÃO DE TRATAMENTO DE MUDANÇA (COMPLETA)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Converte o valor para número se o campo for 'permissions'
    const finalValue = name === 'permissions' ? Number(value) : value;

    setFormData((prev) => ({
      ...prev,
      [name]: finalValue,
    }));
  };

  // 2. FUNÇÃO DE SUBMISSÃO (COMPLETA)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Payload de dados (envio) - Em um app real, aqui você usaria a senha bruta.
    const payload = { ...formData }; 

    try {
      // 1. Faz a requisição POST para a rota do backend (Criação de Recurso)
      const response = await axios.post<UserProfile>(API_URL, payload);

      // 2. Chama a função de sucesso no componente pai com os dados da API
      onSuccess(response.data);
      
      // 3. Reseta o formulário e sai
      setFormData({ // Reseta para o estado inicial
        username: "",
        email: "",
        password_hash: "",
        permissions: 1, 
      });
      onCancel(); // Volta para a tela de lista
      
    } catch (err) {
      console.error("Erro ao cadastrar perfil:", err);
      setError("Falha no cadastro. Verifique os dados ou a conexão com o servidor.");
    } finally {
      setLoading(false);
    }
  };
  
  // A função fetchProfiles NÃO deve estar aqui. Ela é uma função de leitura
  // e pertence ao componente pai que exibe a lista (ProfileList).

  return (
    <Box
      component="div"
      sx={{
        padding: 3,
        border: "1px solid royalblue",
        borderRadius: "8px",
        maxWidth: 500,
        margin: "0 auto",
      }}
    >
      <Typography variant="h4" color="primary" gutterBottom textAlign="left">
        New User Registration
      </Typography>
      
      {/* Exibe o erro se existir */}
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <form onSubmit={handleSubmit}>
        <TextField
          required
          fullWidth
          margin="normal"
          name="username"
          label="Username"
          type="text"
          variant="standard"
          value={formData.username}
          onChange={handleChange}
        />
        <TextField
          required
          fullWidth
          margin="normal"
          name="email"
          label="Email"
          type="email"
          variant="standard"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          required
          fullWidth
          margin="normal"
          name="password_hash"
          label="Password"
          type="password"
          variant="standard"
          value={formData.password_hash}
          onChange={handleChange}
        />

        {/* Usamos TextField com prop 'select' para o dropdown */}
        <TextField
          select
          required
          fullWidth
          margin="normal"
          name="permissions"
          label="Permission level"
          variant="standard"
          value={formData.permissions}
          onChange={handleChange}
          sx={{
            textAlign: "left"
          }}
        >
          {/* Note que os 'value' devem ser do tipo correto (number no seu caso) */}
          <MenuItem value={1}>(1) User</MenuItem>
          <MenuItem value={2}>(2) Administrator</MenuItem>
        </TextField>

        <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
          <Button
            type="submit"
            variant="contained"
            color="success"
            disabled={loading}
            startIcon={
              loading ? <CircularProgress size={20} color="inherit" /> : null
            }
          >
            {loading ? "Registring..." : "Register"}
          </Button>
          <Button
            type="button"
            variant="outlined"
            color="error"
            onClick={onCancel} // Chama a função de cancelamento da prop
            disabled={loading}
          >
            Cancel
          </Button>
        </Box>
      </form>
    </Box>
  );
};