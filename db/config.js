// require is a built in function that is used to import modules
const mongoose = require('mongoose');
var conn = mongoose.connect("mongodb+srv://dheerajjeena930:dheerajjeena00@cluster0.uggffsw.mongodb.net/testing?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("connection successfully....."))
    .catch((err) => console.log(err));


module.exports = conn; 