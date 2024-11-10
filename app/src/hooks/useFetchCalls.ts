import { Call, CallRecording, useStreamVideoClient } from '@stream-io/video-react-native-sdk';
import { useCallStore } from './useCallStore';
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-expo';

export type CallsType = 'recorded' | 'upcoming' | 'previous' | 'ongoing';

type ReturnType<T> = T extends 'recorded'
  ? {
      loading: boolean;
      data: CallRecording[] | null;
    }
  : {
      loading: boolean;
      data: Call[] | null;
    };

export function useFetchCalls<T extends CallsType>(type: T): ReturnType<T> {
  const { user } = useUser();
  const client = useStreamVideoClient();
  const { calls, callRecordings, setCalls, setCallRecordings } = useCallStore();
  const [data, setData] = useState<Call[] | CallRecording[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!user || !client) return;

    const fetchCalls = async () => {
      if (calls) return calls;
      setLoading(true);
      try {
        const response = await client.queryCalls({
          sort: [{ field: 'starts_at', direction: -1 }],
          filter_conditions: {
            starts_at: { $exists: true },
          },
        });
        console.log('response in fetch calls: ', response);
        setCalls(response.calls);

        return response.calls;
      } catch (e) {
        console.log('Error fetching calls', e);
        return null;
      } finally {
        setLoading(false);
      }
    };

    const fetchCallRecordings = async () => {
      setLoading(true);
      if (callRecordings) return;
      try {
        const fetchedCalls = calls || (await fetchCalls());
        console.log('fetchedCalls', fetchedCalls);
        if (!fetchedCalls) return;
        const callData = await Promise.all(
          fetchedCalls.map((call) => call.queryRecordings() ?? [])
        );
        const localCallRecordings = callData
          .filter((call) => call.recordings.length > 0)
          .flatMap((call) => call.recordings);
        if (!calls) {
          setCalls(fetchedCalls);
        }
        setCallRecordings(localCallRecordings);
        setData(localCallRecordings);
      } catch (err) {
        console.log('Error fetching call recordings', err);
      } finally {
        setLoading(false);
      }
    };

    const getPreviousCalls = async () => {
      const fetchedCalls = calls || (await fetchCalls());
      setData(fetchedCalls?.filter(({ state: { endedAt } }) => !!endedAt) ?? null);
    };

    const getUpcomingCalls = async () => {
      const fetchedCalls = calls || (await fetchCalls());
      const now = new Date();
      setData(
        fetchedCalls?.filter(
          ({ state: { startsAt, endedAt } }) =>
            endedAt === null && startsAt && new Date(startsAt) > now
        ) || []
      );
    };

    const watchOngoingCalls = async () => {
      try {
        const { calls: ongoingCalls } = await client.queryCalls({
          filter_conditions: {
            ongoing: true,
            $or: [{ created_by_user_id: user.id }, { members: { $in: [user.id] } }],
          },
          watch: true,
        });
        setData(ongoingCalls);
      } catch (e) {
        console.log('Error watching ongoing calls', e);
      }
    };

    // Fetch data based on the type
    switch (type) {
      case 'recorded':
        fetchCallRecordings();
        break;
      case 'ongoing':
        watchOngoingCalls();
        break;
      case 'previous':
        getPreviousCalls();
        break;
      case 'upcoming':
        getUpcomingCalls();
        break;
      default:
        fetchCalls();
    }
  }, [type, user, client]);

  return { data, loading } as ReturnType<T>;
}
