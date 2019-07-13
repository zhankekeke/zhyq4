import axios from 'axios';

const http = axios.create({
    //baseURL: 'http://localhost:8888/api/private/v1/'
});

http.interceptors.request.use(function (config) {
    let token = getCookie('m-cjdiirppoem');
    if(!token){
          window.location.href = '/login';
    }
    if (config.url !== '/login' && token) {
       config.headers['Authorization'] = token;
    }
    return config
}, function (error) {

    return Promise.reject(error)
});

const httpPlugin = {};

httpPlugin.install = function (Vue, options) {
    // 3. 添加实例方法
    Vue.prototype.$_sendQuery_$ = http
};

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

const validatestr = (rule, value, callback) => {
    let regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im;
    let regCn = /[·！#￥（——）：；“”‘、， |《。》？、【】[\]]/im;
    if (regEn.test(value) || regCn.test(value)) {
        callback('名称包含非法字符');
    } else {
        callback();
    }
};

export default httpPlugin;