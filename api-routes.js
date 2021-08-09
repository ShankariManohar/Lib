
let router = require('express').Router();

// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to express API setups!',
    });
});

// Import book controller
var bookController = require('../Lib/server/book/bookController');
var subscriberController = require('../Lib/server/subscriber/subscriberController');

// book routes
router.route('/books')
    .get(bookController.index)
    .post(bookController.new);
// router.route('/books/:name')
//     .get(bookController.view)
//     .patch(bookController.update)
//     .put(bookController.update)
//     .delete(bookController.delete);

router.delete('/delete_book', bookController.delete);

    // book routes
router.route('/subscribers')
.get(subscriberController.index)
.post(subscriberController.new);
router.route('/subscribers/:name')
.get(subscriberController.view)
.patch(subscriberController.update)
.put(subscriberController.update )
.delete(subscriberController.delete);

// Export API routes
module.exports = router;