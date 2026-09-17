const viewProfile = (req, res) => {
    console.log("profile route hitted only user, admin hit that route.");
    res.status(200).json({
        message : "you must be a user or admin"
    })
}

module.exports = viewProfile;