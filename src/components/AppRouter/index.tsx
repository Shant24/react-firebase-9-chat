import { Redirect, Route, Switch } from 'react-router-dom';

import { privateRoutes, publicRoutes } from '../../routes';
import { CHAT_ROUTE, LOGIN_ROUTE } from '../../utils/constants';
import useAuth from '../../hooks/useAuth';

const AppRouter = () => {
  const { user } = useAuth();

  return user ? (
    <Switch>
      {privateRoutes.map(({ path, Component, expect }) => (
        <Route key={path} path={path} component={Component} exact={expect} />
      ))}

      <Redirect to={CHAT_ROUTE} />
    </Switch>
  ) : (
    <Switch>
      {publicRoutes.map(({ path, Component, expect }) => (
        <Route key={path} path={path} component={Component} exact={expect} />
      ))}

      <Redirect to={LOGIN_ROUTE} />
    </Switch>
  );
};

export default AppRouter;
