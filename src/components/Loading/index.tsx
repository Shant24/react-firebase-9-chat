import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import styles from './styles.module.scss';

interface ILoadingProps {}

const Loading = (props: ILoadingProps) => (
  <Container>
    <Grid container style={{ height: window.innerHeight - 64 }} justifyContent="center" alignItems="center">
      <Grid container direction="column" justifyContent="center" alignItems="center">
        <div className={styles.ldsRipple}>
          <div></div>
          <div></div>
        </div>
      </Grid>
    </Grid>
  </Container>
);

export default Loading;
