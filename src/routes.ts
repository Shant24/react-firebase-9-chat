import Chat from './components/Chat';
import Login from './components/Login';
import { CHAT_ROUTE, LOGIN_ROUTE } from './utils/constants';

export const publicRoutes = [{ path: LOGIN_ROUTE, Component: Login, expect: true }];

export const privateRoutes = [{ path: CHAT_ROUTE, Component: Chat, expect: true }];
