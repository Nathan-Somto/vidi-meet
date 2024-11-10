import { Call, useStreamVideoClient } from '@stream-io/video-react-native-sdk';
import React from 'react';

export function useFetchCall(id: string, runWhen: boolean) {
  const [data, setData] = React.useState<Call | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const client = useStreamVideoClient();
  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await client?.queryCalls({ filter_conditions: { id } });
        const call = (res?.calls?.length ?? 0) > 0 ? res?.calls[0] : null;
        setData(call ?? null);
      } catch (error) {
        console.log('Error fetching call', error);
      } finally {
        setIsLoading(false);
      }
    };
    if (runWhen && data === null) {
        fetchData();
    }
  }, [runWhen, data]);
  return { data, isLoading };
}
