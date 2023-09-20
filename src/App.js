import React, { useEffect, useState } from "react";

import { Route, Routes, useNavigate } from "react-router-dom";

import Home from "./components/Home";
import CreateSignature from "./components/CreateSignature";
import { Layout, Menu, Breadcrumb, Button } from "antd";
import { APP_NAME } from "./util/constants";
import History from "./components/History";
import Sign from "./components/Sign";
import { useSDK } from '@metamask/sdk-react';

import "./App.css";

const { Header, Content, Footer } = Layout;

function App() {
  const [account, setAccount] = useState();
  const [loading ,setLoading] = useState(false);

  const { sdk, connected, connecting, provider, chainId } = useSDK();

  
  const login = async () => {
    setLoading(true)
    try {
      const accounts = await sdk?.connect();
      setAccount(accounts?.[0]);
    } catch(err) {
      console.warn(`failed to connect..`, err);
    
    } finally {
      setLoading(false)
    }
  }

  const checkConnected = async () => {
    const e = window.ethereum
    if (!e) {
      return
    }
    const connected = e.isConnected()
    console.log('connected', connected)
    if (connected) {
      await login()
    }
  }

  const logout = 

  useEffect(() => {
    checkConnected()
  }, [])

  const navigate = useNavigate();
  const path = window.location.pathname;

  const isSignature = path.startsWith("/sign");

  return (
    <div className="App">
      <Layout className="layout">
        <Header
        theme = {{
          "background-color": "#fff",
          "box-shadow": "0 2px 8px #f0f1f2",
          "background": "#fff",
        }}
        >
         
          <Menu
            
            mode="horizontal"
            defaultSelectedKeys={[]}
         

            className="header-menu"

          >
            <Menu.Item className="menu-item" key={0} onClick={() => navigate("/")}>
              METASIGN
            </Menu.Item>

            {!isSignature && (
              <>
                <Menu.Item  key={1} onClick={() => navigate("/create")}>
                  Create signature request
                </Menu.Item>
                <Menu.Item key={2} onClick={() => navigate("/history")}>
                  History
                </Menu.Item>
              </>
            )}
            {!account && <span>
              <Button type="primary" onClick={login}  loading={loading} disabled={loading}>Connect Wallet</Button>
            </span> }
            {account && <span>
              HI 👋 {account.slice(0, 6)}...{account.slice(-4)}</span>}
          </Menu>
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sign/:signId" element={<Sign account={account} />} />
              <Route path="/create" element={<CreateSignature account={account}/>} />
              <Route path="/history" element={<History />} />
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          {APP_NAME} ©2023 - METASIGN
        </Footer>
      </Layout>
    </div>
  );
}

export default App;
