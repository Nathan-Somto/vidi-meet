import React from 'react';
import { Box, FormInput, Text, useTheme, Button, useToast } from '@/theme';
import { Feather, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { UserListData, useUserListStore } from '@/hooks/useUserListStore';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '@/navigation/routes';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Dimensions, FlatList, Keyboard } from 'react-native';
import { MemberRequest, useStreamVideoClient } from '@stream-io/video-react-native-sdk';
import { useCallStore } from '@/hooks/useCallStore';
import { randomUID } from '@/utils';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useUser } from '@clerk/clerk-expo';

type MeetingFormProps =
  | {
      type: 'schedule';
      showSuccessScreen: (inviteId: string) => void;
    }
  | {
      type: 'instant';
    };

type FormData = {
  title: string;
  scheduleDate: Date;
  scheduleTime: Date;
  users: UserListData;
};

export default function MeetingForm(props: MeetingFormProps) {
  const { user } = useUser();
  console.log('user id: ', user?.id);
  const router = useNavigation();
  const setCurrentCallId = useCallStore((state) => state.setCurrentCallId);
  const { removeUser, selectedUsers, clearUsers } = useUserListStore((state) => state);
  const client = useStreamVideoClient();
  const { toast } = useToast();
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [mode, setMode] = React.useState<'date' | 'time'>('date');
  const [formData, setFormData] = React.useState<FormData>({
    title: '',
    scheduleDate: new Date(),
    scheduleTime: new Date(Date.now() + 1000 * 60 * 60 * 2), // 2 hours from now
    users: [],
  });

  console.log('form data users: ', formData.users);
  React.useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      users: [...selectedUsers],
    }));
  }, [selectedUsers]);

  const { colors, size } = useTheme();

  const handleChange = (label: keyof typeof formData, value: string | Date) => {
    if (label === 'scheduleDate' || label === 'scheduleTime') {
      setShowDatePicker(false);
    }
    setFormData((prev) => ({ ...prev, [label]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const id = randomUID();
      const formattedUsers: MemberRequest[] = formData.users.map((user) => ({
        user_id: user.id,
        custom: {
          name: user.name,
        },
      }));
      const call = client?.call('default', id);
      if (!call) throw new Error('Failed to create call');
      if (props.type === 'instant') {
        await call?.getOrCreate({
          data: {
            members: formattedUsers,
            starts_at: new Date().toISOString(),
            custom: {
              title: formData.title,
            },
          },
        });
        setCurrentCallId(id);
        router.navigate(Routes.AUTHENTICATEDSTACK, {
          screen: Routes.CALLSTACK,
          params: {
            screen: Routes.CALLSETUP,
          },
        });
      } else {
        const localScheduleDate = new Date(formData.scheduleDate);
        const time = formData.scheduleTime;
        const hours = time.getHours();
        const minutes = time.getMinutes();
        localScheduleDate.setHours(hours);
        localScheduleDate.setMinutes(minutes);
        const scheduledCall = await call?.getOrCreate({
          data: {
            members: formattedUsers,
            starts_at: formData.scheduleDate.toISOString(),
            custom: {
              title: formData.title,
            },
          },
        });
        console.log('scheduled call: ', scheduledCall);
        props.showSuccessScreen(id);
      }
    } catch (e) {
      console.log(e);
      toast({ message: 'Failed to create call', variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveUser = (userId: string) => {
    removeUser(userId);
  };

  const handleAddUsers = () => {
    router.navigate(Routes.AUTHENTICATEDSTACK, {
      screen: Routes.MEETINGSTACK,
      params: {
        screen: Routes.USERLIST,
        params: {
          from: props.type === 'instant' ? Routes.NEWMEETING : Routes.SCHEDULEMEETING,
          add: formData.users.length > 0,
        },
      },
    });
  };
  const openDatePicker = (mode: 'date' | 'time') => {
    setMode(mode);
    setShowDatePicker(true);
  };
  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
      style={{ flex: 1, width: Dimensions.get('window').width, paddingHorizontal: 16 }}>
      {/* Title input field */}
      <Box marginBottom="m_24" />
      <FormInput
        label="Meeting Title"
        value={formData.title}
        placeholder="Enter Meeting Title"
        handleChangeText={(_, value) => handleChange('title', value)}
        Icon={() => (
          <MaterialIcons
            name="description"
            style={{ marginRight: 8 }}
            color={colors.neutral}
            size={size.m}
          />
        )}
      />
      <Box marginBottom="m_16" />
      {props.type === 'schedule' && (
        <>
          <Box>
            <Text variant="title" marginBottom={'sm_8'}>
              Schedule Date
            </Text>
            <Button
              variant="secondary"
              marginBottom="m_24"
              justifyContent="space-between"
              onPress={() => openDatePicker('date')}>
              <Box flexDirection="row" alignItems="center" justifyContent="space-between">
                <Feather name="calendar" size={size.m} color={colors.neutral} />
                <Text variant="title" fontSize={14} marginLeft="sm_8" color="neutral">
                  {formData.scheduleDate.toDateString()}
                </Text>
              </Box>
              <Feather name="chevron-down" size={size.m} color={colors.text} />
            </Button>
          </Box>
          <Box>
            <Text variant="title" marginBottom={'sm_8'}>
              Schedule Time
            </Text>
            <Button
              variant="secondary"
              marginBottom="m_24"
              justifyContent="space-between"
              onPress={() => openDatePicker('time')}>
              <Box flexDirection="row" alignItems="center" justifyContent="space-between">
                <Feather name="clock" size={size.m} color={colors.neutral} />
                <Text variant="title" fontSize={14} marginLeft="sm_8" color="neutral">
                  {formData.scheduleTime.toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                  })}
                </Text>
              </Box>
              <Feather name="chevron-down" size={size.m} color={colors.text} />
            </Button>
          </Box>
          {showDatePicker && (
            <DateTimePicker
              value={formData.scheduleDate}
              mode={mode}
              display="default"
              minimumDate={new Date()}
              onChange={(event, date) => {
                if (date) {
                  const label = mode === 'date' ? 'scheduleDate' : 'scheduleTime';
                  handleChange(label, date);
                }
              }}
            />
          )}
        </>
      )}
      {/* Button to add users */}
      <Button
        variant="secondary"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        height={size.xl}
        paddingHorizontal="m_16"
        onPress={handleAddUsers}
        marginBottom={'m_16'}>
        <Box flexDirection="row" alignItems="center">
          <AntDesign name="addusergroup" color={colors.neutral} size={size.m} />
          <Text variant="body" color="neutral" marginLeft="sm_8">
            Add Members
          </Text>
        </Box>
        <Feather name="chevron-right" size={size.m} color={colors.text} />
      </Button>

      {/* Show selected users with a remove (X) button */}
      {formData.users.length > 0 && (
        <>
          <Box flexDirection="row" alignItems="center" justifyContent="space-between">
            <Text variant="title" marginVertical={'sm_8'}>
              Selected Users <Text color="neutral">({selectedUsers.length})</Text>
            </Text>
            <Button variant="link" onPress={clearUsers}>
              <Text variant="body" color="destructive">
                Clear All
              </Text>
            </Button>
          </Box>
          <FlatList
            data={formData.users}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Box
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                padding={'sm_12'}
                backgroundColor={'secondary'}
                borderRadius={'s_4'}
                marginBottom={'sm_12'}>
                <Text variant="body">{item.name}</Text>
                <Button variant="destructive" size="icon" onPress={() => handleRemoveUser(item.id)}>
                  <MaterialIcons name="close" size={size.m} color={colors.white} />
                </Button>
              </Box>
            )}
          />
        </>
      )}

      {/* Submit button */}
      <Button variant="primary" isLoading={loading} onPress={handleSubmit} marginTop={'m_16'}>
        <Text variant="title">
          {props.type === 'instant' ? 'Start Meeting' : 'Schedule Meeting'}
        </Text>
        <Feather
          name={props.type === 'instant' ? 'arrow-right' : 'clock'}
          size={size.lg}
          color={colors.text}
        />
      </Button>
    </TouchableWithoutFeedback>
  );
}
