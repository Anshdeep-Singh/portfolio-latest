"use client";
import React, { useRef } from 'react';
import { motion, useScroll } from "framer-motion"
import LiComponent from './LiComponent';

interface DetailsProps {
    position: string;
    company: string;
    time: string;
    address: string;
    work: string;
  }
  
  const Details = ({position, company, time, address, work}: DetailsProps) => {

    const ref = useRef(null);
    return(<>
    <li ref={ref} className='my-8 first:mt-0 last:mb-0 w-[60%] md:w-[80%] mx-auto flex flex-col items-center justify-between'>

        <LiComponent reference={ref}/>
        <motion.div
        initial={{y:50}}
        whileInView={{y:0}}
        transition={{duration:0.5, type:'spring', bounce:0.3}}
        >
        <h3 className='capitalize font-bold text-2xl sm:text-xl xs:text-lg'>{position}&nbsp;<span className='text-green-500'>@{company}</span></h3>           
         <span className='capitalize font-medium text-black/75 xs:text-sm'>
                {time} | {address}
            </span>
            <p className='font-medium w-full md:text-sm text-justify'>{work}</p>
        </motion.div>
    </li>


    </>)
  };




const Experience = () => {

    const ref = useRef(null);

    const {scrollYProgress} = useScroll(
        {
            target: ref,
            offset:["start end", "center start"]
        }
    );
  return (
    <div className='my-64'>
        <h2 className='font-bold text-8xl mb-32 w-full text-center md:text-6xl xs:text-4xl md:mb-16'>Experience</h2>

        <div ref={ref} className='w-[75%] mx-auto relative lg:w-[90%] md:w-full'>
            <motion.div className='absolute left-9 top-0 w-[4px] h-full bg-black origin-top md:width-[2px] md:left-[30px] xs:left-[20px]' style={{scaleY:scrollYProgress}}/>
            <ul className='w-full flex flex-col items-start justify-between ml-4 xs:ml-2'>
                <Details position='Research Assistant' company='Douglas College' time='Jan 2022 - Aug 2022' address='Vancouver, BC' work='I actively contributed to the development of MATLAB software tailored for a psychological experiment, integrating an eye tracker and a skin conductance sensor. Subsequently, I leveraged Python to generate and visualize heatmaps based on the acquired data, enhancing the analytical and interpretative aspects of the experiment.'/>
                <Details position='ML Engineer' company='Tekolutions' time='Jul 2021 - Sep 2021' address='Mumbai, India' work='Led the development of a Proof-of-Concept Mock Interview project, incorporating diverse machine learning models. Applied OpenCV and TensorFlow for facial feature extraction and emotion analysis, utilized NumPy and SciKit Learn for transcribed audio analysis, leveraging APIs from Google, IBM, and Azure. Employed SpaCy and NLTK for Natural Language Processing to derive insights from transcribed text. The outcome includes a comprehensive score out of 100, accompanied by tailored suggestions for interview improvement.'/>
                <Details position='Research Student Intern' company='SCAII' time='Aug 2020 - Jul 2021' address='Pune, India' work='Led a research project on Deepfake story generation using GANs. Analyzed dataset requirements, scripted in Python for data management on Google Drive, and conducted data cleaning with Pandas and OpenCV. Built GANs for text and image generation, optimized hyperparameters, and implemented data augmentation for efficiency. Organized data collection roles and executed the project entirely on the cloud using Google Drive and Colaboratory.'/>
                <Details position='Relibility Engineer Intern' company='SCL , ISRO' time='Dec 2019 - Jun 2020' address='Chandigarh, India' work='Served as a reliability engineer in an internship focused on "Reliability Estimation for wear-out failure mechanisms for 180nm CMOS technology." Key responsibilities included comprehending various failure mechanisms, collecting data from stress tests on ICs, and developing two application software with GUI. These tools efficiently processed raw data, applied necessary formulas, and produced calculated values, streamlining the reliability estimation process.'/>
            </ul>
        </div>
    </div>
  );
};

export default Experience;
