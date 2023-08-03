const regEx1 = /^[-\sa-zA-Z]+$/;
const regEx3 = /[0-9]{3}[-][0-9]{3}$/;
const regEx4 = /[0-9]{8,}$/;
const regexNumbers = /[0-9]{6}$/;

/**
 * 
 * @param {*} props 
 * accts - Object that contains the list of the EFT accounts available

bnm - Bank Name

anm - Account Holder Name

baid - Bank Account ID

bsb - Bsb number

num - AccountNumber
 */
export const checkAccountData = (props, country) => {
    if (country && (country.toLowerCase() !== 'au' || country.toLowerCase() !== 'australia')) {
        return {
            empty: true,
        };
    }

    if (props.bankname == '' && props.accountname == '' && props.bsb == '' && props.accountnumber == '' && props.swiftcode == '') {
        return {
            empty: true,
        };
    }
    let errors = {
        empty: false,
    };
    // if (!props.bankname) {
    //     errors.bankname = 'Enter bank name';
    // }
    if (!props.accountname) {
        errors.accountname = 'Enter account name';
    } else {
        if (!regEx1.test(props.accountname)) {
            errors.accountname = 'Only letters, spaces & hyphens permitted';
        }
    }

    if (!props.bsb) {
        errors.bsb = 'Enter BSB number';
    } else {
        // if (props.bsb.includes('-')) {
        //     if (!regEx3.test(props.bsb)) {
        //         errors.bsb = 'BSB number is invalid';
        //     }
        // } else {
        //     if (!regexNumbers.test(props.bsb)) {
        //         errors.bsb = 'BSB number is invalid';
        //     }
        // }
    }

    if (!props.accountnumber) {
        errors.accountnumber = 'Enter account number';
    } else {
        if (!regEx4.test(props.accountnumber)) {
            // errors.accountnumber = 'Invalid account number';
        }
    }

    // if (country && country !== 'AU') {
    //     if (country.toLowerCase() !== 'au' || country.toLowerCase() !== 'australia') {
    //         if (!props.swiftcode) {
    //             errors.swiftcode = 'Swift Code required for all international accounts';
    //         }
    //     }
    // }

    return errors;
};
