import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import SignUp from './SignUp'
import ShowHome from './PodCastList'
import reportWebVitals from './reportWebVitals';
import Favourites from './Favourites';
import { FavouritesProvider } from './FavouriteContext'; // Import FavouritesProvider


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <FavouritesProvider> 
    <App />
    <SignUp />
    <ShowHome />
    <Favourites />
    </FavouritesProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

