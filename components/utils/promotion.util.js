export const getSelectedObject = (dataArray, value, valueName) => {
  const selectedObject =
    Array.isArray(dataArray) &&
    dataArray.filter((data) => data[valueName] === value);
  return selectedObject[0];
};

export const getGroupPromotion = (promotionsList) => {
  const newData = promotionsList.map((item) => {
    const startDate = new Date(item?.STARTTIME).toDateString("dd-mm-yyyy");
    return {
      APPROVAL: item?.APPROVAL,
      BOOKIECODE: item?.BOOKIECODE,
      BOOKIEID: item?.BOOKIEID,
      DESCRIPTION: item?.DESCRIPTION,
      ENDTIME: item?.ENDTIME,
      ID: item?.ID,
      INACTIVE: item?.INACTIVE,
      NAME: item?.NAME,
      PROMOAD: item?.PROMOAD,
      PROMOSTATUS: item?.PROMOSTATUS,
      PROMOSTATUSID: item?.PROMOSTATUSID,
      STARTTIME: item?.STARTTIME,
      STATUS: item?.STATUS,
      SUBSTATUS: item?.SUBSTATUS,
      USERGROUP: item?.USERGROUP,
      STARTDATE: startDate,
    };
  });
  const dictionry = _.groupBy(newData, "STARTDATE");
  const newArray = Object.values(dictionry);
  return newArray;
};

export const getCapitalizeFirstLetter = (stringValue) => {
  if (stringValue) {
    const newString = `${stringValue
      .charAt(0)
      .toUpperCase()}${stringValue.slice(1)}`;
    return newString;
  } else {
    return "";
  }
};

export const getApprovalNameList = (list) => {
  // Sent to [Name] & [Name] for approval
  // If someone has already approved the promotion then the following lines will show beneath the line above.
  // [Name] & [Name] has already approved */
  let approved = [];
  let pending = [];
  let approvedName = "";
  let pendingName = "";
  if (list?.length > 0) {
    list.map((item) => {
      if (item?.APPROVED===1) {
        
        approved.push(`${item?.FIRSTNAME} ${item?.SURNAME}`);
      } else {
        pending.push(`${item?.FIRSTNAME} ${item?.SURNAME}`);
      }
    });

    approvedName = approved.length > 0 && approved.join("&");
    pendingName = pending.length > 0 && pending.join("&");

    return (
      <>
        {pendingName && (
          <p
            style={{ textAlign: "center" }}
          >{`Send to ${pendingName} for approval.`}</p>
        )}
        {approvedName && (
          <p
            style={{ textAlign: "center" }}
          >{`${approvedName} has already approved`}</p>
        )}
      </>
    );
  }
};
