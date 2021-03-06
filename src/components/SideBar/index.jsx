import React from "react";
import "../SideBar/index.css";
import { Layout, Menu} from 'antd';
import { DropboxOutlined, UserOutlined, ShopOutlined, BookOutlined, LogoutOutlined, GlobalOutlined, UserAddOutlined, SolutionOutlined, FileTextOutlined } from '@ant-design/icons';
import {Link}  from "react-router-dom";
import Logout from "../../containers/Logout"
import { useTranslation } from 'react-i18next';
// import ar from '../../assests/flags/arabic.png';
import en from '../../assests/flags/english.png';
// import tr from '../../assests/flags/turkish.png';
import logo from '../../assests/flags/Logo.png';
import i18next from "i18next";

const { Sider } = Layout;
const { SubMenu } = Menu;

const SideBar = ({clearInputs}) => {

    const {t} = useTranslation();
  /*   const selectLanguage = (language) => {
      if (language === 'ar') {
        i18n.changeLanguage('ar');
        document.documentElement.style.setProperty('direction', 'rtl'); 
      } else {
        i18n.changeLanguage(language);
        document.documentElement.style.setProperty('direction', 'ltr');
      }
    }; */
    
    // const TrIcon = () => <img alt="flag" style={{width:'1.5rem', marginRight:"0.5em" }} src={tr} />
    const EnIcon = () => <img alt="flag" style={{width:'1.5rem', marginRight:"0.5em" }}  src={en} />
    // const ArIcon = () => <img alt="flag" style={{width:'1.5rem', marginRight:"0.5em" }}  src={ar} />

    
    return(
         <Sider
        breakpoint="lg"
        collapsedWidth="0"
      >
         
        <div className="logo" >
        <img src={logo} alt="" width="60" height="60"/>
                </div>
          
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            <Link  exact to="/" >{t('links.adminDashboard')}</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<UserAddOutlined />}>
            <Link to="/student" >{t('links.addStudent')}</Link>
          </Menu.Item>
          
          
          <Menu.Item key="6" icon={<SolutionOutlined />}>
            <Link to="/studentpayment" >{t('links.studentPayment')}</Link>
          </Menu.Item>
          <Menu.Item key="7" icon={<FileTextOutlined />}>
            <Link to="/studentreciept" >{t('links.studentReciept')}</Link>
          </Menu.Item>



          
          <Menu.Item key="2" icon={<DropboxOutlined />}>
            <Link   to="/inventory" >{t('links.inventory')}</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<ShopOutlined />}>
            <Link to="/order" >{t('links.order')}</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<BookOutlined />}>
            <Link to="/recipe" >{t('links.recipe')}</Link>
          </Menu.Item>
          {/* <Menu.Item key="5" icon={<VideoCameraOutlined />}>
            <Link to="/tutorials" >{t('links.tutorials')}</Link>
          </Menu.Item> */}
          <SubMenu key="sub1" icon={<GlobalOutlined />} title={t("links.language.header0")}>
              {/* <Menu.Item icon={<TrIcon />} onClick={() => {i18next.changeLanguage('tr');}} key="6">{t("links.language.header1")}</Menu.Item> */}
              <Menu.Item icon={<EnIcon />} onClick={() => {i18next.changeLanguage('en');}} key="7">{t("links.language.header2")}</Menu.Item>
              {/* <Menu.Item icon={<ArIcon />} onClick={() => {i18next.changeLanguage('ar');}} key="8">{t("links.language.header3")}</Menu.Item> */}
            </SubMenu>
          <Menu.Item key="9" icon={<LogoutOutlined />}>
            <Logout style={{paddingRight: "12px"}} clearInputs={clearInputs}/>
          </Menu.Item>
        </Menu>
          </Sider>
    )
}
export default  SideBar;
