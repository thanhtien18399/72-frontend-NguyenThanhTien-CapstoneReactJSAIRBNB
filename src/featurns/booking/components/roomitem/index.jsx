import { Card } from 'antd'
import React from 'react'
import { useHistory } from 'react-router-dom';
function RoomItem(props) {
  const { tenPhong, hinhAnh, moTa, id, khach, phongNgu, giuong, phongTam, wifi, dieuHoa, mayGiat, hoBoi, giaTien,maViTri } = props.item;
  const history = useHistory();
  const goToDetail = () => {
    history.push("/detail/" + id +"/" +maViTri)
  }
  const handleText = (isText, text) => {
    if (isText) {
      return (<span style={{ color: "blue", fontSize: "14px" }}>{text}</span>)
    } else {
      return (<span style={{ fontSize: "14px" }}>{text}</span>)
    }
  }
  return (
    <div>
      <Card
        onClick={goToDetail}
        style={{ height: "500px", marginBottom: "20px" ,borderRadius:"20px",overflow:"hidden"}}
        hoverable
        cover={<img alt="example" src={hinhAnh} style={{ height: "300px", objectFit: "cover", objectPosition: "center top" }} />}
      >
        <div>
          <h3 style={{ color: "#222222", height: "40px" }}>{tenPhong.substring(0, 30)}...</h3>
          <p style={{ color: "#717171", fontSize: "14px", height: "30px" }}>{khach} Khách - {phongNgu} Phòng - {giuong} Giường - {phongTam} Phòng tắm</p>
          <p style={{ color: "#717171", height: "30px" }}>
            {handleText(wifi, "Wifi")},  {handleText(dieuHoa, "Điều hòa")},  {handleText(mayGiat, "Máy giặt")},  {handleText(hoBoi, "Hồ bơi")}
          </p>
          <h3 style={{ color: "#222222", height: "20px" }}>${giaTien} <span style={{ fontWeight: 300 }}>đêm</span></h3>
        </div>
      </Card>
    </div>
  )
}

export default RoomItem