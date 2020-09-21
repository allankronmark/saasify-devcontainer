import React, { Component } from 'react';

class Register extends Component {
  state = {
    email: '',
    password: '',
  };

  handleEmailChange = (event) => {
    this.setState({
      email: event.target.value,
    });
  };
  handlePasswordChange = (event) => {
    this.setState({
      password: event.target.value,
    });
  };
  handleSubmitClick = (event) => {
    // submit the email and password to the server
    const url = '/api/register';
    fetch(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().catch((err) => {
            throw err;
          });
        }
        return response.json();
      })
      .then((results) => {
        console.log('results ', results);
      })
      .catch((error) => {
        console.log('error ', error);
      });

    // let's prevent default
    event.preventDefault();
  };

  render() {

    /* TailwindCSS logic */
    const css = {
      register: {
        form: 'bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4',
        input: {
          base: 'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight',
          focus: 'focus:outline-none focus:shadow-outline',
        },
        button: {
          base: 'inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 cursor-not-allowed',
          hover: 'hover:bg-indigo-500',
          focus: 'focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo',
          active: 'active:bg-indigo-700',
          transition: 'transition ease-in-out',
          duration: 'duration-150',
        }
      }
    }
    const getCSS = (key) => {
      if (typeof key === 'string') {
        return key.value;
      }
      else return Object.values(key).join(' ');
    }
    /* END TailwindCSS logic */

    return (
      <div className=''>
        <h2>Register</h2>
        <div>
          <form className={getCSS(css.register.form)}>

            <div id='formBasicEmail'>
              <label>Email address</label>
              <input
                type='email'
                placeholder='Enter email'
                onChange={this.handleEmailChange}
                value={this.state.email}
                className={getCSS(css.register.input)}
              />
              <small className='text-muted'>
                We'll never share your email with anyone else.
              </small>
            </div>

            <div id='formBasicPassword'>
              <label>Password</label>
              <input
                type='password'
                placeholder='Password'
                onChange={this.handlePasswordChange}
                value={this.state.password}
                className={getCSS(css.register.input)}
              />
            </div>

            <div id='formBasicCheckbox'>
              <input
                type='checkbox'
                label='Check me out'
              />
            </div>

            <button className={getCSS(css.register.button)}
              variant='primary'
              type='button'
              onClick={this.handleSubmitClick}
            ><svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submit
            </button>

          </form>
        </div >
      </div >
    );
  }
}

export default Register;
