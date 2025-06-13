import { CATEGORY_ENUM } from '@/lib/constants/categories'
import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: CATEGORY_ENUM,
      default: 'men',
      required: true,
    },
    inStock: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

productSchema.set('toJSON', {
  transform: function (doc, ret) {
    ret.id = ret._id.toHexString()
    delete ret._id
    delete ret.__v
    return ret
  },
})

const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema)
export default Product
