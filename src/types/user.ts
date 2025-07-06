export interface UserProfile {
  id: string;
  displayName: string;
  email: string;
  bio?: string;
  location?: string;
  website?: string;
  socialLinks?: {
    twitter?: string;
    github?: string;
    linkedin?: string;
    instagram?: string;
  };
  avatarURL?: string;
  createdAt: Date;
  updatedAt?: Date;
  karma?: number;
  postCount?: number;
  commentCount?: number;
  isVerified?: boolean;
  preferences?: {
    emailNotifications: boolean;
    pushNotifications: boolean;
    darkMode: boolean;
  };
} 