
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
    subscriber.subname = req.body.subname ? req.body.subname : subscriber.subname;
    subscriber.books = req.body.books;
   
    console.log(subscriber +"-"+req.body.subname);
    
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
    Subscriber.find(req.params.subname, function (err, subscriber) {
        if (err)
            res.send(err);
        res.json({
            message: 'Subscriber details loading..',
            data: subscriber
        });
    });
};
// Handle update sub info
exports.update = function (req, res) {
    const query = { subname: req.body.subname };
    const newData = {
        subname : req.body.subname,
        book: req.body.book
       }
    Subscriber.findOneAndUpdate(query,  newData,function (err, subscriber) {
        if (err) 
        return res.send(500, {error: err});
        return res.send('Succesfully saved now.');
    });

};

// Handle delete sub
exports.delete = function (req, res) {
    Subscriber.findOneAndRemove({
        subname: req.body.subname
    }, function (err, subscriber) {
        if (err)
            res.send(err);
res.json({
            status: "success",
            message: 'Subscriber deleted'
        });
    });
};