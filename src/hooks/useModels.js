import { useAnimations, useAnimations as useDreiAnimations, useGLTF, useScroll } from "@react-three/drei";
import { createContext, createRef, useContext, useEffect, useRef, useState } from "react";
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { useFrame, useLoader } from "@react-three/fiber";
import gsap from "gsap";
import { LoopOnce } from "three";
import $ from 'jquery';

export const ModelsContext = createContext();

const _models = [
  {
    name: 'Dev web',
    slug: 'dev',
    description: 'Je suis un designer',
    url: '/models/model1.glb',
  },
  {
    slug: 'design',
    name: 'UX/UI Design',
    description: 'Je suis un dev',
    url: '/models/model2.glb'
  },
]

function Model({ url }) {
  const { selected, load, currentModelRef, setAnimations, setMixer } = useModels()
  const { scene } = useGLTF(url)

  const { animations: idleAnimations } = useLoader(FBXLoader, '/models/animations/idle.fbx')
  const { animations: fallingAnimations } = useLoader(FBXLoader, '/models/animations/falling.fbx')
  const { animations: fallingImpactAnimations } = useLoader(FBXLoader, '/models/animations/falling_impact.fbx')
  const { animations: getUpAnimations } = useLoader(FBXLoader, '/models/animations/get_up.fbx')

  const { ref, mixer } = useAnimations(fallingAnimations)

  setMixer(mixer)

  setAnimations({
    idle: idleAnimations[0],
    falling: fallingAnimations[0],
    getUp: getUpAnimations[0],
    fallingImpact: fallingImpactAnimations[0]
  })

  const combinedRef = useRef();
  const setRefs = node => {
    ref.current = node;
    currentModelRef.current = node;
    combinedRef.current = node;  // Not necessary but keeps the pattern
  };

  return <primitive scale={2} position={[0, 10, 0]} object={scene} ref={setRefs} />
}

export const ModelsProvider = ({ children }) => {
  const [models, setModels] = useState(_models)
  const [currentModel, setCurrentModel] = useState(models[0])
  const currentModelRef = useRef()
  const cameraRef = useRef()
  const [selected, setSelected] = useState(false)
  const [mixer, setMixer] = useState(null)
  const [animations, setAnimations] = useState([])
  const [loaded, setLoaded] = useState(null)

  const load = () => {
    mixer?.clipAction(animations.falling, currentModelRef.current).play();
    gsap.to(currentModelRef.current.position, {
      y: -1,
      duration: .8
    })
    setLoaded(true)
  }

  useEffect(() => {
    if (!currentModelRef.current || loaded === true) return
    load()
  }, [currentModelRef.current])

  const next = () => {

    $(".model:not(#" + currentModel.slug + ")").fadeOut(500)
    $("#" + currentModel.slug).fadeIn(500)

    $(".select-button").fadeTo(300, 0)
    setTimeout(() => {
      $(".select-button").fadeTo(300, 1)
    }, 1200)

    setTimeout(() => {
      $(".main-title").hide(500, function () {
        $(this).html(currentModel.name).show(500)
      })
    }, 200)

    setTimeout(() => {
      $(".main-description").hide(500, function () {
        setTimeout(() => {
          $(this).html(currentModel.description).show(500)
        }, 200)
      })
    }, 300)

    gsap.to(currentModelRef.current.position, {
      y: 10,
      duration: .8,
      onComplete: function () {
        const _position = currentModelRef.current.position
        setCurrentModel(models[models.indexOf(currentModel) + 1] || models[0])
        console.log(currentModelRef.current)
        currentModelRef.current.position.set(_position)
        setTimeout(() => {
          mixer?.clipAction(animations.idle, currentModelRef.current).reset().stop();
          mixer?.clipAction(animations.fallingImpact, currentModelRef.current).reset().stop();
          mixer?.clipAction(animations.getUp, currentModelRef.current).reset().stop();
          mixer?.clipAction(animations.falling, currentModelRef.current).play();
          setSelected(false)
          gsap.to(currentModelRef.current.position, {
            y: -1,
            z: 0,
            x: 0,
            duration: .8
          })
        }, 100)
      }
    })
  }

  useEffect(() => {
    if (selected === true) select()
    if (selected === false) unselect()
  }, [selected])

  const select = () => {

    $(".model:not(#" + currentModel.slug + ")").fadeOut(300)
    $("#" + currentModel.slug).fadeIn(300)
    $('html, body').animate({
      scrollTop: $(".wrapper.section").offset().top
    }, 500);

    if(cameraRef.current && window.innerWidth > 700) {
      gsap.to(cameraRef.current.position, {
        x: -(window.innerWidth / 800),
        duration: 1,
      })
    }

    const falling = mixer?.clipAction(animations.falling, currentModelRef.current);
    const fallingImpact = mixer?.clipAction(animations.fallingImpact, currentModelRef.current);
    const getUp = mixer?.clipAction(animations.getUp, currentModelRef.current);
    const idle = mixer?.clipAction(animations.idle, currentModelRef.current);

    // Assurez-vous que toutes les animations précédentes sont arrêtées.
    if(animations.length <= 0) return
    getUp?.stop();
    idle?.stop();
    fallingImpact?.stop();

    // Jouez fallingImpact et écoutez sa finition pour démarrer getUp.
    fallingImpact?.setLoop(LoopOnce);
    fallingImpact.clampWhenFinished = true;
    fallingImpact.reset().play()
    fallingImpact.weight = 1
    falling.crossFadeTo(fallingImpact, .4)

    mixer.addEventListener('finished', (e) => {
      if (e.action === fallingImpact) {
        if (!getUp.paused) {
          getUp.setLoop(LoopOnce);
          getUp.clampWhenFinished = true;
          fallingImpact.crossFadeTo(getUp, 0.4);  // Initiez le crossfade ici.
          getUp.play();

          mixer.addEventListener('finished', (e) => {
            if (e.action === getUp) {
              getUp.crossFadeTo(idle, 0.4);  // Initiez un autre crossfade ici.
              idle.play();
            }
          });
        } else {
          fallingImpact.crossFadeTo(falling, 0.4); // Si getUp est en pause, fondu vers idle.
          falling.play();
        }
      }
    });


    // mixer?.clipAction(animations.falling, currentModelRef.current).play();
    gsap.to(currentModelRef.current.position, {
      y: -1.5,
      x: 0,
      z: 0,
      duration: .8,
    })
  };

  const unselect = () => {
    if (!currentModelRef.current) return;

    
    if(cameraRef.current && window.innerWidth > 700) {
      gsap.to(cameraRef.current.position, {
        x: 0,
        duration: 1,
      })
    }


    const falling = mixer?.clipAction(animations.falling, currentModelRef.current);
    const fallingImpact = mixer?.clipAction(animations.fallingImpact, currentModelRef.current);
    const getUp = mixer?.clipAction(animations.getUp, currentModelRef.current);
    const idle = mixer?.clipAction(animations.idle, currentModelRef.current);

    falling.enabled = true
    if (!fallingImpact.paused) {
      falling.weight = 1
      fallingImpact.crossFadeTo(falling, 0.4);
    }

    if (!getUp.paused) {
      console.log("falling")
      falling.weight = 1
      getUp.crossFadeTo(falling, 0.4);
    }
    if (!idle.paused) {
      console.log("falling")
      falling.weight = 1
      idle.crossFadeTo(falling, 0.4);
    }

    falling.play()

    gsap.to(currentModelRef.current.position, {
      y: -1,
      duration: .8,
    })

  };


  return (
    <ModelsContext.Provider value={{ select, load, mixer, next, setMixer, cameraRef, animations, setAnimations, models, setModels, Model, currentModelRef, currentModel, setCurrentModel, selected, setSelected }}>
      {children}
    </ModelsContext.Provider>
  )
}

export const useModels = () => useContext(ModelsContext);