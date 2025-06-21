import { Schema, model, Model, Document } from "mongoose";

export enum Genre {
  FICTION = "FICTION",
  NON_FICTION = "NON_FICTION",
  SCIENCE = "SCIENCE",
  HISTORY = "HISTORY",
  BIOGRAPHY = "BIOGRAPHY",
  FANTASY = "FANTASY",
}

export interface IBook extends Document {
  title: string;
  author: string;
  genre: Genre;
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface BookModel extends Model<IBook> {
  updateAvailability(bookId: string): Promise<void>;
}

const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: {
      type: String,
      enum: Object.values(Genre),
      required: true,
    },
    isbn: { type: String, required: true, unique: true },
    description: { type: String },
    copies: {
      type: Number,
      required: true,
      min: [0, "Copies must be a positive number"],
    },
    available: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
      },
    },
  }
);

bookSchema.statics.updateAvailability = async function (bookId: string) {
  const book = await this.findById(bookId);
  if (book) {
    book.available = book.copies > 0;
    await book.save();
  }
};

export const Book = model<IBook, BookModel>("Book", bookSchema);
