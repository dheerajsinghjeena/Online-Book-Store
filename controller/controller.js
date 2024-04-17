// importing express
const express = require('express');

//importing cookies 
const cookieParser = require('cookie-parser');

// importing session parser
const session = require('express-session'); 

// requiring multer for file handling
const multer = require('multer');

// importing signup.js to our file 
const signup = require('../model/signup');

// importing contact.js to our file 
const contact = require('../model/contact');


// importing add product to our file 
const addProduct = require('../model/add_product');

const router = express.Router();

// creating cookies and session 
router.use(cookieParser()); 
router.use(session({
    key: "user_sid", 
    secret: "somerandonstuffs", 
    resave: false, 
    saveUninitialized: false, 
    cookie: {
        expires: 10000, 
    }
}));

// this provide the base url 
router.get('/', function (req, res) {
    res.render('index');
});

// contact-us page
router.get('/contact', function (req, res) {
    res.render('contact_us');
});

router.post('/contact', (req, res) => {
    var contact_us = {
        username: req.body.username,
        address: req.body.address,
        contact: req.body.contact,
        message: req.body.query
    };

    var contact_post = new contact(contact_us);
    contact_post.save()
        .then(() =>
            res.json("contact us is successfully done"))
        .catch(err => res.status(400).json('error' + err));
});

// signup page
router.get('/sign-up', function (req, res) {
    res.render('sign-up');
});

// now posting the form 
router.post('/signup', (req, res) => {
    var sign_up = {
        first_name: req.body.f_name,
        last_name: req.body.l_name,
        dob: req.body.dob,
        email: req.body.email,
        address: req.body.address,
        password: req.body.password,
        confirm_password: req.body.confirm_password
    };

    var regpost = new signup(sign_up);
    regpost.save()
        .then(() =>
            res.redirect("/"))
        // res.json('register successfully'))
        .catch(err => res.status(400).json('error' + err));
});

router.get('/collection', async (req, res) => {
    try {
        // Initialize an empty object to store one book per category
        const uniqueBooks = {};

        // Fetch all books from the database
        const allBooks = await addProduct.find({});

        // Iterate through each book
        allBooks.forEach(book => {
            // Check if a book of this category is already stored
            if (!uniqueBooks[book.bookType]) {
                // If not, store this book for this category
                uniqueBooks[book.bookType] = book;
            } else {
                // If a book of this category is already stored, compare their IDs
                // Replace the stored book with this one if its ID is greater
                if (book._id > uniqueBooks[book.bookType]._id) {
                    uniqueBooks[book.bookType] = book;
                }
            }
        });

        // Convert the object of unique books back to an array
        const uniqueBooksArray = Object.values(uniqueBooks);

        // Render the page with the unique books
        res.render('all_collection', { viewData: uniqueBooksArray });
    } catch (err) {
        console.log(err);
    }
});


// fiction page
router.get('/fiction', async (req, res) => {
    try {
        const storeData = await addProduct.find({ bookType: "fiction" });
        res.render('fiction', { viewData: storeData });
    }
    catch (err) {
        console.log(err.message);
    }

});

// autobiography page
router.get('/autobiography', async (req, res) => {
    // res.render('autobiography');
    try {
        const storeData = await addProduct.find({ bookType: "biography" });
        res.render('autobiography', { viewData: storeData });
    }
    catch (err) {
        console.log(err.message);
    }
});

// literature page
router.get('/literature', async (req, res) => {
    // res.render('literature');
    try {
        const storeData = await addProduct.find({ bookType: "literature" });
        res.render('literature', { viewData: storeData });
    }
    catch (err) {
        console.log(err.message);
    }
});

// romance book page
router.get('/love', async (req, res) => {
    // res.render('love_romance');
    try {
        const storeData = await addProduct.find({ bookType: "love and romance" });
        res.render('love_romance', { viewData: storeData });
    }
    catch (err) {
        console.log(err.message);
    }
});

// cooking book
router.get('/cooking', async (req, res) => {
    // res.render('cooking');
    try {
        const storeData = await addProduct.find({ bookType: "cooking" });
        res.render('cooking', { viewData: storeData });
    }
    catch (err) {
        console.log(err.message);
    }
});

// stock market
router.get('/share-market', async (req, res) => {
    // res.render('share_market');
    try {
        const storeData = await addProduct.find({ bookType: "share market" });
        res.render('share_market', { viewData: storeData });
    }
    catch (err) {
        console.log(err.message);
    }
});

// tour and travel
router.get('/tour-travel', async (req, res) => {
    // res.render('tour_travel');
    try {
        const storeData = await addProduct.find({ bookType: "travel" });
        res.render('tour_travel', { viewData: storeData });
    }
    catch (err) {
        console.log(err.message);
    }
});

// kids and comics
router.get('/kids-comic', async (req, res) => {
    // res.render('kids_comic');
    try {
        const storeData = await addProduct.find({ bookType: "kids" });
        res.render('kids_comic', { viewData: storeData });
    }
    catch (err) {
        console.log(err.message);
    }
});

// spare book page 
router.get('/spare-book', function (req, res) {
    res.render('spareBook');
});

// about-us page
router.get('/about-us', function (req, res) { 
    res.render('about_us');
});

// ------------ SINGLE PRODUCT DETAILS ----------------
// for fiction books
router.get('/view_book/:id', async (req, res) => {
    try {
        const viewMore = await addProduct.findById(req.params.id);
        res.render('viewBook', { singleDetail: viewMore });
        // console.log(updateData);
    }

    catch (err) {
        console.log(err);
    }
});


// ------------- LOGIN OF USER -----------------
router.post('/login', async (req, res) => {
    var email = req.body.email, password = req.body.password;

    try {
        var login = await signup.findOne({ email: email })
            .exec();
        if (!login) {
            res.redirect('/');
        }


        login.comparePassword(password, (error, match) => {
            if (!match) {
                res.redirect('/');
            }
        }); 

        // creating a session for user 
        req.session.login = login; 

        res.redirect('/admin');
    }
    catch (err) {
        console.log(err);
    }
});

// ------------ LOGOUT USER ------------------
router.get('/logout', (req, res) => {
    if(req.session.login && req.cookies.user_sid){
        res.clearCookie('user_sid');
        res.redirect('/');
    }
    else{
        res.redirect('/');
    }
})

// ------------ DASHBOARD OR ADMIN SECTION ---------------------

// admin login panel
router.get('/admin', function (req, res) {
    if(req.session.login && req.cookies.user_sid) {
        res.render('dashboard/index');
    }
    else{
        res.redirect('/');
    }
});

// add_product page
router.get('/add_product', function (req, res) {
    if(req.session.login && req.cookies.user_sid) {
        res.render('./dashboard/add-product');
    }
    else{
        res.redirect('/');
    }
});

// uploading images for add product
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload');
    },

    filename: function (req, file, cb) {
        cb(null, file.originalname);
        // cb(null, uuidv4()+'-'+ Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
}
let upload = multer({ storage, fileFilter });

// post api for add product
router.post('/addProduct', upload.single('image'), (req, res) => {
    var addingProducts = {
        bookName: req.body.book_name,
        bookId: req.body.book_id,
        bookPrice: req.body.bookPrice,
        bookAuthor: req.body.bookAuthor,
        bookType: req.body.type,
        bookLeft: req.body.stock,
        image: req.file.filename
    };

    var addProductPost = new addProduct(addingProducts);
    addProductPost.save()
        .then(() => res.json("new products are added successfully"))
        .catch(err => res.status(400).json('error' + err));
});

// view_product page
router.get('/view_product', async (req, res) => {
    if(req.session.login && req.cookies.user_sid) {
        try {
            const storeData = await addProduct.find({});
            res.render('./dashboard/view-product', { viewData: storeData });
            // console.log(storeData); 
        }
        catch (err) {
            console.log(err);
        }
    }
    else{
        res.redirect('/');
    }
    

});

// view_query page
router.get('/view_query', async (req, res) => {

    if(req.session.login && req.cookies.user_sid) {
        try {
            const storeData = await contact.find({});
            res.render('./dashboard/view-query', { viewData: storeData });
            // console.log(storeData);
        }
        catch (err) {
            console.log(err);
        }
    }
    else{
        res.redirect('/');
    }
    
    
});

// view_registration page
router.get('/view_registration', async (req, res) => {
    if(req.session.login && req.cookies.user_sid) {
        try {
            const storeData = await signup.find({});
            res.render('./dashboard/view-registration', { viewData: storeData });
            // console.log(storeData);
        }
        catch (err) {
            console.log(err);
        }
    }
    else{
        res.redirect('/');
    }
});

// --------- UPDATING DATA API ------------------

// edit product (in this we get the data from our collection)
router.get('/edit_product/:id', async (req, res) => {
    try {
        const updateData = await addProduct.findById(req.params.id);
        res.render('./dashboard/edit-product', { updateData: updateData });
        // console.log(updateData);
    }
    catch (err) {
        console.log(err);
    }
});



// posting edit product to view edit page 
router.post('/edit_product/:id', upload.single('image'), async (req, res) => {

    let allData;

    if (req.file) {
        allData = {
            bookName: req.body.book_name,
            bookId: req.body.book_id,
            bookPrice: req.body.bookPrice,
            bookAuthor: req.body.bookAuthor,
            bookType: req.body.type,
            bookLeft: req.body.stock,
            image: req.file.filename
        };
    }
    else {
        allData = {
            bookName: req.body.book_name,
            bookId: req.body.book_id,
            bookPrice: req.body.bookPrice,
            bookAuthor: req.body.bookAuthor,
            bookType: req.body.type,
            bookLeft: req.body.stock,
        };
    }

    const itemId = req.params.id;

    try {
        const addData = await addProduct.findByIdAndUpdate(itemId, allData, { new: true });

        if (!addData) {
            return res.status(404).json({ message: 'item not found' });
        }
        res.redirect('/view_product');
    }
    catch (err) {
        res.status(500).json({ message: 'server error' });
    }
});

// get request to update the new user registration data
router.get('/edit_register/:id', async (req, res) => {
    try {
        const updateData = await signup.findById(req.params.id);
        res.render('./dashboard/edit-signup', { updateData: updateData });
        console.log(updateData);
    }
    catch (err) {
        console.log(err);
    }
});

// redirecting to user registration details
router.post('/edit_register/:id', async (req, res) => {

    const itemId = req.params.id;

    const allData = {
        first_name: req.body.f_name,
        last_name: req.body.l_name,
        dob: req.body.dob,
        email: req.body.email,
        address: req.body.address
    };

    try {
        const addData = await signup.findByIdAndUpdate(itemId, allData, { new: true });

        if (!addData) {
            return res.status(404).json({ message: 'item not found' });
        }
        res.redirect('/view_registration');
    }
    catch (err) {
        res.status(500).json({ message: 'server error' });
    }
});


// API TO DELETE DATA 

// for registration 
router.get("/delete_register/:id", async (req, res) => {
    try {
        const deleteData = await signup.findByIdAndDelete(req.params.id);
        res.redirect('/view_registration');
    }
    catch (err) {
        console.log(err);
    }
});

// for view product
router.get("/delete_product/:id", async (req, res) => {
    try {
        const deleteData = await addProduct.findByIdAndDelete(req.params.id);
        res.redirect('/view_product');
    }
    catch (err) {
        console.log(err);
    }
});

// for view query
router.get("/delete_query/:id", async (req, res) => {
    try {
        const deleteData = await contact.findByIdAndDelete(req.params.id);
        res.redirect('/view_query');
    }
    catch (err) {
        console.log(err);
    }
});




// exporting module
module.exports = router; 