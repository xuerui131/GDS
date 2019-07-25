import { Constants } from '../Common/Constants';
import axios from 'axios';

const baseUrl = Constants.APIBaseUrl;

export default async (url = '', data = {}, type = 'POST') => {
    type = type.toUpperCase();

    if(!/http/.test(url)){
        url = baseUrl + url;
    };

    if (type == 'GET') {
        let dataStr = ''; //数据拼接字符串
        Object.keys(data).forEach(key => {
            dataStr += key + '=' + data[key] + '&';
        })

        if (dataStr !== '') {
            dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
            url = url + '?' + dataStr;
        }
    };

    let requestConfig = {
        url: url,
        method: type,
        mode: 'cors',
        redirect: 'follow',
        // headers: {'Authorization': "123"}
    // credentials: 'include',
    }

    if (type == 'POST') {
        const params = {};
        Object.keys(data).forEach((key) => {
            params[key] = data[key];
        });

        requestConfig.data = params;
    }

    return new Promise((resolve, reject) => {
        axios(requestConfig).then((res) => {
            resolve(res.data);
        }).catch((err) => {
            console.error('error  服务器异常', err);
            reject(err);
        });
    });
}