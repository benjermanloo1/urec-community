export interface UserRead {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  signup_completed: boolean;
  created_at: string;
  updated_at?: string | null;
  profile_picture_url?: string | null;
}
