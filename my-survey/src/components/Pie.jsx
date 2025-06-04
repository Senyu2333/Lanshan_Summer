import * as echarts from "echarts";
import {useEffect} from "react";
export default function Pie({domId,title,options=[],answers=[]}) {
    useEffect(() => {
        const sum=new Array(options.length);
        answers.forEach(a=>{
            sum[a]++;
        })
        const data=options.map((index,option)=>({
            name:option,
            value:sum[index]
        }))
        const target=document.getElementById(domId);
        if(!target){
            return;
        }
        const myChart = echarts.init(target);
        const option={
            title:{
                text:title,
                left:"center",
            },
            tooltip:{
                trigger: 'item',
            },
            legend:{
                orient:'vertical',
                left:'center',
            },
            data:data
        };
        myChart.setOption(option);
        return ()=>myChart.dispose()
    },[domId,title,options,answers]);
    return (
        <div id={domId} style={{ width: '100%', height: '400px' }}></div>
    );
}