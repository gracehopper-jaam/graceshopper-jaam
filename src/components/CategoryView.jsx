import React, { useState, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getProductsByCategoryName } from '../api-client';
import SingleProductView from './SingleProductView';
import './Products.css';
import Images from '../media';

const CategoryView = (props) => {
  const { selectedCategory, setCart, isLoggedIn, count, setCount,setSelectedCategory } = props;
  const [productsByCategory, setProductsByCategory] = useState([]);
  const uri = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        if (selectedCategory.length > 0) {
          const products = await getProductsByCategoryName(selectedCategory);
          setProductsByCategory(products);
        } else {
          let parts = uri.pathname.split("/");
          const categoryName = parts[2];
          console.log(parts, categoryName);
          // fetch products by category view
          if (
            categoryName === "Headphones" ||
            categoryName === "Speakers" ||
            categoryName === "Accessories"
          ) {
            setSelectedCategory(categoryName);
            const products = await getProductsByCategoryName(categoryName);
            setProductsByCategory(products);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchProductsByCategory();
  }, [selectedCategory]);


  return (
    
    <div className="products-container">
      <div className="icons-container">
        <img
          className="icons-image"
          src={Images.CategoryOverEar}
          alt="headphone"
          title="Headphones"
          onClick={() => {
            setSelectedCategory("Headphones");
            console.log("Headphones");
            navigate("/category/Headphones");
          }}
        />
        <img
          className="icons-image"
          src={Images.CategorySpeaker}
          alt="speaker"
          title="Speakers"
          onClick={() => {
            setSelectedCategory("Speakers");
            console.log("Speakers");
            navigate("/category/Speakers");
          }}
        />
        <img
          className="icons-image"
          src={Images.CategoryAccessories}
          alt="accessories"
          title="Accessories"
          onClick={() => {
            setSelectedCategory("Accessories");
            console.log("Accessories");
            navigate("/category/Accessories");
          }}
        />
      </div>
      <h2 id= "category-title">{selectedCategory}</h2>
      {
      productsByCategory.length ? 
        productsByCategory.map((product, index) => {
        return (
          <div key={index}>
            <SingleProductView
              selectedProduct={product}
              setCart={setCart}
              isLoggedIn={isLoggedIn}
              setCount = {setCount}
              count ={count}
            />
          </div>
        );
      })
      
      :<></>
    
      }
    </div>
  );
};

 export default CategoryView;
