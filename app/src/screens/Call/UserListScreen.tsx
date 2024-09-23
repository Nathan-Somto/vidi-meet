import React, { useState } from 'react';
import { FlatList, TextInput, Image, Pressable } from 'react-native';
import { Box, Text, Button, useTheme } from '@/theme';
import { AntDesign, Feather, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { CallStackParamList } from '@/navigation/CallStack';
import { Routes } from '@/navigation/routes';
import { StackScreenProps } from '@react-navigation/stack';
import { useUserListStore } from '@/hooks/useUserListStore';

type UserData = {
  id: string;
  firstName?: string;
  lastName?: string;
  userName?: string;
  hasImage?: boolean;
  emailAddresses: { emailAddress: string }[];
  imageUrl: string;
}[];
const userData: UserData = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    emailAddresses: [{ emailAddress: 'johndoe@email.com' }],
    imageUrl: 'https://i.pravatar.cc/300',
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    emailAddresses: [{ emailAddress: 'janesmith@email.com' }],
    imageUrl: 'https://i.pravatar.cc/300',
  },
  {
    id: '3',
    firstName: 'Bill',
    lastName: 'Smith',
    emailAddresses: [{ emailAddress: 'bsmith@email.com' }],
    imageUrl: 'https://i.pravatar.cc/300',
  },
  {
    id: '4',
    firstName: 'Gabe',
    lastName: 'Smith',
    emailAddresses: [{ emailAddress: 'gsmith@email.com' }],
    imageUrl: 'https://i.pravatar.cc/300',
  },
  {
    id: '5',
    firstName: 'Geno',
    lastName: 'Smith',
    emailAddresses: [{ emailAddress: 'genosmith@email.com' }],
    imageUrl: 'https://i.pravatar.cc/300',
  },
  {
    id: '6',
    firstName: 'Juju',
    lastName: 'Smith',
    emailAddresses: [{ emailAddress: 'jujusmith@email.com' }],
    imageUrl: 'https://i.pravatar.cc/300',
  },
];
const getName = ({
  firstName,
  lastName,
  userName,
}: Pick<UserData[number], 'firstName' | 'lastName' | 'userName'>) => {
  return (firstName ?? '') + ' ' + (lastName ?? '') || (userName ?? '') || 'No Name';
};
export default function UserListScreen({
  navigation,
  route,
}: StackScreenProps<CallStackParamList, Routes.USERLIST>) {
  const { selectedUsers: initialSelectedUsers, setUsers, addUsers } = useUserListStore();
  const [selectedUsers, setSelectedUsers] = useState<Record<string, string>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [showCheckmarks, setShowCheckmarks] = useState(false);
  const { colors, spacing, size } = useTheme();
  const router = useNavigation();
  const allUsersSelected = React.useMemo(
    () => userData.length === Object.keys(selectedUsers).length,
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
    setSelectedUsers(
      allUsersSelected
        ? {}
        : userData.reduce(
            (acc, { id, firstName, lastName, userName }) => ({
              ...acc,
              [id]: getName({ firstName, lastName, userName }),
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
      router.navigate(Routes.MAINTABS, { screen: Routes.NEWMEETING });
    } else {
      navigation.navigate(Routes.SCHEDULEMEETING);
    }
  };

  const filteredUsers = userData.filter((user) => {
    const name = (user?.firstName ?? '') + ' ' + (user.lastName ?? '') || (user?.userName ?? '');
    return name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const renderUser = ({ item }: { item: UserData[number] }) => {
    const isSelected = selectedUsers[item.id];
    const name = getName({
      firstName: item?.firstName,
      lastName: item?.lastName,
      userName: item?.userName,
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
          {/* Radio button for selecting user */}
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
          onChangeText={setSearchQuery}
          style={{
            color: colors.text,
            flex: 0.8,
          }}
        />
      </Box>

      {/* User list with infinite scroll */}
      <FlatList
        data={filteredUsers}
        renderItem={renderUser}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: spacing.l_32 }}
        onEndReachedThreshold={0.5}
      />
    </Box>
  );
}
