const User = require('../models/User');

exports.register = async (req, res, next) => {
  const { email, password } = req.body;

  //Validate the input fields
  const validationErrors = [];

  // run the basic existance checks
  if (!email) {
    validationErrors.push({
      code: 'VALIDATION_ERROR',
      field: 'email',
      message: 'You must provide an email address',
    });
  }

  if (!password) {
    validationErrors.push({
      code: 'VALIDATION_ERROR',
      field: 'password',
      message: 'You must provide a password',
    });
  }

  // validation of the email address provided - moved here since there's no need to spend time validating the email if password isn't provided
  const isEmailValid = email && validateEmail(email);
  if (email && !isEmailValid) {
    validationErrors.push({
      code: 'VALIDATION_ERROR',
      field: 'email',
      message: 'Email is not valid',
    });
  }

  // build an object of all validationErrors and return it (if any)
  if (validationErrors.length) {
    const errorObject = {
      error: true,
      errors: validationErrors,
    };

    res.status(422).send(errorObject);

    return;
  }

  // we've reached the end so let's save the data to DB

  try {
    // first check that user doesn't already exist (by email as unique)
    /*
        const existingUser = await User.findOne({
            email: email
        });
        */
    // in ES6, this can be written like below because keys share the same name
    const existingUser = await User.findOne({ email });

    // if user exists, throw an error
    if (existingUser) {
      const errorObject = {
        error: true,
        errors: [
          {
            error: 'VALIDATION_ERROR',
            field: 'email',
            message: 'Email already exists',
          },
        ],
      };

      // 422 = Unprocessable Entity
      res.status(422).send(errorObject);

      return;
    }

    // add user to DB, notation is again ES6, meaning email:email and password:password
    let user = new User({
      email,
      password,
    });

    const savedUser = await user.save();
    console.log('savedUser ', savedUser);

    res.status(200).send({
      user: savedUser,
    });
  } catch (e) {
    console.log('e ', e);
  }
};

// function for validating email - not tried and tested
function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
