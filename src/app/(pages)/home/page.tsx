import Navbar from '@/app/components/navbar';
import { ref } from 'firebase/storage';
import { getDownloadURL } from 'firebase/storage';
import React from 'react';
import { storage } from '../../firebase';

const HomePage = async () => {


  const user = {
    name: 'Anshdeep Singh',
    bio: 'Jack of all trades, master of none.', 
    location: 'Vancouver, Canada',
    website: 'https://new.anshdeepsingh.com',
    skills: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Tailwind CSS'],
  };

  const profileImageRef = ref(storage, 'display_pics/anshdeep3.jpeg');
  
  const profileImageUrl = await getDownloadURL(profileImageRef);

  
  return (
    <div>      
<header className="bg-black text-white pt-4 pb-4 flex">

<div className="max-w-3xl mx-auto flex items-center">
  <div className="inset-0">
  <img
    src={profileImageUrl}
    alt="Profile"
    className="md:w-360 md:h-80 rounded-full object-cover filter grayscale mix-blend-luminosity z-1"
  />
  </div>
  <div className="flex-1 pl-4 z-10">
    <h1 className="text-7xl font-bold mb-2 whitespace-nowrap">{user.name}</h1>
    <p className="text-xl text-gray-400 text-center">{user.bio}</p>
  </div>
</div>


</header>
      <main className="max-w-3xl mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          
          <h2 className="text-xl font-medium">About</h2>
          <a href={user.website} className="text-blue-500 hover:underline">Website</a>
        </div>
        
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel tincidunt lacinia, nunc nisl aliquam nisl, eu aliquam nisl nunc euismod nunc.
        </p>
        
        <h2 className="text-xl font-medium mt-4 mb-2">Skills</h2>
        
        <div className="flex flex-wrap gap-2">
          {user.skills.map(skill => (
            <span key={skill} className="bg-gray-200 rounded-full py-1 px-3 text-xs">{skill}</span>  
          ))}
        </div>
        
        <h2 className="text-xl font-medium mt-4 mb-2">Location</h2>
        
        <p>{user.location}</p>
        
      </main>
      
    </div>
  );
};

export default HomePage;