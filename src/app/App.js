
import { Spin } from 'antd';
import { lazy, Suspense, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import '../App.css';
import Footer from '../common/components/footer';
import Header from '../common/components/header';
import { fetchProfileAction } from '../common/utils/action';
// import Detail from '../featurns/booking/pages/detail';

const Home = lazy(() => import("../featurns/booking/pages/home"))
const Detail = lazy(() => import("../featurns/booking/pages/detail"))
const MapRoom = lazy(() => import("../featurns/booking/pages/mapRoom"))
function App() {
  const dispatch = useDispatch();
  const id =+localStorage.getItem("id")
  useEffect(() => {
    dispatch(fetchProfileAction(id))
  }, [])
  return (
    <>
      <BrowserRouter>
        <Header ></Header>
        <Suspense fallback={<div style={{textAlign:"center" ,margin:"30px 0"}}>  <Spin size="large" /></div>}>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/detail/:id/:vt" component={Detail} />
            <Route path="/maproom/:id/" component={MapRoom}  />
            <Redirect to="/" />
          </Switch>
        </Suspense>
        <Footer></Footer>
      </BrowserRouter>
    </>
  );
}

export default App;
