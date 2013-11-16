exports.fiveHundy = function(req, res){
    res.status(500).render('500');
};

exports.fourOhFour = function(req, res){
    res.status(404).render('404');
};

exports.errorHandler = function(err, req, res, next){
    console.error(err.stack);
    res.status(500).render('500');
}
