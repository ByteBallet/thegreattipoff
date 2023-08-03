import css from 'styled-jsx/css';

export default css.global`
   .btn {
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    outline: 0px;
    border: 0px;
    margin: 0px;
    cursor: pointer;
    user-select: none;
    vertical-align: middle;
    appearance: none;
    text-decoration: none;
    text-transform: none;
    font-weight: 500;
    font-size: 0.9375rem;
    line-height: 1.75;
    letter-spacing: 0.02857em;
    color: rgb(255, 255, 255);
    padding: 8px 22px;
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
        box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
        border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
        color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    background-color: rgb(89, 171, 1);
    box-shadow: rgb(56 108 1) 0px 2px 0px 0px;
    border-radius: 6px;
}
.ml-auto, .mx-auto {
  margin-left: auto;
}
.mr-auto, .mx-auto {
  margin-right: auto;
}
.d-flex {
  display: -ms-flexbox;
  display: flex;
}
.logo{
    height:28px
}
`;