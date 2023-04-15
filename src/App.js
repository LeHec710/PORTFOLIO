import { Canvas } from '@react-three/fiber';
import { Animation } from 'hooks/useAnimations';

import './App.css';
import Scene from './Scene';
import Content from './Content';
import { Models } from 'hooks/useModels';
import { useRef } from 'react';

function App() {
  const domNodeRef = useRef()

  return (
    <>
      <Canvas>
        <Models>
          <Animation>
            <Scene />
            <Content domNodeRef={domNodeRef} />
          </Animation>
        </Models>
      </Canvas>
      <div className='container'>
        <div className='wrapper'>
          <header>
            <h2 className='outlined main-title fadeIn'>Hector BDN</h2>
            <a href="#a">Contact</a>
          </header>
          <section className='intro' ref={domNodeRef}>
            <div style={{width: "100%"}}>
              <h1 className='main-title'>SKATE</h1>
              <div id="skater" className="model">
              </div>
              <div id="work" className="model">
                <div className="projects">
                  <div className="project glass">
                    <h3>Project name</h3>
                    <div>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed fermentum accumsan augue vel ullamcorper. 
                        <br /> <br />Donec gravida dolor nunc, eu pretium tortor ornare vel. Nunc gravida vulputate dignissim.
                        <br /> <br />
                        <button className="glass-button">Visiter</button>
                        </p>
                      <img src="https://picsum.photos/250/200" className='glass'/>
                    </div>
                  </div>
                  <div className="project glass">
                    <h3>Project name</h3>
                    <div>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed fermentum accumsan augue vel ullamcorper. 
                        <br /> <br />Donec gravida dolor nunc, eu pretium tortor ornare vel. Nunc gravida vulputate dignissim.
                        <br /> <br />
                        <button className="glass-button">Visiter</button>
                        </p>
                      <img src="https://picsum.photos/250/200" className='glass'/>
                    </div>
                  </div>
                  <div className="project glass">
                    <h3>Project name</h3>
                    <div>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed fermentum accumsan augue vel ullamcorper. 
                        <br /> <br />Donec gravida dolor nunc, eu pretium tortor ornare vel. Nunc gravida vulputate dignissim.
                        <br /> <br />
                        <button className="glass-button">Visiter</button>
                        </p>
                      <img src="https://picsum.photos/250/200" className='glass'/>
                    </div>
                  </div>
                </div>
              </div>
              <p className='main-description'>Je fais du skate</p>
              <button className='select-button interactive'>Me découvrir !</button>
            </div>
            <div className='next interactive'>
              SUIVANT
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default App;
