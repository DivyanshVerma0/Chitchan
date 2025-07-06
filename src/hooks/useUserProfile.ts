import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, firestore, storage } from '../firebase/clientApp';
import { UserProfile } from '../types/user';

export const useUserProfile = () => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getUserProfile = async (): Promise<UserProfile | null> => {
    if (!user) return null;
    
    try {
      setLoading(true);
      const userDoc = await getDoc(doc(firestore, 'users', user.uid));
      
      if (!userDoc.exists()) {
        throw new Error('User profile not found');
      }

      return {
        id: userDoc.id,
        ...userDoc.data()
      } as UserProfile;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching user profile');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (profileData: Partial<UserProfile>) => {
    if (!user) {
      setError('User must be authenticated to update profile');
      return false;
    }

    try {
      setLoading(true);
      const functions = getFunctions();
      const updateUserProfile = httpsCallable(functions, 'updateUserProfile');
      
      await updateUserProfile(profileData);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error updating profile');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const uploadAvatar = async (file: File): Promise<string | null> => {
    if (!user) {
      setError('User must be authenticated to upload avatar');
      return null;
    }

    try {
      setLoading(true);
      
      // Create a reference to the avatar file
      const avatarRef = ref(storage, `avatars/${user.uid}/${file.name}`);
      
      // Upload the file
      await uploadBytes(avatarRef, file);
      
      // Get the download URL
      const downloadURL = await getDownloadURL(avatarRef);
      
      // Update the user's profile with the new avatar URL
      await updateProfile({ avatarURL: downloadURL });
      
      return downloadURL;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error uploading avatar');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    getUserProfile,
    updateProfile,
    uploadAvatar,
    loading,
    error
  };
}; 