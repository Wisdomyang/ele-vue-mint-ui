// 区分环境变量
let config = {},service = {}

config.mode = location.hostname;
let localhost = "localhost";

switch (config.mode){
    case localhost:
        config.domain = 'localhost';
        service.commonService = 'http://cangdu.org:8001';
        service.imgBaseUrl = 'https://fuss10.elemecdn.com';
}

config.service = service;


export {config}