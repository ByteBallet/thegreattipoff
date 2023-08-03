import {
  Box,
  Container,
  IconButton,
  MenuItem,
  Select,
  FormGroup,
  FormLabel,
  FormControl,
  Typography,
  OutlinedInput,
  TextField,
  InputAdornment,
  Button,
  Grid,
} from '@mui/material';
import { useEffect, useState } from 'react';

import { SvgIcon } from '@mui/material';
// import ModifyIcon from '../../../public/images/svg/edit.svg';
import Trash from "@public/images/svg/trash.svg";

import {
  CheckCircle,
  ErrorOutlined,
  ExpandMore,
  Info,
  KeyboardArrowDownOutlined,
} from '@mui/icons-material';


import CreditCardItem from './CreditCardItem';


export default function CreditCardList(props) {
  const { cards, removeUpCard, setUpdateNotice, setreload = () => { } } = props;

  // console.log('CreditCardList::removeUpCard, setUpdateNotice=', removeUpCard, setUpdateNotice);

  return (
    <>
      {
        cards.map((card, i) =>
          <CreditCardItem
            card={card}
            removeUpCard={removeUpCard}
            setUpdateNotice={setUpdateNotice}
            setreload={setreload}
            key={i} />
        )
      }
    </>
  )
}
