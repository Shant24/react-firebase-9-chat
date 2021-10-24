import useAuth from './hooks/useAuth';
import Navbar from './components/Navbar';
import AppRouter from './components/AppRouter';
import Loading from './components/Loading';

const App = () => {
  const { loading } = useAuth();

  return loading ? (
    <Loading />
  ) : (
    <>
      <Navbar />

      <AppRouter />
    </>
  );
};

export default App;
