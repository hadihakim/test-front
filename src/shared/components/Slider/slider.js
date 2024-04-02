import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './slider.css'

const ItemSlider = props => {
    const settings = {
        dots: props.dots || false,
        infinite: props.infinite === undefined ? true : props.infinite,
        speed: props.speed || 500,
        slidesToShow: props.slidesToShow || 4,
        slidesToScroll: props.slidesToScroll || 2,
        // centerMode: props.centerMode || true,
        centerPadding: props.centerPadding || '0px',
        autoplay: props.autoplay === undefined ? true : props.autoplay, // Enable auto sliding
        autoplaySpeed: props.autoplaySpeed || 2000, // Set the auto sliding speed in milliseconds (e.g., 2000ms = 2 seconds)
        responsive: [
            {
                breakpoint: props.breakpoint1 || 1116,
                settings: {
                    slidesToShow: props.slidesToShowResponsive1 || 3,
                    slidesToScroll: props.slidesToScroll1 || 2, // Update this value
                },
            },
            
            {
                breakpoint: props.breakpoint2 || 768,
                settings: {
                    slidesToShow: props.slidesToShowResponsive2 || 2,
                    slidesToScroll: props.slidesToScroll2 || 2, // Update this value
                },
            },
            {
                breakpoint: props.breakpoint3 || 569,
                settings: {
                    slidesToShow: props.slidesToShowResponsive3 || 1,
                    slidesToScroll: props.slidesToScroll3 || 1,
                },
            },
            {
                breakpoint: props.breakpoint4 || 426,
                settings: {
                    slidesToShow: props.slidesToShowResponsive4 || 1,
                    slidesToScroll: props.slidesToScroll4 || 1,
                },
            },
            // Add more breakpoints and settings as needed
        ],
    };

    return (
        <div className="items-slider">
            <Slider {...settings}>
                {
                    props.children
                }
            </Slider>
        </div>
    );
};

export default ItemSlider;