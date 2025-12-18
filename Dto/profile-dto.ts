export interface ProfileResponse {
  success: boolean;
  message: string;
  data: ProfileData;
}

export interface ProfileData {
  is_profile_public: boolean;
  is_founding: boolean;
  is_ambassador: boolean;
  _id: string;
  is_verified: boolean;
  user_number: number;
  avatar: string | null;
  username: string;
  me: string[];
  lives_in: string;
  about_name: string;
  bio: string;
  education: string;
  name: string;
  total_moments: number;
  total_friends: number;
  total_dopins: number;
}
