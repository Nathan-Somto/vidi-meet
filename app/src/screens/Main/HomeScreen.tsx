import { Container } from '@/components/Container';
import { Box, Text, useTheme } from '@/theme';
import React from 'react';
import {
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import banner from '../../../assets/images/banner.png';
import { ActionButtons } from '@/constants';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '@/navigation/routes';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import MeetingList from '@/components/MeetingList';
import { formatDate, formatTime, splitIntoMeridiemAndTime } from '@/utils';

export default function HomeScreen() {
  const { colors } = useTheme();
  const firstName = 'Nathan';
  const [currentTime, meridiem] = splitIntoMeridiemAndTime(formatTime(new Date()));
  const currentDate = formatDate(new Date());
  const imageWidth = Dimensions.get('window').width * 0.95;
  const router = useNavigation();
  return (
    <Container>
      <Box flex={1} justifyContent="flex-start" width="100%">
        <ImageBackground
          source={banner}
          imageStyle={{ borderRadius: 16 }}
          style={{
            height: 230,
            width: imageWidth,
            marginBottom: 30,
            marginTop: 25,
            marginHorizontal: 'auto',
          }}
          resizeMode="cover">
          <Box padding="m_16">
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
                  {firstName} 👋
                </Text>
              </Text>
            </Box>
            <Box>
              <Text variant="extra_large" style={{ marginBottom: 2 }}>
                {currentTime}
                <Text variant="large">{meridiem}</Text>
              </Text>
              <Text variant="title" color="neutral" fontWeight={'medium'}>
                {currentDate}
              </Text>
            </Box>
            <Box></Box>
          </Box>
        </ImageBackground>
        {/* Action Buttons */}
        <Box>
          <FlatList
            data={ActionButtons}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ marginHorizontal: 6, alignItems: 'center' }}
            renderItem={({ item: { Icon, color, screen, text } }) => (
              <TouchableOpacity
                style={{ marginHorizontal: 8, height: 100 }}
                onPress={() =>
                  screen === Routes.SCHEDULEMEETING
                    ? router.navigate(Routes.AUTHENTICATEDSTACK, {
                        screen: Routes.MEETINGSTACK,
                        params: {
                          screen,
                        },
                      })
                    : screen === Routes.JOINMEETING
                      ? router.navigate(Routes.AUTHENTICATEDSTACK, {
                          screen: Routes.MEETINGSTACK,
                          params: { screen, params: { inviteId: '' } },
                        })
                      : router.navigate(Routes.AUTHENTICATEDSTACK, {
                          screen: Routes.MAINTABS,
                          params: { screen },
                        })
                }>
                <>
                  <Box
                    style={{ backgroundColor: color, marginHorizontal: 'auto' }}
                    height={65}
                    width={65}
                    borderRadius="s_4"
                    justifyContent="center"
                    alignItems="center"
                    padding="xs_4">
                    <Box
                      height={45}
                      width={45}
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
        </Box>
        <Box
          alignItems="center"
          flexDirection="row"
          width="100%"
          style={{ paddingHorizontal: 16, marginBottom: 32, marginTop: 20 }}
          justifyContent="space-between">
          <Text variant="title" textAlign="left" fontWeight="semibold">
            OnGoing Meetings
          </Text>
          <Box marginLeft="sm_8" justifyContent="center" flexDirection="row" alignItems="center">
            <MaterialIcons name="fiber-manual-record" size={16} color="red" />
            <Text variant="small" color="destructive">
              Live
            </Text>
          </Box>
        </Box>
        <MeetingList
          type="ongoing"
          CustomEmptyMsgComponent={() => (
            <ScrollView>
              <Box alignItems="center">
                <FontAwesome5 name="calendar-times" size={80} color="rgba(255,255,255,0.5)" />
                <Text variant="title" marginTop="m_16" fontWeight={'semibold'}>
                  No OnGoing Meeting
                </Text>
              </Box>
            </ScrollView>
          )}
          useContainer={false}
          CustomLoaderComponent={() => (
            <Box alignItems="center" width="100%">
              <ActivityIndicator color={colors.text} size={'small'} />
            </Box>
          )}
        />
      </Box>
    </Container>
  );
}
