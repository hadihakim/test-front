import React, { useState, useCallback } from "react";
import ReactDOM from 'react-dom';
import Backdrop from "../UIElements/Backdrop";
import { CSSTransition } from "react-transition-group";
import nextImg from '../../assets/next.png';
import prevImg from '../../assets/prev.png';
import closeImg from '../../assets/close.png';
import { config } from "../../../config";

import './ImagePreview.css'

const ImagePreviewerOverlay = props => {
    const [currentIndex, setCurrentIndex] = useState(props.index);
    const [showPrev, setShowPrev] = useState(!props.index ? false : true);
    const [showNext, setShowNext] = useState(props.index === props.galleryItems.items.length - 1 ? false : true);

    const stopPropagation = event => {
        event.stopPropagation();
    };

    const handlePrev = useCallback(event => {
        event.stopPropagation();
        if (currentIndex !== 0) {
            setCurrentIndex(prevIndex => prevIndex - 1);
            if (currentIndex === 1) {
                setShowPrev(false);
            }
            if (!showNext) {
                setShowNext(true);
            }
        }
    }, [currentIndex, showPrev, showNext]);

    const handleNext = useCallback(event => {
        event.stopPropagation();
        if (props.galleryItems.items.length - 1 > currentIndex) {
            setCurrentIndex(prevIndex => prevIndex + 1);
            if (props.galleryItems.items.length - 2 === currentIndex) {
                setShowNext(false);
            }
            if (!showPrev) {
                setShowPrev(true);
            }
        }
    }, [currentIndex, showNext, showPrev]);

    const content = (
        <div className={`image-Previewer ${props.className}`} style={props.style} onClick={props.onCancel}>
            <div className="previewer-Slider" onClick={stopPropagation}>
                <img alt="" src={`${props.external ? config.SERVER_URL+'/':''}${props.galleryItems.items[currentIndex].image ? props.galleryItems.items[currentIndex].image : props.galleryItems.items[currentIndex]}`} />
                {showPrev &&
                    <div className="previewer-prev" onClick={handlePrev}>
                        <div className="icon-wrapper">
                            <img alt="" src={prevImg} />
                        </div>
                    </div>
                }
                {showNext &&
                    <div className="previewer-next" onClick={handleNext}>
                        <div className="icon-wrapper">
                            <img alt="" src={nextImg} />
                        </div>
                    </div>
                }
            </div>
            <div className="previewer-bottom" onClick={stopPropagation}>
                <div className="previewer-slide-details">Image {currentIndex + 1} of {props.galleryItems.items.length}</div>
                <div className="previewer-cancel">
                    <div>
                        <img alt="" src={closeImg} onClick={props.onCancel} />
                    </div>
                </div>
            </div>
        </div>
    );

    return ReactDOM.createPortal(content, document.getElementById('previewer-hook'));
}

const ImagePreviewer = props => {
    return (
        <React.Fragment>
            {props.show && <Backdrop onClick={props.onCancel} />}
            <CSSTransition
                in={props.show}
                mountOnEnter
                unmountOnExit
                timeout={200}
                classNames="Image-Previewer">
                <ImagePreviewerOverlay {...props} />
            </CSSTransition>
        </React.Fragment>
    );
}

export default ImagePreviewer;