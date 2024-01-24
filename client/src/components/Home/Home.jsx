import { useEffect, useContext } from "react";

import "./Home.scss";

import Banner from "./Banner/Banner";
import Category from "./Category/Category";
import Products from "../Products/Products";

import { fetchDataFromApi } from "../../utils/api";
import { Context } from "../../utils/context";

const Home = () => {

  const { categories, setCategories, products, setProducts } = useContext(Context);

  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  const getProducts = async () => {
    await fetchDataFromApi("/api/products?populate=*").then((res) => {
      console.log("Home Componenet Data Fecth", res)
      setProducts(res.data);
    });
  };

  const getCategories = async () => {
    await fetchDataFromApi("/api/categories?populate=*").then((res) => {
      // console.log(res)
      // console.log("Category Fetched: ", res);
      setCategories(res.data);
    });
  };

  return (
    <div>
      <Banner />
      <div className="main-content">
        <div className="layout">
          <Category categories={categories} />
          <Products products={products} headingText="Popular Products" />
        </div>
      </div>
    </div>
  );
};

export default Home;
