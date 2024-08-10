import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"

const vedioSchema = new Schema(
  {
    vedioFile: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        trquired: true
    },
    duration:{
        type: Number,
        
    },
    views:{
        type: Number,
        default: 0
    },
    isPublish:{
        type: Boolean,
        default: true
    }
  },
  { timestamps: true }
);

vedioSchema.plugin(mongooseAggregatePaginate)

export const Vedio = mongoose.model("Vedio", vedioSchema);
