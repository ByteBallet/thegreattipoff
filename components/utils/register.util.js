// Provides utility functions to Register Component
import { YEARS } from '../Register/Register';
import moment from 'moment';
// REGEX to validate fields
const checkSpaces = /\s/g;
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/;
const validWord = /^[a-zA-Z\s]*$/;
const checkPunctuation = /^[a-zA-Z0-9\s]*$/;
const firstNumberCheck = /^\d/;
const isInteger = /^\d+$/;
const isValidEmail = /^$|^.*@.*\..*$/;
const isValidEmailAlt = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
// const mobileRegOT = /([0-9\s\-]{7,})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;
const mobileRegOT = /^[0-9]*$/;
// const mobileReg = /^(04|05|61|00|64|02)[0-9]{8}$/;
const mobileReg = /^[0-9]*$/;

const dashCheck = /^[a-zA-Z\s-]*$/;
const startDash = /^-/;
const endDash = /-$/;
const isValidWordHyphen = /^[a-zA-Z0-9\s-]*$/;

const client = process.env.NEXT_PUBLIC_CLIENT;

// Gen web regex, taken directly from their documentation
const GW_Login_Regex = /^(?=[a-zA-Z0-9\.@_-]{6,48})([a-zA-Z0-9]([.@_-]?[a-zA-Z0-9])*)$/;
const GW_P_Apla_Regex = /^[a-zA-Z0-9]*$/; // alphanumeric only
const GW_P_Min_Regex = /^[a-zA-Z0-9]{6,}$/; // minimum 6 characters
const GW_P_Num_Regex = /[0-9]/; // Must contain atleast one number
const GW_P_OAplha_Regex = /[a-zA-Z]/; // must contain atleast one alphabetic character
const GW_P_Regex = /^((?=.*[0-9])(?=.*[a-zA-Z]).{6,})$/; // password generic

const passwordRegex2 = /^(?=.*[A-Z])(?=.*[a-z]).*$/;
const passwordRegex3 = /^(?=.*\d).*$/;
//2022.04.05 Sergey Password Validation

export const VALIDATE3 = (values) => {
    const result = {};
    if (!values) {
        //  errors.newPassword = 'Password is required';
    } else {
        result.passed3 = values.length >= 6;
        result.passed1 = passwordRegex2.test(values);
        result.passed2 = passwordRegex3.test(values);
    }
    return result;
};

export const VALIDATE5 = (values) => {
    const errors = {};

    if (!values.current) {
        errors.current = 'Password is required';
    }

    if (!values.new) {
        errors.new = 'Password is required';
    } else {
        if (values.new.length < 6) {
            errors.new = 'Password too short. Password must contain at least 6 characters.';
        } else if (checkSpaces.test(values.new)) {
            errors.new = 'Password cannot contain spaces';
        } else if (!passwordRegex.test(values.new)) {
            errors.new = 'Password requires at least one numeric, one capital and one lowercase.';
        }
    }

    if (!values.confirm) {
        errors.confirm = 'Confirm Password is empty';
    } else if (values.new !== values.confirm) {
        errors.confirm = 'Confirm Password mismatch';
    }
    return errors;
};
export const VALIDATE2 = (values, currentPassword) => {
    const errors = {};

    if (!values.password) {
        errors.password = 'Password is required';
    }
    // else if (values.password !== currentPassword) {
    //     errors.password = 'Password mismatch.';
    // } // errors.password = "Password requires at least one numeric, one capital and one lowercase.";
    // errors.password = values.password;

    if (!values.newPassword) {
        errors.newPassword = 'Password is required';
    } else {
        if (values.newPassword.length < 6) {
            errors.newPassword = 'Password too short. Password must contain at least 6 characters.';
        } else if (checkSpaces.test(values.newPassword)) {
            errors.newPassword = 'Password cannot contain spaces';
        } else if (!passwordRegex2.test(values.newPassword)) {
            errors.newPassword = 'Password requires at least one numeric, one capital and one lowercase.';
        } else if (!passwordRegex.test(values.newPassword)) {
            errors.newPassword = 'Password requires at least one numeric, one capital and one lowercase.';
        }
        // errors.passed3 = values.newPassword.length >= 6;
        // errors.passed1 = passwordRegex2.test(values.newPassword);
        // errors.passed2 = passwordRegex3.test(values.newPassword);
    }

    if (!values.confirmNewPassword) {
        // errors.confirmPassword = "Confirm Password is required";
        errors.confirmNewPassword = 'Confirm password mismatch.';
    } else if (values.newPassword !== values.confirmNewPassword) {
        errors.confirmNewPassword = 'Confirm password mismatch.';
    }

    return errors;
};

// validation for all the fields
export const VALIDATE4 = async (values, validEmail, setValidEmail, validMobile, setValidMobile, buyTips = false) => {
    const errors = {};

    // validation checks for firstName
    if (!values.firstname) {
        errors.firstname = 'Please enter your First name';
    } else if (values.firstname.length < 1) {
        errors.firstname = 'Please enter your First name. At least 1 character';
    } else if (!/^[a-zA-Z][a-zA-Z \'-]*$/.test(values.firstname)) {
        errors.firstname = 'First name must start with a letter. Only letters, spaces & hyphens permitted.';
    }
    // else if (!checkPunctuation.test(values.firstname)) {
    // 	errors.firstname = "First name invalid. No punctuation characters.";
    // }
    else if (!dashCheck.test(values.firstname)) {
        errors.firstname = 'First name invalid. No punctuation or numeric characters.';
    } else if (startDash.test(values.firstname)) {
        errors.firstname = 'First name invalid. Can not start with -';
    } else if (endDash.test(values.firstname)) {
        errors.firstname = 'First name invalid. Can not end with -';
    }

    if (!values.surname) {
        // validation checks for surname
        errors.surname = 'Please enter your surname';
    } else if (values.surname.length < 1) {
        errors.surname = 'Please enter your surname. At least 1 character';
    } else if (!/^[a-zA-Z][a-zA-Z \'-]*$/.test(values.surname)) {
        errors.surname = 'Surname must start with a letter. Only letters, spaces & hyphens permitted.';
    } else if (!dashCheck.test(values.surname)) {
        errors.surname = 'Surname invalid. No punctuation or numeric characters.';
    } else if (startDash.test(values.surname)) {
        errors.surname = 'Surname invalid. Can not start with -';
    } else if (endDash.test(values.surname)) {
        errors.surname = 'Surname invalid. Can not end with -';
    }

    // validation for email
    if (!values.email) {
        errors.email = 'Email is required';
    } else if (!isValidEmail.test(values.email) || !isValidEmailAlt.test(values.email)) {
        errors.email = 'Please enter a valid email';
    } else if (values.email !== validEmail) {
        // call the API to validate email
        try {
            const response = await fetch(`${process.env.server}/user/checkEmail`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    XAPIGTO: process.env.APP_BRAND.toUpperCase(),
                },
                body: JSON.stringify({ email: values.email }),
            });
            // console.log('Email, response=', response);
            const isEmailValid = await response.json();
            if (+isEmailValid !== 0) {
                // error, email already exists
                errors.email = 'Email address already exists. Enter a different email address.';
            } else {
                setValidEmail(values.email);
            }
        } catch (e) {
            errors.email = 'Unable to validate Email - Network Error, please try again later';
            console.log('Unable to verify Email');
        }
    }

    if (client !== 'gto') {
        if (!values.qasAddress || values.qasAddress.length == 0) {
            errors.qasAddress = 'required';
        }
    }
    // validation for mobile number

    if (!values.mobile || values?.mobile?.length == 0) {
        errors.mobile = 'Mobile number is required';
    } else if (values.country === 'Australia' && (values.mobile.length < 10 || values.mobile.length > 20)) {
        errors.mobile = 'Please enter a valid mobile';
    } else if (!isInteger.test(values.mobile)) {
        errors.mobile = 'Please enter a valid mobile';
    } else if (values.country !== 'Australia' && !mobileRegOT.test(values.mobile)) {
        errors.mobile = 'Please enter a valid mobile';
    } else if (values.country === 'Australia' && !mobileReg.test(values.mobile)) {
        errors.mobile = 'Please enter a valid mobile';
    }

    // if (!values.mobile) {
    //     errors.mobile = 'Mobile number is required';
    // } else if (
    //     values.country === 'Australia' &&
    //     (values.mobile.length < 10 || values.mobile.length > 20)
    // ) {
    //     errors.mobile = 'Please enter a valid mobile';
    // } else if (!isInteger.test(values.mobile)) {
    //     errors.mobile = 'Please enter a valid mobile';
    // } else if (values.state === 9 && !mobileRegOT.test(values.mobile)) {
    //     errors.mobile = 'Please enter a valid mobile';
    // } else if (values.state !== 9 && !mobileReg.test(values.mobile)) {
    //     errors.mobile = 'Please enter a valid mobile';
    // } else if (client == 'gto' && values.mobile !== validMobile) {
    //     // call the API to validate Mobile

    //     try {
    //         const response = await fetch(
    //             `${process.env.server}/user/checkmobile`,
    //             {
    //                 method: 'POST',
    //                 mode: 'cors',
    //                 headers: {
    //                     Accept: 'application/json',
    //                     'Content-Type': 'application/json',
    //                     XAPIGTO: process.env.APP_BRAND.toUpperCase(),
    //                 },
    //                 body: JSON.stringify({ mobile: values.mobile }),
    //             }
    //         );

    //         const isMobileValid = await response.json();
    //         console.log(isMobileValid);
    //         if (!isMobileValid.SUCCESS) {
    //             // error, email already exists
    //             errors.mobile =
    //                 'Mobile already exists. Enter a different mobile.';
    //         } else {
    //             setValidMobile(values.mobile);
    //         }

    //         console.log(isMobileValid);
    //     } catch (e) {
    //         errors.mobile =
    //             'Unable to validate Mobile - Network Error, please try again later';
    //         console.log('Unable to verify Mobile');
    //     }
    // }

    if (client == 'gto' || client == 'eb') {
        // console.log('VALIDATE4 client=',client);
        // validation for state
        if (!values.state || values.state === 0) {
            errors.state = 'Select state.';
        }

        // validation for country
        if (!values.country || values.country === 0) {
            errors.country = 'Required';
        }

        // all the validation for appartment no, street no, street name and street type goes here
        // validation for appartment number, not required
        // if (!values.aptNo) {
        // 	errors.aptNo = "Required";
        // }

        if ((!values.stNo || values.stNo.length == 0) && client != 'gto') {
            errors.stNo = 'Required';
        }

        if (!values.stName && client != 'gto') {
            errors.stName = 'Required';
        }

        // validation for Street Type
        if ((!values.stType || values.stType === 0) && client != 'gto') {
            errors.stType = 'Required';
        }

        if (!values.locality && client != 'gto') {
            errors.locality = 'Required';
        } else if (!isValidWordHyphen.test(values.locality)) {
            errors.locality = 'Suburb invalid. No punctuation or numeric characters.';
        }

        // validation for psotcode
        // && conidtion is required where country is AU

        if (!values.postcode && values.country === 'Australia') {
            errors.postcode = 'Postcode required';
        } else if (values.state && values.state !== 9 && values.postcode.length < 4) {
            errors.postcode = 'Invalid postcode';
        } else if (!isInteger.test(values.postcode)) {
            errors.postcode = 'Invalid postcode.';
        }
    }

    // if (values.depositLimit == null) {
    //     errors.depositLimit = `Please select whether you'd like to set a deposit limit.`;
    // }

    // if (values.depositLimit && !isInteger.test(values.depositAmount)) {
    //     errors.depositAmount = 'Numbers only';
    // }

    // if (values.depositLimit && values.depositPeriod == 0) {
    //     errors.depositPeriod = 'Select period';
    // }

    return errors;
};

// validation for all the fields
export const VALIDATE = async (
    values,
    validID,
    setValidID,
    validEmail,
    setValidEmail,
    validMobile,
    setValidMobile,
    buyTips,
    loginBlur,
    setLoginBlur
) => {
    const errors = {};

    if (client == 'gto') {
        // gto validation
        // validation checks for loginID
        if (!values.loginID) {
            errors.loginID = 'Username is required';
        } else if (values.loginID.length < 6) {
            errors.loginID = 'Username should be minimum 6 characters';
        } else if (firstNumberCheck.test(values.loginID)) {
            errors.loginID = 'Username cannot start with a number';
        } else if (!checkPunctuation.test(values.loginID)) {
            errors.loginID = 'Can only contain letters and numbers';
        } else if (checkSpaces.test(values.loginID)) {
            errors.loginID = 'Username cannot cotnain spaces';
        }

        // validation for password
        // validation checks for password field
        if (!values.password) {
            errors.password = 'Password is required';
        } else if (values.password.length < 8) {
            errors.password = 'Password too short. Password must contain at least 8 characters.';
        } else if (checkSpaces.test(values.password)) {
            errors.password = 'Password cannot contain spaces';
        } else if (!passwordRegex.test(values.password)) {
            errors.password = 'Password requires at least one numeric, one capital and one lowercase.';
        }
    } else {
        // Gen web validations
        // validation for login
        if (!values.loginID) {
            errors.loginID = 'Username is required';
        } else if (values.loginID.length < 6) {
            errors.loginID = 'Username must be at least 6 characters';
        } else if (checkSpaces.test(values.loginID)) {
            errors.loginID = "Username can't cotnain spaces";
        } else if (!GW_Login_Regex.test(values.loginID)) {
            errors.loginID =
                "Username may only contain a combination of alphanumeric, underscore (_), hyphen (-), full stop (.) and symbol (@). It can't contain consecutive special characters."; // TODO: CHANGE ERROR MESSAGE
        }

        // validation for password
        // validation checks for password field
        if (!values.password) {
            errors.password = 'Password is required';
        } else if (values.password.length < 6) {
            errors.password = 'Password too short. Password must contain at least 6 characters.';
        }
        // Removed special character validation from Join Form - Usman 20th Sep, 2022 - Jira G21-614
        // else if (!GW_P_Min_Regex.test(values.password)) {
        //     errors.password =
        //         'Password cannot contain special characters. Alphanumeric only.';
        // }
        // else if (!GW_P_Apla_Regex.test(values.password)) {
        //     errors.password =
        //         'Password can only contain alphanumeric characters only';
        // }
        else if (!GW_P_Num_Regex.test(values.password)) {
            errors.password = 'Password requires at least one numeric character';
        } else if (!GW_P_OAplha_Regex.test(values.password)) {
            errors.password = 'Password requires at least one alphabetic character';
        } else if (!GW_P_Regex.test(values.password)) {
            errors.password = 'Password invalid.';
        }
    }

    // common validation checks
    if ((!errors.loginID || errors.loginID == '') && values.loginID !== validID) {
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
                body: JSON.stringify({ loginid: values.loginID }),
            });

            const isLoginValid = await response.json();
            if (+isLoginValid === 1) {
                errors.loginID = 'The Username already exists';
            } else {
                setValidID(values.loginID);
            }
        } catch (e) {
            errors.loginID = 'Unable to validate Username - Network Error, please try again later';
            console.log('Unable to verify login');
        }
        setLoginBlur(false);
    }

    // validation checks for firstName
    if (!values.firstname) {
        errors.firstname = 'Please enter your First name';
    } else if (values.firstname.length < 1) {
        errors.firstname = 'Please enter your First name. At least 1 character';
    } else if (!/^[a-zA-Z][a-zA-Z \'-]*$/.test(values.firstname)) {
        errors.firstname = 'First name must start with a letter. Only letters, spaces & hyphens permitted.';
    }
    // else if (!checkPunctuation.test(values.firstname)) {
    // 	errors.firstname = "First name invalid. No punctuation characters.";
    // }
    else if (!dashCheck.test(values.firstname)) {
        errors.firstname = 'First name invalid. No punctuation or numeric characters.';
    } else if (startDash.test(values.firstname)) {
        errors.firstname = 'First name invalid. Can not start with -';
    } else if (endDash.test(values.firstname)) {
        errors.firstname = 'First name invalid. Can not end with -';
    }

    if (!values.surname) {
        // validation checks for surname
        errors.surname = 'Please enter your surname';
    } else if (values.surname.length < 1) {
        errors.surname = 'Please enter your surname. At least 1 character';
    } else if (!/^[a-zA-Z][a-zA-Z \'-]*$/.test(values.surname)) {
        errors.surname = 'Surname must start with a letter. Only letters, spaces & hyphens permitted.';
    }
    //      else if (!validWord.test(values.surname)) {
    //     errors.surname =
    //         'Surname invalid. No punctuation or numeric characters.';
    // }
    // else if (!checkPunctuation.test(values.surname)) {
    // 	errors.surname = "Surname invalid. No punctuation characters.";
    // }
    else if (!dashCheck.test(values.surname)) {
        errors.surname = 'Surname invalid. No punctuation or numeric characters.';
    } else if (startDash.test(values.surname)) {
        errors.surname = 'Surname invalid. Can not start with -';
    } else if (endDash.test(values.surname)) {
        errors.surname = 'Surname invalid. Can not end with -';
    }

    // validation for date in DOB
    if (!values.dateDOB || values.dateDOB === 0) {
        errors.dateDOB = 'Please choose a Day';
    }

    // validation for month in DOB
    if (!values.monthDOB || values.monthDOB === 0) {
        errors.monthDOB = 'Please choose a Month';
    }

    // validation for year in DOB
    if (!values.yearDOB || values.yearDOB === 0) {
        errors.yearDOB = 'Please choose a Year';
    }

    if (values.yearDOB !== 0 && values.monthDOB !== 0 && values.dateDOB !== 0) {
        const date = new Date(YEARS[values.yearDOB - 1], values.monthDOB - 1, values.dateDOB);
        const age = moment().diff(date, 'years');
        if (age < 18) {
            errors.yearDOB = 'Users must be over 18';
        }
    }

    // validation for email
    if (!values.email) {
        errors.email = 'Email is required';
    } else if (!isValidEmail.test(values.email) || !isValidEmailAlt.test(values.email)) {
        errors.email = 'Please enter a valid email';
    } else if (values.email !== validEmail) {
        // call the API to validate email
        try {
            const response = await fetch(`${process.env.server}/user/checkEmail`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    XAPIGTO: process.env.APP_BRAND.toUpperCase(),
                },
                body: JSON.stringify({ email: values.email }),
            });

            const isEmailValid = await response.json();
            if (+isEmailValid !== 0) {
                // error, email already exists
                errors.email = 'Email address already exists. Enter a different email address.';
            } else {
                setValidEmail(values.email);
            }
        } catch (e) {
            errors.email = 'Unable to validate Email - Network Error, please try again later';
            console.log('Unable to verify Email');
        }
    }

    // validation for mobile number
    // FORMVALIDATEHERE
    if (!values.mobile) {
        errors.mobile = 'Mobile number is required';
    } else if (values.country === 'Australia' && (values.mobile.length < 10 || values.mobile.length > 20)) {
        errors.mobile = 'Please enter a valid mobile';
    } else if (!isInteger.test(values.mobile)) {
        errors.mobile = 'Please enter a valid mobile';
    } else if (values.country !== 'Australia' && !mobileRegOT.test(values.mobile)) {
        errors.mobile = 'Please enter a valid mobile';
    } else if (values.country === 'Australia' && !mobileReg.test(values.mobile)) {
        errors.mobile = 'Please enter a valid mobile';
    }
    // } else if (client == 'gto' && values.mobile !== validMobile) {
    //     // call the API to validate Mobile

    //     try {
    //         const response = await fetch(
    //             `${process.env.server}/user/checkmobile`,
    //             {
    //                 method: 'POST',
    //                 mode: 'cors',
    //                 headers: {
    //                     Accept: 'application/json',
    //                     'Content-Type': 'application/json',
    //                     XAPIGTO: process.env.APP_BRAND.toUpperCase(),
    //                 },
    //                 body: JSON.stringify({ mobile: values.mobile }),
    //             }
    //         );

    //         const isMobileValid = await response.json();
    //         console.log(isMobileValid);
    //         if (!isMobileValid.SUCCESS) {
    //             // error, email already exists
    //             errors.mobile =
    //                 'Mobile already exists. Enter a different mobile.';
    //         } else {
    //             setValidMobile(values.mobile);
    //         }

    //         console.log(isMobileValid);
    //     } catch (e) {
    //         errors.mobile =
    //             'Unable to validate Mobile - Network Error, please try again later';
    //         console.log('Unable to verify Mobile');
    //     }
    // }

    if (client == 'gto' || client == 'eb') {
        // validation for state
        if (!values.state || values.state === 0) {
            errors.state = 'Select state.';
        }

        // validation for country
        if (!values.country || values.country === 0) {
            errors.country = 'Required';
        }

        if (buyTips) {
            // all the validation for appartment no, street no, street name and street type goes here
            // validation for appartment number, not required
            // if (!values.aptNo) {
            // 	errors.aptNo = "Required";
            // }
        }

        if (client !== 'gto') {
            // Usman - Tuesday 14th June, Moved validation out of buyTips for QASAddress.
            if (!values.stNo) {
                errors.stNo = 'Required';
            }

            if (!values.stName) {
                errors.stName = 'Required';
            }

            // validation for Street Type
            if (!values.stType || values.stType === 0) {
                errors.stType = 'Required';
            }

            if (!values.locality) {
                errors.locality = 'Required';
            } else if (!isValidWordHyphen.test(values.locality)) {
                errors.locality = 'Suburb invalid. No punctuation or numeric characters.';
            }

            // validation for psotcode
            // && conidtion is required where country is AU
            if (!values.postcode && values.country === 'Australia') {
                errors.postcode = 'Postcode required';
            } else if (values.state && values.state !== 9 && values.postcode.length < 4) {
                errors.postcode = 'Invalid postcode';
            } else if (!isInteger.test(values.postcode)) {
                errors.postcode = 'Invalid postcode.';
            }
        }
    }

    if (client !== 'gto') {
        if (values.depositLimit == null) {
            errors.depositLimit = `Please select whether you'd like to set a deposit limit.`;
        }

        if (values.depositLimit && !isInteger.test(values.depositAmount)) {
            errors.depositAmount = 'Numbers only';
        }

        if (values.depositLimit && values.depositPeriod == 0) {
            errors.depositPeriod = 'Select period';
        }
    }

    return errors;
};

export const SUBMIT_FORM = async () => { };

// List of street types being used in Street Type select menu
// export const STREET_TYPE = [
//     'ACCESS',
//     'ALLEY',
//     'Avenue',
//     'Boulevard',
//     'Drive',
//     'Circuit',
//     'Close',
//     'Cresent',
//     'Court',
//     'Highway',
//     'Lane',
//     'Loop',
//     'Place',
//     'Point',
//     'Parade',
//     'Terrace',
//     'Way',
//     'The Ridge',
//     'Bend',
//     'Square',
//     'Other',
// ];

export const STREET_TYPE = [
    'ACCESS',
    'ALLEY',
    'ALLEYWAY',
    'AMBLE',
    'ANCHORAGE',
    'APPROACH',
    'ARCADE',
    'ARTERY',
    'AVENUE',
    'BASIN',
    'BEACH',
    'BEND',
    'BLOCK',
    'BOULEVARD',
    'BRACE',
    'BRAE',
    'BREAK',
    'BRIDGE',
    'BROADWAY',
    'BROW',
    'BYPASS',
    'BYWAY',
    'CAUSEWAY',
    'CENTRE',
    'CENTREWAY',
    'CHASE',
    'CIRCLE',
    'CIRCLET',
    'CIRCUIT',
    'CIRCUS',
    'CLOSE',
    'COLONNADE',
    'COMMON',
    'CONCOURSE',
    'COPSE',
    'CORNER',
    'CORSO',
    'COURT',
    'COURTYARD',
    'COVE',
    'CRESCENT',
    'CREST',
    'CROSS',
    'CROSSING',
    'CROSSROAD',
    'CROSSWAY',
    'CRUISEWAY',
    'CUL-DE-SAC',
    'CUTTING',
    'DALE',
    'DELL',
    'DEVIATION',
    'DIP',
    'DISTRIBUTOR',
    'DRIVE',
    'DRIVEWAY',
    'EDGE',
    'ELBOW',
    'END',
    'ENTRANCE',
    'ESPLANADE',
    'ESTATE',
    'EXPRESSWAY',
    'EXTENSION',
    'FAIRWAY',
    'FIRE TRACK',
    'FIRETRAIL',
    'FLAT',
    'FOLLOW',
    'FOOTWAY',
    'FORESHORE',
    'FORMATION',
    'FREEWAY',
    'FRONT',
    'FRONTAGE',
    'GAP',
    'GARDEN',
    'GATE',
    'GARDENS',
    'GATES',
    'GLADE',
    'GLEN',
    'GRANGE',
    'GREEN',
    'GROUND',
    'GROVE',
    'GULLY',
    'HEIGHTS',
    'HIGHROAD',
    'HIGHWAY',
    'HILL',
    'INTERCHANGE',
    'INTERSECTION',
    'JUNCTION',
    'KEY',
    'LANDING',
    'LANE',
    'LANEWAY',
    'LEES',
    'LINE',
    'LINK',
    'LITTLE',
    'LOOKOUT',
    'LOOP',
    'LOWER',
    'MALL',
    'MEANDER',
    'MEW',
    'MEWS',
    'MOTORWAY',
    'MOUNT',
    'NOOK',
    'OUTLOOK',
    'PARADE',
    'PARK',
    'PARKLANDS',
    'PARKWAY',
    'PART',
    'PASS',
    'PATH',
    'PATHWAY',
    'PIAZZA',
    'PLACE',
    'PLATEAU',
    'PLAZA',
    'POCKET',
    'POINT',
    'PORT',
    'PROMENADE',
    'QUAD',
    'QUADRANGLE',
    'QUADRANT',
    'QUAY',
    'QUAYS',
    'RAMBLE',
    'RAMP',
    'RANGE',
    'REACH',
    'RESERVE',
    'REST',
    'RETREAT',
    'RIDE',
    'RIDGE',
    'RIDGEWAY',
    'RIGHT OF WAY',
    'RING',
    'RISE',
    'RIVER',
    'RIVERWAY',
    'RIVIERA',
    'ROAD',
    'ROADS',
    'ROADSIDE',
    'ROADWAY',
    'RONDE',
    'ROSEBOWL',
    'ROTARY',
    'ROUND',
    'ROUTE',
    'ROW',
    'RUE',
    'RUN',
    'SERVICE WAY',
    'SIDING',
    'SLOPE',
    'SOUND',
    'SPUR',
    'SQUARE',
    'STAIRS',
    'STATE HIGHWAY',
    'STEPS',
    'STRAND',
    'STREET',
    'STRIP',
    'SUBWAY',
    'TARN',
    'TERRACE',
    'THOROUGHFARE',
    'TOLLWAY',
    'TOP',
    'TOR',
    'TOWERS',
    'TRACK',
    'TRAIL',
    'TRAILER',
    'TRIANGLE',
    'TRUNKWAY',
    'TURN',
    'UNDERPASS',
    'UPPER',
    'VALE',
    'VIADUCT',
    'VIEW',
    'VILLAS',
    'VISTA',
    'WADE',
    'WALK',
    'WALKWAY',
    'WAY',
    'WHARF',
    'WYND',
    'YARD',
    'OTHER',
];

export const STREET_TYPE2 = [
    { value: 'ACCS', label: 'ACCESS' },
    { value: 'ALLY', label: 'ALLEY' },
    { value: 'ALWY', label: 'ALLEYWAY' },
    { value: 'AMBL', label: 'AMBLE' },
    { value: 'ANCG', label: 'ANCHORAGE' },
    { value: 'APP', label: 'APPROACH' },
    { value: 'ARC', label: 'ARCADE' },
    { value: 'ART', label: 'ARTERY' },
    { value: 'AVE', label: 'AVENUE' },
    { value: 'BASN', label: 'BASIN' },
    { value: 'BCH', label: 'BEACH' },
    { value: 'BEND', label: 'BEND' },
    { value: 'BLK', label: 'BLOCK' },
    { value: 'BVD', label: 'BOULEVARD' },
    { value: 'BRCE', label: 'BRACE' },
    { value: 'BRAE', label: 'BRAE' },
    { value: 'BRK', label: 'BREAK' },
    { value: 'BDGE', label: 'BRIDGE' },
    { value: 'BDWY', label: 'BROADWAY' },
    { value: 'BROW', label: 'BROW' },
    { value: 'BYPA', label: 'BYPASS' },
    { value: 'BYWY', label: 'BYWAY' },
    { value: 'CAUS', label: 'CAUSEWAY' },
    { value: 'CTR', label: 'CENTRE' },
    { value: 'CNWY', label: 'CENTREWAY' },
    { value: 'CH', label: 'CHASE' },
    { value: 'CIR', label: 'CIRCLE' },
    { value: 'CLT', label: 'CIRCLET' },
    { value: 'CCT', label: 'CIRCUIT' },
    { value: 'CRCS', label: 'CIRCUS' },
    { value: 'CL', label: 'CLOSE' },
    { value: 'CLDE', label: 'COLONNADE' },
    { value: 'CMMN', label: 'COMMON' },
    { value: 'CON', label: 'CONCOURSE' },
    { value: 'CPS', label: 'COPSE' },
    { value: 'CNR', label: 'CORNER' },
    { value: 'CSO', label: 'CORSO' },
    { value: 'CT', label: 'COURT' },
    { value: 'CTYD', label: 'COURTYARD' },
    { value: 'COVE', label: 'COVE' },
    { value: 'CRES', label: 'CRESCENT' },
    { value: 'CRST', label: 'CREST' },
    { value: 'CRSS', label: 'CROSS' },
    { value: 'CRSG', label: 'CROSSING' },
    { value: 'CRD', label: 'CROSSROAD' },
    { value: 'COWY', label: 'CROSSWAY' },
    { value: 'CUWY', label: 'CRUISEWAY' },
    { value: 'CDS', label: 'CUL-DE-SAC' },
    { value: 'CTTG', label: 'CUTTING' },
    { value: 'DALE', label: 'DALE' },
    { value: 'DELL', label: 'DELL' },
    { value: 'DEVN', label: 'DEVIATION' },
    { value: 'DIP', label: 'DIP' },
    { value: 'DSTR', label: 'DISTRIBUTOR' },
    { value: 'DR', label: 'DRIVE' },
    { value: 'DRWY', label: 'DRIVEWAY' },
    { value: 'EDGE', label: 'EDGE' },
    { value: 'ELB', label: 'ELBOW' },
    { value: 'END', label: 'END' },
    { value: 'ENT', label: 'ENTRANCE' },
    { value: 'ESP', label: 'ESPLANADE' },
    { value: 'ESP', label: 'ESTATE' },
    { value: 'EXP', label: 'EXPRESSWAY' },
    { value: 'EXTN', label: 'EXTENSION' },
    { value: 'FAWY', label: 'FAIRWAY' },
    { value: 'FTRK', label: 'FIRE TRACK' },
    { value: 'FITR', label: 'FIRETRAIL' },
    { value: 'FLAT', label: 'FLAT' },
    { value: 'FOLW', label: 'FOLLOW' },
    { value: 'FTWY', label: 'FOOTWAY' },
    { value: 'FSHR', label: 'FORESHORE' },
    { value: 'FORM', label: 'FORMATION' },
    { value: 'FWY', label: 'FREEWAY' },
    { value: 'FRNT', label: 'FRONT' },
    { value: 'FRTG', label: 'FRONTAGE' },
    { value: 'GAP', label: 'GAP' },
    { value: 'GDN', label: 'GARDEN' },
    { value: 'GTE', label: 'GATE' },
    { value: 'GDNS', label: 'GARDENS' },
    { value: 'GTES', label: 'GATES' },
    { value: 'GLD', label: 'GLADE' },
    { value: 'GLEN', label: 'GLEN' },
    { value: 'GRA', label: 'GRANGE' },
    { value: 'GRN', label: 'GREEN' },
    { value: 'GRND', label: 'GROUND' },
    { value: 'GR', label: 'GROVE' },
    { value: 'GLY', label: 'GULLY' },
    { value: 'HTS', label: 'HEIGHTS' },
    { value: 'HRD', label: 'HIGHROAD' },
    { value: 'HWY', label: 'HIGHWAY' },
    { value: 'HILL', label: 'HILL' },
    { value: 'INTG', label: 'INTERCHANGE' },
    { value: 'INTN', label: 'INTERSECTION' },
    { value: 'JNC', label: 'JUNCTION' },
    { value: 'KEY', label: 'KEY' },
    { value: 'LDG', label: 'LANDING' },
    { value: 'LANE', label: 'LANE' },
    { value: 'LNWY', label: 'LANEWAY' },
    { value: 'LEES', label: 'LEES' },
    { value: 'LINE', label: 'LINE' },
    { value: 'LINK', label: 'LINK' },
    { value: 'LT', label: 'LITTLE' },
    { value: 'LKT', label: 'LOOKOUT' },
    { value: 'LOOP', label: 'LOOP' },
    { value: 'LWR', label: 'LOWER' },
    { value: 'MALL', label: 'MALL' },
    { value: 'MNDR', label: 'MEANDER' },
    { value: 'MEW', label: 'MEW' },
    { value: 'MEWS', label: 'MEWS' },
    { value: 'MWY', label: 'MOTORWAY' },
    { value: 'MT', label: 'MOUNT' },
    { value: 'NOOK', label: 'NOOK' },
    { value: 'OTLK', label: 'OUTLOOK' },
    { value: 'PDE', label: 'PARADE' },
    { value: 'PARK', label: 'PARK' },
    { value: 'PKLD', label: 'PARKLANDS' },
    { value: 'PKWY', label: 'PARKWAY' },
    { value: 'PART', label: 'PART' },
    { value: 'PASS', label: 'PASS' },
    { value: 'PATH', label: 'PATH' },
    { value: 'PHWY', label: 'PATHWAY' },
    { value: 'PIAZ', label: 'PIAZZA' },
    { value: 'PL', label: 'PLACE' },
    { value: 'PLAT', label: 'PLATEAU' },
    { value: 'PLZA', label: 'PLAZA' },
    { value: 'PKT', label: 'POCKET' },
    { value: 'PNT', label: 'POINT' },
    { value: 'PORT', label: 'PORT' },
    { value: 'PROM', label: 'PROMENADE' },
    { value: 'QUAD', label: 'QUAD' },
    { value: 'QDGL', label: 'QUADRANGLE' },
    { value: 'QDRT', label: 'QUADRANT' },
    { value: 'QY', label: 'QUAY' },
    { value: 'QYS', label: 'QUAYS' },
    { value: 'RMBL', label: 'RAMBLE' },
    { value: 'RAMP', label: 'RAMP' },
    { value: 'RNGE', label: 'RANGE' },
    { value: 'RCH', label: 'REACH' },
    { value: 'RES', label: 'RESERVE' },
    { value: 'REST', label: 'REST' },
    { value: 'RTT', label: 'RETREAT' },
    { value: 'RIDE', label: 'RIDE' },
    { value: 'RDGE', label: 'RIDGE' },
    { value: 'RGWY', label: 'RIDGEWAY' },
    { value: 'ROWY', label: 'RIGHT OF WAY' },
    { value: 'RING', label: 'RING' },
    { value: 'RISE', label: 'RISE' },
    { value: 'RVR', label: 'RIVER' },
    { value: 'RVWY', label: 'RIVERWAY' },
    { value: 'RVRA', label: 'RIVIERA' },
    { value: 'RD', label: 'ROAD' },
    { value: 'RDS', label: 'ROADS' },
    { value: 'RDSD', label: 'ROADSIDE' },
    { value: 'RDWY', label: 'ROADWAY' },
    { value: 'RNDE', label: 'RONDE' },
    { value: 'RSBL', label: 'ROSEBOWL' },
    { value: 'RTY', label: 'ROTARY' },
    { value: 'RND', label: 'ROUND' },
    { value: 'RTE', label: 'ROUTE' },
    { value: 'ROW', label: 'ROW' },
    { value: 'RUE', label: 'RUE' },
    { value: 'RUN', label: 'RUN' },
    { value: 'SWY', label: 'SERVICE WAY' },
    { value: 'SDNG', label: 'SIDING' },
    { value: 'SLPE', label: 'SLOPE' },
    { value: 'SND', label: 'SOUND' },
    { value: 'SPUR', label: 'SPUR' },
    { value: 'SQ', label: 'SQUARE' },
    { value: 'STRS', label: 'STAIRS' },
    { value: 'SHWY', label: 'STATE HIGHWAY' },
    { value: 'STPS', label: 'STEPS' },
    { value: 'STRA', label: 'STRAND' },
    { value: 'ST', label: 'STREET' },
    { value: 'STRIP', label: 'STRIP' },
    { value: 'SBWY', label: 'SUBWAY' },
    { value: 'TRAN', label: 'TARN' },
    { value: 'TCE', label: 'TERRACE' },
    { value: 'THOR', label: 'THOROUGHFARE' },
    { value: 'TLWY', label: 'TOLLWAY' },
    { value: 'TOP', label: 'TOP' },
    { value: 'TOR', label: 'TOR' },
    { value: 'TWRS', label: 'TOWERS' },
    { value: 'TRK', label: 'TRACK' },
    { value: 'TRL', label: 'TRAIL' },
    { value: 'TRLR', label: 'TRAILER' },
    { value: 'TRI', label: 'TRIANGLE' },
    { value: 'TKWY', label: 'TRUNKWAY' },
    { value: 'TURN', label: 'TURN' },
    { value: 'UPAS', label: 'UNDERPASS' },
    { value: 'UPR', label: 'UPPER' },
    { value: 'VALE', label: 'VALE' },
    { value: 'VDCT', label: 'VIADUCT' },
    { value: 'VIEW', label: 'VIEW' },
    { value: 'VILS', label: 'VILLAS' },
    { value: 'VSTA', label: 'VISTA' },
    { value: 'WADE', label: 'WADE' },
    { value: 'WALK', label: 'WALK' },
    { value: 'WKWY', label: 'WALKWAY' },
    { value: 'WAY', label: 'WAY' },
    { value: 'WHRF', label: 'WHARF' },
    { value: 'WYND', label: 'WYND' },
    { value: 'YARD', label: 'YARD' },
    { value: 'OTHER', label: 'OTHER' },
];

// export const STREET_TYPE2 = [
//     { value: 'AVE', label: 'Avenue' },
//     { value: 'CCT', label: 'Circuit' },
//     { value: 'CL', label: 'Close' },
//     { value: 'CT', label: 'Court' },
//     { value: 'CRES', label: 'Crescent' },
//     { value: 'DR', label: 'Drive' },
//     { value: 'ESP', label: 'Esplanade' },
//     { value: 'HWY', label: 'Highway' },
//     { value: 'LANE', label: 'Lane' },
//     { value: 'PDE', label: 'Parade' },
//     { value: 'PL', label: 'Place' },
//     { value: 'PT', label: 'Point' },
//     { value: 'PNT', label: 'Point' },
//     { value: 'Point', label: 'Point' },
//     { value: 'RD', label: 'Road' },
//     { value: 'SQ', label: 'Square' },
//     { value: 'ST', label: 'Street' },
//     { value: 'TCE', label: 'Terrace' },
//     { value: 'WALK', label: 'Walk' },
//     { value: 'WAY', label: 'Way' },
//     { value: 'OTHER', label: 'Other' },
// ];

export const COUNTRIES2 = [
    { label: 'Australia', value: 'AU' },
    { label: 'New Zealand', value: 'NZ' },
];
// List of state being used in the STATE Select Menu
export const STATE = ['NSW', 'VIC', 'QLD', 'SA', 'TAS', 'ACT', 'NT', 'WA', 'Other'];

export const COUNTRIES_CODES = [
    {
        value: 'AD',
        label: 'ANDORRA',
    },
    {
        value: 'AE',
        label: 'UNITED ARAB EMIRATES',
    },
    {
        value: 'AF',
        label: 'AFGHANISTAN',
    },
    {
        value: 'AG',
        label: 'ANTIGUA AND BARBUDA',
    },
    {
        value: 'AI',
        label: 'ANGUILLA',
    },
    {
        value: 'AL',
        label: 'ALBANIA',
    },
    {
        value: 'AM',
        label: 'ARMENIA',
    },
    {
        value: 'AN',
        label: 'NETHERLANDS ANTILLES',
    },
    {
        value: 'AO',
        label: 'ANGOLA',
    },
    {
        value: 'AQ',
        label: 'ANTARCTICA',
    },
    {
        value: 'AR',
        label: 'ARGENTINA',
    },
    {
        value: 'AS',
        label: 'AMERICAN SAMOA',
    },
    {
        value: 'AT',
        label: 'AUSTRIA',
    },
    {
        value: 'AU',
        label: 'AUSTRALIA',
    },
    {
        value: 'AW',
        label: 'ARUBA',
    },
    {
        value: 'AX',
        label: 'ÅLAND ISLANDS',
    },
    {
        value: 'AZ',
        label: 'AZERBAIJAN',
    },
    {
        value: 'BA',
        label: 'BOSNIA AND HERZEGOVINA',
    },
    {
        value: 'BB',
        label: 'BARBADOS',
    },
    {
        value: 'BD',
        label: 'BANGLADESH',
    },
    {
        value: 'BE',
        label: 'BELGIUM',
    },
    {
        value: 'BF',
        label: 'BURKINA FASO',
    },
    {
        value: 'BG',
        label: 'BULGARIA',
    },
    {
        value: 'BH',
        label: 'BAHRAIN',
    },
    {
        value: 'BI',
        label: 'BURUNDI',
    },
    {
        value: 'BJ',
        label: 'BENIN',
    },
    {
        value: 'BL',
        label: 'SAINT BARTHÉLEMY',
    },
    {
        value: 'BM',
        label: 'BERMUDA',
    },
    {
        value: 'BN',
        label: 'BRUNEI DARUSSALAM',
    },
    {
        value: 'BO',
        label: 'BOLIVIA  PLURINATIONAL STATE OF',
    },
    {
        value: 'BR',
        label: 'BRAZIL',
    },
    {
        value: 'BS',
        label: 'BAHAMAS',
    },
    {
        value: 'BT',
        label: 'BHUTAN',
    },
    {
        value: 'BV',
        label: 'BOUVET ISLAND',
    },
    {
        value: 'BW',
        label: 'BOTSWANA',
    },
    {
        value: 'BY',
        label: 'BELARUS',
    },
    {
        value: 'BZ',
        label: 'BELIZE',
    },
    {
        value: 'CA',
        label: 'CANADA',
    },
    {
        value: 'CC',
        label: 'COCOS (KEELING) ISLANDS',
    },
    {
        value: 'CD',
        label: 'CONGO  THE DEMOCRATIC REPUBLIC OF THE',
    },
    {
        value: 'CF',
        label: 'CENTRAL AFRICAN REPUBLIC',
    },
    {
        value: 'CG',
        label: 'CONGO',
    },
    {
        value: 'CH',
        label: 'SWITZERLAND',
    },
    {
        value: 'CI',
        label: "CÔTE D'IVOIRE",
    },
    {
        value: 'CK',
        label: 'COOK ISLANDS',
    },
    {
        value: 'CL',
        label: 'CHILE',
    },
    {
        value: 'CM',
        label: 'CAMEROON',
    },
    {
        value: 'CN',
        label: 'CHINA',
    },
    {
        value: 'CO',
        label: 'COLOMBIA',
    },
    {
        value: 'CR',
        label: 'COSTA RICA',
    },
    {
        value: 'CU',
        label: 'CUBA',
    },
    {
        value: 'CV',
        label: 'CAPE VERDE',
    },
    {
        value: 'CX',
        label: 'CHRISTMAS ISLAND',
    },
    {
        value: 'CY',
        label: 'CYPRUS',
    },
    {
        value: 'CZ',
        label: 'CZECH REPUBLIC',
    },
    {
        value: 'DE',
        label: 'GERMANY',
    },
    {
        value: 'DJ',
        label: 'DJIBOUTI',
    },
    {
        value: 'DK',
        label: 'DENMARK',
    },
    {
        value: 'DM',
        label: 'DOMINICA',
    },
    {
        value: 'DO',
        label: 'DOMINICAN REPUBLIC',
    },
    {
        value: 'DZ',
        label: 'ALGERIA',
    },
    {
        value: 'EC',
        label: 'ECUADOR',
    },
    {
        value: 'EE',
        label: 'ESTONIA',
    },
    {
        value: 'EG',
        label: 'EGYPT',
    },
    {
        value: 'EH',
        label: 'WESTERN SAHARA',
    },
    {
        value: 'ER',
        label: 'ERITREA',
    },
    {
        value: 'ES',
        label: 'SPAIN',
    },
    {
        value: 'ET',
        label: 'ETHIOPIA',
    },
    {
        value: 'FI',
        label: 'FINLAND',
    },
    {
        value: 'FJ',
        label: 'FIJI',
    },
    {
        value: 'FK',
        label: 'FALKLAND ISLANDS (MALVINAS)',
    },
    {
        value: 'FM',
        label: 'MICRONESIA    FEDERATED STATES OF',
    },
    {
        value: 'FO',
        label: 'FAROE ISLANDS',
    },
    {
        value: 'FR',
        label: 'FRANCE',
    },
    {
        value: 'GA',
        label: 'GABON',
    },
    {
        value: 'GB',
        label: 'UNITED KINGDOM',
    },
    {
        value: 'GD',
        label: 'GRENADA',
    },
    {
        value: 'GE',
        label: 'GEORGIA',
    },
    {
        value: 'GF',
        label: 'FRENCH GUIANA',
    },
    {
        value: 'GG',
        label: 'GUERNSEY',
    },
    {
        value: 'GH',
        label: 'GHANA',
    },
    {
        value: 'GI',
        label: 'GIBRALTAR',
    },
    {
        value: 'GL',
        label: 'GREENLAND',
    },
    {
        value: 'GM',
        label: 'GAMBIA',
    },
    {
        value: 'GN',
        label: 'GUINEA',
    },
    {
        value: 'GP',
        label: 'GUADELOUPE',
    },
    {
        value: 'GQ',
        label: 'EQUATORIAL GUINEA',
    },
    {
        value: 'GR',
        label: 'GREECE',
    },
    {
        value: 'GS',
        label: 'SOUTH GEORGIA AND THE SOUTH SANDWICH ISLANDS',
    },
    {
        value: 'GT',
        label: 'GUATEMALA',
    },
    {
        value: 'GU',
        label: 'GUAM',
    },
    {
        value: 'GW',
        label: 'GUINEA-BISSAU',
    },
    {
        value: 'GY',
        label: 'GUYANA',
    },
    {
        value: 'HK',
        label: 'HONG KONG',
    },
    {
        value: 'HM',
        label: 'HEARD ISLAND AND MCDONALD ISLANDS',
    },
    {
        value: 'HN',
        label: 'HONDURAS',
    },
    {
        value: 'HR',
        label: 'CROATIA',
    },
    {
        value: 'HT',
        label: 'HAITI',
    },
    {
        value: 'HU',
        label: 'HUNGARY',
    },
    {
        value: 'ID',
        label: 'INDONESIA',
    },
    {
        value: 'IE',
        label: 'IRELAND',
    },
    {
        value: 'IL',
        label: 'ISRAEL',
    },
    {
        value: 'IM',
        label: 'ISLE OF MAN',
    },
    {
        value: 'IN',
        label: 'INDIA',
    },
    {
        value: 'IO',
        label: 'BRITISH INDIAN OCEAN TERRITORY',
    },
    {
        value: 'IQ',
        label: 'IRAQ',
    },
    {
        value: 'IR',
        label: 'IRAN  ISLAMIC REPUBLIC OF',
    },
    {
        value: 'IS',
        label: 'ICELAND',
    },
    {
        value: 'IT',
        label: 'ITALY',
    },
    {
        value: 'JE',
        label: 'JERSEY',
    },
    {
        value: 'JM',
        label: 'JAMAICA',
    },
    {
        value: 'JO',
        label: 'JORDAN',
    },
    {
        value: 'JP',
        label: 'JAPAN',
    },
    {
        value: 'KE',
        label: 'KENYA',
    },
    {
        value: 'KG',
        label: 'KYRGYZSTAN',
    },
    {
        value: 'KH',
        label: 'CAMBODIA',
    },
    {
        value: 'KI',
        label: 'KIRIBATI',
    },
    {
        value: 'KM',
        label: 'COMOROS',
    },
    {
        value: 'KN',
        label: 'SAINT KITTS AND NEVIS',
    },
    {
        value: 'KP',
        label: 'KOREA',
    },
    {
        value: 'KR',
        label: 'KOREA REPUBLIC OF',
    },
    {
        value: 'KW',
        label: 'KUWAIT',
    },
    {
        value: 'KY',
        label: 'CAYMAN ISLANDS',
    },
    {
        value: 'KZ',
        label: 'KAZAKHSTAN',
    },
    {
        value: 'LA',
        label: "LAO PEOPLE'S DEMOCRATIC REPUBLIC",
    },
    {
        value: 'LB',
        label: 'LEBANON',
    },
    {
        value: 'LC',
        label: 'SAINT LUCIA',
    },
    {
        value: 'LI',
        label: 'LIECHTENSTEIN',
    },
    {
        value: 'LK',
        label: 'SRI LANKA',
    },
    {
        value: 'LR',
        label: 'LIBERIA',
    },
    {
        value: 'LS',
        label: 'LESOTHO',
    },
    {
        value: 'LT',
        label: 'LITHUANIA',
    },
    {
        value: 'LU',
        label: 'LUXEMBOURG',
    },
    {
        value: 'LV',
        label: 'LATVIA',
    },
    {
        value: 'LY',
        label: 'LIBYAN ARAB JAMAHIRIYA',
    },
    {
        value: 'MA',
        label: 'MOROCCO',
    },
    {
        value: 'MC',
        label: 'MONACO',
    },
    {
        value: 'MD',
        label: 'MOLDOVA    REPUBLIC OF',
    },
    {
        value: 'ME',
        label: 'MONTENEGRO',
    },
    {
        value: 'MF',
        label: 'SAINT MARTIN',
    },
    {
        value: 'MG',
        label: 'MADAGASCAR',
    },
    {
        value: 'MH',
        label: 'MARSHALL ISLANDS',
    },
    {
        value: 'MK',
        label: 'MACEDONIA    THE FORMER YUGOSLAV REPUBLIC OF',
    },
    {
        value: 'ML',
        label: 'MALI',
    },
    {
        value: 'MM',
        label: 'MYANMAR',
    },
    {
        value: 'MN',
        label: 'MONGOLIA',
    },
    {
        value: 'MO',
        label: 'MACAO',
    },
    {
        value: 'MP',
        label: 'NORTHERN MARIANA ISLANDS',
    },
    {
        value: 'MQ',
        label: 'MARTINIQUE',
    },
    {
        value: 'MR',
        label: 'MAURITANIA',
    },
    {
        value: 'MS',
        label: 'MONTSERRAT',
    },
    {
        value: 'MT',
        label: 'MALTA',
    },
    {
        value: 'MU',
        label: 'MAURITIUS',
    },
    {
        value: 'MV',
        label: 'MALDIVES',
    },
    {
        value: 'MW',
        label: 'MALAWI',
    },
    {
        value: 'MX',
        label: 'MEXICO',
    },
    {
        value: 'MY',
        label: 'MALAYSIA',
    },
    {
        value: 'MZ',
        label: 'MOZAMBIQUE',
    },
    {
        value: 'NA',
        label: 'NAMIBIA',
    },
    {
        value: 'NC',
        label: 'NEW CALEDONIA',
    },
    {
        value: 'NE',
        label: 'NIGER',
    },
    {
        value: 'NF',
        label: 'NORFOLK ISLAND',
    },
    {
        value: 'NG',
        label: 'NIGERIA',
    },
    {
        value: 'NI',
        label: 'NICARAGUA',
    },
    {
        value: 'NL',
        label: 'NETHERLANDS',
    },
    {
        value: 'NO',
        label: 'NORWAY',
    },
    {
        value: 'NP',
        label: 'NEPAL',
    },
    {
        value: 'NR',
        label: 'NAURU',
    },
    {
        value: 'NU',
        label: 'NIUE',
    },
    {
        value: 'NZ',
        label: 'NEW ZEALAND',
    },
    {
        value: 'OM',
        label: 'OMAN',
    },
    {
        value: 'PA',
        label: 'PANAMA',
    },
    {
        value: 'PE',
        label: 'PERU',
    },
    {
        value: 'PF',
        label: 'FRENCH POLYNESIA',
    },
    {
        value: 'PG',
        label: 'PAPUA NEW GUINEA',
    },
    {
        value: 'PH',
        label: 'PHILIPPINES',
    },
    {
        value: 'PK',
        label: 'PAKISTAN',
    },
    {
        value: 'PL',
        label: 'POLAND',
    },
    {
        value: 'PM',
        label: 'SAINT PIERRE AND MIQUELON',
    },
    {
        value: 'PN',
        label: 'PITCAIRN',
    },
    {
        value: 'PR',
        label: 'PUERTO RICO',
    },
    {
        value: 'PS',
        label: 'PALESTINIAN TERRITORY    OCCUPIED',
    },
    {
        value: 'PT',
        label: 'PORTUGAL',
    },
    {
        value: 'PW',
        label: 'PALAU',
    },
    {
        value: 'PY',
        label: 'PARAGUAY',
    },
    {
        value: 'QA',
        label: 'QATAR',
    },
    {
        value: 'RE',
        label: 'RÉUNION',
    },
    {
        value: 'RO',
        label: 'ROMANIA',
    },
    {
        value: 'RS',
        label: 'SERBIA',
    },
    {
        value: 'RU',
        label: 'RUSSIAN FEDERATION',
    },
    {
        value: 'RW',
        label: 'RWANDA',
    },
    {
        value: 'SA',
        label: 'SAUDI ARABIA',
    },
    {
        value: 'SB',
        label: 'SOLOMON ISLANDS',
    },
    {
        value: 'SC',
        label: 'SEYCHELLES',
    },
    {
        value: 'SD',
        label: 'SUDAN',
    },
    {
        value: 'SE',
        label: 'SWEDEN',
    },
    {
        value: 'SG',
        label: 'SINGAPORE',
    },
    {
        value: 'SH',
        label: 'SAINT HELENA',
    },
    {
        value: 'SI',
        label: 'SLOVENIA',
    },
    {
        value: 'SJ',
        label: 'SVALBARD AND JAN MAYEN',
    },
    {
        value: 'SK',
        label: 'SLOVAKIA',
    },
    {
        value: 'SL',
        label: 'SIERRA LEONE',
    },
    {
        value: 'SM',
        label: 'SAN MARINO',
    },
    {
        value: 'SN',
        label: 'SENEGAL',
    },
    {
        value: 'SO',
        label: 'SOMALIA',
    },
    {
        value: 'SR',
        label: 'SURINAME',
    },
    {
        value: 'ST',
        label: 'SAO TOME AND PRINCIPE',
    },
    {
        value: 'SV',
        label: 'EL SALVADOR',
    },
    {
        value: 'SY',
        label: 'SYRIAN ARAB REPUBLIC',
    },
    {
        value: 'SZ',
        label: 'SWAZILAND',
    },
    {
        value: 'TC',
        label: 'TURKS AND CAICOS ISLANDS',
    },
    {
        value: 'TD',
        label: 'CHAD',
    },
    {
        value: 'TF',
        label: 'FRENCH SOUTHERN TERRITORIES',
    },
    {
        value: 'TG',
        label: 'TOGO',
    },
    {
        value: 'TH',
        label: 'THAILAND',
    },
    {
        value: 'TJ',
        label: 'TAJIKISTAN',
    },
    {
        value: 'TK',
        label: 'TOKELAU',
    },
    {
        value: 'TL',
        label: 'TIMOR-LESTE',
    },
    {
        value: 'TM',
        label: 'TURKMENISTAN',
    },
    {
        value: 'TN',
        label: 'TUNISIA',
    },
    {
        value: 'TO',
        label: 'TONGA',
    },
    {
        value: 'TR',
        label: 'TURKEY',
    },
    {
        value: 'TT',
        label: 'TRINIDAD AND TOBAGO',
    },
    {
        value: 'TV',
        label: 'TUVALU',
    },
    {
        value: 'TW',
        label: 'TAIWAN    PROVINCE OF CHINA',
    },
    {
        value: 'TZ',
        label: 'TANZANIA    UNITED REPUBLIC OF',
    },
    {
        value: 'UA',
        label: 'UKRAINE',
    },
    {
        value: 'UG',
        label: 'UGANDA',
    },
    {
        value: 'UK',
        label: 'UNITED KINGDOM',
    },
    {
        value: 'UM',
        label: 'UNITED STATES MINOR OUTLYING ISLANDS',
    },
    {
        value: 'US',
        label: 'UNITED STATES',
    },
    {
        value: 'UY',
        label: 'URUGUAY',
    },
    {
        value: 'UZ',
        label: 'UZBEKISTAN',
    },
    {
        value: 'VA',
        label: 'HOLY SEE (VATICAN CITY STATE)',
    },
    {
        value: 'VC',
        label: 'SAINT VINCENT AND THE GRENADINES',
    },
    {
        value: 'VE',
        label: 'VENEZUELA    BOLIVARIAN REPUBLIC OF',
    },
    {
        value: 'VG',
        label: 'VIRGIN ISLANDS    BRITISH',
    },
    {
        value: 'VI',
        label: 'VIRGIN ISLANDS    U.S.',
    },
    {
        value: 'VN',
        label: 'VIET NAM',
    },
    {
        value: 'VU',
        label: 'VANUATU',
    },
    {
        value: 'WA',
        label: 'WALES',
    },
    {
        value: 'WF',
        label: 'WALLIS AND FUTUNA',
    },
    {
        value: 'WS',
        label: 'SAMOA',
    },
    {
        value: 'YE',
        label: 'YEMEN',
    },
    {
        value: 'YT',
        label: 'MAYOTTE',
    },
    {
        value: 'ZA',
        label: 'SOUTH AFRICA',
    },
    {
        value: 'ZM',
        label: 'ZAMBIA',
    },
    {
        value: 'ZW',
        label: 'ZIMBABWE',
    },
];

export const TITLE_USER = ['Mr', 'Mrs', 'Miss', 'Ms', 'Dr'];
export const COUNTRIES = [
    'Afghanistan',
    'Albania',
    'Algeria',
    'Andorra',
    'Angola',
    'Antigua and Barbuda',
    'Argentina',
    'Armenia',
    'Australia',
    'Austria',
    'Azerbaijan',
    'Bahamas',
    'Bahrain',
    'Bangladesh',
    'Barbados',
    'Belarus',
    'Belgium',
    'Belize',
    'Benin',
    'Bhutan',
    'Bolivia',
    'Bosnia and Herzegovina',
    'Botswana',
    'Brazil',
    'Brunei',
    'Bulgaria',
    'Burkina Faso',
    'Burundi',
    "Côte d'Ivoire",
    'Cabo Verde',
    'Cambodia',
    'Cameroon',
    'Canada',
    'Central African Republic',
    'Chad',
    'Chile',
    'China',
    'Colombia',
    'Comoros',
    'Congo(Congo - Brazzaville)',
    'Costa Rica',
    'Croatia',
    'Cuba',
    'Cyprus',
    'Czechia(Czech Republic)',
    'Democratic Republic of the Congo',
    'Denmark',
    'Djibouti',
    'Dominica',
    'Dominican Republic',
    'Ecuador',
    'Egypt',
    'El Salvador',
    'Equatorial Guinea',
    'Eritrea',
    'Estonia',
    'Eswatini(fmr. Swaziland)',
    'Ethiopia',
    'Fiji',
    'Finland',
    'France',
    'Gabon',
    'Gambia',
    'Georgia',
    'Germany',
    'Ghana',
    'Greece',
    'Grenada',
    'Guatemala',
    'Guinea',
    'Guinea - Bissau',
    'Guyana',
    'Haiti',
    'Holy See',
    'Honduras',
    'Hungary',
    'Iceland',
    'India',
    'Indonesia',
    'Iran',
    'Iraq',
    'Ireland',
    'Israel',
    'Italy',
    'Jamaica',
    'Japan',
    'Jordan',
    'Kazakhstan',
    'Kenya',
    'Kiribati',
    'Kuwait',
    'Kyrgyzstan',
    'Laos',
    'Latvia',
    'Lebanon',
    'Lesotho',
    'Liberia',
    'Libya',
    'Liechtenstein',
    'Lithuania',
    'Luxembourg',
    'Madagascar',
    'Malawi',
    'Malaysia',
    'Maldives',
    'Mali',
    'Malta',
    'Marshall Islands',
    'Mauritania',
    'Mauritius',
    'Mexico',
    'Micronesia',
    'Moldova',
    'Monaco',
    'Mongolia',
    'Montenegro',
    'Morocco',
    'Mozambique',
    'Myanmar(formerly Burma)',
    'Namibia',
    'Nauru',
    'Nepal',
    'Netherlands',
    'New Zealand',
    'Nicaragua',
    'Niger',
    'Nigeria',
    'North Korea',
    'North Macedonia',
    'Norway',
    'Oman',
    'Pakistan',
    'Palau',
    'Palestine State',
    'Panama',
    'Papua New Guinea',
    'Paraguay',
    'Peru',
    'Philippines',
    'Poland',
    'Portugal',
    'Qatar',
    'Romania',
    'Russia',
    'Rwanda',
    'Saint Kitts and Nevis',
    'Saint Lucia',
    'Saint Vincent and the Grenadines',
    'Samoa',
    'San Marino',
    'Sao Tome and Principe',
    'Saudi Arabia',
    'Senegal',
    'Serbia',
    'Seychelles',
    'Sierra Leone',
    'Singapore',
    'Slovakia',
    'Slovenia',
    'Solomon Islands',
    'Somalia',
    'South Africa',
    'South Korea',
    'South Sudan',
    'Spain',
    'Sri Lanka',
    'Sudan',
    'Suriname',
    'Sweden',
    'Switzerland',
    'Syria',
    'Tajikistan',
    'Tanzania',
    'Thailand',
    'Timor - Leste',
    'Togo',
    'Tonga',
    'Trinidad and Tobago',
    'Tunisia',
    'Turkey',
    'Turkmenistan',
    'Tuvalu',
    'Uganda',
    'Ukraine',
    'United Arab Emirates',
    'United Kingdom',
    'United States of America',
    'Uruguay',
    'Uzbekistan',
    'Vanuatu',
    'Venezuela',
    'Vietnam',
    'Yemen',
    'Zambia',
    'Zimbabwe',
];

// returns the current year
const CURRENT_YEAR = moment().year() - 18;

let current_year = moment().year();
export const YEARS2 = [...Array(10).keys()];
for (let i = 0; i < YEARS2.length; i++) {
    YEARS2[i] = current_year + i;
}
export const DATES = [...Array(31)];
for (let i = 0; i < DATES.length; i++) {
    DATES[i] = i + 1;
}
export const MONTHES = [...Array(12)];

export const MONTHS = [
    { value: 1, label: 'Jan' },
    { value: 2, label: 'Feb' },
    { value: 3, label: 'Mar' },
    { value: 4, label: 'Apr' },
    { value: 5, label: 'May' },
    { value: 6, label: 'Jun' },
    { value: 7, label: 'Jul' },
    { value: 8, label: 'Aug' },
    { value: 9, label: 'Sep' },
    { value: 10, label: 'Oct' },
    { value: 11, label: 'Nov' },
    { value: 12, label: 'Dec' },
];
