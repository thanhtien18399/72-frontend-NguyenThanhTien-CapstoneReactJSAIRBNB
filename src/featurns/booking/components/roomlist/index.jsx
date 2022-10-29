import { Col, Row, Spin } from 'antd';
import React from 'react'
import { useSelector } from 'react-redux';
import RoomItem from '../roomitem';

function RoomList() {
    const roomInfo = useSelector((state) => state.booking.rooms);
    if (!roomInfo) {
        return (
            <div style={{ textAlign: "center" }}>
                <Spin size="large" />
            </div>
        )
    }
    return (
        <div className='container' style={{ marginTop: "50px" }}>
            <div style={{marginBottom:"30px"}}>
                <h2 style={{ fontWeight: 600, margin: 0 }}>Lưu trú tại các chỗ nghỉ độc đáo hàng đầu</h2>
                <span style={{ opacity: 0.5, fontSize: "16px" }}>Từ biệt thự, lâu đài cho đến nhà thuyền, igloo, chúng tôi đều có hết</span>
            </div>
            <Row gutter={20}>
                {roomInfo.data.map((item) => {
                    return (
                        <Col key={item.id} xs={24} sm={12} md={8} lg={8} >
                            <RoomItem item={item} />
                        </Col>
                    )
                })}
            </Row>
        </div>
    )
}

export default RoomList