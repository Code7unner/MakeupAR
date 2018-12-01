/* GET about page */
module.exports.about = function(req, res){
    res.render('generic-text', {
        title: 'About Limbus',
        content: 'Limbus was created to help people choose the right cosmetic.'
    });
};
