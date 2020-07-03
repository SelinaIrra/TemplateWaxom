import React, { useState, useEffect } from 'react';
import { SectionsContainer, Section } from 'react-fullpage';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Section1 from './Section1';
import Section2 from './Section2';
import Section3 from './Section3';
import Section4 from './Section4';
import Section5 from './Section5';
import './App.css';

function App() {
  const [fullpage, setFullpage] = useState(true);
  const [height, setHeight] = useState('');

  useEffect(() => {
    let href = window.location.href.split('#');
    if (href.length > 1)
      window.location.href = href[0];
    if (window.innerWidth <= 685) {
      setHeight(window.innerHeight + 'px');
      setFullpage(false);
    }
  }, [])

  const option = {
    sectionClassName: 'section',
    anchors: ['sectionOne', 'sectionTwo', 'sectionThree', 'sectionFour', 'sectionFive'],
    scrollBar: false,
    navigation: true,
    verticalAlign: false,
    arrowNavigation: true
  };

  return (<>
    {fullpage && <SectionsContainer {...option}>
      <Section>
        <Section1 />
      </Section>
      <Section>
        <Section2 />
      </Section>
      <Section>
        <Section3 />
      </Section>
      <Section>
        <Section4 />
      </Section>
      <Section>
        <Section5 />
      </Section>
    </SectionsContainer>}
    {!fullpage && <>
      <div style={{height: height}}>
        <Section1 />
      </div>
      <div style={{height: height}}>
        <Section2 />
      </div>
      <div>
        <Section3 />
      </div>
      <div>
        <Section4 />
      </div>
      <div>
        <Section5 scroll={true}/>
      </div>
    </>}
  </>);
}

export default App;
