import mongoose, { Schema, model } from 'mongoose';

const borrowSchema = new Schema({
  book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
  quantity: { type: Number, required: true, min: 1 },
  dueDate: { type: Date, required: true },
}, { timestamps: true });

// Middleware to update book stock and availability
borrowSchema.pre('save', async function (next) {
  const book = await mongoose.model('Book').findById(this.book);
  if (!book) return next(new Error('Book not found'));

  if (book.copies < this.quantity) {
    return next(new Error('Not enough copies available'));
  }

  book.copies -= this.quantity;
  if (book.copies <= 0) {
    book.available = false;
  }

  await book.save();
  next();
});

export const Borrow = model('Borrow', borrowSchema);
