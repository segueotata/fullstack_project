export interface UserProfile {
  id: number;
  permissions: number;
  username: string;
  email: string;
  password_hash: string;
  created_at: string;
}

// Crie um tipo para o formulário (exclui id e created_at)
export type NewUserProfileForm = Omit<UserProfile, 'id' | 'created_at'>;