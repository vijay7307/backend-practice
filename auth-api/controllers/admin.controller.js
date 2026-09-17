const admin = (req, res) => {
    console.log("now admin only do task at this route");
    res.status(200).json({
        message: "this is only admins space",
    });
};

module.exports = admin;