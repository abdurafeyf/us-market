import React from 'react';

const NavBar = () => {
    return (
        <nav className="bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <img 
                            className="h-8 w-8" 
                            src="https://raw.githubusercontent.com/abdurafeyf/us-market/main/client/public/logo.png" 
                            alt="Logo" 
                            style={{mixBlendMode: "color-burn", height:"5rem", width: "5rem"}}
                            />
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <a
                                            href="/"
                                            className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                            >
                                Home
                                </a>
                                <a
                                            href="/"
                                            className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                            >
                                About
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="flex items-center ml-4">
                            <input
                                        type="text"
                                        className="bg-gray-700 text-white border-2 border-gray-600 rounded-md py-1 px-3 focus:outline-none focus:border-blue-500"
                                        placeholder="Search"
                                    />
                            <button
                                        type="button"
                                        className="bg-gray-700 text-white rounded-md py-1 px-3 ml-2 hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                                    >
                            Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;