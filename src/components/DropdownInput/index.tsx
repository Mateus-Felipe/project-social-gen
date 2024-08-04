"use client"
import React, { useEffect, useRef, useState } from "react";
interface valueItem {
    name: string, value: string
}

interface DropdownInputProps {
    value?: valueItem[],
    onChangeValue?: any,
    style?: string;
    text?: string
    searchText?: string
}

export default function DropdownInput({ value, onChangeValue, style, text, searchText }: DropdownInputProps) {
    const [searchInput, setSearchInput] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [showData, setShowData] = useState(value)

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    }

    const listenSearch = () => {
        console.log('changed')
        if (!value) return
        if (searchInput.length == 0) {
            setShowData(value);
            return;
        }
        else {
            const filteredData = value.filter(item =>
                item.name.toLowerCase().includes(searchInput.toLowerCase())
            );
            setShowData(filteredData);
            return;
        }
    }

    return (
        <div className={`flex items-center justify-center ${style}`}>
            <div className="relative group w-full">
                <button onClick={toggleDropdown}
                    className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2
                    focus:ring-offset-gray-100 focus:ring-blue-light-theme">
                    <p className="mr-2 text-base">{text ? text : 'Select an item'}</p>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                </button>
                <div id="dropdown-menu" className={`${!isOpen && 'hidden'} absolute right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1 w-full border-2 border-blue-light-theme`}>
                    <input id="search-input" value={searchInput} onChange={(v) => { setSearchInput(v.target.value); listenSearch(); }
                    } className="block w-full px-4 py-2 text-gray-800 border rounded-md  border-gray-300 focus:outline-none" type="text" placeholder={searchText ? searchText : 'Search'} />
                    <div className="overflow-auto h-auto max-h-[300px] w-full">
                        {
                            showData && showData.length > 0 && showData.map(v => (
                                <button key={v.value} className="block px-4 py-2 w-full text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md" onClick={() => onChangeValue(v.value)}>{v.name}</button>
                            ))
                        }
                    </div>
                    {/* <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md">Uppercase</a>
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md">Lowercase</a>
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md">Camel Case</a>
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md">Kebab Case</a> */}
                </div>
            </div>
            {/* const dropdownButton = document.getElementById('dropdown-button'); */}
            {/* const dropdownMenu = document.getElementById('dropdown-menu'); */}
            {/* const searchInput = document.getElementById('search-input'); */}
            {/* let isOpen = false; // Set to true to open the dropdown by default */}

            {/* // Function to toggle the dropdown state
                        function toggleDropdown() {
                            isOpen = !isOpen;
                        dropdownMenu.classNameList.toggle('hidden', !isOpen);
                }
        
                        // Set initial state
                        toggleDropdown();
                
                dropdownButton.addEventListener('click', () => {
                            toggleDropdown();
                }); */}

            {/* // Add event listener to filter items based on input
                searchInput.addEventListener('input', () => {
                  const searchTerm = searchInput.value.toLowerCase();
                        const items = dropdownMenu.querySelectorAll('a');
                
                  items.forEach((item) => {
                    const text = item.textContent.toLowerCase();
                        if (text.includes(searchTerm)) {
                            item.style.display = 'block';
                    } else {
                            item.style.display = 'none';
                    }
                  });
                });
                    </script> */}
        </div>
    );
}