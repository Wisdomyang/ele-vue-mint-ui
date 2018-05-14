// 区分环境变量
let config = {}

config.mode = location.hostname;
let localhost = "localhost";

switch (config.mode){
    case localhost:
        config.domain = 'localhost';
}

export {config}