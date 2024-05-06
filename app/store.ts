import { create } from "zustand";

type FrontendStore = {
  roomId: string;
  setRoomId: (roomId: string) => void;
};

const useFrontendStore = create<FrontendStore>((set) => ({
  roomId: "",
  setRoomId: (roomId) => set({ roomId }),
}));

export default useFrontendStore;
