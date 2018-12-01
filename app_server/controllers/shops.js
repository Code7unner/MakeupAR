/* GET home page */
module.exports.homelist = function(req, res){
  res.render('shop-list', {
    title: 'Limbus - help with buying cosmetics',
    pageHeader: {
      title: 'Limbus',
      strapline: 'Help people with buying cosmetics'
    },
    sidebar: "Looking for beautiful cosmetics? Limbus helps you to find places to choose good one.",
    shops: [{
      name: 'Avon',
      rating: 3,
      facilities: ['Bright colors', 'Cheap cosmetics']
    }
    ]
  });
};

module.exports.shopinfo = function(req, res){
    res.render('shop-info', {
        title: 'Avon',
        pageHeader: {
            title: 'Avon',
        },
        sidebar: {
            contex: 'is on Limbus because...',
            callToAction: 'If you\'ve been and you like it - or if you don\'t - please leave a review ' +
            'to help other people just like you.'
        },
        shop: {
            name: 'Avon',
            rating: 3,
            facilities: ['Bright colors', 'Cheap cosmetics'],
            reviews: [{
                author: 'Petya Seleznyev',
                rating: 4,
                timestamp: '23 Audust 2018',
                reviewText: 'What a great place. I can\'t say enough good things about it.'
            }, {
                author: 'Vovan',
                rating: 5,
                timestamp: '23 Audust 2018',
                reviewText: 'It was okay. Cosmetics wasn\'t great, but the prog was fast.'
            }]
        }
    })
};

module.exports.shoptestlips = function(req, res) {
    res.render('shop-test-lips' , {
        title: 'Shop test',
        pageHeader: {
            title: 'Test product'
        }
    })
};

module.exports.shoptesteyebrows = function(req, res) {
    res.render('shop-test-eyebrows' , {
        title: 'Shop test',
        pageHeader: {
            title: 'Test product'
        }
    })
};

module.exports.shoprange = function(req, res) {
    res.render('shop-range', {
       title: 'Shop range',
       pageHeader: {
           title: 'Shop range'
       }
    });
};

module.exports.viewgoods = function(req, res){
    res.render('shop-review-goods', {
      title: 'Shop review',
      pageHeader: {
        title: 'Review Avon'
      }
    });
};


