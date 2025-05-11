import { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useModels } from 'hooks/useModels';
import Scene from './Scene';

import $ from 'jquery';

import './App.css';

import hpln from "projects/dev/hpln/cover.png"
import biozh from "projects/dev/biozh/cover.png"
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
    if (!audio) return
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
      <div className='container' style={{ pointerEvents: ((isTouchDevice()) ? (selected ? "all" : "none") : "none") }}>
        <header>
          <h2 className='outlined title fadeIn'>Hector BDN</h2>
          <a href="#" className="interactive" role="button" onClick={() => setAudioPlaying(!audioPlaying)}><img src={audioPlaying ? volume_up : volume_down} width="32" /></a>
        </header>
        <div className='wrapper intro'>
          <section className='intro' ref={domNodeRef}>
            <div style={{ width: "100%" }}>
              <h1 className='main-title'>{currentModel.name}</h1>
              <p className='main-description'>Développeur web passionné, je conçois et réalise des projets numériques depuis 3 ans en entreprise. Cette expérience m’a permis de renforcer mes compétences techniques tout en cultivant une approche rigoureuse et polyvalente du développement. Je mets cette expertise au service de projets variés, avec pour moteur la passion du code, la curiosité et le goût du travail bien fait.</p>
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
                    <a href="https://hpln.fr" target="_blank"><button className="glass-button">Le site</button></a>
                  </p>
                  <img src={hpln} className='glass' />
                </div>
              </div>
            </div>
            <div className="projects">
              <div className="project glass">
                <h3>BIOZH Studio</h3>
                <div>
                  <p>Construction d'un template de backend administrateur, le but ici est d'optimiser l'expérience utilisateur et de faciliter la gestion des données. <br />
                    Le site n'est pas encore disponible en ligne.
                    <br /> <br />
                    <a href="https://biozh-studio.fr" target="_blank"><button className="glass-button">Le site <br /><span style={{ fontSize: "9px" }}>(en construction)</span></button></a>
                  </p>
                  <img src={biozh} className='glass' />
                </div>
              </div>
            </div>
          </div>
          <div id="design" className="model" style={{ display: "none" }}>
            <div className="projects">
              <div className="project glass">
                <h3>Recherche utilisateur</h3>
                <div>
                  <p>
                    Cette recherche utilisateur explore les motivations, obstacles, et comportements des individus lorsqu'ils cherchent à découvrir et tester de nouvelles activités, qu'elles soient manuelles, sportives ou créatives.
                    <br /><br />
                    À travers un benchmark, des entretiens, des observations sur le terrain (Fly on the Wall, Undercover), et des questionnaires, plusieurs insights clés ont émergé.
                    <br /> <br />
                    <a href="https://www.figma.com/design/S2tLd0bPd3ItSF6FJlenyc/UX-RESEARCH?node-id=184-3561&p=f&t=zupVsr0ttqQvjEFd-0" target="_blank"><button className="glass-button">Voir le Figma</button></a>
                    <a href="/research.pdf" target="_blank"><button className="glass-button">Voir le rendu</button></a>
                  </p>
                  <img src={omelegg} className='glass' style={{ objectFit: "cover" }} />
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
