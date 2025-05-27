import React, { useRef, useEffect, useState } from 'react'

/**
 * 定位题组件
 * - 自动调用 BMapGL.Geolocation 获取当前点（GPS+IP 混合）
 * - 渲染到地图上并把坐标写回 question.answer
 */
export default function Locate({ question, onChange, onDelete, viewOnly=false }) {
    const mapRef = useRef(null)
    const mapInstance = useRef(null)
    const markerRef = useRef(null)
    const [location, setLocation] = useState(null)

    // 第一次渲染时，初始化地图
    useEffect(() => {
        if (!mapRef.current) return
        mapInstance.current = new window.BMapGL.Map(mapRef.current)
        // 默认给个全中国视野
        mapInstance.current.centerAndZoom(new window.BMapGL.Point(116.404, 39.915), 5)

        // 如果是查看模式且有答案，显示答案位置
        if (viewOnly && question.answer) {
            const pt = new window.BMapGL.Point(
                question.answer.longitude,
                question.answer.latitude
            )
            mapInstance.current.centerAndZoom(pt, 15)
            const marker = new window.BMapGL.Marker(pt)
            mapInstance.current.addOverlay(marker)
            markerRef.current = marker
            setLocation(question.answer)
        }
    }, [viewOnly, question.answer])

    const handleLocate = () => {
        if (!window.BMapGL.Geolocation) {
            return alert('请先在 index.html 中正确引入 BMapGL 脚本')
        }

        const geo = new window.BMapGL.Geolocation()
        // 开启 SDK 辅助定位（更高精度）
        geo.enableSDKLocation()

        geo.getCurrentPosition(function (r) {
            if (this.getStatus() !== window.BMAP_STATUS_SUCCESS) {
                return alert('定位失败，状态码：' + this.getStatus())
            }

            const pt = r.point
            const newLocation = {
                longitude: pt.lng,
                latitude: pt.lat,
            }
            
            // 更新状态
            setLocation(newLocation)
            
            if (!viewOnly) {
                // 更新父组件 state
                onChange({
                    ...question,
                    answer: newLocation,
                })
            }

            // 在地图上渲染
            mapInstance.current.centerAndZoom(pt, 15)

            // 如果之前有 marker，就先移除
            if (markerRef.current) {
                mapInstance.current.removeOverlay(markerRef.current)
            }
            const marker = new window.BMapGL.Marker(pt)
            mapInstance.current.addOverlay(marker)
            markerRef.current = marker
        })
    }

    return (
        <div style={{
            border: '1px solid #d1d5db',
            padding: '0.75rem',
            marginBottom: '1rem',
            borderRadius: '0.5rem'
        }}>
            {!viewOnly && (
                <button 
                    onClick={onDelete} 
                    title="删除此题" 
                    type={'button'} 
                    style={{
                        float: 'right',
                        padding: '0.25rem',
                        color: '#9ca3af',
                        border: 'none',
                        background: 'none',
                        cursor: 'pointer'
                    }}
                >🗑️</button>
            )}
            {!viewOnly && (
                <textarea
                    placeholder="请输入题干"
                    value={question.title}
                    onChange={e => onChange({ ...question, title: e.target.value })}
                    style={{
                        width: '100%',
                        minHeight: '40px',
                        padding: '8px 12px',
                        resize: 'none',
                        borderRadius: '8px',
                        border: '1px solid #d1d5db',
                        outline: 'none',
                        transition: 'border-color 0.2s',
                        fontSize: '16px',
                        lineHeight: '1.5',
                        marginBottom: '0.5rem'
                    }}
                />
            )}
            <div style={{ marginBottom: '0.5rem' }}>
                <button 
                    onClick={handleLocate} 
                    type={'button'}
                    style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#1890ff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '0.25rem',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s'
                    }}
                >
                    🔍 {viewOnly ? '获取我的位置' : '获取并标注当前定位'}
                </button>
            </div>
            <div
                ref={mapRef}
                style={{
                    width: '100%',
                    height: '300px',
                    backgroundColor: '#eee',
                    marginBottom: '0.5rem',
                    borderRadius: '0.25rem'
                }}
            />
            {location && (
                <p style={{
                    margin: 0,
                    color: '#666',
                    fontSize: '0.875rem'
                }}>
                    当前坐标：经度 {location.longitude.toFixed(6)}，纬度 {location.latitude.toFixed(6)}
                </p>
            )}
        </div>
    )
}
