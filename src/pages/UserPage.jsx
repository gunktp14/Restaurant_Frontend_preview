import React, { useEffect, useState } from "react";
import { Logo } from "../components";
import appStoreImg from "../assets/images/logo-appstore.svg";
import playStoreImg from "../assets/images/logo-playstore.svg";
import { useAppContext } from "../context/appContext";

function UserPage() {
  const { restaurantList, user, handleChange, search , logoutUser} = useAppContext();
  const [filteredRestaurant, setFilteredRestaurant] = useState(null);
  const [showDropdownmenu, setShowDropdownmenu] = useState(false);

  useEffect(() => {
    if (search.length !== 0) {
      setFilteredRestaurant(
        restaurantList.filter(
          (item) =>
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.type.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
    if (search.length === 0 || search === null) {
      setFilteredRestaurant(null);
    }
  }, [search]);
  return (
    <div className="user-home-page">
      <div className="navbar-user">
        <div className="logo-section">
          <Logo width="35px" />
        </div>
        <div className="search-section">
          <input
            type="text"
            name="search"
            value={search}
            placeholder="ค้นหาร้านอาหารของคุณ"
            onChange={(event) => {
              handleChange(event.target.name, event.target.value);
            }}
            disabled={!restaurantList}
          ></input>
        </div>
        <div
          className="user-btn"
          onClick={() => {
            if (showDropdownmenu) {
              setShowDropdownmenu(false);
            } else {
              setShowDropdownmenu(true);
            }
          }}
        >
          {user.username}
          {showDropdownmenu && (
            <div className="dropdown-user">
              <ul>
                <li onClick={()=>logoutUser()}>Logout</li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="grid-res-list">
        {filteredRestaurant
          ? filteredRestaurant.map((element, index) => {
              return (
                <div className="card" key={index}>
                  <div className="card-img">
                    <img src={element.img}></img>
                  </div>
                  <p className="res-name">{element.name}</p>
                  <p className="res-type">{element.type}</p>
                </div>
              );
            })
          : restaurantList.map((element, index) => {
              return (
                <div className="card" key={index}>
                  <div className="card-img">
                    <img src={element.img}></img>
                  </div>
                  <p className="res-name">{element.name}</p>
                  <p className="res-type">{element.type}</p>
                </div>
              );
            })}
        {restaurantList.length === 0 && <div className="loader"></div>}
      </div>
      {restaurantList.length === 0 ? (
        <div></div>
      ) : (
        <div className="footer">
          <div className="footer-left">
            <h4>ขอบคุณที่ใช้บริการ GunFood</h4>
            <p>เงื่อนไขในการใช้บริการ | นโยบายความปลอดภัย</p>
            <br></br>
            <h5>@ GunFood 2023</h5>
          </div>
          <div className="footer-right">
            <div className="social-list">
              <i class="bi bi-facebook"></i>
              <i class="bi bi-envelope-fill"></i>
              <i class="bi bi-instagram"></i>
            </div>
            <div className="app-dowload">
              <img src={playStoreImg} width="110px"></img>
              <img src={appStoreImg} width="110px"></img>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserPage;
