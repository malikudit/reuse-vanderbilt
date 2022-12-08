import { React, useState } from 'react';
import { Helmet } from 'react-helmet';
import NavBar from './components/NavBar.js';
import Footer from './components/Footer.js';
import MainRoutes from './MainRoutes.js';
import './App.css';

function App() {
  const [searchProduct, setSearchProduct] = useState(['']);
  const [categoryProduct, setCategoryProduct] = useState([]);

  return (
    <>
      <div className="application">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Reuse Vandy</title>
          <link rel="canonical" href="https://reusevandy.org/" />
          <meta
            name="description"
            content="Reuse Vandy - A Vanderbilt Marketplace"
          />
        </Helmet>
      </div>
      <NavBar />
      <MainRoutes
        searchProduct={searchProduct}
        setSearchProduct={setSearchProduct}
        categoryProduct={categoryProduct}
        setCategoryProduct={setCategoryProduct}
      />
      <Footer />
    </>
  );
}

export default App;
