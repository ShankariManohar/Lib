var mongoose = require('mongoose');
// Setup schema
var bookSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    author: {
        type: String,
        required: true
    }
    
});
// Export Contact model
var Book = module.exports = mongoose.model('book', bookSchema);
module.exports.get = function (callback, limit) {
    Book.find(callback).limit(limit);
}