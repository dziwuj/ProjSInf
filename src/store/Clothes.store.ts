import categoryMock from "@constants/mockCategoryData.json";
import { create } from "zustand";

import type { ClothesStore } from "@/types/store/ClothesStore";

export const useClothesStore = create<ClothesStore>(set => ({
  clothes: [...categoryMock["T-shirts"]],
  setClothes: clothes => set({ clothes }),
}));
