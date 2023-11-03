import React from 'react'
import { Menu,Table } from '../components/Dashboard'
import { useAppContext } from '../context/appContext';
import AddFormModal from '../components/Dashboard/AddFormModal';
import ConfirmPopup from '../components/Dashboard/ConfirmPopup';
// import ProfileModal from '../components/Dashboard/ProfileModal';

function Dashboard() {

  const { showAddForm, showEditForm, showPopupConfirm } = useAppContext();

  return (
    <div className="app-container">
        <Menu/>
        <div
          className={ 
            showAddForm || showEditForm || showPopupConfirm 
              ? "modal active"
              : "modal"
          }
        >
          
          {(showAddForm || showEditForm) && <AddFormModal/>}
          {showPopupConfirm && <ConfirmPopup/>}
        </div>
        {/* {showProfileModal && <ProfileModal/>} */}
      <Table/>
    </div>
  )
}

export default Dashboard
