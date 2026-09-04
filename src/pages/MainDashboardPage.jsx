import React, {useState} from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import DashboardSection from '../components/DashboardSection'

function MainDashboardPage() {
      const [isCollapsed,setIsCollapsed] = useState(false);
      const [activeTab,setActiveTab] = useState('default');
    
    
      const toggleSidebar = () =>{
        setIsCollapsed(!isCollapsed)
      }
  return (
    <div>
         <Header toggleSidebar={toggleSidebar}/>
      <div className='flex border'>
        
      <Sidebar
       isCollapsed={isCollapsed} 
       activeTab={activeTab} 
       setActiveTab={setActiveTab}
       />
       <DashboardSection isCollapsed={isCollapsed} />
       </div>
    </div>
  )
}

export default MainDashboardPage