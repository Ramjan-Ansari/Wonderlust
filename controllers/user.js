const User = require("../models/user");

module.exports.renderSignUpForm = (req, res)=>{
    res.render("./users/singup.ejs");
}

module.exports.signUp = async (req, res)=>{
    try{
    let  {username, password, email } = req.body;
    const newUser = new User({ email, username });
    const registredUser = await User.register(newUser, password);
    // console.log(registredUser);
    req.login(registredUser, (err)=>{
        if(err){
            return next(err);
        }
        req.flash("success", "WelCome to WonderLust");
        res.redirect("/listings");
    });
    }catch (e){
        req.flash("error", "e.message");
        res.redirect("/signup");
    }
}


module.exports.renderLoginForm = (req, res)=>{
    res.render("./users/login.ejs");
}

module.exports.logIn = async (req, res)=>{
    req.flash("sucess", "Welcome to again Wonderlust");
    // let redirectUrl = req.locals.redirectUrl || "/listings";
    // res.redirect(redirectUrl); //listings
    res.redirect("/listings");
}

module.exports.logOut = (req,res,next)=>{
   req.logout((err)=>{
    if(err){
        next(err);
    }
    req.flash("success", "you logged in page");
    res.redirect("/listings");
   })

}