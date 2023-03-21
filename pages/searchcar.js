import React from 'react';

import Header from '../components/header';
import Footer from '../components/footer';
import Search from '../components/Search';

const SearchCar = ({cars}) => {
  console.log(cars)
  
  return(
    <>
      <Header />
      <Search />
      <Footer />
    </>
)}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch('http://localhost:3000/api/cars');
  const cars = await res.json()

  // Pass data to the page via props
  return { props: { cars } }
}

export default SearchCar;
