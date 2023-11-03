import React from "react";
import { useAppContext } from "../../context/appContext";
useAppContext

function ConfirmPopup() {
  const {
    showPopupConfirm,
    selectedRes,
    clearAllModal,
    deleteRestaurant,
  } = useAppContext();
  return (
    <div className={showPopupConfirm ? "popup active" : "popup"}>
      <div id="close-addForm-btn" onClick={clearAllModal}>
        X
      </div>
      <div>
        <div className="img-box">
          <img src={selectedRes.img} width="50%" alt="" />
        </div>
        <p>
          <b>ชื่อร้าน</b> : {selectedRes.name}
        </p>
        <p>
          <b>ประเภทอาหาร</b> : {selectedRes.type}
        </p>
        <p className="note-delete">
          คุณต้องการลบรายการร้านอาหาร รายการนี้ใช่หรือไม่ !
        </p> 
      </div>
      <div className="btn-block-popup">
        <button className="btn-yes" onClick={()=>{deleteRestaurant()}}>
          Yes
        </button>
        <button className="btn-no" onClick={clearAllModal}>No</button>
      </div>
    </div>
  );
}

export default ConfirmPopup;
