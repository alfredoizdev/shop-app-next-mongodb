import { create } from 'zustand'

type State = {
  showMobileMenu: boolean
}

type Action = {
  setStatusMobileMenu: (showMobileMenu: State['showMobileMenu']) => void
}

// Create your store, which includes both state and (optionally) actions
const useUiStore = create<State & Action>((set) => ({
  showMobileMenu: false,
  setStatusMobileMenu: (showMobileMenu) =>
    set(() => ({ showMobileMenu: showMobileMenu })),
}))

export default useUiStore
