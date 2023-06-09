import React, { useState,useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { Logout } from './';
import Images from '../media';
import './Header.css'


const Header = ({ isLoggedIn, setIsLoggedIn, setUser,setToken, setCart, cart,user,token,returnedUserCartId,setReturnedUserCartId,orderPlaced, count,setCount}) => {

  return (
    <header>
      <img className="logo" src={Images.JAAMLOGO} />
      <nav>
        <NavLink className="link" to="/">
          HOME
        </NavLink>
        <NavLink className="link" to="/Shop">
          SHOP
        </NavLink>
        <NavLink className="link" to="/About">
          ABOUT
        </NavLink>
        <NavLink className="cartLink" to="/Cart">
          <div className="cart">
            <span className="count">{count}</span>
            <i className="fa-solid fa-cart-shopping fa-lg"></i>
          </div>
        </NavLink>
        {isLoggedIn? ( <NavLink className="link" to="/Me">Hi, {user.firstname} </NavLink>):(<></>)} 
      </nav>
    
      <div className="loginLogoutButtons">
        {isLoggedIn ? (
          <Logout
            setUser={setUser}
            setIsLoggedIn={setIsLoggedIn}
            setToken={setToken}
            setCart={setCart}
            cart={cart}
            user={user}
            token={token}
            setReturnedUserCartId={setReturnedUserCartId}
            returnedUserCartId={returnedUserCartId}
            orderPlaced={orderPlaced}
            setCount ={setCount}
          />
        ) : (
          <NavLink to="/login" className="authButton">
            LOGIN
          </NavLink>
        )}
        
      </div>
    </header>
  );
};

export default Header;