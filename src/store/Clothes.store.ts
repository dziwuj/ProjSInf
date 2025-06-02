import categoryMock from "@constants/mockCategoryData.json";
import { create } from "zustand";

import type { ClothesStore } from "@/types/store/ClothesStore";

export const useClothesStore = create<ClothesStore>((set, get) => ({
  clothes: [...categoryMock["T-shirts"]],
  getClothesByID: id => {
    return get().clothes.find(item => item.id === id) || null;
  },
  setClothes: clothes => set({ clothes }),
  removeClothes: id =>
    set(state => ({
      clothes: state.clothes.filter(item => item.id !== id),
    })),
}));
