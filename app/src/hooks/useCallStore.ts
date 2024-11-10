import { Call, CallRecording } from '@stream-io/video-react-native-sdk';
import { create } from 'zustand';
interface UseCallStore {
  calls: Call[] | null;
  currentCallId: string | null;
  callRecordings: CallRecording[] | null;
  setCalls: (calls: Call[]) => void;
  setCallRecordings: (callRecordings: CallRecording[]) => void;
  setCurrentCallId: (callId: string | null) => void;
}
export const useCallStore = create<UseCallStore>((set) => ({
  calls: null,
  callRecordings: null,
  currentCallId: null,
  setCalls: (calls) => set(() => ({ calls })),
  setCallRecordings: (callRecordings) => set(() => ({ callRecordings })),
  setCurrentCallId: (currentCallId) => set(() => ({ currentCallId })),
}));
