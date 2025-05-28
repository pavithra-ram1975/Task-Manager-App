import React ,{useState}from 'react'
import TagInput from '../../components/input/TagInput';
import {  MdClose } from 'react-icons/md';
import axiosInstance from '../../utils/axiosInstance';
// import showToastMessage from 

const AddEdittask = ({noteData,type,getalltasks, onClose,showToastMessage}) => {
    const [title,setTitle] = useState(noteData?.title || "");
    const [content , setContent] = useState(noteData?.content|| "");
    const[tags,setTags] = useState(noteData?.tags|| [])
    const [error,setError] = useState(null);

    const addNewNote= async() =>{
      try{
        const response = await axiosInstance.post("addtask",{
          title,
          content,
          tags,
        })
        if(response.data && response.data.note){
          showToastMessage("Task Added Successfully");
          getalltasks()
          onClose()
   
  }
      }

      catch(error){
        if(
          error.response && 
          error.response.data && 
          error.response.data.message){
    setError(error.response.data.message);
  }
  else{
    setError("An unexpected error occured.Please Try again.")
  }
      }
    };
    
    const editNote = async() =>{
      const noteId = noteData._id
      try{
        const response = await axiosInstance.put("edittask/"+noteId,{
          title,
          content,
          tags,
        })
        if(response.data && response.data.note){
          showToastMessage("Task updated Successfully");
          getalltasks()
          onClose()
   
  }
      }
      catch(error){
        if(
          error.response && 
          error.response.data && 
          error.response.data.message){
    setError(error.response.data.message);
  }
  else{
    setError("An unexpected error occured.Please Try again.")
  }
      }

    };
    const handleAddtask = ()=> {
        console.log("Add clicked");
        if(!title){
            setError("Enter Title");
            return;
        }
        if(!content){
            setError("Enter Content");
            return;
        }
        setError("");

        if(type ==='edit'){
         editNote()
        }
        else{
          addNewNote()
        }
    };


  return (
    <div className='relative'> 
        <button 
        className='w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-500 cursor-pointer transition-colors duration-200'
        onClick={onClose}
         >
            <MdClose className="text-xl text-slate-400"/>
         </button>
      <div className="flex flex-col gap-2">
        <label className='input-label'>TITLE</label>
        <input
        type="text"
        className='text-2xl text-slate-950 outline-none'
        placeholder='Go to Gym'
        value={title} 
        onChange={(e) => setTitle(e.target.value)}
        />

      </div>
      <div className='flex flex-col gap-2 mt-4'>
        <label className='input-label'>CONTENT</label> 
        <textarea
        className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
        placeholder='Content'
        rows={5}
        value={content} 
        onChange={(e) => setContent(e.target.value)}
        />
              

      </div>
      <div className='mt-3'>
        <label className='input-label'>TAGS</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>
      {error && <p className=' text-red-500 text-xs pb-1'>{error}</p>}

      {/* <div className='mt-3'>
  <label className='input-label'>TAGS</label>
  <input
    type="text"
    placeholder="e.g., workout, personal"
    className='w-full mt-1 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400'
  />
</div> */}

      {/* <button className='btn-primary font-medium mt-5 p-3 'onClick={() => {}}>ADD</button> */}
      <button
  className='bg-blue-600 hover:bg-blue-700 text-white font-medium mt-5 px-4 py-2 rounded-md'
  onClick={handleAddtask}>
  {type==='edit'?'UPDATE':'ADD'}
  </button>
    </div>
  )
}
export default AddEdittask;
