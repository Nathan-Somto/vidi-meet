import React, { useState } from 'react';
import { FlatList, TextInput, Image, Pressable, ActivityIndicator } from 'react-native';
import { Box, Text, Button, useTheme, useToast } from '@/theme';
import { AntDesign, Feather, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '@/navigation/routes';
import { StackScreenProps } from '@react-navigation/stack';
import { useUserListStore } from '@/hooks/useUserListStore';
import { MeetingStackParamList } from '@/navigation/MeetingStack';
import { useUser } from '@clerk/clerk-expo';
import { getName } from '@/utils';

type UserData = {
  id: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  hasImage?: boolean;
  emailAddresses: { emailAddress: string }[];
  imageUrl: string;
}[];

export default function UserListScreen({
  navigation,
  route,
}: StackScreenProps<MeetingStackParamList, Routes.USERLIST>) {
  const { user } = useUser();
  const { toast } = useToast();
  const [userData, setUserData] = useState<UserData | null>(null);
  const userDataCopyRef = React.useRef<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { selectedUsers: initialSelectedUsers, setUsers, addUsers } = useUserListStore();
  const [selectedUsers, setSelectedUsers] = useState<Record<string, string>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [showCheckmarks, setShowCheckmarks] = useState(false);
  const { colors, spacing, size } = useTheme();
  const router = useNavigation();
  React.useEffect(() => {
    async function fetchUsers(userId: string) {
      setLoading(true);
      console.log('userId: ', userId);
      try {
        console.log('url: ', process.env.EXPO_PUBLIC_BACKEND_URL);
        const res = await fetch(process.env.EXPO_PUBLIC_BACKEND_URL);
        if (!res.ok) {
          console.log('The Response: ', res);
          throw new Error('Failed to fetch users');
        }
        const resData = await res.json();
        console.log('the data: ', resData);
        console.log('data ', JSON.stringify(resData.users.data, null, 2));
        const filteredData = (resData.users.data as UserData).filter((user) => user.id != userId);
        console.log('filtered data: ', JSON.stringify(filteredData, null, 2));
        setUserData(filteredData);
        userDataCopyRef.current = filteredData;
      } catch (e) {
        console.error(e);
        toast({ message: 'failed to fetch users', variant: 'error' });
      } finally {
        setLoading(false);
      }
    }
    if (user?.id && userData === null) {
      fetchUsers(user?.id ?? '');
    }
  }, [user?.id]);
  const allUsersSelected = React.useMemo(
    () => userData?.length === Object.keys(selectedUsers).length,
    [selectedUsers]
  );
  React.useEffect(() => {
    if (initialSelectedUsers) {
      // in case the user has already selected some peeps
      const data = {
        ...selectedUsers,
        ...initialSelectedUsers.reduce((acc, { id, name }) => ({ ...acc, [id]: name }), {}),
      };
      setSelectedUsers(data);
    }
  }, [initialSelectedUsers]);
  const toggleUserSelection = (userId: string, userName: string) => {
    setSelectedUsers((prev) =>
      prev[userId]
        ? (() => {
            const updatedSelection = { ...prev };
            delete updatedSelection[userId];
            return updatedSelection;
          })()
        : { ...prev, [userId]: userName }
    );
  };
  const selectAllUsers = () => {
    if (userData === null) return;
    setSelectedUsers(
      allUsersSelected
        ? {}
        : userData.reduce(
            (acc, { id, firstName, lastName, username }) => ({
              ...acc,
              [id]: getName({ firstName, lastName, username }),
            }),
            {}
          )
    );
  };
  const handleAddUsers = () => {
    const selectedUsersArray = Object.entries(selectedUsers).map(([id, name]) => ({ id, name }));
    if (route.params?.add) {
      addUsers(selectedUsersArray);
    } else {
      setUsers(selectedUsersArray);
    }
    if (route.params.from === Routes.NEWMEETING) {
      router.navigate(Routes.AUTHENTICATEDSTACK, {
        screen: Routes.MAINTABS,
        params: { screen: Routes.NEWMEETING },
      });
    } else {
      navigation.navigate(Routes.SCHEDULEMEETING);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query === '') {
      setUserData(userDataCopyRef.current);
      return;
    }
    const filteredUsers =
      userData?.filter((user) => {
        const name =
          (user?.firstName ?? '') + ' ' + (user.lastName ?? '') || (user?.username ?? '');
        return name.toLowerCase().includes(searchQuery.toLowerCase());
      }) ?? null;
    setUserData(filteredUsers);
  };

  const renderUser = ({ item }: { item: UserData[number] }) => {
    const isSelected = selectedUsers[item.id];
    const name = getName({
      firstName: item?.firstName,
      lastName: item?.lastName,
      username: item?.username,
    });
    const email = item.emailAddresses[0].emailAddress;
    const handleLongPress = () => {
      if (!showCheckmarks) {
        setShowCheckmarks(true);
      }
      toggleUserSelection(item.id, name);
    };
    return (
      <Pressable onLongPress={handleLongPress} delayLongPress={600}>
        <Box
          flexDirection="row"
          alignItems="center"
          padding={'m_16'}
          borderBottomWidth={0.5}
          borderBottomColor={'inactive'}>
          <Box marginRight={'sm_12'}>
            {item?.hasImage || item.imageUrl ? (
              <Image
                source={{ uri: item.imageUrl }}
                style={{
                  width: size.xl,
                  height: size.xl,
                  borderRadius: size.xl / 2,
                  backgroundColor: colors.primary,
                }}
              />
            ) : (
              <Feather name="user" size={size.xl} color={colors.primary} />
            )}
          </Box>

          {/* User name and email */}
          <Box flex={1}>
            <Text variant="body" fontWeight="semibold">
              {name}
            </Text>
            <Text variant="body" color={'neutral'}>
              {email}
            </Text>
          </Box>
          {/* Check button for selecting user */}
          {showCheckmarks && (
            <Button
              variant={'link'}
              onPress={() => toggleUserSelection(item.id, name)}
              padding={'sm_12'}>
              {isSelected ? (
                <AntDesign name="checksquare" size={size.m} color={colors.success} />
              ) : (
                <FontAwesome name="square-o" size={size.m} color={colors.neutral} />
              )}
            </Button>
          )}
        </Box>
      </Pressable>
    );
  };

  return (
    <Box flex={1} backgroundColor={'background'}>
      {/* Sticky banner at the top showing the number of selected users */}
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        padding={'sm_8'}
        borderColor={'secondary'}
        width="100%"
        borderBottomWidth={size.xs}>
        <Box flexDirection="row" alignItems="center">
          <Box alignItems="center">
            <Button variant={'link'} onPress={selectAllUsers}>
              {allUsersSelected ? (
                <Feather name="check-circle" size={size.m} color={colors.success} />
              ) : (
                <Feather name="circle" size={size.m} color={colors.neutral} />
              )}
            </Button>
            <Text variant="small" style={{ marginTop: -10 }} color="neutral">
              All
            </Text>
          </Box>

          <Text variant="title" fontWeight={'semibold'} style={{ marginLeft: 20 }}>
            {Object.keys(selectedUsers).length} Selected
          </Text>
        </Box>
        <Button variant="link" onPress={handleAddUsers}>
          <Text variant="title" color="inactive">
            Add
          </Text>
        </Button>
      </Box>

      {/* Search bar for filtering users */}
      <Box
        padding={'m_16'}
        marginVertical="m_24"
        borderRadius="m_8"
        marginHorizontal="sm_8"
        flexDirection="row"
        backgroundColor="secondary">
        <Feather
          name="search"
          size={size.m}
          color={colors.neutral}
          style={{ marginRight: spacing.sm_8 }}
        />
        <TextInput
          placeholder="Search users..."
          placeholderTextColor={colors.neutral}
          value={searchQuery}
          onChangeText={handleSearch}
          style={{
            color: colors.text,
            flex: 0.8,
          }}
        />
      </Box>

      {loading ? (
        <ActivityIndicator size="large" color={colors.text} />
      ) : userData === null || userData.length === 0 ? (
        <Text variant="title">No User Found!</Text>
      ) : (
        <FlatList
          data={userData}
          renderItem={renderUser}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: spacing.l_32 }}
          onEndReachedThreshold={0.5}
        />
      )}
    </Box>
  );
}
