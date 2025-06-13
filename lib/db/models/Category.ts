import mongoose from 'mongoose'
import slugify from 'slugify' // Import slugify for generating slugs

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      default: '',
    },
  },
  {
    timestamps: true,
  }
)

// Pre-save hook to generate slug from name
categorySchema.pre('validate', function (next) {
  if (this.name && !this.slug) {
    this.slug = slugify(this.name, { lower: true, strict: true })
  }
  next()
})

categorySchema.set('toJSON', {
  transform: function (doc, ret) {
    ret.id = ret._id.toHexString()
    delete ret._id
    delete ret.__v
    return ret
  },
})

const Category =
  mongoose.models.Category || mongoose.model('Category', categorySchema)

export default Category
