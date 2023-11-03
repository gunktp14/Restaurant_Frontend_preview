import React from "react";
import Logo from "../Logo";
import { useAppContext } from "../../context/appContext";

function Menu() {
  const {
    search,
    handleChange,
    logoutUser,
    showAddForm,
    displayAddForm,
    clearAllModal,
    user,

    displayProfileModal,
    removeProfileModal,
  } = useAppContext();
  return (
    <div className="nav-left">
      <div className="top-section-menu">
        <div className="title-menu">
          <Logo width="40" />
        </div>
        <div className="search-control">
          <input
            name="search"
            value={search}
            placeholder="ค้นหาร้านอาหาร"
            className="search-input"
            onChange={(event) => {
              handleChange(event.target.name, event.target.value);
            }}
          ></input>
        </div>
        <div className="menu-control">
          <i className="bi bi-shop"></i>
          <span>ข้อมูลร้านอาหาร</span>
        </div>
        <div
          className="menu-control"
          onClick={(event)=>{
            if(showAddForm){
                clearAllModal()
            }else{
                displayAddForm()
            }
          }}
        >
          <i className="bi bi-house-add-fill"></i>
          <span>เพิ่มข้อมูลร้านอาหาร</span>
        </div>
        <div className="menu-control">
          <i className="bi bi-pencil-square"></i>
          <span>เเก้ไขข้อมูลร้าน</span>
        </div>
        <div className="menu-control">
          <i className="bi bi-eye-fill"></i>
          <span>มุมมองผู้ใช้</span>
        </div>
      </div>
      <div className="bottom-section-menu">
        <div
          className="menu-control"
          onClick={() => {
            logoutUser();
          }}
        >
          <i class="bi bi-box-arrow-left"></i>
          <span>ออกจากระบบ</span>
        </div>
      </div>
    </div>
  );
}

export default Menu;
