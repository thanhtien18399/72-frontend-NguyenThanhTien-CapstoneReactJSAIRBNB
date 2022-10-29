import { CloseCircleOutlined, DownOutlined, HomeOutlined, StarOutlined, UserOutlined } from '@ant-design/icons'
import { Button, DatePicker, Form, Input, InputNumber, message, notification, Select } from 'antd';
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { fetchBookRoomAction, fetchCommentAction, fetchCommentUserAction, fetchDetailAction, fetchLocationRoomAction } from '../../utils/action';
import moment from "moment"
import Styles from "./style.module.css"
import { showModalSignIn } from '../../../../common/hooks/hooks';
const { TextArea } = Input;
const { RangePicker } = DatePicker;
const wifi = <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: 24, width: 24, fill: 'currentcolor' }}><path d="m15.9999 20.33323c2.0250459 0 3.66667 1.6416241 3.66667 3.66667s-1.6416241 3.66667-3.66667 3.66667-3.66667-1.6416241-3.66667-3.66667 1.6416241-3.66667 3.66667-3.66667zm0 2c-.9204764 0-1.66667.7461936-1.66667 1.66667s.7461936 1.66667 1.66667 1.66667 1.66667-.7461936 1.66667-1.66667-.7461936-1.66667-1.66667-1.66667zm.0001-7.33323c3.5168171 0 6.5625093 2.0171251 8.0432368 4.9575354l-1.5143264 1.5127043c-1.0142061-2.615688-3.5549814-4.4702397-6.5289104-4.4702397s-5.5147043 1.8545517-6.52891042 4.4702397l-1.51382132-1.5137072c1.48091492-2.939866 4.52631444-4.9565325 8.04273174-4.9565325zm.0001-5.3332c4.9804693 0 9.3676401 2.540213 11.9365919 6.3957185l-1.4470949 1.4473863c-2.1746764-3.5072732-6.0593053-5.8431048-10.489497-5.8431048s-8.31482064 2.3358316-10.48949703 5.8431048l-1.44709488-1.4473863c2.56895177-3.8555055 6.95612261-6.3957185 11.93659191-6.3957185zm-.0002-5.3336c6.4510616 0 12.1766693 3.10603731 15.7629187 7.9042075l-1.4304978 1.4309874c-3.2086497-4.44342277-8.4328305-7.3351949-14.3324209-7.3351949-5.8991465 0-11.12298511 2.89133703-14.33169668 7.334192l-1.43047422-1.4309849c3.58629751-4.79760153 9.31155768-7.9032071 15.7621709-7.9032071z" /></svg>
const kitchen = <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: 24, width: 24, fill: 'currentcolor' }}><path d="M26 1a5 5 0 0 1 5 5c0 6.389-1.592 13.187-4 14.693V31h-2V20.694c-2.364-1.478-3.942-8.062-3.998-14.349L21 6l.005-.217A5 5 0 0 1 26 1zm-9 0v18.118c2.317.557 4 3.01 4 5.882 0 3.27-2.183 6-5 6s-5-2.73-5-6c0-2.872 1.683-5.326 4-5.882V1zM2 1h1c4.47 0 6.934 6.365 6.999 18.505L10 21H3.999L4 31H2zm14 20c-1.602 0-3 1.748-3 4s1.398 4 3 4 3-1.748 3-4-1.398-4-3-4zM4 3.239V19h3.995l-.017-.964-.027-.949C7.673 9.157 6.235 4.623 4.224 3.364l-.12-.07zm19.005 2.585L23 6l.002.31c.045 4.321 1.031 9.133 1.999 11.39V3.17a3.002 3.002 0 0 0-1.996 2.654zm3.996-2.653v14.526C27.99 15.387 29 10.4 29 6a3.001 3.001 0 0 0-2-2.829z" /></svg>
const tv = <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: 24, width: 24, fill: 'currentcolor' }}><path d="M9 29v-2h2v-2H6a5 5 0 0 1-4.995-4.783L1 20V8a5 5 0 0 1 4.783-4.995L6 3h20a5 5 0 0 1 4.995 4.783L31 8v12a5 5 0 0 1-4.783 4.995L26 25h-5v2h2v2zm10-4h-6v2h6zm7-20H6a3 3 0 0 0-2.995 2.824L3 8v12a3 3 0 0 0 2.824 2.995L6 23h20a3 3 0 0 0 2.995-2.824L29 20V8a3 3 0 0 0-2.824-2.995z" /></svg>
const airCon = <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: 24, width: 24, fill: 'currentcolor' }}><path d="M17 1v4.03l4.026-2.324 1 1.732L17 7.339v6.928l6-3.464V5h2v4.648l3.49-2.014 1 1.732L26 11.381l4.026 2.325-1 1.732L24 12.535l-6 3.464 6 3.465 5.026-2.902 1 1.732L26 20.618l3.49 2.016-1 1.732L25 22.351V27h-2v-5.804l-6-3.465v6.929l5.026 2.902-1 1.732L17 26.97V31h-2v-4.031l-4.026 2.325-1-1.732L15 24.66v-6.929l-6 3.464V27H7v-4.65l-3.49 2.016-1-1.732 3.489-2.016-4.025-2.324 1-1.732 5.025 2.901 6-3.464-6-3.464-5.025 2.903-1-1.732L6 11.38 2.51 9.366l1-1.732L7 9.648V5h2v5.803l6 3.464V7.339L9.974 4.438l1-1.732L15 5.03V1z" /></svg>
const parking = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: 24, width: 24, fill: 'currentcolor' }}><path d="M26 19a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 18a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm20.693-5l.42 1.119C29.253 15.036 30 16.426 30 18v9c0 1.103-.897 2-2 2h-2c-1.103 0-2-.897-2-2v-2H8v2c0 1.103-.897 2-2 2H4c-1.103 0-2-.897-2-2v-9c0-1.575.746-2.965 1.888-3.882L4.308 13H2v-2h3v.152l1.82-4.854A2.009 2.009 0 0 1 8.693 5h14.614c.829 0 1.58.521 1.873 1.297L27 11.151V11h3v2h-2.307zM6 25H4v2h2v-2zm22 0h-2v2h2v-2zm0-2v-5c0-1.654-1.346-3-3-3H7c-1.654 0-3 1.346-3 3v5h24zm-3-10h.557l-2.25-6H8.693l-2.25 6H25zm-15 7h12v-2H10v2z" /></svg>
const iron = <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: 24, width: 24, fill: 'currentcolor' }}><path d="M12 28a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-6-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM16.027 3l.308.004a12.493 12.493 0 0 1 11.817 9.48l.07.3 1.73 7.782.027.144a2 2 0 0 1-1.83 2.285L28 23H2.247l-.15-.005a2 2 0 0 1-1.844-1.838L.247 21v-7l.004-.217a5 5 0 0 1 4.773-4.778L5.247 9h9V5h-14V3zm11.528 16H2.245l.002 2H28zM16.247 5.002V11h-11l-.177.005a3 3 0 0 0-2.818 2.819L2.247 14l-.001 3H27.11l-.84-3.783-.067-.28a10.494 10.494 0 0 0-9.596-7.921l-.292-.012z" /></svg>
const pool = <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: 24, width: 24, fill: 'currentcolor' }}><path d="M24 26c.988 0 1.945.351 2.671 1.009.306.276.71.445 1.142.483L28 27.5v2l-.228-.006a3.96 3.96 0 0 1-2.443-1.003A1.978 1.978 0 0 0 24 28c-.502 0-.978.175-1.328.491a3.977 3.977 0 0 1-2.67 1.009 3.977 3.977 0 0 1-2.672-1.009A1.978 1.978 0 0 0 16 28c-.503 0-.98.175-1.329.491a3.978 3.978 0 0 1-2.67 1.009 3.978 3.978 0 0 1-2.672-1.008A1.978 1.978 0 0 0 8 28c-.503 0-.98.175-1.33.491a3.96 3.96 0 0 1-2.442 1.003L4 29.5v-2l.187-.008a1.953 1.953 0 0 0 1.142-.483A3.975 3.975 0 0 1 8 26c.988 0 1.945.352 2.671 1.009.35.316.826.49 1.33.491.502 0 .979-.175 1.328-.492A3.974 3.974 0 0 1 16 26c.988 0 1.945.351 2.671 1.009.35.316.826.49 1.33.491.502 0 .979-.175 1.328-.491A3.975 3.975 0 0 1 23.999 26zm0-5c.988 0 1.945.351 2.671 1.009.306.276.71.445 1.142.483L28 22.5v2l-.228-.006a3.96 3.96 0 0 1-2.443-1.003A1.978 1.978 0 0 0 24 23c-.502 0-.978.175-1.328.491a3.977 3.977 0 0 1-2.67 1.009 3.977 3.977 0 0 1-2.672-1.009A1.978 1.978 0 0 0 16 23c-.503 0-.98.175-1.329.491a3.978 3.978 0 0 1-2.67 1.009 3.978 3.978 0 0 1-2.672-1.008A1.978 1.978 0 0 0 8 23c-.503 0-.98.175-1.33.491a3.96 3.96 0 0 1-2.442 1.003L4 24.5v-2l.187-.008a1.953 1.953 0 0 0 1.142-.483A3.975 3.975 0 0 1 8 21c.988 0 1.945.352 2.671 1.009.35.316.826.49 1.33.491.502 0 .979-.175 1.328-.492A3.974 3.974 0 0 1 16 21c.988 0 1.945.351 2.671 1.009.35.316.826.49 1.33.491.502 0 .979-.175 1.328-.491A3.975 3.975 0 0 1 23.999 21zM20 3a4 4 0 0 1 3.995 3.8L24 7v2h4v2h-4v5c.912 0 1.798.3 2.5.862l.171.147c.306.276.71.445 1.142.483L28 17.5v2l-.228-.006a3.96 3.96 0 0 1-2.443-1.003A1.978 1.978 0 0 0 24 18c-.502 0-.978.175-1.328.491a3.977 3.977 0 0 1-2.67 1.009 3.977 3.977 0 0 1-2.672-1.009A1.978 1.978 0 0 0 16 18c-.503 0-.98.175-1.329.491a3.978 3.978 0 0 1-2.67 1.009 3.978 3.978 0 0 1-2.672-1.008A1.978 1.978 0 0 0 8 18c-.503 0-.98.175-1.33.491a3.96 3.96 0 0 1-2.442 1.003L4 19.5v-2l.187-.008a1.953 1.953 0 0 0 1.142-.483A3.975 3.975 0 0 1 8 16c.988 0 1.945.352 2.671 1.009.35.316.826.49 1.33.491.502 0 .979-.175 1.328-.492a3.956 3.956 0 0 1 2.444-1.002L16 16v-5H4V9h12V7a2 2 0 0 0-3.995-.15L12 7h-2a4 4 0 0 1 7-2.645A3.985 3.985 0 0 1 20 3zm-2 13.523c.16.091.313.194.459.307l.212.179c.35.316.826.49 1.33.491.439 0 .86-.134 1.191-.38l.137-.111c.206-.187.431-.35.67-.486V11h-4zM20 5a2 2 0 0 0-1.995 1.85L18 7v2h4V7a2 2 0 0 0-2-2z" /></svg>
function Detail() {
    const dmy = new Date();
    const match = useRouteMatch();
    const dispatch = useDispatch();
    const roomId = match.params.id;
    const roomVt = match.params.vt;
    const selectInfo = useSelector((state) => state.booking.selectRoom);
    const commentInfo = useSelector((state) => state.booking.comments);
    // const bookRoomInfo = useSelector((state) => state.booking.bookroom);
    const [bookRoom, setBookRoom] = useState({
        maPhong: +roomId,
        ngayDen: "",
        ngayDi: "",
        soLuongKhach: 1,
        maNguoiDung: +localStorage.getItem("id")
    });
    const [loca, setLoca] = useState([]);
    const [totalDay, setTotalDay] = useState(1);
    ///Biết lưu giá trị DatePicker
    const [dates, setDates] = useState(null);
    const [hackValue, setHackValue] = useState(null);
    const [value, setValue] = useState(null);
    ///
    ///FetchAction
    const fetchDetailComment = async () => {
        dispatch(fetchDetailAction(roomId));
        dispatch(fetchCommentAction(roomId));
        // dispatch(fetchBookRoom(+roomId))
    }
    // const HandleBookRoom =  async() => {
    //     const max =await dispatch(fetchBookRoom(+roomId));
    //     setTotal(max - dmy.getDate());

    // }
    const LocationRoom = async () => {
        const vt = await fetchLocationRoomAction(roomVt);
        setLoca(vt);
    }
    const stars = useMemo(() => {
        let star = 0;
        let total = commentInfo === null ? 0 : commentInfo?.length;
        commentInfo?.map((item, index) => {
            return star += item.saoBinhLuan;
        })
        const res = {
            star: `${total === 0 ? 0 : star / total}`,
            total: `${total}`
        };
        return res;
    }, [commentInfo])
    useEffect(() => {
        fetchDetailComment();
        LocationRoom();
    }, [])

    ///Render 
    const renderConvenient = (icon, text, istext) => {
        if (istext) {
            return (
                <div className={Styles.itemTrue}>
                    <div>
                        {icon}
                    </div>
                    <div>
                        {text}
                    </div>
                </div>
            )
        } else {
            return (
                <div className={Styles.itemFalse}>
                    <div>
                        {icon}
                    </div>
                    <div>
                        {text} <CloseCircleOutlined style={{ color: "red" }} />
                    </div>
                </div>
            )
        }
    }
    const renderCommentsAvata = (item) => {
        if (item === "") {
            return (
                <>
                    <UserOutlined style={{ fontSize: "30px" }} />
                </>
            )
        } else {
            return (
                <>
                    <img src={item} alt="" />
                </>
            )
        }

    }

    ///Xử Lý Tăng Giảm Iput
    const handlePlusNumber = () => {
        if (bookRoom.soLuongKhach === selectInfo.khach) {
            return;
        }
        setBookRoom({ ...bookRoom, soLuongKhach: bookRoom.soLuongKhach + 1 })
    }
    const handleminusNumber = () => {
        if (bookRoom.soLuongKhach === 1) {
            return;
        }
        // setNumber(number - 1);
        setBookRoom({ ...bookRoom, soLuongKhach: bookRoom.soLuongKhach - 1 })
    }

    ///Xử lý BookRoom
    const handleDate = (values) => {
        if (values === null) {
            return setBookRoom({ ...bookRoom, ngayDen: "", ngayDi: "" })
        }
        const resMM = (YYYY, MM) => {
            if ((YYYY % 4 === 0 && YYYY % 100 !== 0 && YYYY % 400 !== 0) || (YYYY % 100 === 0 && YYYY % 400 === 0)) {
                switch (MM) {
                    case 1:
                    case 3:
                    case 5:
                    case 7:
                    case 8:
                    case 10:
                    case 12:
                        return 31;
                        break
                    case 2:
                        return 29;
                        break
                    case 4:
                    case 6:
                    case 9:
                    case 11:
                        return 30;
                        break
                    default:
                        console.log("tháng này không tồn tại!!!")
                        break;
                }
            } else {
                switch (MM) {
                    case 1:
                    case 3:
                    case 5:
                    case 7:
                    case 8:
                    case 10:
                    case 12:
                        return 31;
                        break
                    case 2:
                        return 28;
                        break
                    case 4:
                    case 6:
                    case 9:
                    case 11:
                        return 30;
                        break
                    default:
                        console.log("tháng này không tồn tại!!!")
                        break;
                }
            }
        }
        const value1 = moment(values[0]).format("YYYY-MM-DD")
        const value2 = moment(values[1]).format("YYYY-MM-DD")
        let totalDay = 0;
        let YYYY1 = +value1.slice(0, 4);
        let YYYY2 = +value2.slice(0, 4);
        let MM1 = +value1.slice(5, 7);
        let MM2 = +value2.slice(5, 7);
        let DD1 = +value1.slice(8, 10);
        let DD2 = +value2.slice(8, 10);
        if (YYYY1 !== dmy.getFullYear() || YYYY2 !== dmy.getFullYear()) {
            return notification['error']({
                message: 'Chọn Sai Năm Hiện Tại !!!',
                description:
                    `Vui lòng chọn năm ${dmy.getFullYear()}`,
            });
        }
        if (MM1 === MM2) {
            totalDay = DD2 - DD1;
        } else {
            totalDay = (resMM(YYYY1, MM1) - DD1) + (DD2)
        }
        if (totalDay > 15) {
            return notification['error']({
                message: 'Số Ngày Chọn Vượt quá 14 Ngày !!!',
                description:
                    `Chỉ cho phép thuê tối đa 14 ngày !`,
            });
        }
        setValue(values)
        setTotalDay(totalDay)
        // if(0<=parseInt(value1.slice(0,4))-dmy.getFullYear()<=1){
        //     bookRoomInfo.map((item)=>{
        //         if(item.ngayDi.slice(5,7)===value1.slice(5,7)){
        //             if()
        //         }
        //     })
        // // }
        // setdate([value1, value2])
        setBookRoom({ ...bookRoom, ngayDen: value1, ngayDi: value2 })
    }
    const disabledDate = (current) => {
        // Can not select days before today and today
        if (!dates) {
            return false;
        }
        const tooLate = dates[0] && current.diff(dates[0], 'days') > 14;
        const tooEarly = dates[1] && dates[1].diff(current, 'days') > 14;
        return !!tooEarly || !!tooLate || current < moment().subtract(1, 'days');
        // 
    }
    
    const onOpenChange = (open) => {
        if (open) {
            setHackValue([null, null]);
            setDates([null, null]);
        } else {
            setHackValue(null);
        }
    };
    const handleSubmitBookRoom = () => {
        if (localStorage.getItem("id") === null) {
            dispatch(showModalSignIn(true));
            return;
        }
        if (bookRoom.ngayDen === "" && bookRoom.ngayDi === "") {
            message.error('Chưa Chọn ngày Thuê !');
            return;
        }
        console.log(bookRoom);
        dispatch(fetchBookRoomAction(bookRoom))
    }
    const handleSubmitComment = (values) => {
        if (localStorage.getItem("id") === null) {
            dispatch(showModalSignIn(true));
            return;
        }
        
        const userComment = {
            maPhong: +roomId,
            maNguoiBinhLuan: +localStorage.getItem("id"),
            ngayBinhLuan: `${dmy.getDate()}/${dmy.getMonth()+1}/${dmy.getFullYear()}`,
            noiDung: `${values.comment}`,
            saoBinhLuan: values.soSao === undefined ? 1 : values.soSao
        }
        console.log(userComment);
        dispatch(fetchCommentUserAction(userComment))

    };
    return (
        <div className='container'>
            <h1>{selectInfo?.tenPhong}</h1>
            <div className={Styles.star}>
                <span><StarOutlined style={{ marginRight: "5px" }} />
                    {stars.star === undefined ? 0 : stars.star} -  <span style={{ borderBottom: "1px solid #c4c1c1" }}>{stars.total} đánh giá</span> . </span>
                <span>{loca?.tenViTri}, </span>
                <span>{loca?.tinhThanh}, </span>
                <span>{loca?.quocGia}</span>
            </div>
            <div className={Styles.img}>
                <img src={selectInfo?.hinhAnh} alt="" width="100%" />
            </div>
            <div className={Styles.roomDetail}>
                <div className={Styles.information}>
                    <div className={Styles.roomName}>
                        <div className={Styles.name}>
                            <h3 >{selectInfo?.tenPhong} </h3>
                            <p style={{ color: "#A1A1A1", fontSize: "16px" }}><span>{selectInfo?.khach} Khách</span> -
                                <span> {selectInfo?.phongNgu} Phòng ngủ </span> -
                                <span> {selectInfo?.giuong} Giường</span> -
                                <span> {selectInfo?.phongTam} Phòng tắm</span>
                            </p>
                        </div>
                        <div className={Styles.icon}>
                            <HomeOutlined style={{ color: "#FFF", fontSize: "25px" }} />
                        </div>
                    </div>
                    <div className={Styles.des}>
                        <div className={Styles.item}>
                            <div>
                                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: "block", height: "24px", width: "24px", fill: "currentcolor" }}><path d="m16.8438 27.1562-.00005-3.39845-.2608465.0913211c-.9857292.3215073-2.0303948.5116467-3.1127817.5499306l-.4076218.0071983-.2927873-.0037049c-6.03236807-.1528291-10.89442655-5.0148222-11.04725775-11.0472069l-.00370495-.2927882.00370495-.2927873c.1528312-6.03236807 5.01488968-10.89442655 11.04725775-11.04725775l.2927873-.00370495.2927882.00370495c6.0323847.1528312 10.8943778 5.01488968 11.0472069 11.04725775l.0037049.2927873-.00663.3912275c-.0484899 1.4286741-.3615343 2.7917824-.8920452 4.0406989l-.1327748.2963236 7.90645 7.90705v5.5834h-5.5834l-4.12505-4.12545zm-6.5313-19.93745c1.708641 0 3.09375 1.38511367 3.09375 3.09375 0 1.7086436-1.3851064 3.09375-3.09375 3.09375-1.70863633 0-3.09375-1.385109-3.09375-3.09375 0-1.70863365 1.38511635-3.09375 3.09375-3.09375zm0 2.0625c-.56954635 0-1.03125.46170365-1.03125 1.03125 0 .5695521.46169942 1.03125 1.03125 1.03125.5695564 0 1.03125-.4616936 1.03125-1.03125 0-.56955058-.4616979-1.03125-1.03125-1.03125zm12.1147 15.81255 4.12455 4.12495h2.667v-2.667l-8.37295-8.37255.3697-.6775.1603998-.3074798c.56763-1.1397167.90791-2.4128858.9606815-3.761954l.0072187-.3697662-.0038197-.2688703c-.1397418-4.91222958-4.0963692-8.86881961-9.0086094-9.00856l-.2688709-.0038197-.2688703.0038197c-4.91222958.13974039-8.86881961 4.09633042-9.00856 9.00856l-.0038197.2688703.0038197.2688709c.14228112 5.0015536 4.24146819 9.0124291 9.2774303 9.0124291 1.4456308 0 2.8116781-.3298367 4.0293209-.9177001l.3012791-.1522999 1.5131-.7998-.00045 4.61975z"></path></svg>
                            </div>
                            <div>
                                <span className={Styles.title} >Trải nghiệm nhận phòng tuyệt vời</span>
                                <span className={Styles.titleNote}>100% khách gần đây đã xếp hạng 5 sao cho quy trình nhận phòng.</span>
                            </div>
                        </div>
                        <div className={Styles.item}>
                            <div>
                                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: 24, width: 24, fill: 'currentcolor' }}><path d="M13.693 13.934a4 4 0 0 1 5.283.595l.292.366 4.768 6.755a4 4 0 0 1 .596 3.342 4.004 4.004 0 0 1-4.496 2.913l-.403-.084-3.474-.932a1 1 0 0 0-.518 0l-3.474.932a4 4 0 0 1-2.941-.347l-.401-.249a4.004 4.004 0 0 1-1.19-5.207l.229-.368 4.768-6.755a4 4 0 0 1 .961-.96zm3.756 1.889a2 2 0 0 0-2.979.09l-.104.136-4.838 6.861a2 2 0 0 0 2.048 3.017l.173-.038 3.992-1.07a1 1 0 0 1 .518 0l3.964 1.063.143.034a2 2 0 0 0 2.132-2.963l-4.947-7.014zM27 12a4 4 0 1 1 0 8 4 4 0 0 1 0-8zM5 12a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm22 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM5 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm6-10a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm10 0a4 4 0 1 1 0 8 4 4 0 0 1 0-8zM11 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm10 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" /></svg>

                            </div>
                            <div>
                                <span className={Styles.title} >Hoan nghênh thú cưng</span>
                                <span className={Styles.titleNote}>Mang theo thú cưng đến chỗ ở.</span>
                            </div>
                        </div>
                        <div className={Styles.item}>
                            <div>
                                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: 24, width: 24, fill: 'currentcolor' }}><path d="m11.6667 0-.00095 1.666h8.667l.00055-1.666h2l-.00055 1.666 6.00065.00063c1.0543745 0 1.9181663.81587127 1.9945143 1.85073677l.0054857.14926323v15.91907c0 .4715696-.1664445.9258658-.4669028 1.2844692l-.1188904.1298308-8.7476886 8.7476953c-.3334303.3332526-.7723097.5367561-1.2381975.5778649l-.1758207.0077398h-12.91915c-2.68874373 0-4.88181754-2.1223321-4.99538046-4.7831124l-.00461954-.2168876v-21.66668c0-1.05436021.81587582-1.91815587 1.85073739-1.99450431l.14926261-.00548569 5.999-.00063.00095-1.666zm16.66605 11.666h-24.666v13.6673c0 1.5976581 1.24893332 2.9036593 2.82372864 2.9949072l.17627136.0050928 10.999-.0003.00095-5.6664c0-2.6887355 2.122362-4.8818171 4.7832071-4.9953804l.2168929-.0046196 5.66595-.0006zm-.081 8-5.58495.0006c-1.5977285 0-2.9037573 1.2489454-2.9950071 2.8237299l-.0050929.1762701-.00095 5.5864zm-18.586-16-5.999.00062v5.99938h24.666l.00065-5.99938-6.00065-.00062.00055 1.66733h-2l-.00055-1.66733h-8.667l.00095 1.66733h-2z" /></svg>
                            </div>
                            <div>
                                <span className={Styles.title} >Hủy miễn phí trong 48 giờ.</span>

                            </div>
                        </div>
                        <div style={{ marginTop: "30px" }}>
                            <span>{selectInfo?.moTa}</span>
                        </div>
                    </div>
                    <h3>Nơi này có những gì cho bạn</h3>
                    <div className={Styles.convenient}>
                        {renderConvenient(wifi, "Wifi", selectInfo?.wifi)}
                        {renderConvenient(pool, "Hồ Bơi", selectInfo?.hoBoi)}
                        {renderConvenient(iron, "Bàn Là", selectInfo?.banLa)}
                        {renderConvenient(parking, "Chỗ đỗ xe miễn phí tại nơi ở", selectInfo?.doXe)}
                        {renderConvenient(kitchen, "Bếp", selectInfo?.bep)}
                        {renderConvenient(airCon, "Điều hòa ", selectInfo?.dieuHoa)}
                        {renderConvenient(tv, "TV", selectInfo?.TV)}
                    </div>

                </div>
                <div className={Styles.bookRoom}>
                    <div className={Styles.title}>
                        <div className={Styles.price}>
                            <span style={{ fontSize: "25px", fontWeight: 500 }}>${selectInfo?.giaTien} </span>
                            <span>đêm</span>
                        </div>
                        <div className={Styles.evaluate}>
                            <span><StarOutlined style={{ marginRight: "5px" }} />
                                {stars.star === undefined ? 0 : stars.star} -  <span style={{ borderBottom: "1px solid #c4c1c1" }}>{stars.total} đánh giá</span> . </span>
                        </div>
                    </div>
                    <div className={Styles.date}>
                        <RangePicker
                            format="DD/MM/YYYY"
                            
                            value={hackValue || value}
                            onCalendarChange={(val) => setDates(val)}
                            onChange={handleDate}
                            disabledDate={disabledDate}
                            onOpenChange={onOpenChange}
                            className={Styles.rangePicker}
                        />
                    </div>

                    <div>
                        <div className={Styles.select}>
                            <div className={Styles.text}>
                                <span style={{ display: "block", fontSize: "12px", fontWeight: 500 }}>Khách</span>
                                <span style={{ display: "block", opacity: "0.8" }}>{bookRoom.soLuongKhach} Khách</span>
                            </div>
                            <div className={Styles.iconTB}>
                                <DownOutlined />
                            </div>
                        </div>
                        <div className={Styles.option}>
                            <div className={Styles.input}>
                                <div className={Styles.lable}>
                                    <span style={{ display: "block", fontSize: "16px", fontWeight: 500 }}>Người lớn </span>
                                    <span style={{ display: "block", opacity: "0.8" }}>Từ 13 tuổi trở lên </span>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <button className={Styles.btn} onClick={() => handleminusNumber()}>-</button>
                                    <span style={{ fontSize: "18px", margin: "0 10px", width: "15px", textAlign: "center" }}>{bookRoom.soLuongKhach}</span>
                                    <button className={Styles.btn} onClick={() => handlePlusNumber()}>+</button>
                                </div>
                            </div>
                            <div className={Styles.input}>
                                <div className={Styles.lable}>
                                    <span style={{ display: "block", fontSize: "16px", fontWeight: 500 }}>Trẻ em </span>
                                    <span style={{ display: "block", opacity: "0.8" }}>Độ tuổi 2-12 </span>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <button className={Styles.btn} disabled>-</button>
                                    <span style={{ fontSize: "18px", margin: "0 10px", width: "15px", textAlign: "center" }}>0</span>
                                    <button className={Styles.btn} disabled>+</button>
                                </div>
                            </div>
                            <div className={Styles.input}>
                                <div className={Styles.lable}>
                                    <span style={{ display: "block", fontSize: "16px", fontWeight: 500 }}>Em bé </span>
                                    <span style={{ display: "block", opacity: "0.8" }}>Dưới 2 tuổi </span>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <button className={Styles.btn} disabled>-</button>
                                    <span style={{ fontSize: "18px", margin: "0 10px", width: "15px", textAlign: "center" }}>0</span>
                                    <button className={Styles.btn} disabled>+</button>
                                </div>
                            </div>
                            <div className={Styles.input}>
                                <div className={Styles.lable}>
                                    <span style={{ display: "block", fontSize: "16px", fontWeight: 500 }}>Thú cưng </span>
                                    <span style={{ display: "block", opacity: "0.8" }}></span>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <button className={Styles.btn} disabled>-</button>
                                    <span style={{ fontSize: "18px", margin: "0 10px", width: "15px", textAlign: "center" }}>0</span>
                                    <button className={Styles.btn} disabled>+</button>
                                </div>
                            </div>
                        </div>
                        <div className={Styles.buy}>
                            <div className={Styles.provisional}>
                                <span>${selectInfo?.giaTien} x {totalDay} Đêm</span>
                                <span>${+selectInfo?.giaTien * totalDay}</span>
                            </div>
                            <div className={Styles.totalMoney}>
                                <span style={{ fontSize: "18px", fontWeight: "500" }}>Tổng Tiền</span>
                                <span>${+selectInfo?.giaTien * totalDay}</span>
                            </div>
                        </div>
                    </div>
                    <button className={Styles.btnbookRoom} onClick={handleSubmitBookRoom}>Đặt Phòng</button>
                </div>
            </div>
            <div className={Styles.comments}>
                <h3>Bình Luận</h3>
                <div className={Styles.comment}>
                    {
                        commentInfo?.map((item, index) => {
                            return (
                                <div className={Styles.item} key={index}>
                                    <div className={Styles.nameUser}>
                                        <div className={Styles.avatar}>
                                            {
                                                renderCommentsAvata(item.avatar)
                                            }

                                        </div>
                                        <div className={Styles.name}>
                                            <span style={{ display: "block", fontSize: "14px", fontWeight: 600 }}>{item.tenNguoiBinhLuan}</span>
                                            <span style={{ display: "block" }} className={Styles.titleNote}>{item.ngayBinhLuan}</span>
                                        </div>
                                    </div>
                                    <div className={Styles.content}>
                                        <span>{item.noiDung}</span>
                                    </div>

                                </div>
                            )
                        })
                    }
                </div>
                <div className={Styles.addComment}>
                    <Form
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 14 }}
                        layout="horizontal"
                        onFinish={handleSubmitComment}
                    >
                        <Form.Item name="comment"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập nội dung bình luận!',
                                }
                            ]}
                        >
                            <TextArea placeholder='Nôi dung bình luận'></TextArea>
                        </Form.Item>
                        <Form.Item
                            name="soSao"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng đánh giá số sao!',
                                }
                            ]}
                        >
                            <InputNumber size="large" prefix={<StarOutlined style={{ fontSize: "30px", margin: "0 10px" }} />} min={1} max={5}  placeholder='Số sao' style={{ border: "none", width: 100 }}></InputNumber>
                        </Form.Item>
                        <Form.Item >
                            <Button type='primary' htmlType="submit">Bình Luận</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Detail