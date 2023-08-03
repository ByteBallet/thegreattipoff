import * as React from 'react';
import PropTypes from 'prop-types';
import { jsx as _jsx } from "react/jsx-runtime";
import { debounce, ownerWindow } from "@mui/material";

import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["onChange"];

const styles = {
  width: 99,
  height: 99,
  position: 'absolute',
  top: -9999,
  overflow: 'scroll'
};


export default function ScrollbarSize(props) {
  const {
    onChange
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded);

  const scrollbarHeight = React.useRef();
  const nodeRef = React.useRef(null);

  const setMeasurements = () => {
    scrollbarHeight.current = nodeRef.current.offsetHeight - nodeRef.current.clientHeight;
  };

  React.useEffect(() => {
    const handleResize = debounce(() => {
      const prevHeight = scrollbarHeight.current;
      setMeasurements();

      if (prevHeight !== scrollbarHeight.current) {
        onChange(scrollbarHeight.current);
      }
    });
    const containerWindow = ownerWindow(nodeRef.current);
    containerWindow.addEventListener('resize', handleResize);
    return () => {
      handleResize.clear();
      containerWindow.removeEventListener('resize', handleResize);
    };
  }, [onChange]);
  React.useEffect(() => {
    setMeasurements();
    onChange(scrollbarHeight.current);
  }, [onChange]);
  return /*#__PURE__*/_jsx("div", _extends({
    style: styles,
    ref: nodeRef
  }, other));
}
process.env.NODE_ENV !== "production" ? ScrollbarSize.propTypes = {
  onChange: PropTypes.func.isRequired
} : void 0;