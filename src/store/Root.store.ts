import { create } from "zustand";

import { type RootStore } from "@/types/types";

const useStore = create<RootStore>()(set => ({
  count: 1,
  inc: () => set(state => ({ count: state.count + 1 })),
}));

export { useStore };
