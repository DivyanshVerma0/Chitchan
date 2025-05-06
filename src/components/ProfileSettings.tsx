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
  // Custom hook to get and update user profile data
  const { getUserProfile, updateProfile, uploadAvatar, loading, error } = useUserProfile();

  // State to store the user's profile information
  const [profile, setProfile] = useState<Partial<UserProfile>>({});
  
  // Toggle to enable/disable editing mode
  const [isEditing, setIsEditing] = useState(false);

  // Chakra UI toast for user notifications
  const toast = useToast();

  // Form validation errors
  const [formErrors, setFormErrors] = useState<{ displayName?: string; website?: string }>({});

  // Load profile when component mounts
  useEffect(() => {
    loadProfile();
  }, []);

  // Fetch user profile from backend
  const loadProfile = async () => {
    const userProfile = await getUserProfile();
    if (userProfile) {
      setProfile(userProfile);
    }
  };

  // Handle changes to text inputs (e.g., name, location, website)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle changes to social media links
  const handleSocialLinkChange = (platform: string, value: string) => {
    setProfile(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value
      }
    }));
  };

  // Handle changes to user preferences (toggles)
  const handlePreferenceChange = (preference: string, value: boolean) => {
    setProfile(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [preference]: value
      }
    }));
  };

  // Handle avatar file upload and update profile avatar URL
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

  // Validate form inputs before submission
  const validateForm = () => {
    const errors: { displayName?: string; website?: string } = {};
    if (!profile.displayName || profile.displayName.trim() === "") {
      errors.displayName = "Display Name is required.";
    }
    if (profile.website && profile.website.trim() !== "") {
      try {
        new URL(profile.website); // Throws if invalid
      } catch {
        errors.website = "Website must be a valid URL (include http:// or https://).";
      }
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Submit updated profile to backend
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
          {/* Avatar Upload Section */}
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

          {/* Display Name Field */}
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

          {/* Bio Field */}
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

          {/* Location Field */}
          <FormControl>
            <FormLabel>Location</FormLabel>
            <Input
              name="location"
              value={profile.location || ''}
              onChange={handleInputChange}
              isDisabled={!isEditing}
            />
          </FormControl>

          {/* Website Field */}
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

          {/* Social Links Section */}
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

          {/* Preferences Section */}
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

          {/* Action Buttons */}
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
