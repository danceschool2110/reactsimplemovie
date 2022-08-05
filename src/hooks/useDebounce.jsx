import React, { useEffect, useState } from 'react';

const useDebounce = (initialValues = '', delay = 1500) => {
    const [debounceValue, setDebounceValue] = useState(initialValues)

    useEffect(() => {
        const timer = setTimeout(() =>{
            setDebounceValue(initialValues)
        }, delay)

        return () => {
            clearTimeout(timer)
        }
    }, [delay, initialValues])

    return debounceValue
};

export default useDebounce;