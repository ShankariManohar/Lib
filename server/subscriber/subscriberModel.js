var mongoose = require('mongoose');
// Setup schema
var subscriberSchema = mongoose.Schema({
    subname: {
        type: String,
        required: true
    },
    books: {
        type: Array,
        required: true
    }
    
});
// Export Contact model
var Subscriber = module.exports = mongoose.model('subscriber', subscriberSchema);
module.exports.get = function (callback, limit) {
    Subscriber.find(callback).limit(limit);
}