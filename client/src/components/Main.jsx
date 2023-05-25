import React, { useState, useEffect } from 'react';
import { Header, Home, Products, About, Cart, Checkout, Login, Register, Logout, CategoryDetails, ProductDetails } from './index';
import { Routes, Route } from 'react-router-dom';
import { getCartByUser } from "../api-client"
import { getMe } from '../api-client/auth';
import CartWithAccountView from './CartWithAccountView';


const Main = () => {

  const [user, setUser] = useState({});
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        const fetchedUser = await getMe(token);
        if (fetchedUser) {
          setUser(fetchedUser);
          setIsLoggedIn(true);
          localStorage.setItem("currentUser", fetchedUser.username);

        }
      }

    };
    fetchUser();
  }, [token]);


  useEffect(() => {

    const getInitialData = async () => {
      try {

        if (token) {
          setIsLoggedIn(true);
        }

        if (token) {
          const [userCart] = await getCartByUser(token, localStorage.getItem("currentUser"));

          console.log("Entering at Line 45", userCart);
          let tempCart = JSON.parse(localStorage.getItem("currentCart"));
          //if cart already exits in the locastorage then we need to merge contents 
          if(tempCart)
          {
            let tempItems = [...tempCart.items]; //hold the items already in the cart
            let userCartItems =  [...userCart.items];
            let newArr = tempItems.concat(userCartItems); //concat previous items with new items

            //get the new total amount
            let newTotalAmt = 0;
            newArr.map((tempItem) => {
              return newTotalAmt += tempItem.qty * tempItem.priceperunit;
            });
            const cartObject = {
              orderdate:tempCart.orderdate,
              totalamount:newTotalAmt ,
              items:[...newArr],
              username: userCart.buyerName, //update the name to the logged in username
              persistedCart : true,
            }
            localStorage.setItem("currentCart", JSON.stringify(cartObject));
            setCart(cartObject);
          }
          else
          {
            console.log("Entering at Line 62", userCart);
            const cartObject = {
              username: userCart.buyerName,
              orderdate: userCart.orderdate,
              totalamount: userCart.totalamount,
              items: [...userCart.items],
              persistedCart: true,
            }
            localStorage.setItem("currentCart", JSON.stringify(cartObject));
            setCart(cartObject);
          }
          // const cartObject = {
          //   username: userCart.buyerName,
          //   orderdate: userCart.orderdate,
          //   totalamount: userCart.totalamount,
          //   items: [...userCart.items],
          //   persistedCart: true,
          // }
          // localStorage.setItem("currentCart", JSON.stringify(cartObject));
          // setCart(cartObject);
        }


      } catch (error) {
        console.error(error);
      }
    };
    getInitialData();
  }, [token]);

  /**************************/

  // useEffect(() => {
  //   console.log(user);
  // }, [user]);


  return (
    <div>
      <Header
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        setUser={setUser} setToken={setToken} setCart={setCart} />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/Shop" element={<Products setCart ={setCart} isLoggedIn={isLoggedIn}/>} />
        <Route path="/category-details/:id" element={<CategoryDetails />} />
        <Route path="/product-details/:id" element={<ProductDetails />} />

        <Route path="/About" element={<About />} />


        <Route path="/CartWithAccountView" element={<CartWithAccountView isLoggedIn={isLoggedIn} user={user} cart={cart} token={token} setCart={setCart} />} />

        <Route path="/Register" element={<Register setIsLoggedIn={setIsLoggedIn} cart={cart}/>} />

        <Route path="/Cart" element={<Cart isLoggedIn={isLoggedIn} user={user} cart={cart} setCart={setCart} />} />
        <Route path="/Checkout" element={<Checkout />} />
        <Route path='/login' element={
          <Login
            token={token}
            setToken={setToken}
            user={user}
            setUser={setUser}
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn} />} />
        <Route path='/logout' element={<Logout setUser={setUser} setIsLoggedIn={setIsLoggedIn} setToken={setToken} setCart={setCart} />} />

      </Routes>

    </div>
  )
};


export default Main;


