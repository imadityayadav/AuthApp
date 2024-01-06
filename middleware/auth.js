//auth, isStudent, isAdmin

const jwt = require("jsonwebtoken");
require("dotenv").config();


exports.auth = (req,res,next)=>{
    try{
        //token extraction 1st way
        const token = req.body.token;

        if(!token){
            return res.status(401).josn({
                success:false,
                message:"Token Missing"
            })
        }

        //verify the token
        try{
            const payload = jwt.verify(token,process.env.JWT_SECRET);
            console.log(payload);

            req.user = payload;
        }catch(err){
            return res.status(401).json({
                success:false,
                message:'Token is invalid'
            });
        }
        next();
    } catch(err){
        return res.status(401).json({
            success:false,
            message:'Something went wrong, while verifying the token',
        })
    }
   
}


exports.isStudent = (req,res,isStudent)=>{
    try{
        if(req.user.role!= "Student"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for Student "
            })
        };

    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:'User role cannot be Varified'
        })
    }
}

exports.isAdmin = (req,res,isAdmin)=>{
    try{
        if(req.user.role!= "Admin"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for Admin "
            })
        };

    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:'User role cannot be Varified'
        })
    }
}