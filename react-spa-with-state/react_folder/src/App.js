import logo from './logo.jpg'
import React from 'react';
import styles from './App.module.css';

const HomePage = () => {
  return <div>Home Page</div>
}

const PricingPage = () => {
  return <div>Pricing Page</div>
}

const FAQPage = () => {
  return <div>FAQ Page</div>
}

const GalleryPage = () => {
  return <div>Gallery Page</div>
}

function App() {
  const [page, setPage] = React.useState('Home');
  const pages = ['Home', 'Pricing', 'FAQ', 'Gallery'];

  return (
    <>
      <div class={styles.navbar}>
        <img onClick={() => setPage('Home')} src={logo} class={styles.homeicon} alt="logo" />
        <div>
          {pages.map((thisPage, index) => {
            return <>
              {index !== 0 && <>&nbsp;|&nbsp;</>}
              <a 
                class={page !== thisPage && styles.navlink}
                onClick={() => setPage(thisPage)}
              >
                {thisPage}
              </a>
            </> 
          })}
        </div>
      </div>
      
      <div class={styles.dynamicbody}>
        {page === 'Home' && (
          <HomePage />
        )}
        {page === 'Pricing' && (
          <PricingPage />
        )}
        {page === 'FAQ' && (
          <FAQPage />
        )}
        {page === 'Gallery' && (
          <GalleryPage />
        )}
      </div>
    </>
  );
}

export default App;
