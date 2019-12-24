import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import getLoginUser from '../utils/api';

import HomePage from '../pages/home/';
import HomeMore from '../pages/home/homemore';
import LoginPage from '../pages/login/login';
import AdminHomePage from '../pages/home/adminhome';
import AdminHomeMorePage from '../pages/home/adminhome/more';
import CreateMeetingPage from '../pages/home/create';
import CameraScanPage from '../pages/home/scan/index';
// 路由配置
const LoginRouter = createStackNavigator({ Login: LoginPage });
const HomeRouter = createStackNavigator({
  Home: HomePage,
  HomeMore: HomeMore,
  AdminHome: AdminHomePage,
  AdminHomeMore: AdminHomeMorePage,
  CreateMeeting: CreateMeetingPage,
  CameraScan: CameraScanPage
});

// 进行登录状态的判断
const AuthNavigation = createSwitchNavigator(
  {
    Home: HomeRouter,
    Login: LoginRouter,
  },
  {
    //initialRouteName: getLoginUser().isLogin === true ? 'Home' : 'Login'
    initialRouteName: 'Login',
  },
);

const Rootnavigation = createAppContainer(AuthNavigation);
export default Rootnavigation;
