
import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileInfo from '../Cards/ProfileInfo';
import SearchBar from '../SearchBar/SearchBar';


const Navbar = ({userInfo,onSearchNote,handleClearSearch}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleSearch = () => {
    if(searchQuery){
      onSearchNote(searchQuery)
      // onClearSearch()
    }
    console.log('Search triggered for:', searchQuery);
  };

  const onClearSearch = () => {
    // setIsSearch(false);
    setSearchQuery('');
    handleClearSearch()
    // getalltasks();
  };

  // return (
  //   <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow'>
  //     <h2 className='text-xl font-medium text-black py-2'>Notes</h2>

  //     <SearchBar
  //       value={searchQuery}
  //       onChange={(e) => setSearchQuery(e.target.value)}
  //       handleSearch={handleSearch}
  //       onClearSearch={onClearSearch}
  //     />

  //     <ProfileInfo userInfo = {userInfo}onLogout={onLogout} />
  //   </div>
  // );
  return (
  <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow'>
    <h2 className='text-xl font-medium text-black py-2'>Notes</h2>
    {userInfo && (
      <>

    <SearchBar
      value={searchQuery}
      onChange={({target}) => {
        setSearchQuery(target.value);
      }}
      handleSearch={handleSearch}
      onClearSearch={onClearSearch}
    />
      <ProfileInfo userInfo={userInfo} onLogout={onLogout} />{" "}
      </>
    )}
  </div>
);

};

export default Navbar;
