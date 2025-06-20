Borrow.aggregate([
  {
    $group: {
      _id: '$book',
      totalQuantity: { $sum: '$quantity' },
    }
  },
  {
    $lookup: {
      from: 'books',
      localField: '_id',
      foreignField: '_id',
      as: 'book'
    }
  },
  {
    $unwind: '$book'
  },
  {
    $project: {
      book: {
        title: '$book.title',
        isbn: '$book.isbn',
      },
      totalQuantity: 1
    }
  }
])
