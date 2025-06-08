import * as echarts from "echarts";
import {useEffect, useRef} from "react";
export default function Bar({domId,title,options=[],answers=[]}) {
    const chartRef = useRef(null);
    
    useEffect(() => {
        const sum=new Array(options.length).fill(0);
        answers.forEach(a=>{
            sum[a]++;
        })
        
        const target=document.getElementById(domId);
        if (!target) {
            return;
        }
        
        if (chartRef.current) {
            chartRef.current.dispose();
        }
        
        const myChart = echarts.init(target);
        chartRef.current = myChart;
        
        const colorPalette = [
            '#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de',
            '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc', '#4e88b4'
        ];
        
        const option = {
            color: colorPalette,
            title: {
                text: title,
                left: "center",
                textStyle: {
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: '#333'
                },
                top: 10
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                },
                formatter: function(params) {
                    const idx = params[0].dataIndex;
                    return `${options[idx]}<br/>${params[0].marker} 选择人数: ${params[0].value} (${((params[0].value / answers.length) * 100).toFixed(1)}%)`;
                }
            },
            legend: {
                type: 'plain',
                orient: 'vertical',
                left: 10,
                top: 'center',
                itemWidth: 15,
                itemHeight: 15,
                itemGap: 10,
                data: options.map((opt, idx) => {
                    return {
                        name: opt,
                        itemStyle: {
                            color: colorPalette[idx % colorPalette.length]
                        }
                    };
                }),
                formatter: function(name) {
                    const idx = options.findIndex(opt => opt === name);
                    let displayName = name;
                    if (displayName.length > 12) {
                        displayName = displayName.substring(0, 12) + '...';
                    }
                    return `${String.fromCharCode(65 + idx)}. ${displayName}`;
                },
                textStyle: {
                    color: '#333',
                    fontSize: 12
                },
                selectedMode: false
            },
            grid: {
                left: '25%',
                right: '5%',
                bottom: '15%',
                top: '20%',
                containLabel: false
            },
            xAxis: {
                type: 'category',
                data: options.map((_, idx) => String.fromCharCode(65 + idx)),
                axisLabel: {
                    interval: 0,
                    rotate: 0,
                    textStyle: {
                        fontSize: 14,
                        fontWeight: 'bold',
                        color: '#333'
                    }
                },
                axisTick: {
                    alignWithLabel: true,
                    lineStyle: {
                        color: '#666'
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: '#666',
                        width: 2
                    }
                }
            },
            yAxis: {
                type: 'value',
                name: '选择人数',
                nameTextStyle: {
                    fontSize: 12,
                    color: '#333',
                    padding: [0, 0, 0, 30]
                },
                splitLine: {
                    lineStyle: {
                        type: 'dashed',
                        color: '#aaa'
                    }
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#666',
                        width: 2
                    }
                },
                axisTick: {
                    show: true,
                    lineStyle: {
                        color: '#666'
                    }
                },
                axisLabel: {
                    color: '#333'
                }
            },
            series: [{
                name: title,
                type: 'bar',
                barWidth: '40%',
                data: sum.map((value, index) => {
                    return {
                        value: value,
                        itemStyle: {
                            color: colorPalette[index % colorPalette.length]
                        }
                    };
                }),
                label: {
                    show: true,
                    position: 'top',
                    formatter: function(params) {
                        if (params.value > 0) {
                            return params.value;
                        }
                        return '';
                    },
                    textStyle: {
                        color: '#333',
                        fontWeight: 'bold'
                    }
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }]
        };
        
        myChart.setOption(option);
        
        const resizeHandler = function() {
            myChart.resize();
        };
        
        window.addEventListener('resize', resizeHandler);
        
        return () => {
            window.removeEventListener('resize', resizeHandler);
            if (chartRef.current) {
                chartRef.current.dispose();
            }
        };
    },[domId,title,options,answers])
    
    return (
        <div style={{ width: '100%', position: 'relative' }}>
            <div id={domId} style={{ width: '100%', height: '400px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', borderRadius: '8px', padding: '10px' }}></div>
        </div>
    );
}