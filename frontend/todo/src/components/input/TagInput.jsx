// import React,{useState} from 'react';
// import {MdAdd , MdClose} from "react-icons/md";

// const TagInput = ({tags,setTags}) => {
// const[inputValue,setInputvalue] = useState("");
// const handleInputChange = (e) =>{
//     setInputvalue(e.target.value);
// };
// const addNewTag = () =>{
//     if(inputValue.trim() !=="")
//         setTags([...tags,inputValue.trim()])
//     setInputvalue("");

// };
// const handleKeyDown = (e) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       addNewTag();
//     }
// };
// const handleRemoveTag = (tagToRemove) => {
//     setTags(tags.filter((tag) => tag !== tagToRemove));
//   };
//   return (
//     <div>

//     {tags?.length > 0 && (
//         <div className='flex items-center gap-2 flex-wrap mt-2'>
//         {tags.map((tag,index) =>{
//             <span key = {index} className=''>
//                 # {tag}
//                 <button onClick={()=>{handleRemoveTag}}>
//                     <MdClose/>
//                 </button>
//             </span>
//         })}
//         </div>    
// )}
//       <div className='flex items-center gap-4 mt-3'>
//         <input
//          type="text" 
//          className='text-sm bg-transparent border px-3 py-2 rounded out;ine-none'
//           placeholder='Add Tags' 
//           onChange={handleInputChange}
//           onKeyDown={handleKeyDown}
//           />

//         <button className='w-8 h-8 flex items-center justify-center rounded border border-blue-700 hover:bg-blue-700' 
//         onClick={() => addNewTag()} >          
//          <MdAdd className="text-2xl text-blue-700 hover:text-white"/>
//         </button>

//       </div>
//     </div>
//   )
// }

// export default TagInput

import React, { useState } from 'react';
import { MdAdd, MdClose } from 'react-icons/md';

const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputvalue] = useState("");

  const handleInputChange = (e) => {
    setInputvalue(e.target.value);
  };

  const addNewTag = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
    }
    setInputvalue("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addNewTag();
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (

    <div>
        
      {tags?.length > 0 && (
        <div className='flex items-center gap-2 flex-wrap mt-2'>
          {tags.map((tag, index) => (
            <span key={index} className='flex items-center gap-2 text-sm bg-slate-100 px-3 py-2 rounded'>
              #{tag}
              <button className='ml-1' onClick={() => handleRemoveTag(tag)}>
                <MdClose />
              </button>
            </span>
          ))}
        </div>
      )}

      <div className='flex items-center gap-4 mt-3'>
        <input
          type="text"
          className='text-sm bg-transparent border px-3 py-2 rounded outline-none'
          placeholder='Add Tags'
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />

        <button
          className='w-8 h-8 flex items-center justify-center rounded border border-blue-700 hover:bg-blue-700'
          onClick={addNewTag}
        >
          <MdAdd className="text-2xl text-blue-700 hover:text-white" />
        </button>
      </div>
    </div>
  );
};

export default TagInput;
