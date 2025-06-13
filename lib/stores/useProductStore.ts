import { create } from 'zustand'

type InitialState = {
  urlImage: string
  addImageUrl: (url: string) => void
}

const initialState: InitialState = {
  urlImage: '',
  addImageUrl: () => {},
}

const useProductStore = create<InitialState>((set) => ({
  ...initialState,
  addImageUrl: (url: string) => set({ urlImage: url }),
}))

export default useProductStore
