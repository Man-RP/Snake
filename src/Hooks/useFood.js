import React, { useState } from 'react';

const randomizeFood = () => {
    return { 
        x: Math.floor(Math.random() * Math.floor(BOARD_SIZE)), 
        y: Math.floor(Math.random() * Math.floor(BOARD_SIZE)) 
    }
}

export const useFood = (initialFood) => {
    const [food, setFood] = useState(() => {
        if (!initialFood) 
            return randomizeFood();
        return initialFood
    });

    return [food, setFood]
}

export default useFood;