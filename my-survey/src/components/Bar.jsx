import * as echarts from "echarts";
import {useEffect} from "react";
export default function Bar({domId,title,options=[],answers=[]}) {
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
        if (!target) {
            return;
        }
        const myChart = echarts.init(target);
        
        // 渐变色配置
        const colorGradients = [];
        for (let i = 0; i < options.length; i++) {
            const colorIndex = i % 5;
            let startColor, endColor;
            
            switch (colorIndex) {
                case 0:
                    startColor = '#83bff6';
                    endColor = '#188df0';
                    break;
                case 1:
                    startColor = '#9fe6b8';
                    endColor = '#1da57a';
                    break;
                case 2:
                    startColor = '#ffdb5c';
                    endColor = '#ff9f43';
                    break;
                case 3:
                    startColor = '#ff9f9f';
                    endColor = '#f44336';
                    break;
                case 4:
                    startColor = '#a29bfe';
                    endColor = '#6c5ce7';
                    break;
            }
            
            colorGradients.push({
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                    { offset: 0, color: startColor },
                    { offset: 1, color: endColor }
                ]
            });
        }
        
        const option = {
            title: {
                text: title,
                left: "center",
                textStyle: {
                    fontSize: 16,
                    fontWeight: 'bold'
                },
                top: 10
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                },
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                borderColor: '#ccc',
                borderWidth: 1,
                textStyle: {
                    color: '#333'
                },
                formatter: function(params) {
                    return `${params[0].name}<br/>${params[0].marker} 选择人数: ${params[0].value} (${((params[0].value / answers.length) * 100).toFixed(1)}%)`;
                },
                extraCssText: 'box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);'
            },
            grid: {
                left: '5%',
                right: '5%',
                bottom: '10%',
                top: '20%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: options.map((opt, idx) => String.fromCharCode(65 + idx) + '. ' + opt),
                axisLabel: {
                    interval: 0,
                    rotate: options.length > 5 ? 30 : 0,
                    textStyle: {
                        fontSize: 12
                    }
                },
                axisTick: {
                    alignWithLabel: true
                },
                axisLine: {
                    lineStyle: {
                        color: '#ddd'
                    }
                }
            },
            yAxis: {
                type: 'value',
                name: '选择人数',
                nameTextStyle: {
                    fontSize: 12,
                    padding: [0, 0, 0, 30]
                },
                splitLine: {
                    lineStyle: {
                        type: 'dashed',
                        color: '#eee'
                    }
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                }
            },
            series: [{
                name: title,
                type: 'bar',
                data: sum,
                barWidth: '40%',
                itemStyle: {
                    color: function(params) {
                        return colorGradients[params.dataIndex % colorGradients.length];
                    },
                    borderRadius: [4, 4, 0, 0]
                },
                label: {
                    show: true,
                    position: 'top',
                    formatter: function(params) {
                        if (params.value > 0) {
                            return params.value;
                        }
                        return '';
                    }
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                animationDelay: function(idx) {
                    return idx * 100;
                }
            }],
            animationEasing: 'elasticOut',
            animationDelayUpdate: function(idx) {
                return idx * 5;
            }
        }
        myChart.setOption(option);
        
        // 响应式调整
        window.addEventListener('resize', function() {
            myChart.resize();
        });
        
        return () => {
            window.removeEventListener('resize', function() {
                myChart.resize();
            });
            myChart.dispose();
        };
    },[domId,title,options,answers])
    return (
        <div id={domId} style={{ width: '100%', height: '400px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', borderRadius: '8px', padding: '10px' }}></div>
    );

}