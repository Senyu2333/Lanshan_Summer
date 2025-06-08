import * as echarts from "echarts";
import {useEffect} from "react";
export default function Pie({domId,title,options=[],answers=[]}) {
    useEffect(() => {
        const sum=new Array(options.length).fill(0);
        answers.forEach(a=>{
            sum[a]++;
        })
        const data=options.map((option,index)=>({
            name:option,
            value:sum[index]
        }))
        const target=document.getElementById(domId);
        if(!target){
            return;
        }
        const myChart = echarts.init(target);
        
        const colorPalette = [
            '#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de',
            '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc', '#4e88b4'
        ];
        
        const option={
            title:{
                text:title,
                left:"center",
                textStyle: {
                    fontSize: 16,
                    fontWeight: 'bold'
                }
            },
            tooltip:{
                trigger: 'item',
                formatter: '{b}: {c} ({d}%)',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                borderColor: '#ccc',
                borderWidth: 1,
                textStyle: {
                    color: '#333'
                },
                extraCssText: 'box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);'
            },
            legend:{
                orient:'vertical',
                left:'left',
                top: 'middle',
                textStyle: {
                    fontSize: 12,
                    color: '#333'
                },
                itemWidth: 15,
                itemHeight: 15,
                itemGap: 12,
                formatter: function(name) {
                    // 计算百分比
                    const item = data.find(item => item.name === name);
                    const total = data.reduce((total, item) => total + item.value, 0);
                    const percent = ((item.value / total) * 100).toFixed(0);
                    
                    // 如果名称太长，截断显示
                    let displayName = name;
                    if (name.length > 12) {
                        displayName = name.substring(0, 12) + '...';
                    }
                    
                    return `${displayName}: ${percent}%`;
                },
                tooltip: {
                    show: true,
                    formatter: function(params) {
                        return params.name;
                    }
                }
            },
            grid: {
                left: '25%',  // 为左侧图例留出空间
                right: '5%',
                bottom: '5%',
                top: '20%',
                containLabel: false
            },
            series:[{
                data:data,
                name:title,
                type:'pie',
                radius:['40%', '70%'], // 环形图
                center: ['60%', '55%'], // 将饼图向右移动
                avoidLabelOverlap: true,
                itemStyle: {
                    borderRadius: 8,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: true,
                    formatter: '{d}%',
                    position: 'outside',
                    color: '#333',
                    fontWeight: 'bold'
                },
                labelLine: {
                    show: true,
                    length: 15,
                    length2: 10,
                    lineStyle: {
                        color: '#666',
                        width: 1
                    }
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 14,
                        fontWeight: 'bold'
                    },
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                color: colorPalette,
                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDelay: function (idx) {
                    return Math.random() * 200;
                }
            }]
        };
        myChart.setOption(option);
        
        window.addEventListener('resize', function() {
            myChart.resize();
        });
        
        return () => {
            window.removeEventListener('resize', function() {
                myChart.resize();
            });
            myChart.dispose();
        }
    },[domId,title,options,answers]);
    return (
        <div id={domId} style={{ width: '100%', height: '400px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', borderRadius: '8px', padding: '10px' }}></div>
    );
}