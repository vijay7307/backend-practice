const bcrypt = require("bcrypt");

const testPassward = async() => {
    const passward = "vijay123";

    console.log("passward : ", passward);

    const hash = await bcrypt.hash(passward, 10);

    console.log("hashed passward : ", hash);

    const correctPassward = await bcrypt.compare("vijay123", hash);

    console.log("correct passward : ", correctPassward);

}

testPassward();