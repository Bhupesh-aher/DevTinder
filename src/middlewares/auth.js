const adminAuth = (req, res, next) => {
    console.log("admin auth is getting checked");
    const tokens = "xyz";
    const isAdminAuthorized = tokens === "xyz";
    if(!isAdminAuthorized){
        res.status(401).send("unauthorized request");
    }
    else{
        next();
    }  
}


const userAuth = (req, res, next) => {
    console.log("User auth is getting checked");
    const tokens = "xyz";
    const isAdminAuthorized = tokens === "xyz";
    if(!isAdminAuthorized){
        res.status(401).send("unauthorized request");
        // console.log("jshds");
        
    }
    else{
        next();
        
        
    }  
}

module.exports = {
    adminAuth, 
    userAuth
}