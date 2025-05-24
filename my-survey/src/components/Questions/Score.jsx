import React from "react";
import {useEffect} from "react";
export default function Score({ question, onChange, onDelete }) {
    const { title = "", cells = [] } = question;
    useEffect(() => {
        if (cells.length > 10) {
            alert("打分题格子不宜超过 10 个！");
        }
    }, [cells]);

    const handleTitleChange = e => {
        onChange({ ...question, title: e.target.value });
    };


    const addCell = () => {
        onChange({ ...question, cells: [...cells, ""] });
    };


    const removeCell = idx => {
        const newCells = cells.filter((_, i) => i !== idx);
        onChange({ ...question, cells: newCells });
    };


    const changeCell = (idx, value) => {
        const newCells = [...cells];
        newCells[idx] = value;
        onChange({ ...question, cells: newCells });
    };

    return (
        <div style={{ border: "1px solid #ddd", padding: 12, marginBottom: 16 }}>
            <button
                onClick={onDelete}
                title="删除此题"
                style={{ float: "right", cursor: "pointer" }}
                type="button"
            >
                🗑️
            </button>
            <div style={{ marginBottom: 8 }}>
        <textarea
            placeholder="请输入题干信息"
            value={title}
            onChange={handleTitleChange}
            style={{ width: "100%", height: 60, resize: "vertical" }}
        />
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
                <table>
                    <tbody>
                    <tr>
                        {cells.map((cell, idx) => (
                            <td key={idx}
                                style={{
                                    padding: 4,
                                    border: "1px solid #ccc",
                                    textAlign: "center",
                                }}>
                                <input type="text" value={cell} placeholder={`第 ${idx + 1} 格`}
                                    onChange={e => changeCell(idx, e.target.value)}
                                    style={{ width: 60, border: "none", outline: "none" }}/>
                                <button type={'button'} onClick={() => removeCell(idx)} title="删除本列" style={{ marginLeft: 4, cursor: "pointer" }}>
                                    ✖️
                                </button>
                            </td>
                        ))}
                        <td style={{ verticalAlign: "middle", paddingLeft: 8 }}>
                            <button
                                onClick={addCell}
                                title="增加一格"
                                style={{ cursor: "pointer" }}
                                type={'button'}
                            >
                                ➕
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
