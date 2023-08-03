import React from 'react';
import MessageHelperText from './MessageHelperText';

const MyFormHelperText = (props) => {
    const { children, ...rest } = props;
    const isError = children !== undefined;
    return (
        <MessageHelperText error={isError}>{children || ''}</MessageHelperText>
    );
};
export const MyFormHelperText2 = (props) => {
    const { children, ...rest } = props;
    const isError = children.status === 200 ? false : true;
    const msg = children.msg;
    const title=children.title;
    if(title){
      return (
        <MessageHelperText align="center" error={isError} title={title}>
          {msg}
      </MessageHelperText>
          
      );
    }else{
      return (
        <MessageHelperText align="center" error={isError}>
              {msg}
          </MessageHelperText>
      )
    }
    
};
export default MyFormHelperText;
