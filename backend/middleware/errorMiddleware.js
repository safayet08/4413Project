const notFound=(req,res,next)=>{
    const error= new Error(`Not Found ${req.originalUrl}`)
    res.status(404)

    console.log("IN NOT FOUND")


    next(error)
}

const errorHandler=(err,req,res,next)=>{
    const statusCode= res.statusCode===200?500:res.statusCode
    console.log("IN ERROR FOUND")
    console.log(err)
    res.status(statusCode)

    res.json({
        message:err.message,
        stack: process.env.NODE_ENV==='production'? null: err.stack,
    })

}

export {notFound, errorHandler}
