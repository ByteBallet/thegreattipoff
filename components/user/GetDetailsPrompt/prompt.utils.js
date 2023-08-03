import moment from 'moment';
// REGEX to validate fields
const checkSpaces = /\s/g;
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/;
const checkPunctuation = /^[a-zA-Z0-9\s]*$/;
const firstNumberCheck = /^\d/;

import { YEARS } from '@Components/Register/Register';

export const VALIDATE = async (values, type) => {
    const errors = {};

    if (!values.loginid) {
        errors.loginid = 'Username is required';
    } else if (values.loginid.length < 6) {
        errors.loginid = 'Username should be minimum 6 characters';
    } else if (firstNumberCheck.test(values.loginid)) {
        errors.loginid = 'Username cannot start with a number';
    } else if (!checkPunctuation.test(values.loginID)) {
        errors.loginid = 'Can only contain letters and numbers';
    } else if (checkSpaces.test(values.loginid)) {
        errors.loginid = 'Username cannot cotnain spaces';
    }

    if (!errors.loginid || errors.loginid == '') {
        // call the API to validate loginID
        try {
            const response = await fetch(`${process.env.server}/user/checkloginid`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    XAPIGTO: process.env.APP_BRAND.toUpperCase(),
                },
                body: JSON.stringify({ loginid: values.loginid }),
            });

            const isLoginValid = await response.json();
            if (+isLoginValid === 1) {
                errors.loginid = 'The Username already exists';
            } else {
                // setValidID(values.loginID);
            }
        } catch (e) {
            errors.loginid = 'Unable to validate Username - Network Error, please try again later';
            console.log('Unable to verify login');
        }
        // setLoginBlur(false);
    }
    if (type == 'loginid') return errors;

    // // validation for password
    // // validation checks for password field
    // if (!values.oldpassword) {
    //     errors.oldpassword = 'Password is required';
    // } else if (values.oldpassword.length < 8) {
    //     errors.oldpassword = 'Password too short. Password must contain at least 8 characters.';
    // } else if (checkSpaces.test(values.oldpassword)) {
    //     errors.oldpassword = 'Password cannot contain spaces';
    // } else if (!passwordRegex.test(values.oldpassword)) {
    //     errors.oldpassword = 'Password requires at least one numeric, one capital and one lowercase.';
    // }

    if (!values.newpassword) {
        errors.newpassword = 'Password is required';
    } else if (values.newpassword.length < 8) {
        errors.newpassword = 'Password too short. Password must contain at least 8 characters.';
    } else if (checkSpaces.test(values.newpassword)) {
        errors.newpassword = 'Password cannot contain spaces';
    } else if (!passwordRegex.test(values.newpassword)) {
        errors.newpassword = 'Password requires at least one numeric, one capital and one lowercase.';
    }

    if (type == 'newpassword') return errors;

    // if (values.oldpassword !== values.newpassword) {
    //     errors.newpassword = 'Passwords do not match';
    // }

    // && values.loginID !== validID
    // common validation checks

    // validation for date in DOB
    if (!values.day || values.day === 0) {
        errors.day = 'Required';
    }

    if (values.day > 31) {
        errors.day = 'Invalid';
    }

    if (type == 'day') return errors;

    // validation for month in DOB
    if (!values.month || values.month === 0) {
        errors.month = 'Required';
    }

    if (values.month > 12) {
        errors.month = 'Invalid';
    }

    if (type == 'month') return errors;

    // validation for year in DOB
    if (!values.year || values.year === 0) {
        errors.year = 'Required';
    }

    const date = new Date();

    if (values.year > date.getFullYear()) {
        errors.year = 'Invalid';
    }

    if (values.year !== 0 && values.month !== 0 && values.day !== 0) {
        const date = new Date(YEARS[values.year - 1], values.month - 1, values.day);
        const age = moment().diff(date, 'years');
        if (age < 18) {
            errors.year = 'Users must be over 18';
        }
    }

    if (type == 'year') return errors;

    if (values.postcode && values.postcode == '') {
        errors.postcode = 'Postcode Required';
    }

    if (type == 'postcode') return errors;

    return errors;
};
