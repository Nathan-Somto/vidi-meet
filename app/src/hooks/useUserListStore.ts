import { create } from 'zustand';

export type UserListData = { id: string; name: string }[];

interface UserListStore {
  selectedUsers: UserListData;
  addUsers: (user: UserListData) => void;
  setUsers: (user: UserListData) => void;
  removeUser: (userId: string) => void;
  clearUsers: () => void;
}

export const useUserListStore = create<UserListStore>((set) => ({
  selectedUsers: [],
  // add Users merges two user list data arrays together and removes duplicates
  addUsers: (user)=> set(() => {
    const selectedUsers = new Map();
    for (const currUser of user) {
      selectedUsers.set(currUser.id, currUser);
    }
    return { selectedUsers: Array.from(selectedUsers.values()) };
  }),
  setUsers: (user) => set(() => ({ selectedUsers: user })),
  removeUser: (userId) =>
    set((state) => ({
      selectedUsers: state.selectedUsers.filter((user) => user.id !== userId),
    })),

  clearUsers: () => set(() => ({ selectedUsers: [] })),
}));
