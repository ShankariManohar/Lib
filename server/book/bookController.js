
Book = require('./bookModel');
Subscriber = require('../subscriber/subscriberModel');

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
         res.json({
            status: "success",
             message: "book Deleted"
         });
     });
 };

 exports.issueBook = function(req, res){
    const query = { name: req.body.name };
    const query1 = { subname: req.body.subname}
    
    Book.findOneAndUpdate(query,{ $inc : { quantity : -1 }} ,function (err, book) {
        if (err) {
            return res.send(500, {error: err});
        }
        else{
            var subscriber = new Subscriber();
            subscriber.books = req.body.name;
            Subscriber.findOneAndUpdate(query1, { $push: { books: query.name } } ,function (err, subscriber) {
                if (err)
                return res.send(500, {error: err});
                return res.send('Succesfully saved now.');
               
            })
        }
        
    });
 }

