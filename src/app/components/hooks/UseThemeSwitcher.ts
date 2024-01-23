import React, { useEffect, useState } from 'react';

const UseThemeSwitcher = (): [string, React.Dispatch<React.SetStateAction<string>>] => {
    // Your component logic here

    const preferDarkQuery = '(prefer-color-scheme: dark)';
    const [mode, setMode] = useState("light");    
    useEffect(()=>{

        const mediaQuery = window.matchMedia(preferDarkQuery);
        const userPref = window.localStorage.getItem("theme");

        const handleChange = ()=>{
            if(userPref){
                let check = userPref === 'dark' ? 'dark' : 'light';
                setMode(check);
                if(check==='dark'){
                    document.documentElement.classList.add('dark');
                }
                else{
                    document.documentElement.classList.remove('dark');
                }
            }
            else{
                let check = mediaQuery.matches ? 'dark': 'light';
                setMode(check);
                if(check==='dark'){
                    document.documentElement.classList.add('dark');
                }
                else{
                    document.documentElement.classList.remove('dark');
                }
            }
        }

        mediaQuery.addEventListener('change', handleChange);

        return () => {
            mediaQuery.removeEventListener('change', handleChange);
        }


    },[])

    useEffect(()=>{

        if(mode === 'dark'){
            document.documentElement.classList.add('dark');
            window.localStorage.setItem("theme","dark");
        }
        else{
            document.documentElement.classList.remove('dark');
            window.localStorage.setItem("theme","light");
        }
    },[mode]);


    return [mode,setMode];
};

export default UseThemeSwitcher;
