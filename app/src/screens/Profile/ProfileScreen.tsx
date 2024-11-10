import * as SecureStore from 'expo-secure-store';
import React from 'react';
import { Box, Button, FormInput, Text, useTheme, useToast } from '@/theme';
import { useAuth, useUser } from '@clerk/clerk-expo';
import FullScreenLoader from '@/components/FullScreenLoader';
import { Feather, AntDesign } from '@expo/vector-icons';
import { Alert, Image } from 'react-native';
import { Container } from '@/components/Container';
import { RadioBoxField } from '@/theme';
import { BackButton } from '@/components/BackButton';

export default function ProfileScreen() {
  const { toast } = useToast();
  const { colors, spacing } = useTheme();
  const { user, isLoaded } = useUser();
  const ogUsernameRef = React.useRef(user?.username);
  const { signOut } = useAuth();
  const [isLoading, setIsLoading] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [username, setUsername] = React.useState(user?.username);
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(false);
  const [showCallPreview, setShowCallPreview] = React.useState(true);
  React.useEffect(() => {
    // get saved preference from secure store
    const getPreferences = async () => {
      try {
        const showCallPreview = await SecureStore.getItemAsync('showCallPreview');
        if (showCallPreview === null) {
          await SecureStore.setItemAsync('showCallPreview', 'true');
          setShowCallPreview(true);
          return;
        }
        setShowCallPreview(showCallPreview === 'true');
      } catch (error) {
        console.error('Error getting preferences:', error);
      }
    };
    ogUsernameRef.current = user?.username;
    getPreferences();
  }, []);
  if (!user || !isLoaded) {
    return <FullScreenLoader text="getting user details..." />;
  }

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await signOut();
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (ogUsernameRef.current === username) {
      setEdit(false);
      return;
    }
    setIsLoading(true);
    if (username === undefined || username === null) return;
    try {
      await user?.update({ username });
      setEdit(false);
    } catch (error) {
      console.error(error);
    } finally {
      setEdit(false);
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action is irreversible.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              setIsLoading(true);
              await user?.delete();
            } catch (error) {
              console.error('Error:', error);
            } finally {
              setIsLoading(false);
            }
          },
        },
      ]
    );
  };

  const toggleCallPreview = async (value: boolean) => {
    setShowCallPreview(value);
    try {
      await SecureStore.setItemAsync('showCallPreview', value.toString());
    } catch (error) {
      console.error('Error saving preference:', error);
    }
  };

  const toggleNotifications = async (value: boolean) => {
    setNotificationsEnabled(value);
    toast({ message: `Notifications ${value ? 'Enabled' : 'Disabled'}`, variant: 'success' });
  };

  return (
    <Container>
      <Box flex={1} width={'100%'}>
        <Box
          flexDirection="row"
          width="100%"
          alignItems="center"
          justifyContent="space-between"
          paddingHorizontal="xs_4"
          marginBottom="sm_8">
          <BackButton />
          <Button
            size="icon"
            variant="link"
            disabled={isLoading}
            onPress={() => {
              if (edit) {
                handleSave();
              }
              setEdit(!edit);
            }}>
            {edit ? (
              <Feather name="check" size={24} color={colors.success} />
            ) : (
              <Feather name="edit" size={24} color={colors.text} />
            )}
          </Button>
        </Box>

        <Box
          borderColor="primary"
          borderWidth={2}
          height={120}
          width={120}
          overflow="hidden"
          style={{ borderRadius: 150, marginHorizontal: 'auto' }}>
          {user?.imageUrl ? (
            <Image source={{ uri: user.imageUrl }} style={{ height: '100%', width: '100%' }} />
          ) : (
            <Feather name="user" size={120} color={colors.neutral} />
          )}
        </Box>
        <Box style={{ marginHorizontal: 'auto' }} marginTop="sm_8" width="90%">
          {edit ? (
            <>
              <Box height={10} />
              <FormInput
                label="username"
                showLabel={false}
                placeholder="Username"
                handleChangeText={(label, text) => setUsername(text)}
                value={username ?? ''}
                Icon={() => (
                  <Feather name="user" size={20} color="#6C757D" style={{ marginRight: 8 }} />
                )}
              />
              <Box height={10} />
            </>
          ) : (
            <Text variant="large" textAlign="center">
              {user.username}
            </Text>
          )}
        </Box>

        <Text color="neutral" textAlign="center" marginBottom="m_24">
          {user.emailAddresses[0].emailAddress}
        </Text>

        <Box
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', marginHorizontal: 'auto' }}
          paddingHorizontal="m_16"
          borderRadius="m_8"
          paddingVertical="sm_8"
          width="93%"
          marginTop="m_24">
          {/* Turn on Notifications */}
          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            marginBottom="xs_4"
            width="100%">
            <RadioBoxField
              Icon={() => <Feather name="bell" size={24} color={colors.text} />}
              name="notifications"
              label="Turn on Notifications"
              value={notificationsEnabled}
              onChange={async () => await toggleNotifications(!notificationsEnabled)}
            />
          </Box>

          {/* Show Call Preview */}
          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            marginBottom="xs_4">
            <RadioBoxField
              Icon={() => <AntDesign name="videocamera" size={24} color={colors.text} />}
              name="callPreview"
              label="Show Call Preview"
              disabled={isLoading}
              value={showCallPreview}
              onChange={async () => await toggleCallPreview(!showCallPreview)}
            />
          </Box>

          {/* Logout Button */}
          <Box
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            width={'100%'}
            marginBottom="xs_4">
            <Button
              style={{ padding: 0, margin: 0 }}
              disabled={isLoading}
              variant="link"
              size="none"
              onPress={handleSignOut}
              justifyContent="flex-start"
              width={'100%'}>
              <Feather
                name="log-out"
                size={24}
                color={colors.text}
                style={{ marginRight: spacing.xs_4 }}
              />
              <Text variant="title">Logout</Text>
            </Button>
          </Box>

          {/* Delete Account */}
          <Box flexDirection="row" justifyContent="space-between" alignItems="center">
            <Button
              disabled={isLoading}
              size="none"
              variant="link"
              width={'100%'}
              justifyContent="flex-start"
              onPress={handleDeleteAccount}>
              <Feather
                name="trash-2"
                size={24}
                color={colors.destructive}
                style={{ marginRight: spacing.xs_4 }}
              />
              <Text variant="title" color="destructive">
                Delete Account
              </Text>
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
