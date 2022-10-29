import { Col, Row } from 'antd'
import React from 'react'
import Styles from "./style.module.css"
function Footer() {
    return (
        <footer className={Styles.footer}>
            <div className="container">
                <div className={Styles.footerhead}>
                    <Row gutter={30}>
                        <Col xs={12} sm={12} md={6} lg={6} >
                            <h4>Hỗ Trợ</h4>
                            <ul className={Styles.itemUl}>
                                <li>
                                    <a href="#" >Trung tâm trợ giúp</a>
                                </li>
                                <li>
                                    <a href="#" >AirCover</a>
                                </li>
                                <li>
                                    <a href="#" >Thông tin an toàn</a>
                                </li>
                                <li>
                                    <a href="#" >Hỗ trợ người khuyết tật</a>
                                </li>
                                <li>
                                    <a href="#" >Các tùy chọn hủy</a>
                                </li>
                                <li>
                                    <a href="#" >Biện pháp ứng phó với đại dịch COVID-19 của chúng tôi</a>
                                </li>
                                <li>
                                    <a href="#" >Báo cáo lo ngại của hàng xóm</a>
                                </li>
                            </ul>
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={6} >
                            <h4>Cộng Đồng</h4>
                            <ul className={Styles.itemUl}>
                                <li>
                                    <a href="#" >Airbnb.org: nhà ở cứu trợ</a>
                                </li>
                                <li>
                                    <a href="#" >Hỗ trợ dân tị nạn Afghanistan</a>
                                </li>
                                <li>
                                    <a href="#" >Chống phân biệt đối xử</a>
                                </li>

                            </ul>
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={6} >
                            <h4>Đón tiếp khách</h4>
                            <ul className={Styles.itemUl}>
                                <li>
                                    <a href="#" >Thử đón tiếp khách</a>
                                </li>
                                <li>
                                    <a href="#" >AirCover cho Chủ nhà</a>
                                </li>
                                <li>
                                    <a href="#" >Xem tài nguyên đón tiếp khách</a>
                                </li>
                                <li>
                                    <a href="#" >Truy cập diễn đàn cộng đồng</a>
                                </li>
                                <li>
                                    <a href="#" >Đón tiếp khách có trách nhiệm</a>
                                </li>
                            </ul>
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={6} >
                            <h4>Airbnb</h4>
                            <ul className={Styles.itemUl}>
                                <li>
                                    <a href="#" >Trang tin tức</a>
                                </li>
                                <li>
                                    <a href="#" >Tìm hiểu các tính năng mới</a>
                                </li>
                                <li>
                                    <a href="#" >Thư ngỏ từ các nhà sáng lập</a>
                                </li>
                                <li>
                                    <a href="#" >Cơ hội nghề nghiệp</a>
                                </li>
                                <li>
                                    <a href="#" >Nhà đầu tư</a>
                                </li>
                            </ul>
                        </Col>
                    </Row>

                </div>
                <div className={Styles.footerBottom}>
                    <h4>© 2022 Airbnb, Inc.·Quyền riêng tư·Điều khoản·Sơ đồ trang web</h4>
                    <div className={Styles.icon}>
                            <span>$USD</span>
                            <i className="fa-brands fa-square-facebook"></i>
                            <i className="fa-brands fa-twitter"></i>
                            <i className="fa-brands fa-instagram"></i>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer