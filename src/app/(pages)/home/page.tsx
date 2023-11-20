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

  const profileImageRef = ref(storage, 'display_pics/Cat.png');
  
  const profileImageUrl = await getDownloadURL(profileImageRef);

  
  return (
    <div>      
<header className="bg-gray-800 text-white p-4 flex">
  <div className="max-w-3xl mx-auto">
    <h1 className="text-3xl font-bold mb-2">{user.name}</h1> 
    <p className="text-gray-400">{user.bio}</p>
  </div>
  <img
      src={profileImageUrl}
      alt="Profile"
      className="..." 
    />
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