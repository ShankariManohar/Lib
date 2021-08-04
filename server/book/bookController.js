
Book = require('./bookModel');

exports.index = function (req, res) {
    Book.get(function (err, books) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Books retrieved successfully",
            data: books
        });
    });
};

exports.new = function (req, res) {
    var book = new Book();
    book.name = req.body.name ? req.body.name : book.name;
    book.quantity = req.body.quantity;
    book.author = req.body.author;
    
// save the book and check for errors
    book.save(function (err) {
        // if (err)
        //     res.json(err);
        res.json({
            message: 'New book created!',
            data: book
        });
    });
};
// Handle view book info
exports.view = function (req, res) {
    Book.find(req.params.name, function (err, book) {
        if (err)
            res.send(err);
        res.json({
            message: 'Book details loading..',
            data: book
        });
    });
};
// Handle update book info
exports.update = function (req, res) {
Book.find(req.params.name, function (err, book) {
        if (err)
            res.send(err);
        book.name = req.body.name ? req.body.name : book.name;
        book.quantity = req.body.quantity;
        book.author = req.body.author;
       
// save the book and check for errors
        book.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Book Info updated',
                data: book
            });
        });
    });

};
// Handle delete book
exports.delete = function (req, res) {
    Book.remove({
        name: req.params.name
    }, function (err, book) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Book deleted'
        });
    });
};