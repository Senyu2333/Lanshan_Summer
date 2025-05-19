import React from 'react'
import {Helmet} from "react-helmet";
export default function NotFoundPage() {
    return (
        <div style={{textAlign:'center'}}>
            <Helmet>
                <title>Not Found</title>
            </Helmet>
            <h1>404</h1>
            <p>抱歉，没有找到此页面。</p>
        </div>
    )
}