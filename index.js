var path = require('path'),
    fs = require('fs'),
    Mock = require('mockjs'),
    Random = Mock.Random;
    function mock(express,routerList){
        var router = express.Router();
            if(!routerList && typeof(routerList) != "Array") return console.warn('router is not null and must is array');
                router.get('/',function(req,res,next){
                    let menuList = new Array();
                    for(index in routerList){
                        routerList[index].url = index;
                        menuList.push(routerList[index]);
                    };
                    let template = fs.readFileSync(path.join(__dirname, 'doc.html'), 'utf8');
                    return res.end(template.replace('@menuList', JSON.stringify(routerList))); 
                });
            for(index in routerList){
                let method = routerList[index].type,
                    data = routerList[index].data;
                router[method](index,(req,res,next) =>{
                    res.set('Access-Control-Allow-Origin', '*');
                    res.set('Access-Control-Allow-Methods', 'GET,HEAD,PUT,POST,DELETE,PATCH');
                    if (req.headers['access-control-request-headers']) {
                        res.set('Access-Control-Allow-Headers', allowedHeaders);
                    };
                    if (req.method === 'OPTIONS') {
                        return res.send('');
                    };
                    
                    if (data) {
                        if (typeof data === 'function') {
                            data = data(req, Mock, Random);
                        }
                        console.log(data)
                        res.json(Mock.mock(data))
                    } else {
                        next();
                    }
                });
            }
            return router
    };
module.exports = mock