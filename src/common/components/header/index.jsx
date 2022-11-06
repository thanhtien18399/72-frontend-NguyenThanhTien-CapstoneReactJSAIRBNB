
import { Input, Button, Modal, Avatar, Form, Select, Alert, message, Popover } from 'antd';
import { AlignRightOutlined, EnvironmentOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons"
import React, { useEffect, useState } from 'react'
import Styles from "./style.module.css"
import { useDispatch, useSelector } from 'react-redux';
import { fetchActionLocation, fetchActionLocationRoom, fetchSignInAction, fetchSignUpAction, SET_SIGNIN } from '../../utils/action';
import { NavLink, useHistory } from 'react-router-dom';
import { showModalSignIn } from '../../hooks/hooks';
const { Search } = Input;
function Header(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    // const [isModalOpenSignIn, setisModalOpenSignIn] = useState(false)
    const [isModalOpenSignUp, setisModalOpenSignUp] = useState(false)
    const location = useSelector((state) => state.common.location);
    const isSign = useSelector((state) => state.common.isSign);
    const profileInfo = useSelector((state) => state.common.user);
    const [search, setSearch] = useState([])
    const [idLocation, setIdLocation] = useState("vị trí cần Tìm ")
    const fetchLocation = async () => {
        const data = await dispatch(fetchActionLocation);
        setSearch(data)
    }
    useEffect(() => {
        fetchLocation();
    }, [])
    const showModal = () => {
        setIsModalOpen(true);
    };
    const showModal2 = () => {
        setIsModalOpen2(true);
    };
    //signIn
    // const showModalSignIn = () => {
    //    setisModalOpenSignIn(true);
    // };
    // const handleCancelSignIn = () => {
    //     setisModalOpenSignIn(false);
    // };
    const showModalSignUp = () => {
        setisModalOpenSignUp(true);
    };
    const handleCancelSignUp = () => {
        setisModalOpenSignUp(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleCancel2 = () => {
        setIsModalOpen2(false);
    };

    const goToHome = () => {
        history.push("/")
    }
    const handleLogOut = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("id")
        dispatch({
            type: SET_SIGNIN,
            payload: null,
        })
        goToHome();
    }
    const handleSubmitSignIn = (values) => {
        dispatch(fetchSignInAction(values))
    };
    const handleSubmitSignUp = (values) => {
        let user = { ...values, role: "USER" }
        dispatch(fetchSignUpAction(user))
    };

    const handleLocationsList = (item) => {
        setIdLocation(item);
    }
    const onSearch = (value) => {
        const keywork = value.toLowerCase().trim();
        if (keywork === "") {
            setSearch(location);
            return;
        }
        const listOnSearch = [];
        search?.map((item, index) => {
            if (item.tinhThanh === keywork || item.tinhThanh.toLowerCase().includes(keywork)) {
                listOnSearch.push({ ...item, key: index });
            }
            return 0;
        })
        setSearch(listOnSearch);
        console.log(listOnSearch);
    };

    const handleLocationRoom = (id) => {
        dispatch(fetchActionLocationRoom(id));
        history.push("/maproom/" + id);
        handleCancel();
    }

    const renderLocation = (data) => {
        return data?.map((item) => {
            return (
                <div key={item.id} className={Styles.locationFlex} onClick={() => { handleLocationsList(item); handleCancel2() }}>
                    <div className={Styles.icon}><EnvironmentOutlined className={Styles.iconLocation} /></div>
                    <div className={Styles.locationName}><span>{item.tenViTri}, {item.tinhThanh}, {item.quocGia}</span></div>
                </div>
            )
        })
    }

    const renderLogin = () => {
        if (profileInfo) {
            return (
                <>
                    <div style={{ marginRight: "10px" }}>
                        <Avatar size={30} icon={<UserOutlined />} />
                    </div>
                    <div style={{ fontSize: "14px", marginRight: "10px" }}>
                        <span>{profileInfo?.name}</span>
                    </div>
                    <div className={Styles.logout} onClick={() => handleLogOut()}>
                        <span>Đăng Xuất</span>
                    </div>
                </>
            )
        }
        return (
            <>
                <div className={Styles.btn} >
                    <span onClick={() => dispatch(showModalSignIn(true))}>Đăng Nhập</span>
                    <Modal open={isSign} footer={null} onCancel={() => dispatch(showModalSignIn(false))} >
                        <div style={{ marginTop: "45px", textAlign: "center" }}>
                            <Avatar size={64} icon={<UserOutlined />} />
                            <h2 style={{ margin: "20px 0" }}>Đăng Nhập</h2>
                            <Form
                                name="basic"
                                labelCol={{
                                    span: 6,
                                }}
                                wrapperCol={{
                                    span: 16,
                                }}
                                initialValues={{
                                    remember: true,
                                }}
                                onFinish={handleSubmitSignIn}
                                autoComplete="off"
                            >
                                <Form.Item
                                    label="Tài Khoản"
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your username!',
                                        },
                                    ]}
                                >
                                    <Input placeholder='aaa@gmail.com' />
                                </Form.Item>

                                <Form.Item
                                    label="Mật Khẩu"
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your password!',
                                        },
                                    ]}
                                >
                                    <Input.Password />
                                </Form.Item>

                                <Form.Item
                                    wrapperCol={{
                                        offset: 0,
                                        span: 0,
                                    }}
                                >
                                    <Button type="primary" htmlType="submit">
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </Modal>
                </div>
                <div className={Styles.btn} >
                    <span onClick={() => showModalSignUp()}>Đăng kí</span>
                    <Modal open={isModalOpenSignUp} footer={null} onCancel={() => handleCancelSignUp()} >
                        <div style={{ marginTop: "45px", textAlign: "center" }}>
                            <Avatar size={64} icon={<UserOutlined />} />
                            <h2 style={{ margin: "20px 0" }}>Đăng Kí</h2>
                            <Form
                                name="basic"
                                labelCol={{
                                    span: 6,
                                }}
                                wrapperCol={{
                                    span: 16,
                                }}
                                initialValues={{
                                    remember: true,
                                }}
                                onFinish={handleSubmitSignUp}
                                autoComplete="off"
                            >
                                <Form.Item
                                    label="Họ Và Tên"
                                    name="name"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập Họ và tên!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Email"
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập Email!',
                                        },
                                        {
                                            type: 'email',
                                            message: 'Nhập đúng định dạng E-mail!',
                                        }
                                    ]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Mật Khẩu"
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập Mật Khẩu!',
                                        },
                                    ]}
                                >
                                    <Input.Password />
                                </Form.Item>
                                <Form.Item
                                    label="Số Điện Thoại"
                                    name="phone"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập số điện thoại!',
                                        },
                                        { min: 10, message: 'Số điện thoại tối đa 10 số!' },
                                        { max: 10, message: 'Số điện thoại tối thiểu 10 số!' }
                                    ]}
                                >
                                    <Input type='number' />
                                </Form.Item>
                                <Form.Item
                                    label="Ngày Sinh"
                                    name="birthday"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập Ngày Sinh!',
                                        },
                                    ]}
                                >
                                    <Input placeholder='DD/MM/YYYY' />
                                </Form.Item>

                                <Form.Item
                                    label="Giới Tính"
                                    name="gender"

                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng chọn Giới Tính!',
                                        },
                                    ]}
                                >
                                    <Select placeholder="vui lòng chọn giới tính" style={{ width: "100%", }}>
                                        <Select.Option value="true">Nam</Select.Option>
                                        <Select.Option value="false">Nữ</Select.Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    wrapperCol={{
                                        offset: 0,
                                        span: 0,
                                    }}
                                >
                                    <Button type="primary" htmlType="submit">
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </Modal>
                </div>

            </>
        )
    }
    const renderLoginMenu = () => {
        if (profileInfo) {
            return (
                <>
                    <div style={{ margin: "10px" ,width:"80px"}}>
                        <Avatar size={30} icon={<UserOutlined />} />
                        <span style={{ marginLeft: "10px" }}>{profileInfo?.name}</span>
                    </div>
                    <div className={Styles.logout} onClick={() => handleLogOut()}>
                        <span>Đăng Xuất</span>
                    </div>
                </>
            )
        }
        return (
            <>
                <div >
                    <div style={{ padding: "5px" ,width:"80px" }} >
                        <span style={{ fontSize: "12px" }} onClick={() => dispatch(showModalSignIn(true))}>Đăng Nhập</span>
                        <Modal open={isSign} footer={null} onCancel={() => dispatch(showModalSignIn(false))} >
                            <div style={{ marginTop: "45px", textAlign: "center" }}>
                                <Avatar size={64} icon={<UserOutlined />} />
                                <h2 style={{ margin: "20px 0" }}>Đăng Nhập</h2>
                                <Form
                                    name="basic"
                                    labelCol={{
                                        span: 6,
                                    }}
                                    wrapperCol={{
                                        span: 16,
                                    }}
                                    initialValues={{
                                        remember: true,
                                    }}
                                    onFinish={handleSubmitSignIn}
                                    autoComplete="off"
                                >
                                    <Form.Item
                                        label="Tài Khoản"
                                        name="email"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your username!',
                                            },
                                        ]}
                                    >
                                        <Input placeholder='aaa@gmail.com' />
                                    </Form.Item>

                                    <Form.Item
                                        label="Mật Khẩu"
                                        name="password"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your password!',
                                            },
                                        ]}
                                    >
                                        <Input.Password />
                                    </Form.Item>

                                    <Form.Item
                                        wrapperCol={{
                                            offset: 0,
                                            span: 0,
                                        }}
                                    >
                                        <Button type="primary" htmlType="submit">
                                            Submit
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </div>
                        </Modal>
                    </div>
                    <div style={{ padding: "5px" ,width:"80px"}} >
                        <span style={{ fontSize: "12px" }} onClick={() => showModalSignUp()}>Đăng kí</span>
                        <Modal open={isModalOpenSignUp} footer={null} onCancel={() => handleCancelSignUp()} >
                            <div style={{ marginTop: "45px", textAlign: "center" }}>
                                <Avatar size={64} icon={<UserOutlined />} />
                                <h2 style={{ margin: "20px 0" }}>Đăng Kí</h2>
                                <Form
                                    name="basic"
                                    labelCol={{
                                        span: 6,
                                    }}
                                    wrapperCol={{
                                        span: 16,
                                    }}
                                    initialValues={{
                                        remember: true,
                                    }}
                                    onFinish={handleSubmitSignUp}
                                    autoComplete="off"
                                >
                                    <Form.Item
                                        label="Họ Và Tên"
                                        name="name"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập Họ và tên!',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label="Email"
                                        name="email"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập Email!',
                                            },
                                            {
                                                type: 'email',
                                                message: 'Nhập đúng định dạng E-mail!',
                                            }
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item
                                        label="Mật Khẩu"
                                        name="password"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập Mật Khẩu!',
                                            },
                                        ]}
                                    >
                                        <Input.Password />
                                    </Form.Item>
                                    <Form.Item
                                        label="Số Điện Thoại"
                                        name="phone"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập số điện thoại!',
                                            },
                                            { min: 10, message: 'Số điện thoại tối đa 10 số!' },
                                            { max: 10, message: 'Số điện thoại tối thiểu 10 số!' }
                                        ]}
                                    >
                                        <Input type='number' />
                                    </Form.Item>
                                    <Form.Item
                                        label="Ngày Sinh"
                                        name="birthday"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập Ngày Sinh!',
                                            },
                                        ]}
                                    >
                                        <Input placeholder='DD/MM/YYYY' />
                                    </Form.Item>

                                    <Form.Item
                                        label="Giới Tính"
                                        name="gender"

                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng chọn Giới Tính!',
                                            },
                                        ]}
                                    >
                                        <Select placeholder="vui lòng chọn giới tính" style={{ width: "100%", }}>
                                            <Select.Option value="true">Nam</Select.Option>
                                            <Select.Option value="false">Nữ</Select.Option>
                                        </Select>
                                    </Form.Item>

                                    <Form.Item
                                        wrapperCol={{
                                            offset: 0,
                                            span: 0,
                                        }}
                                    >
                                        <Button type="primary" htmlType="submit">
                                            Submit
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </div>
                        </Modal>
                    </div>
                </div>


            </>
        )
    }
    return (
        <header>
            <div className="container">
                <div className={Styles.header}>
                   <div className={Styles.logo}>
                        <img src="https://img.icons8.com/clouds/100/FA5252/home-page.png" alt='' />
                        <span style={{ color: "#FF385C", fontWeight: "700" }}>Booking Room </span>
                    </div>
                    <div className={Styles.filter} >
                        <div className={`${Styles.location} ${Styles.btnheader}`}>
                            <button onClick={showModal} className={`${Styles.btnLocation}`}>Địa Điểm </button>
                        </div>
                        <div className={`${Styles.anyWeek} ${Styles.btnheader}`}>
                            <button onClick={showModal} className={`${Styles.btnAnyWeek}`}>Tuần Bất Kì</button>
                        </div>
                        <div className={Styles.search}>
                            <span style={{ fontSize: "14px", opacity: 0.6, margin: "0 10px" }}>Thêm Khách</span>
                            <SearchOutlined onClick={showModal} className={Styles.iconSearch} ></SearchOutlined>

                        </div>
                        <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
                            <div className={Styles.modal}>
                                <div className={Styles.modalHeader}>
                                    <div className={`${Styles.modalLocation} ${Styles.btnheader}`}>
                                        <button onClick={showModal2} >Chọn Địa Điểm</button>
                                        <Modal open={isModalOpen2} footer={null} onCancel={handleCancel2} >
                                            <div style={{ marginTop: "25px" }}>
                                                <div>
                                                    <Search onSearch={onSearch}></Search>
                                                </div>
                                                {
                                                    renderLocation(search)
                                                }
                                            </div>
                                        </Modal>
                                    </div>
                                    <div className={Styles.modalProvince}>
                                        <span style={{ display: "block", opacity: 0.8 }}>{idLocation.tinhThanh === undefined ? idLocation : idLocation.tinhThanh}    <i style={{ fontSize: "18px", color: "#FF385C" }} className="fa-solid fa-location-dot"></i></span>
                                    </div>
                                    <div className={Styles.modalSearch}>
                                        <SearchOutlined className={Styles.iconSearch} onClick={() => handleLocationRoom(idLocation.id)} />
                                    </div>
                                </div>
                            </div>
                        </Modal>
                    </div>
                    <div className={Styles.login} >
                        <div className={Styles.signInUp}>
                            {renderLogin()}
                        </div>
                    </div>
                </div>
                <div className={Styles.headerRespo} >
                    <div className={Styles.header2}>
                        <div className={Styles.logo}>
                            <img src="https://img.icons8.com/clouds/100/FA5252/home-page.png" alt='' />
                            <span style={{ color: "#FF385C", fontWeight: "700" }}>Booking Room </span>
                        </div>
                        <div className={Styles.menu}>
                            <Popover content={renderLoginMenu} trigger="focus" >
                                <Button style={{ border: "none" }}><AlignRightOutlined /></Button>
                            </Popover>
                        </div>
                    </div>

                    <div className={Styles.filter} >
                        <div className={`${Styles.location} ${Styles.btnheader}`}>
                            <button onClick={showModal} className={`${Styles.btnLocation}`}>Địa Điểm </button>
                        </div>
                        <div className={`${Styles.anyWeek} ${Styles.btnheader}`}>
                            <button onClick={showModal} className={`${Styles.btnAnyWeek}`}>Tuần Bất Kì</button>
                        </div>
                        <div className={Styles.search}>
                            <SearchOutlined onClick={showModal} className={Styles.iconSearch} ></SearchOutlined>

                        </div>
                        <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
                            <div className={Styles.modal}>
                                <div className={Styles.modalHeader}>
                                    <div className={`${Styles.modalLocation} ${Styles.btnheader}`}>
                                        <button onClick={showModal2} >Chọn Địa Điểm</button>
                                        <Modal open={isModalOpen2} footer={null} onCancel={handleCancel2} >
                                            <div style={{ marginTop: "25px" }}>
                                                <div>
                                                    <Search onSearch={onSearch}></Search>
                                                </div>
                                                {
                                                    renderLocation(search)
                                                }
                                            </div>
                                        </Modal>
                                    </div>
                                    <div className={Styles.modalProvince}>
                                        <span style={{ display: "block", opacity: 0.8 }}>{idLocation.tinhThanh === undefined ? idLocation : idLocation.tinhThanh}    <i style={{ fontSize: "18px", color: "#FF385C" }} className="fa-solid fa-location-dot"></i></span>
                                    </div>
                                    <div className={Styles.modalSearch}>
                                        <SearchOutlined className={Styles.iconSearch} onClick={() => handleLocationRoom(idLocation.id)} />
                                    </div>
                                </div>
                            </div>
                        </Modal>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
