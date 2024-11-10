import React from 'react';
import { StreamVideo, StreamVideoClient } from '@stream-io/video-react-native-sdk';
import { useUser } from '@clerk/clerk-expo';
import { getName } from '@/utils';
import FullScreenLoader from './FullScreenLoader';
const featureFlags = {
  useMockToken: false,
};
export default function StreamVideoProvider({ children }: React.PropsWithChildren) {
  const { isSignedIn, user } = useUser();
  const [client, setClient] = React.useState<StreamVideoClient>();

  React.useEffect(() => {
    const fetchToken = async (): Promise<string> => {
      const userId = user?.id;
      if (featureFlags.useMockToken) {
        return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiIHVzZXJfMm1lbzBLWDJPS2s5N0xyRUw5Umg5U0VzQ011In0.hJgvMSbHYQ76oq8-CT_UxJovOqh8XbxO2nzdLmaXMaU';
      }
      const response = await fetch(process.env.EXPO_PUBLIC_BACKEND_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: userId }),
      });
      const { token } = await response.json();
      return token;
    };
    const initiliazeStreamClient = async () => {
      if (!process.env.EXPO_PUBLIC_STREAM_API_KEY) {
        throw new Error('Missing Stream API Key. Please set STREAM_API_KEY in your .env');
      }
      if (user) {
        const userId = user.id;
        const client = new StreamVideoClient({
          apiKey: process.env.EXPO_PUBLIC_STREAM_API_KEY,
          tokenProvider: fetchToken,
          user: {
            id: userId,
            name: getName({
              firstName: user?.firstName,
              lastName: user?.lastName,
              fullName: user?.fullName,
              username: user?.username,
            }),
            image: user.imageUrl,
          },
        });
        setClient(client);
        return;
      }
      setClient(undefined);
    };
    if (isSignedIn) {
      initiliazeStreamClient();
    }
    return () => {
      client?.disconnectUser();
      setClient(undefined);
    };
  }, []);
  if (!client) return <FullScreenLoader text="Setting up the app..." />;
  return <StreamVideo client={client}>{children}</StreamVideo>;
}
