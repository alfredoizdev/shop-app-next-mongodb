import mongoose from 'mongoose'

const themeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    slogan: {
      type: String,
      required: true,
    },
    // colors: {
    //   primary: { type: String, required: true },
    //   secondary: { type: String, required: true },
    //   background: { type: String, required: true },
    //   text: { type: String, required: true },
    // },
  },
  {
    timestamps: true,
  }
)

themeSchema.set('toJSON', {
  transform: function (doc, ret) {
    ret.id = ret._id.toHexString()
    delete ret._id
    delete ret.__v
    return ret
  },
})

const Theme = mongoose.models.Theme || mongoose.model('Theme', themeSchema)
export default Theme
