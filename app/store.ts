import { create } from "zustand";

type FrontendStore = {
  roomId: string;
  setRoomId: (roomId: string) => void;
  browserId: string;
  setBrowserId: (browserId: string) => void;
};

const useFrontendStore = create<FrontendStore>((set) => ({
  roomId: "",
  setRoomId: (roomId) => set({ roomId }),
  browserId: "",
  setBrowserId: (browserId) => set({ browserId }),
}));

export default useFrontendStore;
