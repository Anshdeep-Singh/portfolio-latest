import React from 'react';
import { Metadata } from 'next'
import AnimatedText from '@/app/components/AnimatedText';
import Link from 'next/link';
import Image from "next/image";
import { GitComponent } from '@/app/components/Icons';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from "../../firebase";
import ProjectImage from '@/app/components/ProjectImage';
import TransitionEffect from '@/app/components/TransitionEffect';

 
export const metadata: Metadata = {
  title: 'Anshdeep Singh - Projects',
  description: 'Welcome to the portfolio website of Anshdeep Singh. A tech enthusiast skilled in AI, Data Analytics, Web Development, and Software Development. Proficient in coding and algorithms, dedicated to shaping the digital future. Seeking opportunities to drive innovation collaboratively.',
}
 
interface FeaturedProjectProps {
    type: string;
    title: string;
    summary: string;
    img: string;
    link: string;
    github: string;
  }

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
              Visit
          </Link>
          <Link href={github} target='_blank' className='w-8 md:w-6'>
              <GitComponent />
          </Link>

          </div>
          </div>

        </article>
        </>
    )
}
  
  const FeaturedProject: React.FC<FeaturedProjectProps> = ({type, title, summary, img, link, github}) => {
      return (
          <>
          <article className='w-full relative flex lg:flex-col lg:p-4 xs:rounded-2xl xs:rounded-br-3xl xs:p-2 items-center justify-between rounded-3xl rounded-br-2xl border border-solid border-black bg-white shadow-2xl p-8'> 

            <div className='absolute top-0 -right-3 -z-40 w-[101%] h-[103%] rounded-[2.5rem] bg-black rounded-br-3xl xs:-right-2 sm:h-[102%] xs:w-full xs:rounded-[1.5rem]'/>

            <Link href={link} target='_blank' className='w-1/2 cursor-pointer overflow-hidden rounded-lg lg:w-full'>
                <ProjectImage img={img} title={title} />
            </Link>

            <div className='w-1/2 flex flex-col items-start justify-between pl-6 lg:w-full lg:pl-0 lg:pt-6'>
                <span className='text-green-800 font-medium text-xl xs:text-base'>
                    {type}
                </span>
                <Link href={link} target='_blank' className='hover:underline underline-offset-2'>
                    <h2 className='my-2 w-full text-left text-4xl font-bold sm:text-xl'>{title}</h2>
            </Link>
            <p className='my-2 font-medium text-black sm:text-sm text-justify'>{summary}</p>
            <div className='mt-2 flex items-center '>
            <Link href={github} target='_blank' className='w-10 pl-2'>
                <GitComponent />
            </Link>
            <Link href={link} target='_blank' className='ml-4 rounded-lg bg-black text-white p-2 px-6 text-lg font-semibold sm:px-4 sm:text-base'>
                Visit Project
            </Link>
            </div>
            </div>

          </article>
          </>
      )
  };




const page = async () => {

    const PlayQuest = ref(storage, "projects/PlayQuest.png");
    const FitMatrix = ref(storage, "projects/FitMatrix.png");
    const Cifar = ref(storage, "projects/Cifar.png");
    const CarPool = ref(storage, "projects/CarPool.png");
    const ToDoApp = ref(storage, "projects/ToDoApp.png");
    const ProBuddy = ref(storage, "projects/ProBuddy.png");
    const TradeMate = ref(storage, "projects/TradeMate.png");


    const playQuestUrl = await getDownloadURL(PlayQuest);
    const fitMatrixUrl = await getDownloadURL(FitMatrix);
    const cifarUrl = await getDownloadURL(Cifar);
    const carPoolUrl = await getDownloadURL(CarPool);
    const toDoAppUrl = await getDownloadURL(ToDoApp);
    const proBuddyUrl = await getDownloadURL(ProBuddy);
    const tradeMateUrl = await getDownloadURL(TradeMate);





    return (

        <>
            <TransitionEffect/>

        <main className='w-full mb-16 flex flex-col items-center justify-center'>
        <div className="w-full h-full inline-block z-0 bg-white p-32 pt-16 mt-0 xl:p-24 lg:p-20 md:p-20 sm:p-8">
        <AnimatedText text='A Snapshot of My Endeavors!' className='mb-16 lg:!text-7xl sm:mb-8 sm:!text-6xl xl:!text-4xl xs:!text-3xl'/>
        <div className='grid grid-cols-12 gap-24 gap-y-32 xl:gap-x-16 lg:gap-x-8 md:gap-y-24 sm:gap-x-0'>


            <div className='col-span-12'>
                <FeaturedProject 
                title='Play Quest - A Social Media Infused Marketplace'
                summary='PlayQuest is a social media-infused marketplace that allows users to buy and sell video games. The platform is built using Java, Thymleaf, Bootstrap, Amazon S3, and more.'
                link="https://github.com/CSIS-3275-001/PlayQuest"
                type='Featured Project - Web App'
                img={playQuestUrl}
                github='https://github.com/CSIS-3275-001/PlayQuest'
                  />
            </div>

            <div className='col-span-6 sm:col-span-12'>
        <Project
        title="ProBuddy "
        type="UI/UX Design"
        img={proBuddyUrl}
        link="https://www.figma.com/file/rP1qY3jim9wnhuNfEsxAMU/ProBuddy-UX%2FUI-design?type=design&node-id=0-1&mode=design&t=nGuzNpKccaUV5jrd-0"
        github="https://www.figma.com/file/rP1qY3jim9wnhuNfEsxAMU/ProBuddy-UX%2FUI-design?type=design&node-id=0-1&mode=design&t=nGuzNpKccaUV5jrd-0"   
        />
            </div>


            <div className='col-span-6 sm:col-span-12'>
                <Project 
                title='Cifar-10 Image Classification'
                link="https://github.com/Anshdeep-Singh/CIFAR10_Classification"
                type='AI/ML Project'
                img={cifarUrl}
                github='https://github.com/Anshdeep-Singh/CIFAR10_Classification'
                    />
            </div>

            <div className='col-span-12'>
                <FeaturedProject 
                title='Fit Matrix'
                summary='FitMatrix, your go-to workout companion on Android, makes logging workouts a breeze, helping users track progress and reach their fitness milestones effortlessly.'
                link="https://github.com/Mobile-ApplicationCSIS4175/final-project"
                type='Featured Project - Mobile App'
                img={fitMatrixUrl}
                github='https://github.com/Mobile-ApplicationCSIS4175/final-project'
                  />
            </div>

            <div className='col-span-6 sm:col-span-12'>
                <Project 
                title='Car Pool'
                link="https://github.com/CSIS-3380-001/CarPool"
                type='Web Development'
                img={carPoolUrl}
                github='https://github.com/CSIS-3380-001/CarPool'
                    />
            </div>


            <div className='col-span-6 sm:col-span-12'>
                <Project 
                title='To Do App'
                link="https://github.com/Mobile-ApplicationCSIS4175/classwork-14"
                type='Mobile App Development'
                img={toDoAppUrl}
                github='https://github.com/Mobile-ApplicationCSIS4175/classwork-14'
                    />
            </div>

            <div className='col-span-12'>
                <FeaturedProject 
                title='TradeMate - A Barter Platform'
                summary='TradeMate, your Barter Platform, makes item trading a breeze. Crafted with Next.js, Tailwind CSS, and Firestore, it ensures a seamless experience with CI/CD via GitHub Actions. Hosted on Firebase, the platform guarantees smooth operations and efficient troubleshooting.'
                link="https://trademate.mehla.in/"
                type='Coming Soon - Web App'
                img={tradeMateUrl}
                github='https://github.com/CSIS-4495-001/the-final-one'
                  />
            </div>
        </div>
        </div>
        </main>
        </>
    );
};

export default page;
