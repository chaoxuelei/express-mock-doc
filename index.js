var path = require('path'),
    fs = require('fs'),
    Mock = require('mockjs'),
    Random = Mock.Random;
    function mock(express,routerList){
        var router = express.Router();
            if(!routerList) return console.warn('express-moc-doc:      router is not null');
            router.get('/',function(req,res,next){
                let menuList = new Array();
                for(index in routerList){
                    routerList[index].url = index;
                    menuList.push(routerList[index]);
                };
                let template = fs.readFileSync(path.join(__dirname, 'doc.html'), 'utf8');
                return res.end(template.replace('@menuList', JSON.stringify(menuList))); 
            });
            for(index in routerList){
                let method = routerList[index].type,
                    data = routerList[index].data;
                    router[method](index,(req,res,next) =>{
                    if (req.method === 'OPTIONS') {
                        return res.send('');
                    };
                    if (data) {
                        // transfer data,avoid return pollute
                        let _data = data;
                        if (typeof data === 'function') {
                            data = data(req, Mock, Random);
                        }
                        res.json(Mock.mock(data))
                        data = _data;
                    } else {
                        next();
                    }
                });
            }
            return router
    };
module.exports = mock
