import AnimatedText from '@/app/components/AnimatedText'
import { DownloadComponent } from '@/app/components/Icons';
import ProjectImage from '@/app/components/ProjectImage';
import TransitionEffect from '@/app/components/TransitionEffect'
import { storage } from '@/app/firebase';
import { getDownloadURL, ref } from 'firebase/storage';
import Link from 'next/link';
import React from 'react'

interface ProjectProps {
    title: string;
    type: string;
    img: string;
    link: string;
    github: string;
  }



const Project: React.FC<ProjectProps> = ({title, type, img, link, github}) => {
    return (
        <>
        
        <article className='w-full flex flex-col relative items-center justify-between rounded-3xl border border-solid border-black bg-white shadow-2xl p-10 px-8 xs:p-4'> 

        <div className='absolute top-0 -right-3 -z-40 w-[101%] h-[103%] rounded-[2rem] bg-black rounded-br-3xl md:-right-2 md:width-[101%] xs:h-[102%] xs:rounded-[1.5rem]'/>

          <Link href={link} target='_blank' className='w-full cursor-pointer overflow-hidden rounded-lg '>
              <ProjectImage img={img} title={title} />
          </Link>

          <div className='w-full flex flex-col items-start justify-between mt-4'>
              <span className='text-green-800 font-medium text-xl lg:text-lg md:text-base'>
                  {type}
              </span>
              <Link href={link} target='_blank' className='hover:underline underline-offset-2'>
                  <h2 className='my-2 w-full text-left text-3xl font-bold lg:text-2xl sm:text-xl'>{title}</h2>
          </Link>
          <div className='w-full mt-2 flex items-center '>
          <Link href={link} target='_blank' className='mr-4 text-lg font-semibold hover:underline md:text-base'>
              Download
          </Link>
          <Link href={github} target='_blank' className='w-8 md:w-6'>
              <DownloadComponent />
          </Link>

          </div>
          </div>

        </article>
        </>
    )
}

const page = async () => {
    const resumeDA = ref(storage, "display_pics/DataAnalyst.png");
    const resumeWebDev = ref(storage, "display_pics/WebDevelopment.png");
    const resumeDARef = ref(storage, "resume/Data_Analyst_Resume.pdf");
    const resumeWDRef = ref(storage, "resume/Web_Developer_Resume.pdf");


    const resumeDAUrl = await getDownloadURL(resumeDA);
    const resumeWebDevUrl = await getDownloadURL(resumeWebDev);
    const DAUrl = await getDownloadURL(resumeDARef);
    const WDUrl = await getDownloadURL(resumeWDRef);

    



  return (
    <>
     <TransitionEffect/>
     <main className="flex items-center text-dark w-full flex-grow pt-0">
     <div className="w-full h-full inline-block z-0 bg-white p-32 mt-0 xl:p-24 lg:p-20 md:p-20 sm:p-8">
     <AnimatedText text='Resume Vault' className='mb-16 lg:!text-7xl sm:mb-8 sm:!text-6xl xl:!text-4xl xs:!text-3xl'/>
     <div className='grid grid-cols-12 gap-24 gap-y-32 xl:gap-x-16 lg:gap-x-8 md:gap-y-24 sm:gap-x-0'>
     <div className='col-span-6 sm:col-span-12'>
        <Project
        title="Data Science | Machine Learning"
        type="AI/ML"
        img={resumeDAUrl}
        link={DAUrl}
        github={DAUrl}   
        />
    </div>
    <div className='col-span-6 sm:col-span-12'>
        <Project
        title="Web Development"
        type="Web Dev"
        img={resumeWebDevUrl}
        link={WDUrl}
        github={WDUrl}   
        />
    </div>
     </div>
     </div>
     </main>   
     </>
  )
}

export default page