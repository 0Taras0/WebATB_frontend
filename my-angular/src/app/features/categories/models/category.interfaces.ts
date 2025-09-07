export interface Category {
  id: number,
  name: string,
  image: string,
  slug: string,
}

export interface CategoryCreate {
  name: string;
  slug: string;
  imageFile?: File | null;
}

export interface CategoryEdit {
  name: string;
  slug: string;
  imageFile?: File | null;
}
