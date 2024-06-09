import { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useModels } from 'hooks/useModels';
import Scene from './Scene';

import $ from 'jquery';

import './App.css';

import hpln from "projects/dev/hpln/cover.png"
import symb from "projects/dev/symb/cover.png"
import producted from "projects/dev/producted/cover.png"

import omelegg from "projects/design/omelegg/cover.png"
import ghibli from "projects/design/ghibli/cover.png"
import bfm from "projects/design/bfm/cover.png"

import volume_up from "assets/volume_up.svg"
import volume_down from "assets/volume_down.svg"

import audio_url from "assets/audio.mp3"

function App() {
  const domNodeRef = useRef()
  const { next, currentModel, selected, setSelected } = useModels()

  const [audio, setAudio] = useState(null);
  const [audioPlaying, setAudioPlaying] = useState(false);

  useEffect(() => {
    if(!audio) return
    console.log(audioPlaying)
    audioPlaying ? audio.play() : audio.pause();
  }, [audioPlaying]);

  useEffect(() => {
    setAudio(new Audio(audio_url));
  }, []);

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
            <a href="#" className="interactive" role="button" onClick={() => setAudioPlaying(!audioPlaying)}><img src={audioPlaying ? volume_up : volume_down} width="32" /></a>
          </header>
        <div className='wrapper intro'>
          <section className='intro' ref={domNodeRef}>
            <div style={{ width: "100%" }}>
              <h1 className='main-title'>{currentModel.name}</h1>
              <p className='main-description'>Je fais du skate</p>
              <button className='select-button interactive' onClick={() => {
                $('html, body').animate({
                  scrollTop: 201
                }, 500);
              }}>Voir mes projets</button>
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
                <h3>Product3D</h3>
                <div>
                  <p>Projet professionnel dont mon rôle était le développement d'un configurateur 3D pour des produits personnalisables. <br /> 
                    <br /> <br />
                    <a href="https://my.product3d.io/view/ede361349ff6952ad25230d3cb4b279d" target="_blank"><button className="glass-button">Démo</button></a>
                    <a href="https://my.product3d.io/" target="_blank"><button className="glass-button">Le site</button></a>
                  </p>
                  <img src={producted} className='glass' />
                </div>
              </div>
            </div>
            <div className="projects">
              <div className="project glass">
                <h3>HPLN Production</h3>
                <div>
                  <p>Design et développement d'un site vitrine pour une entreprise de production audiovisuelle. <br /> <br />
                    Le site n'est pas encore disponible en ligne (en cours de développement).
                    <br /> <br />
                  </p>
                  <img src={hpln} className='glass' />
                </div>
              </div>
            </div>
            <div className="projects">
              <div className="project glass">
                <h3>SYMB. Administration</h3>
                <div>
                  <p>Construction d'un template de backend administrateur, le but ici est d'optimiser l'expérience utilisateur et de faciliter la gestion des données. <br />
                  Le site n'est pas encore disponible en ligne.
                    <br /> <br />
                  </p>
                  <img src={symb} className='glass' />
                </div>
              </div>
            </div>
          </div>
          <div id="design" className="model" style={{ display: "none" }}>
            <div className="projects">
              <div className="project glass">
                <h3>Omelegg FoodTruck</h3>
                <div>
                  <p>
                    Le devoir consiste à préparer une présentation pour un food truck nommé "Omelegg" spécialisé dans des plats à base d'œuf, avec un focus particulier sur deux produits : l'egg sandwich et l'omelette soufflée. 
                    <br /><br />
                    Le but est de concevoir une offre culinaire qui valorise les ingrédients locaux et le bien-être animal, en s'assurant que les recettes soient simples, saines, et économiquement accessibles. 
                    <br />Le rendu final doit inclure une description de la philosophie du food truck et des raisons spécifiques de mettre en avant l'omelette dans leur menu.

                    <br /> <br />
                    <a href="https://www.figma.com/design/pqwWyf5QOA8CP2fAYEWTGN/Omelegg?node-id=93-262&t=hKbXJUrUecAdLoFr-1" target="_blank"><button className="glass-button">Voir le Figma</button></a>
                  </p>
                  <img src={omelegg} className='glass' />
                </div>
              </div>
            </div>
            <div className="projects">
              <div className="project glass">
                <h3>Scénographie musée ghibli</h3>
                <div>
                  <p>
                    Ce projet vise à concevoir un parcours de musée centré sur une exposition de tapisseries inspirées par les films emblématiques du Studio Ghibli. 
                    <br /><br />L'objectif principal est de développer des stratégies efficaces pour augmenter l'excitation avant la visite et pour maintenir l'engagement après que les visiteurs aient quitté le musée.
                    <br /><br />
                    <a href="/ghibli.pdf" target="_blank"><button className="glass-button">Voir le rendu</button></a>
                  </p>
                  <img src={ghibli} className='glass' />
                </div>
              </div>
            </div>
            <div className="projects">
              <div className="project glass">
                <h3>Scénographie BFM</h3>
                <div>
                  <p>Le projet consiste en la réhabilitation d'une bibliothèque, incluant la refonte de son identité visuelle, la réorganisation de ses espaces pour améliorer la fonctionnalité et l'accessibilité, et la préparation d'un devis détaillé pour couvrir tous les coûts associés à ces transformations.
                    <br /> <br />
                    <a href="/bfm.pdf" target="_blank"><button className="glass-button">Voir le rendu</button></a>
                  </p>
                  <img src={bfm} className='glass' />
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
