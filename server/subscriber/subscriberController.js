
Subscriber = require('./subscriberModel');

exports.index = function (req, res) {
    Subscriber.get(function (err, subscribers) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Subscribers retrieved successfully",
            data: subscribers
        });
    });
};

exports.new = function (req, res) {
    var subscriber = new Subscriber();
    subscriber.name = req.body.name ? req.body.name : book.name;
    subscriber.book = req.body.book;
   
    
// save the book and check for errors
subscriber.save(function (err) {
        // if (err)
        //     res.json(err);
res.json({
            message: 'New book created!',
            data: subscriber
        });
    });
};
// Handle view book info
exports.view = function (req, res) {
    Subscriber.find(req.params.name, function (err, subscriber) {
        if (err)
            res.send(err);
        res.json({
            message: 'Subscriber details loading..',
            data: subscriber
        });
    });
};
// Handle update book info
exports.update = function (req, res) {
Subscriber.find(req.params.name, function (err, subscriber) {
        if (err)
            res.send(err);
            subscriber.name = req.body.name ? req.body.name : subscriber.name;
            subscriber.book = req.body.book;
       
       
// save the book and check for errors
subscriber.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Subscriber Info updated',
                data: subscriber
            });
        });
    });

};
// Handle delete book
exports.delete = function (req, res) {
    Subscriber.remove({
        name: req.params.name
    }, function (err, subscriber) {
        if (err)
            res.send(err);
res.json({
            status: "success",
            message: 'Subscriber deleted'
        });
    });
};