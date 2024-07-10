import {JSX} from 'react';
import Main from '../../pages/main/main';
import {Offer} from '../../mocks/offers';

type Props = {
  offers: Offer[];
}

function App({offers}: Props): JSX.Element {
  return <Main offers={offers}/>;
}

export default App;
