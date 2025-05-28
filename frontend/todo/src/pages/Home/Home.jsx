import React ,{useState} from 'react'
import Navbar from '../../components/Navbar/Navbar'
import NoteCard from '../../components/Cards/NoteCard'
import { MdAdd } from 'react-icons/md'
import AddEdittask from './AddEdittask'
import Modal from 'react-modal'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import { useEffect } from 'react'
import moment from 'moment'
import Toast from '../../components/ToastMessage/Toast'
import EmptyCard from '../../components/Cards/EmptyCard'
Modal.setAppElement('#root');


const Home=()=> {
  const [openAddEditModal ,setOpenAddEditModal] = useState({
    isShown:false,
    type:"add",
    data:null
  });
  const [showToastMsg,setshowToastMsg] = useState({
    isShown:false,
    message:"",
    type:"add",

  })
  // const [originalTasks, setOriginalTasks] = useState([]); 
  const [userInfo,setUserInfo]=useState(null);
  const [allTasks, setAlltasks] = useState([]);
  const[isSearch,setIsSearch]=useState(false);


  const navigate = useNavigate();
  const handleEdit = (noteDetails)=>{
    setOpenAddEditModal({isShown:true,data:noteDetails,type:"edit"});
  };
   const showToastMessage = (message , type) => {
  setshowToastMsg({ isShown: true, message,type});
};
  const handleCloseToast = () => {
  setshowToastMsg({ isShown: false, message :"" });
};

  //Get user Info
  const getUserInfo = async()=>
  {
    try{
      const response = await axiosInstance.get("/getuser");
      if(response.data && response.data.user){
        setUserInfo(response.data.user);
      }
    }
    catch(error){
      if(error.response && error.response.status === 401){
        localStorage.clear();
        navigate("/login");
      }
    }
  };
  const getalltasks = async()=>
  {
    try{
      const response = await axiosInstance.get("/getalltask");
      if(response.data && response.data.tasks){
        // setOriginalTasks(response.data.tasks);
        setAlltasks(response.data.tasks);
        setIsSearch(false); 
      }
    }
    catch(error){
      // if(error.response.status === 401){
      //   localStorage.clear();
      //   navigate("/login");
      console.log("error occured");
      }
    };
    
// Delete Note
const deleteNote = async (data) => {
  const noteId = data._id;

  try {
    // const response = await axiosInstance.delete("deletetask"+{noteId});
    const response = await axiosInstance.delete(`deletetask/${noteId}`);

    if (response.data && !response.data.error) {
      showToastMessage("Task Deleted Successfully",'delete');
      getalltasks();
    }
  } catch (error) {
    if (
      error.response &&
      error.response.data &&
      error.response.data.message
    ) {
      console.log("An unexpected error occurred. Please try again.");
    }
  }
};

const onSearchNote = async (query) => {

  try {
    const response = await axiosInstance.get("/searchtask", {
      params: { query },
    });

    if (response.data && response.data.tasks) {
      setIsSearch(true);
      setAlltasks(response.data.tasks);
    }
  } catch (error) {
    console.log(error);
  }
};
const upisPinned = async(noteData)=>{
      const noteId = noteData._id
      try{
        const response = await axiosInstance.put("updatepinned/"+noteId,{
          "isPinned":!noteData.isPinned
        })
        if(response.data && response.data.note){
          showToastMessage("Task pinned Successfully");
          getalltasks()
   
  }
      }
      catch(error){
console.log(error);
      }

    };

const handleClearSearch=()=>{
  setIsSearch(false)
  getalltasks()
}

  useEffect(()=>{
    getUserInfo();
    getalltasks();
    return() =>{}
  },[]);

  return (
    <div>
      <Navbar 
      userInfo={userInfo}
       onSearchNote={onSearchNote}
        handleClearSearch={handleClearSearch} />
      <div className="container mx-auto">
        {allTasks.length >0 ? (
        <div className='grid grid-cols-3 gap-4 mt-8'>
          {allTasks.map((item, index) => (
  <NoteCard
    key={item._id}
    title={item.title}
date={moment(item.createdOn).format('Do MMM YYYY')}
    content={item.content}
    tags={item.tags}
    isPinned={item.isPinned}
    onEdit={() => handleEdit(item)}
    onDelete={() => {deleteNote(item)}}
    onPinMode={() => {upisPinned(item)}}
  />
))}
         </div>
        ):(
          <EmptyCard/>
         )}
      </div>

      <button className='w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-8 bottom-8'
       onClick={() =>{
        setOpenAddEditModal({isShown:true,type:"add",data:null});

       }}> 
       <MdAdd className='text-[32px] text-white' />

      </button>
      <Modal 
      isOpen={openAddEditModal.isShown}
      onRequestClose={()=>{}}
      style={{
        overlay:{
          backgroundColor :"rgba(0,0,0,0.2)",
        },
      }}contentLabel=""
      className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
      
      >
<AddEdittask
type={openAddEditModal.type}
noteData={openAddEditModal.data}
onClose={ ()=>{
  setOpenAddEditModal({isShown:false,type:"add",data:null});
}}
getalltasks={getalltasks}
showToastMessage={showToastMessage}
/>
      </Modal>
      <Toast 
      isShown={showToastMsg.isShown}
      message={showToastMsg.message}
      type={showToastMsg.type}
      onClose={handleCloseToast}
      />
    </div>
  )
}

export default Home;
