import { Feather, FontAwesome } from '@expo/vector-icons';
import Welcome1 from '../../assets/images/welcome1.png';
import Welcome2 from '../../assets/images/welcome2.png';
import { Routes } from '@/navigation/routes';
export const welcomeData = [
    {
      id: 1,
      title: 'Start a Meeting',
      description: 'Start a meeting from anywhere in the world.',
      image: Welcome1,
    },
    {
      id: 2,
      title: 'Join a Meeting',
      description: 'Join a meeting from anywhere in the world.',
      image: Welcome2,
    },
  ];
const SIZE = 25;
export const ActionButtons = [
  {
    text: "New Meeting",
    color: "#FF742E",
    Icon:() => <Feather name="plus" color={'#fff'} size={SIZE}/>,
    id: 1,
    screen: Routes.NEWMEETING
  },
  {
    text: "Join Meeting",
    color: "#0E78F9",
    Icon:() => <Feather name="user-plus" color={'#fff'} size={SIZE}/>,
    id: 2,
    screen: Routes.JOINMEETING
  },
  {
    text: "Schedule Meeting",
    color: "#830EF9",
    Icon:() => <Feather name="calendar" color={'#fff'} size={SIZE}/>,
    id: 3,
    screen: Routes.SCHEDULEMEETING
  },
  {
    text: 'View Recordings',
    color: "#F9A90E",
    Icon:() => <FontAwesome name="video-camera" color={'#fff'} size={SIZE}/>,
    id: 4,
    screen: Routes.MEETINGRECORDINGS
  }
] as const