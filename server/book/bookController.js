
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
    
    const query = { name: req.body.name };
    const newData = {
        name : req.body.name,
        quantity: req.body.quantity,
        author : req.body.author
    }
    Book.findOneAndUpdate(query,  {name : req.body.name,author : req.body.author,$inc : { quantity : req.body.quantity }}, {upsert: true, new: true, runValidators: true},function (err, book) {
        if (err) 
        return res.send(500, {error: err});
        return res.send('Succesfully saved now.');
    });

    // book.name = req.body.name ? req.body.name : book.name;
    // book.quantity = req.body.quantity;
    // book.author = req.body.author;
    

// save the book and check for errors
    // book.save(function (err) {
    //     // if (err)
    //     //     res.json(err);
    //     res.json({
    //         message: 'New book created!',
    //         data: book
    //     });
    // });
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
    const query = { name: req.body.name };
    const newData = {
        name : req.body.name,
        quantity: req.body.quantity,
        author : req.body.author
    }
    Book.findOneAndUpdate(query,  newData,function (err, book) {
        if (err) 
        return res.send(500, {error: err});
        return res.send('Succesfully saved now.');
    });

};

// Handle delete book
exports.delete = function (req, res) {
     Book.findOneAndRemove({
         name: req.body.name
     }, function (err, book) {
         if (err)
             res.send(err);
         res.json({
            status: "success",
             message: "book Deleted"
         });
     });
 };

