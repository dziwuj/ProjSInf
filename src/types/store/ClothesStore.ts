type Clothes = {
  id: string;
  name: string;
  description: string;
  tags: string[];
  image: string;
};

type ClothesStore = {
  clothes: Clothes[];
  getClothesByID: (id: string | null) => Clothes | null;
  setClothes: (clothes: Clothes[]) => void;
  removeClothes: (id: number) => void;
};

export type { Clothes, ClothesStore };
