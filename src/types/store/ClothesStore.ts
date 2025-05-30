type Clothes = {
  name: string;
  image: string;
};

type ClothesStore = {
  clothes: Clothes[];
  setClothes: (clothes: Clothes[]) => void;
};

export type { Clothes, ClothesStore };
