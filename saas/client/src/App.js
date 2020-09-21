import React from 'react';
//import logo from './logo.svg';
import { Route } from 'react-router-dom';
import HomePage from './HomePage';
import Login from './Login';
import Register from './account/Register';

function App() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-gray-200'>
      <div className='max-w-md w-full'>
        <header className='mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900'>This is the header component</header>

        <Route exact path='/' component={HomePage} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
      </div>
    </div>
  );
}

export default App;
