import React from "react";
import Helmet from 'react-helmet';
export default function ForbiddenPage() {
    return (
        <div style={{textAlign:'center'}}>
            <Helmet>
                <title>Forbidden</title>
            </Helmet>
            <h1>403</h1>
            <p>抱歉，你无权访问此页面。</p>
        </div>
    )
}