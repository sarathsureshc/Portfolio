import mongoose from 'mongoose';

const skillSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    level: {
      type: Number,
      required: true,
      min: 1,
      max: 100,
    },
    category: {
      type: String,
      required: true,
      enum: ['Frontend', 'Backend', 'Database', 'DevOps', 'Other',],
    },
    icon: {
      type: String,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Skill = mongoose.model('Skill', skillSchema);

export default Skill;