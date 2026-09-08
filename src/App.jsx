import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DashboardSection from './components/DashboardSection'
import Header from './components/Header'
import Sidebar from './components/Sidebar'


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
        <Route path='/CreateUser' element={<h1>Hello</h1>} />
      </Routes>        
      </div>
     </BrowserRouter>
    </div>
  )
}

export default App