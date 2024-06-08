import { Canvas } from '@react-three/fiber';
import { Animation } from 'hooks/useAnimations';

import './App.css';
import Scene from './Scene';
import Content from './Content';
import { Models, useModels } from 'hooks/useModels';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import $ from 'jquery';

function App() {
  const domNodeRef = useRef()
  const { next, models, setCurrentModel, currentModel, selected, setSelected, currentModelRef } = useModels()

  function isTouchDevice() {
    return (('ontouchstart' in window) ||
       (navigator.maxTouchPoints > 0) ||
       (navigator.msMaxTouchPoints > 0));
  }
  

  useEffect(() => {
    const handleScroll = () => {
      const scroll = $(window).scrollTop();
      if (scroll > 200) {
        setSelected(true);
      } else {
        setSelected(false);
      }
    };

    // Ajout des écouteurs pour les événements de défilement et tactiles
    $(window).on('scroll touchmove', handleScroll);

    // Nettoyage des écouteurs lors du démontage du composant
    return () => {
      $(window).off('scroll touchmove', handleScroll);
    };
  }, []);  
  

  return (
    <div>
      <div className="canvas-container" >
        <Canvas camera={{ fov: 900, far: 600, near: 0 }}>
          {/* <Animation> */}
          <Scene />
          {/* <Content domNodeRef={domNodeRef} />
            </Animation> */}
        </Canvas>
      </div>
      <div className='container' style={{pointerEvents: ((isTouchDevice()) ? (selected ? "all" : "none") : "none")}}>
          <header>
            <h2 className='outlined title fadeIn'>Hector BDN</h2>
            <a href="#a">Contact</a>
          </header>
        <div className='wrapper intro'>
          <section className='intro' ref={domNodeRef}>
            <div style={{ width: "100%" }}>
              <h1 className='main-title'>{currentModel.name}</h1>
              <p className='main-description'>Je fais du skate</p>
              <button className='select-button interactive' onClick={() => setSelected(selected ? false : true)}>Voir mes projets</button>
            </div>
            <div className='next interactive' onClick={next}>
              SUIVANT
            </div>
          </section>
        </div>
        <div className="wrapper section" style={{ padding: '5vw' }}>
          <div id="dev" className="model">
            <div className="projects">
              <div className="project glass">
                <h3>dev</h3>
                <div>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed fermentum accumsan augue vel ullamcorper.
                    <br /> <br />Donec gravida dolor nunc, eu pretium tortor ornare vel. Nunc gravida vulputate dignissim.
                    <br /> <br />
                    <button className="glass-button">Visiter</button>
                  </p>
                  <img src="https://picsum.photos/250/200" className='glass' />
                </div>
              </div>
            </div>
          </div>
          <div id="design" className="model" style={{ display: "none" }}>
            <div className="projects">
              <div className="project glass">
                <h3>design</h3>
                <div>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed fermentum accumsan augue vel ullamcorper.
                    <br /> <br />Donec gravida dolor nunc, eu pretium tortor ornare vel. Nunc gravida vulputate dignissim.
                    <br /> <br />
                    <button className="glass-button">Visiter</button>
                  </p>
                  <img src="https://picsum.photos/250/200" className='glass' />
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
                  <img src="https://picsum.photos/250/200" className='glass' />
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
                  <img src="https://picsum.photos/250/200" className='glass' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
