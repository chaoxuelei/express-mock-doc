# express-mock-doc

> express mockjs api 服务中间件

[![npm][npm-image]][npm-url]
[![node][node-image]][node-url]
[![license MIT][license-image]][license-url]



## 如何使用

### 安装

``` sh
$ npm install --save express-mock-doc
```

----

### 快速开始

1. 创建目录 `mock-server` 然后创建 `app.js` 内容如下：

``` js
const express = require('express'),
      mock = require('express-mock-doc'),
      bodyParser = require('body-parser'),
      apiList = require('./mocks/api.js');
const app = express();
      app.use(bodyParser.json());   //使用这个可以直接使用 req.body;
      app.use(mock(express,apiList))
      app.listen(3001)
```

2. 在 `api-server` 下创建 `mocks` 目录，然后创建 `api.js` 内容如下:

```js
var list = {
  "/getUserByUid/:uid":{
        eq:"/getUserByUid/1",
        type: "get",
        title: "根据用户id查询用户信息",
        data: (req)=>{
            return {
                "uid":req.params.uid,
                "name":"@cname"
            }
        }
    },
    "/login/":{
        type: "post",
        title: "用户登录接口",
        params:{
            loginId:"123456",
            password:"111111"
        },
        data: (req)=>{
            let returnData;
            if(req.body.loginId == "123456"&& req.body.password == "111111"){
              returnData =  {
                code:"1",
                msg:"login success",
                userInfo:""
              }
            }else{
              returnData =  {
                code:"0",
                msg:"login error",
              }
            }
             return returnData
        }
    },
 }
module.exports = list
```

3. 安装依赖模块

```sh
$ npm i -S express express-mock-doc
```

4. 启动

```sh
$ node app.js
# 或者，需要全局安装nodemon
$ nodemon app.js  

```

然后你可以访问 <http://localhost:3000/> 查看API文档。

上图：

![微信截图_20190522204102.png](https://i.loli.net/2019/05/22/5ce54854daa6f21914.png)

get请求
![微信截图_20190522203922.png](https://i.loli.net/2019/05/22/5ce54854e84f094641.png)


**推荐使用 [nodemon][nodemon] 监视自动重启服务**

----

### Mock JSON 文档

* [Mock.js 0.1 文档](https://github.com/nuysoft/Mock/wiki)  
* [Mock 例子](http://mockjs-lite.js.org/docs/examples.html)  

### 重点说明

>express-mock-doc 输出一个函数mock，传入两个参数，一个是express对象，另一个是指定的路由列表格式如下：

```js

var apiList={
  url:{ //路由支持exoress的router API的所有路由规则，如：“/getname”、“/getnameById/:id”、“/getnameById?id=12”
    eq:"",//示例路径，如果我们将url写成“/getnameById/:id”格式那么就必须包含eq参数，并且将其携程如“/getnameById/12”否则会出错。
    title:"",//接口名称描述
    data:"",//数据，支持mockjs语法，只要return是json就成，可以是函数
    params:""//如果是post或者需要传参的api在这里写参数仅支持json格式
  }
}
module.exports = apiList;

```


##感谢
[楼教主](https://github.com/52cik)
[license-url]: https://opensource.org/licenses/MIT
[license-image]: https://img.shields.io/badge/license-MIT-blue.svg
[npm-url]: https://www.npmjs.com/package/express-mock-doc
[npm-image]: https://img.shields.io/badge/npm-express--mock--doc-brightgreen.svg
[node-url]: https://nodejs.org
[node-image]: https://img.shields.io/badge/node-%3E%3D%200.10.0-brightgreen.svg
[nodemon]: https://nodemon.io
