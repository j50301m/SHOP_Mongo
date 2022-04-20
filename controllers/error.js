exports.get404=(req,res,next) =>{
    //res.status(404).sendFile(path.join(rootDir,"views","404.html"));
    res.status(404).render("404",{docTitle:"網頁不見了",breadcrumb:null});
}