import { Card, Col, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { fetchActionLocationRoom } from '../../../../common/utils/action';
import Styles from "./style.module.css"
function MapRoom() {
  const history = useHistory();
  const match = useRouteMatch();
  const dispatch = useDispatch();
  const locationID = match.params.id;
  const roomInfo = useSelector((state) => state.common.locationRoom);
  const locations = useSelector((state) => state.common.location);
  useEffect(() => {
    dispatch(fetchActionLocationRoom(locationID));
   renderNameLoca();
  },[])
  
 const goToDetail = (idRoom) => {
    history.push("/detail/" + idRoom + "/" + locationID)
  }
  const handleText = (isText, text) => {
    if (isText) {
      return (<span style={{ color: "blue", fontSize: "14px" }}>{text}</span>)
    } else {
      return (<span style={{ fontSize: "14px" }}>{text}</span>)
    }
  }
  const renderNameLoca =()=>{
    let res ="";
    locations?.map((item)=>{
      if(item.id===+locationID){
        res = item.tinhThanh
      }
    })
    return res;
  }
  return (
    <div className='container'>
      <div className={Styles.mapbox}>
        <h2 style={{margin:0}}>Tìm Kiếm Theo vị trí  {renderNameLoca()} <span style={{fontSize:"14px",opacity:0.5}}> <i style={{color:"green"}} class="fa-solid fa-building-user"></i> Có {roomInfo?.length} phòng đang cho thuê</span></h2>
        
      </div>
      <div className={Styles.room}>
        <Row gutter={20}>
          {roomInfo?.map((item) => {
            return (
              <Col key={item.id} xs={24} sm={12} md={8} lg={8} >
                <Card
 onClick={()=>goToDetail(item.id)}
                  style={{ height: "400px", marginBottom: "20px", borderRadius: "20px", overflow: "hidden" }}
                  hoverable
                  cover={<img alt="example" src={item.hinhAnh} style={{ height: "200px", objectFit: "cover", objectPosition: "center top" }} />}
                >
                  <div>
                    <h3 style={{ color: "#222222", height: "40px" }}>{item.tenPhong.substring(0, 30)}...</h3>
                    <p style={{ color: "#717171", fontSize: "14px", height: "20px" }}>{item.khach} Khách - {item.phongNgu} Phòng - {item.giuong} Giường - {item.phongTam} Phòng tắm</p>
                    <p style={{ color: "#717171", height: "20px" }}>
                      {handleText(item.wifi, "Wifi")},  {handleText(item.dieuHoa, "Điều hòa")},  {handleText(item.mayGiat, "Máy giặt")},  {handleText(item.hoBoi, "Hồ bơi")}
                    </p>
                    <h3 style={{ color: "#222222", height: "20px" }}>${item.giaTien} <span style={{ fontWeight: 300 }}>đêm</span></h3>
                  </div>
                </Card>
              </Col>
            )
          })}
        </Row>
      </div>
    </div>
  )
}

export default MapRoom
