import { create } from "zustand";

import { type Store } from "@/types/types";

const useStore = create<Store>()(set => ({
  count: 1,
  inc: () => set(state => ({ count: state.count + 1 })),
}));

export { useStore };
