
export const appUtils = {
    // 深拷贝
    deepCopy(o) {
        if (this.preciseJudgmentType(o) === 'Array') {
            let n = [];
            for (let item of o) {
                n.push(this.deepCopy(item));
            }
            return n;
        } else if (this.preciseJudgmentType(o) === 'Object') {
            let n = {};
            for (let key in o) {
                n[key] = this.deepCopy(o[key]);
            }
            return n;
        } else {
            return o;
        }
    },
    // 精确判断类型
    preciseJudgmentType(val) {
        switch (Object.prototype.toString.call(val)) {
            case "[object String]":
                return 'String';
                break;
            case "[object Number]":
                return 'Number';
                break;
            case "[object Boolean]":
                return 'Boolean';
                break;
            case "[object Undefined]":
                return 'Undefined';
                break;
            case "[object Symbol]":
                return 'Symbol';
                break;
            case "[object Object]":
                return 'Object';
                break;
            case "[object Null]":
                return 'Null';
                break;
            case "[object Array]":
                return 'Array';
                break;
            case "[object Date]":
                return 'Date';
                break;
            case "[object RegExp]":
                return 'RegExp';
                break;
            case "[object Function]":
                return 'Function';
                break;
        }
    },
    
    sortByKey(key, param = 'up') {
        return function (obj1, obj2) {
            var value1 = obj1[key]
            var value2 = obj2[key]
            if (value1 < value2) {
                if (param === 'up') {
                    return -1;
                } else {
                    return 1;
                }
            } else if (value1 > value2) {
                if (param === 'up') {
                    return 1;
                } else {
                    return -1;
                }
            } else {
                return 0;
            }
        }
    },

    // 生成uuid
    getUniqueId() {
        let d = Date.now();
        let uuid = 'xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = (d + Math.random() * 16) % 16 | 0;
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    },

    goBack() {
        window.isBack = true;
        window.history.back();
    }



}