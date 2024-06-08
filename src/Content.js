import { Html } from "@react-three/drei";
import { useAnimations } from "hooks/useAnimations";
import * as THREE from "three"
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";

import { useModels } from "hooks/useModels";
import { useFrame } from "@react-three/fiber";
import $ from 'jquery';
import Models from "Models";


const Content = ({ domNodeRef }) => {
    const { animations, setAnimations } = useAnimations()
    const { models, setModels } = useModels()

    const next = () => {
        const _models = { ...models }
        _models.current === _models.total ? _models.current = 1 : _models.current += 1
        console.log(_models.current)
        setModels(_models)
        models.list.forEach(name => {
            if (models[name].index === _models.current) {
                $(domNodeRef.current).find(".main-title").hide(500, function () {
                    $(this).html(models[name].title).show(500)
                })
                $(domNodeRef.current).find(".main-description").hide(500, function () {
                    setTimeout(() => {
                        $(this).html(models[name].description).show(500)
                    }, 500)
                })
            }
        })
    }
    
    const select = () => {
        const _models = { ...models }
        _models.selected = _models.current
        setModels(_models)
        models.list.forEach((name) => {
            if (models[name].index === _models.selected) {
                setTimeout(() => {
                    $(domNodeRef.current).find('#' + name).fadeIn(500)
                }, 1000)
            }
        })
    }
    
    useEffect(() => {
        if (!models) return
        // add event listener for next button
        const nextEl = domNodeRef.current.querySelector(".next")
        nextEl.addEventListener("click", next)
    
        // add event listener for select button
        const selectEl = domNodeRef.current.querySelector(".select-button")
        selectEl.addEventListener("click", select)
    
        // remove event listeners on cleanup
        return () => {
            nextEl.removeEventListener("click", next)
            selectEl.removeEventListener("click", select)
        }
    }, [models])
    
    useEffect(() => {
        if (!models) return
        if (models.selected === 0) {
            domNodeRef.current.classList.remove("selected")
            $(domNodeRef.current).find('.main-description, .select-button, .next').animate({ opacity: 1 });
        } else {
            domNodeRef.current.classList.add("selected")
            $(domNodeRef.current).find('.main-description, .select-button, .next').animate({ opacity: 0 });
        }
    }, [models])

    return (
        <Html as="div" portal={domNodeRef} />
    )
}

export default Content;