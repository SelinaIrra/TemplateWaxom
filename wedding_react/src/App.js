import React, {useState} from 'react';
import ReactFullpage from '@fullpage/react-fullpage';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Section1 from './Section1';
import Section2 from './Section2';
import Section3 from './Section3';
import Section4 from './Section4';
import Section5 from './Section5';
import './App.css';

function App() {
  const [section, setSection] = useState(0);
  const [api, setApi] = useState(null)

  const afterLoad = (origin, destination, direction) => {
    setSection(destination.index)
  }

  const renderNavigation = () => {
    let nav = [];
    for (let i = 0; i < 5; i++) {
      nav.push( i === section ? <FavoriteIcon key={i} /> : <FavoriteBorderIcon key={i} onClick={() => api.moveTo(i + 1)} />)
    }
    return nav;
  }
  
  return (<> 
    <ReactFullpage
      scrollOverflow={true}
      licenseKey="4F4DA9EF-5A634194-8AB79E5B-A0F3B7FB"
      afterLoad={afterLoad.bind(this)}
      render={({ state, fullpageApi }) => {
          setApi(fullpageApi);
          return (
            <ReactFullpage.Wrapper>
              <div className="section">
                <Section1 />
              </div>
              <div className="section">
                <Section2 />
              </div>
              <div className="section">
                <Section3 />
              </div>
              <div className="section">
                <Section4 />
              </div>
              <div className="section">
                <Section5 />
              </div>
            </ReactFullpage.Wrapper>
          );
        }}
      />
      <div className="App-navigation">
        {renderNavigation()}
      </div>
    </>);
}

export default App;
