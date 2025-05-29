import React, { useRef, useEffect } from 'react'

/**
 * 定位题组件
 * - 在write模式下获取当前位置并提交答案
 * - 在edit模式下只显示题目编辑界面
 */
export default function Locate({ question, onChange, onDelete, viewOnly = false }) {
    const mapRef = useRef(null)
    const mapInstance = useRef(null)
    const markerRef = useRef(null)
    const [currentLocation, setCurrentLocation] = React.useState(question.answer)

    // 第一次渲染，初始化地图
    useEffect(() => {
        if (!mapRef.current) return
        mapInstance.current = new window.BMapGL.Map(mapRef.current)
        // 默认中心点
        const defaultPoint = new window.BMapGL.Point(116.404, 39.915)
        mapInstance.current.centerAndZoom(defaultPoint, 5)

        // 如果已有答案，显示答案位置
        if (currentLocation) {
            const point = new window.BMapGL.Point(currentLocation.longitude, currentLocation.latitude)
            mapInstance.current.centerAndZoom(point, 15)
            const marker = new window.BMapGL.Marker(point)
            mapInstance.current.addOverlay(marker)
            markerRef.current = marker
        }
    }, [])

    const handleLocate = () => {
        if (!window.BMapGL.Geolocation) {
            return alert('请先在 index.html 中正确引入 BMapGL SDK!')
        }

        const geo = new window.BMapGL.Geolocation()
        // 开启 SDK 辅助定位（更准确）
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
            
            // 更新本地状态
            setCurrentLocation(newLocation)

            // 如果在编辑模式下，更新父组件状态
            if (!viewOnly && onChange) {
                onChange({
                    ...question,
                    answer: newLocation,
                })
            }

            // 在地图上显示
            mapInstance.current.centerAndZoom(pt, 15)

            // 移除之前的 marker，放个标记
            if (markerRef.current) {
                mapInstance.current.removeOverlay(markerRef.current)
            }
            const marker = new window.BMapGL.Marker(pt)
            mapInstance.current.addOverlay(marker)
            markerRef.current = marker
        })
    }

    // 编辑模式
    if (!viewOnly) {
        return (
            <div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: '1rem',
                    marginBottom: '1rem'
                }}>
                    <textarea 
                        placeholder="请输入题干信息" 
                        value={question.title || ''}
                        onChange={e => onChange?.({ ...question, title: e.target.value })}
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
                            lineHeight: '1.5'
                        }}
                    />
                    <button 
                        title="删除此题" 
                        onClick={onDelete}
                        type="button"
                        style={{
                            padding: '0.5rem',
                            color: '#9ca3af',
                            borderRadius: '0.375rem',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            border: 'none',
                            backgroundColor: 'transparent'
                        }}
                    >🗑️</button>
                </div>
                
                <div
                    ref={mapRef}
                    style={{ 
                        width: '100%', 
                        height: 300, 
                        marginBottom: '0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px'
                    }}
                />
            </div>
        )
    }

    // 答题模式
    return (
        <div style={{ margin: '1rem 0' }}>
            <p style={{ 
                marginBottom: '0.5rem',
                fontWeight: '500'
            }}>{question.title}</p>
            
            <button 
                onClick={handleLocate} 
                type="button"
                style={{
                    marginBottom: '0.75rem',
                    padding: '0.5rem 0.75rem',
                    fontSize: '0.875rem',
                    color: '#2563eb',
                    backgroundColor: 'transparent',
                    borderRadius: '0.375rem',
                    border: '1px solid #93c5fd',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                }}
            >
                📍 获取当前位置
            </button>

            <div
                ref={mapRef}
                style={{ 
                    width: '100%', 
                    height: 300, 
                    marginBottom: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px'
                }}
            />
            
            {currentLocation && (
                <div style={{ fontSize: '14px', color: '#4b5563' }}>
                    <div>经度：{currentLocation.longitude.toFixed(6)}</div>
                    <div>纬度：{currentLocation.latitude.toFixed(6)}</div>
                </div>
            )}
        </div>
    )
}
