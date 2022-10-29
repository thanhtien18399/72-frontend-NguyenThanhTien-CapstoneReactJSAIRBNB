import { Card, Col, Layout, Pagination, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import instance from '../../../../api/instance'
import { fetchActionLocationRoom } from '../../../../common/utils/action'
import RoomList from '../../components/roomlist'
import { fetchActionRoom } from '../../utils/action'
import Styles from "./style.module.css"

function Home() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [config, setConfig] = useState({
    currentPage: +location?.search?.substr(1)?.split("=")[1] || 1,
    pageSize: 9,
    totalCount: 0,
  });
  const [itemLocation, setItemLocation] = useState(null);
  const changeTotalCount = (total) => {
    setConfig({ ...config, totalCount: total })
  }

  const fetchRoom = async () => {
    dispatch(fetchActionRoom(config, changeTotalCount))
  }

  const handleChangePage = (page) => {
    console.log(location);
    history.push(`/?page=${page}`);
    setConfig({ ...config, currentPage: page })
  }
  const fetchlocation = async () => {
    try {
      const res = await instance.request({
        url: "/api/vi-tri/phan-trang-tim-kiem",
        method: "GET",
        params: {
          pageIndex: 1,
          pageSize: 8,
        },
      });
      setItemLocation(res.data.content.data);

    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    fetchRoom();
    fetchlocation();
  }, [config.currentPage]);
  const handleLocationRoom = (id) => {
    dispatch(fetchActionLocationRoom(id));
    history.push("/maproom/"+id);
}

  return (
    <section>
      <div className='container'>
        <div className={Styles.endow}>
          <div className={Styles.title}>
            <h2 style={{ fontWeight: 600, margin: 0 }}>Ưu Đãi</h2>
            <span style={{ opacity: 0.5, fontSize: "16px" }}>Khuyến mãi, giảm giá và ưu đãi đặc biệt dành riêng cho bạn</span>
          </div>
          <div className={Styles.endowContent}>
            <Row gutter={50}>
              <Col xs={24} sm={24} md={24} lg={12} style={{margin:"10px 0"}}>
                <div className={Styles.item}>
                  <div className={Styles.img}>
                    <img src="https://q-xx.bstatic.com/xdata/images/xphoto/714x300/173282684.jpeg?k=e31b490d521194e65d41490f43dc704291ca07eaa762b6f36bca714d3211b9a1&o=" width="100%" height="100%" alt="" />
                  </div>
                  <div className={Styles.text}>
                    <h3>Tiết kiệm 15% với Ưu Đãi Cuối Năm</h3>
                    <span>Thực hiện thêm một chuyến đi trong danh sách điểm đến của bạn</span>
                  </div>
                </div>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} style={{margin:"10px 0"}}>
                <div className={Styles.item}>
                  <div className={Styles.img}>
                    <img src="https://q-xx.bstatic.com/psb/capla/static/media/long_stays_banner_wide.a1b12d47.png" width="100%" height="100%" alt="" />
                  </div>
                  <div className={Styles.text}>
                    <h3>Đổi gió một thời gian</h3>
                    <span>Tận hưởng sự tự do với kỳ nghỉ theo tháng trên Booking.com</span>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <div className={Styles.location}>
          <div className={Styles.title}>
            <h2 style={{ fontWeight: 600, margin: 0 }}>Du lịch như người bản địa</h2>
            <span style={{ opacity: 0.5, fontSize: "16px" }}>Sau đây là một số điểm đến phổ biến gần đó mà bạn có thể cân nhắc</span>
          </div>
          <Row gutter={30}>
            {
              itemLocation?.map((item) => {
                return (
                  <Col key={item.id} xs={24} sm={12} md={8} lg={6} style={{ margin: "5px 0" }}>
                    <Card
                    onClick={()=>handleLocationRoom(item.id)}
                      className={Styles.itemLocation}
                      style={{
                        height: 300,
                        border: "none"

                      }}
                      cover={<img alt="example" src={item.hinhAnh} width="100%" height={200} style={{ objectFit: "cover" }} />}
                    >
                      <Card.Meta title={item.tinhThanh} description={item.quocGia} />
                    </Card>
                  </Col>
                )
              })
            }
          </Row>
        </div>
      </div>
      <RoomList></RoomList>
      <Pagination
        style={{ display: "flex", justifyContent: "center", marginTop: 50 }}
        onChange={handleChangePage}
        current={config.currentPage}
        pageSize={config.pageSize}
        total={config.totalCount}
      />
    </section>


  )
}

export default Home