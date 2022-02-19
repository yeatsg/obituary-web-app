module.exports = (req,res,next) => {
    if (!req.body.floridaMan) {
        req.body.floridaMan = false
    } else if (req.body.floridaMan === 'on') {
        req.body.floridaMan = true
    } else {
        req.body.floridaMan = false
    };
    console.log("Results of checkboxCheck:", results);
    console.log("req.body", req.body);
    next();
    }