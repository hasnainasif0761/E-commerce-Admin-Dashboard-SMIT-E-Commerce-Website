import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DashboardSection from './components/DashboardSection'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import CreateUser from './pages/CreateUser';
import UserList from './pages/UserList';
import { Toaster } from 'react-hot-toast';
import CreateProduct from './pages/CreateProduct';
import ViewProduct from './pages/ViewProduct';


function App() {
  const [isCollapsed,setIsCollapsed] = useState(false);
  const [activeTab,setActiveTab] = useState('default');
        const toggleSidebar = () =>{
          setIsCollapsed(!isCollapsed)
        }
  return (
    <div>
      <Toaster/>
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
        <Route path='/viewUser' element={<UserList isCollapsed={isCollapsed}  />} />
        <Route path='/createProduct' element={<CreateProduct isCollapsed={isCollapsed}/>} />
        <Route path='/viewProduct' element={<ViewProduct isCollapsed={isCollapsed}/>} />
      </Routes>        
      </div>
     </BrowserRouter>
    </div>
  )
}

export default App