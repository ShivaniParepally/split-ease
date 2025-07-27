
import mongoose from 'mongoose';

export interface IExpense extends mongoose.Document {
  title: string;
  amount: number;
  groupId: mongoose.Types.ObjectId;
  paidBy: mongoose.Types.ObjectId;
  date: Date;
  splitBetween: {
    userId: mongoose.Types.ObjectId;
    amount: number;
  }[];
}

const ExpenseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
  paidBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  splitBetween: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    amount: { type: Number }
  }]
}, { timestamps: true });

export default mongoose.model<IExpense>('Expense', ExpenseSchema);
