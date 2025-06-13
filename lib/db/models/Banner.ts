import mongoose from 'mongoose'

const bannerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: true,
    },
    buttonText: {
      type: String,
      required: true,
    },
    buttonLink: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

bannerSchema.set('toJSON', {
  transform: function (doc, ret) {
    ret.id = ret._id.toHexString()
    delete ret._id
    delete ret.__v
    return ret
  },
})

const Banner = mongoose.models.Banner || mongoose.model('Banner', bannerSchema)
export default Banner
