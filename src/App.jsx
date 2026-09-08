import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DashboardSection from './components/DashboardSection'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import CreateUser from './pages/CreateUser';
import UserList from './pages/UserList';


function App() {
  const [isCollapsed,setIsCollapsed] = useState(false);
  const [activeTab,setActiveTab] = useState('default');
        const toggleSidebar = () =>{
          setIsCollapsed(!isCollapsed)
        }
  return (
    <div>
     <BrowserRouter>
      <Header toggleSidebar={toggleSidebar}/>
      <div className='flex border'>
      <Sidebar
       isCollapsed={isCollapsed} 
       activeTab={activeTab} 
       setActiveTab={setActiveTab}
       />
      <Routes>
        <Route path="/" element={<DashboardSection isCollapsed={isCollapsed} />} />
        <Route path='/CreateUser' element={<CreateUser isCollapsed={isCollapsed}  />} />
        <Route path='/viewUser' element={<UserList isCollapsed={isCollapsed}/>} />
      </Routes>        
      </div>
     </BrowserRouter>
    </div>
  )
}

export default App