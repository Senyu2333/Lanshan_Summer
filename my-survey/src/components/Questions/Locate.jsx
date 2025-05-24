import React, { useRef, useEffect } from 'react'

/**
 * 定位题组件
 * - 自动调用 BMapGL.Geolocation 获取当前点（GPS+IP 混合）
 * - 渲染到地图上并把坐标写回 question.answer
 */
export default function Locate({ question, onChange, onDelete }) {
    const mapRef = useRef(null)
    const mapInstance = useRef(null)
    const markerRef = useRef(null)

    // 第一次渲染时，初始化地图
    useEffect(() => {
        if (!mapRef.current) return
        mapInstance.current = new window.BMapGL.Map(mapRef.current)
        // 默认给个全中国视野
        mapInstance.current.centerAndZoom(new window.BMapGL.Point(116.404, 39.915), 5)
    }, [])

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
            // 更新父组件 state
            onChange({
                ...question,
                answer: {
                    longitude: pt.lng,
                    latitude: pt.lat,
                },
            })

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
        <div style={{ border: '1px solid #ccc', padding: 12, marginBottom: 16 }}>
            <button onClick={onDelete} title="删除此题" type={'button'}>🗑️</button>
            <h3>【定位题】</h3>
            <textarea
                placeholder="请输入题干"
                style={{ width: '100%', height: 60, marginBottom: 8 }}
                value={question.title}
                onChange={e => onChange({ ...question, title: e.target.value })}
            />
            <div style={{ marginBottom: 8 }}>
                <button onClick={handleLocate} type={'button'}>🔍 获取并标注当前定位</button>
            </div>
            <div
                ref={mapRef}
                style={{ width: '100%', height: 300, background: '#eee' }}
            />
            {question.answer && (
                <p>
                    当前坐标：经度 {question.answer.longitude.toFixed(6)}，纬度 {question.answer.latitude.toFixed(6)}
                </p>
            )}
        </div>
    )
}
