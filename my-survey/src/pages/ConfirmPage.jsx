import React from 'react';
import Helmet from 'react-helmet';
import Axios from 'axios';
export default function ConfirmPage() {
    return (
        <div>
            <Helmet>
                验证页
            </Helmet>
            <div>
                <h1>验证页</h1>
                <div>
                    <h2>请输入提问人设置的密码</h2>
                    <input/>
                </div>
            </div>
        </div>

    )
}