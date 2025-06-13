// cartStore.ts
import { ProductType } from '@/types/Products'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type CartItem = {
  item: ProductType
  quantity: number
}
interface CartState {
  cart: CartItem[]
  addToCart: (product: ProductType, quantity?: number) => void
  removeFromCart: (productId: string) => void
  clearCart: () => void
  updateQuantity: (productId: string, quantity: number) => void
  totalItems: () => number
  totalPrice: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (product, quantity = 1) => {
        const { cart } = get()
        const existingItem = cart.find((c) => c.item.id === product.id)

        if (existingItem) {
          set({
            cart: cart.map((c) =>
              c.item.id === product.id
                ? { ...c, quantity: c.quantity + quantity }
                : c
            ),
          })
        } else {
          set({ cart: [...cart, { item: product, quantity }] })
        }
      },

      removeFromCart: (productId) => {
        set((state) => ({
          cart: state.cart.filter((c) => c.item.id !== productId),
        }))
      },

      clearCart: () => {
        set({ cart: [] })
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId)
        } else {
          set((state) => ({
            cart: state.cart.map((c) =>
              c.item.id === productId ? { ...c, quantity } : c
            ),
          }))
        }
      },

      totalItems: () =>
        get().cart.reduce((total, item) => total + item.quantity, 0),

      totalPrice: () =>
        get().cart.reduce(
          (total, item) => total + item.quantity * item.item.price,
          0
        ),
    }),
    {
      name: 'cart-storage',
    }
  )
)
