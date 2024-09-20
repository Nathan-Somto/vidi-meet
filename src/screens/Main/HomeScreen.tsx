import { Container } from '@/components/Container';
import { Box, Button, Text } from '@/theme';
import React from 'react';
import { Dimensions, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import banner from '../../../assets/images/banner.png';
import { FlatList } from 'react-native-gesture-handler';
import { ActionButtons } from '@/constants';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '@/navigation/routes';
import { MeetingCard } from '@/components/MeetingCard';
import { FontAwesome5 } from '@expo/vector-icons';
const formatTime = (date: Date) => {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};
export default function HomeScreen() {
  const firstName = 'Nathan';
  const upcomingMeeting = {
    title: 'Family Meeting',
    scheduleDate: new Date(),
    id: '1234',
  };
  const currentTime = formatTime(new Date());
  const currentTimeArr = currentTime.replace(/w+/, '').split(/w+/);
  console.log('currentTimeArr', currentTimeArr);
  const currentDate = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
  }).format(new Date());
  const imageWidth = Dimensions.get('window').width * 0.95;
  const router = useNavigation();
  return (
    <Container>
      <ImageBackground
        source={banner}
        imageStyle={{ borderRadius: 16 }}
        style={{ height: 230, width: imageWidth, marginVertical: 30 }}
        resizeMode="cover">
        <Box padding="m_16">
          {upcomingMeeting !== null && (
            <Box
              paddingHorizontal="sm_12"
              paddingVertical="sm_8"
              borderRadius="xl_24"
              marginBottom="sm_8"
              width="90%"
              style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
              <Text
                variant="title"
                marginBottom="sm_8"
                style={{ color: 'rgba(255,255,255,0.7)' }}
                fontWeight={'medium'}>
                Welcome Back,{' '}
                <Text variant="title" fontWeight={'semibold'}>
                  {firstName}👋
                </Text>
              </Text>
            </Box>
          )}
          <Box>
            <Text variant="extra_large" style={{ marginBottom: 2 }}>
              {currentTimeArr[0]}{' '}
            </Text>
            <Text variant="title" color="neutral" fontWeight={'medium'}>
              {currentDate}
            </Text>
          </Box>
          <Box></Box>
        </Box>
      </ImageBackground>
      {/* Action Buttons */}
      <FlatList
        data={ActionButtons}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ marginHorizontal: 6 }}
        renderItem={({ item: { Icon, color, screen, text } }) => (
          <TouchableOpacity
            style={{ marginHorizontal: 6 }}
            onPress={() =>
              screen === Routes.SCHEDULEMEETING
                ? router.navigate(Routes.CALLSTACK, {
                    screen,
                  })
                : screen === Routes.JOINMEETING
                  ? router.navigate(Routes.CALLSTACK, { screen, params: { inviteId: '' } })
                  : router.navigate(Routes.MAINTABS, { screen })
            }>
            <>
              <Box
                style={{ backgroundColor: color, marginHorizontal: 'auto' }}
                height={50}
                width={50}
                borderRadius="s_4"
                justifyContent="center"
                alignItems="center"
                padding="xs_4">
                <Box
                  height={30}
                  width={30}
                  borderRadius="s_4"
                  justifyContent="center"
                  alignItems="center"
                  style={{ backgroundColor: 'rgba(255,255,255,0.37)' }}>
                  <Icon />
                </Box>
              </Box>
              <Text variant="body" marginTop="xs_4" color="neutral">
                {text}
              </Text>
            </>
          </TouchableOpacity>
        )}
      />
      <Box
        flexDirection="row"
        justifyContent="space-between"
        marginBottom="sm_8"
        alignItems="center">
        <Text variant="title" fontWeight={'semibold'}>
          Today{"'"}s Upcoming Meetings
        </Text>
        <Button
          label="See All"
          variant="link"
          color="neutral"
          style={{ padding: 0 }}
          onPress={() =>
            router.navigate(Routes.MAINTABS, {
              screen: Routes.UPCOMINGMEETINGS,
            })
          }
        />
      </Box>
      {/* Just One Upcoming Meeting Card is shown */}
      <ScrollView>
        {upcomingMeeting === null ? (
          <Box>
            <FontAwesome5 name="calendar-times" size={80} color="rgba(255,255,255,0.5)" />
            <Text variant="title" marginTop="m_16" fontWeight={'semibold'}>
              No Upcoming Meetings
            </Text>
          </Box>
        ) : (
          <MeetingCard
            type="upcoming"
            title="Family Meeting"
            scheduleDate={new Date()}
            id={'1234'}
          />
        )}
      </ScrollView>
    </Container>
  );
}
