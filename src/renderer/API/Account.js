/**
 * @file $INfO$
 * @author zhangchaowei
 * @copyright QiYu Times Technology Ltd.
 * 2017/6/20
 * $END$
 */

import request from 'axios';

const host = process.env.NODE_ENV === 'development' ? '/api' : 'http://npm-serve.weibangong.me';

export function login(params) {
    return request({
        method: 'post',
        url: `${host}/login`,
        data: params,
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        }
    });
}


