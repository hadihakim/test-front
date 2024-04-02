import React, { useState, useEffect } from "react";

import "./home.css"

const Home = props => {
    const [randomText, setRandomText] = useState("Welcome to the store!");

    const welcomingMessages = [
        "Welcome to our store!",
        "Discover amazing products!",
        "Shop with us today!",
        "Find great deals!",
        "Explore our collection!",
        "Experience shopping like never before!"
    ];

    useEffect(() => {
        const intervalId = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * welcomingMessages.length);
            setRandomText(welcomingMessages[randomIndex]);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [welcomingMessages]);

    return (
        <div className="home">
            <h1>{randomText}</h1>
        </div>
    );
};

export default Home;
