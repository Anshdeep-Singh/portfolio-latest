import React from 'react';

const page = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-4 text-center">Coming Soon</h1>
            <p className="text-lg text-gray-600 mb-8 text-center">Stay tuned for exciting updates!</p>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <a href="#" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                    Subscribe
                </a>
                <a href="#" className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded">
                    Learn More
                </a>
            </div>
        </div>
    );
};

export default page;
