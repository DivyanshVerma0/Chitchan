import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  HStack,
  Text,
  useToast,
  Avatar,
  IconButton,
  Switch,
  FormHelperText,
} from '@chakra-ui/react';
import { useUserProfile } from '../hooks/useUserProfile';
import { UserProfile } from '../types/user';
import { FaCamera } from 'react-icons/fa';

export const ProfileSettings = () => {
  const { getUserProfile, updateProfile, uploadAvatar, loading, error } = useUserProfile();
  const [profile, setProfile] = useState<Partial<UserProfile>>({});
  const [isEditing, setIsEditing] = useState(false);
  const toast = useToast();
  const [formErrors, setFormErrors] = useState<{ displayName?: string; website?: string }>({});

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const userProfile = await getUserProfile();
    if (userProfile) {
      setProfile(userProfile);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSocialLinkChange = (platform: string, value: string) => {
    setProfile(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value
      }
    }));
  };

  const handlePreferenceChange = (preference: string, value: boolean) => {
    setProfile(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [preference]: value
      }
    }));
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const avatarURL = await uploadAvatar(file);
    if (avatarURL) {
      setProfile(prev => ({
        ...prev,
        avatarURL
      }));
    }
  };

  const validateForm = () => {
    const errors: { displayName?: string; website?: string } = {};
    if (!profile.displayName || profile.displayName.trim() === "") {
      errors.displayName = "Display Name is required.";
    }
    if (profile.website && profile.website.trim() !== "") {
      try {
        // Throws if not a valid URL
        new URL(profile.website);
      } catch {
        errors.website = "Website must be a valid URL (include http:// or https://).";
      }
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    const success = await updateProfile(profile);
    
    if (success) {
      toast({
        title: 'Profile updated',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setIsEditing(false);
    } else {
      toast({
        title: 'Error updating profile',
        description: error,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="600px" mx="auto" p={4}>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <Box textAlign="center">
            <Box position="relative" display="inline-block">
              <Avatar
                size="2xl"
                src={profile.avatarURL}
                name={profile.displayName}
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                style={{ display: 'none' }}
                id="avatar-upload"
              />
              <label htmlFor="avatar-upload">
                <IconButton
                  as="span"
                  aria-label="Upload avatar"
                  icon={<FaCamera />}
                  position="absolute"
                  bottom="0"
                  right="0"
                  colorScheme="blue"
                  size="sm"
                  cursor="pointer"
                />
              </label>
            </Box>
          </Box>

          <FormControl isInvalid={!!formErrors.displayName}>
            <FormLabel>Display Name</FormLabel>
            <Input
              name="displayName"
              value={profile.displayName || ''}
              onChange={handleInputChange}
              isDisabled={!isEditing}
            />
            {formErrors.displayName && (
              <Text color="red.500" fontSize="sm">{formErrors.displayName}</Text>
            )}
          </FormControl>

          <FormControl>
            <FormLabel>Bio</FormLabel>
            <Textarea
              name="bio"
              value={profile.bio || ''}
              onChange={handleInputChange}
              isDisabled={!isEditing}
              placeholder="Tell us about yourself"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Location</FormLabel>
            <Input
              name="location"
              value={profile.location || ''}
              onChange={handleInputChange}
              isDisabled={!isEditing}
            />
          </FormControl>

          <FormControl isInvalid={!!formErrors.website}>
            <FormLabel>Website</FormLabel>
            <Input
              name="website"
              value={profile.website || ''}
              onChange={handleInputChange}
              isDisabled={!isEditing}
            />
            {formErrors.website && (
              <Text color="red.500" fontSize="sm">{formErrors.website}</Text>
            )}
          </FormControl>

          <Text fontWeight="bold" mt={4}>Social Links</Text>
          <VStack spacing={2}>
            <FormControl>
              <FormLabel>Twitter</FormLabel>
              <Input
                value={profile.socialLinks?.twitter || ''}
                onChange={(e) => handleSocialLinkChange('twitter', e.target.value)}
                isDisabled={!isEditing}
              />
            </FormControl>
            <FormControl>
              <FormLabel>GitHub</FormLabel>
              <Input
                value={profile.socialLinks?.github || ''}
                onChange={(e) => handleSocialLinkChange('github', e.target.value)}
                isDisabled={!isEditing}
              />
            </FormControl>
            <FormControl>
              <FormLabel>LinkedIn</FormLabel>
              <Input
                value={profile.socialLinks?.linkedin || ''}
                onChange={(e) => handleSocialLinkChange('linkedin', e.target.value)}
                isDisabled={!isEditing}
              />
            </FormControl>
          </VStack>

          <Text fontWeight="bold" mt={4}>Preferences</Text>
          <VStack spacing={2}>
            <FormControl display="flex" alignItems="center">
              <FormLabel mb="0">Email Notifications</FormLabel>
              <Switch
                isChecked={profile.preferences?.emailNotifications}
                onChange={(e) => handlePreferenceChange('emailNotifications', e.target.checked)}
                isDisabled={!isEditing}
              />
            </FormControl>
            <FormControl display="flex" alignItems="center">
              <FormLabel mb="0">Push Notifications</FormLabel>
              <Switch
                isChecked={profile.preferences?.pushNotifications}
                onChange={(e) => handlePreferenceChange('pushNotifications', e.target.checked)}
                isDisabled={!isEditing}
              />
            </FormControl>
            <FormControl display="flex" alignItems="center">
              <FormLabel mb="0">Dark Mode</FormLabel>
              <Switch
                isChecked={profile.preferences?.darkMode}
                onChange={(e) => handlePreferenceChange('darkMode', e.target.checked)}
                isDisabled={!isEditing}
              />
            </FormControl>
          </VStack>

          <HStack spacing={4} mt={4}>
            {isEditing ? (
              <>
                <Button
                  type="submit"
                  colorScheme="blue"
                  isLoading={loading}
                  loadingText="Saving..."
                >
                  Save Changes
                </Button>
                <Button
                  onClick={() => {
                    setIsEditing(false);
                    loadProfile();
                  }}
                  variant="ghost"
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                onClick={() => setIsEditing(true)}
                colorScheme="blue"
              >
                Edit Profile
              </Button>
            )}
          </HStack>
        </VStack>
      </form>
    </Box>
  );
};
