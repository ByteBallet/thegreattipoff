import React from 'react';
import { useState, useContext, useEffect } from 'react';
import {
	Box,
	Typography,
	FormGroup,
	FormControlLabel,
	Checkbox,
	Divider,
	SvgIcon,
	useMediaQuery
} from '@mui/material';
import horses from '@public/images/svg/horse-racing.svg';
import harness from '@public/images/svg/harness-racing.svg';
import greys from '@public/images/svg/greys-racing.svg';
import au from '@public/images/svg/aus-icon.svg';
import intl from '@public/images/svg/world-icon.svg';
import RacingNextToJump from '@Components/Racing/RacingNextToJump';
import { getTopOffset } from '@Components/utils/util';
import hotbet from '@public/images/svg/hotbet-blue.svg';
import { getTrendingHB } from '@lib/fetcher';
import { UserContext } from '@Context/User/UserProvider';
import TrendingHotBets from '@modules/HotBets/Components/TrendingHotBets';

const NextRacing = () => {
	const isDesktop = useMediaQuery('(min-width:900px)');
	const { user } = useContext(UserContext)
	let nextup_settings = {
		racetype: {
			R: true,
			G: true,
			H: true,
			count: 3,
		},
		racemeet: {
			AU: true,
			INT: true,
			count: 2,
		},
		hotbet: true,
	};
	const [state, setState] = useState(nextup_settings)
	let raceObj = {};
	let CountryObj = {};
	let hotbetObj = {};
	if (state) {
		raceObj = {
			R: {
				value: state.racetype?.R,
				svg_icon: horses,
				view_box: '0 0 466.36 510.95',
				label: 'Horses',
			},
			G: {
				value: state.racetype?.G,
				svg_icon: greys,
				view_box: '0 0 1633 1465',
				label: 'Greys',
			},
			H: {
				value: state.racetype?.H,
				svg_icon: harness,
				view_box: '0 0 1101 1850',
				label: 'Harness',
			},
		};
		CountryObj = {
			AU: {
				value: state.racemeet?.AU,
				svg_icon: au,
				view_box: '0 0 185.8 170.45',
				label: 'AU/NZ',
			},
			INT: {
				value: state.racemeet?.INT,
				svg_icon: intl,
				view_box: '0 0 208.29 208.35',
				label: 'INTL',
			},
		};
		hotbetObj = {
			value: state.hotbet,
			svg_icon: hotbet,
			view_box: '0 0 44.593 55.624',
			label: 'HOT Bets',
		}
	}
	useEffect(() => {
		getTipsterCarousel()
	}, [])

	return (
		<Box>
			<RacingNextToJump {...state} />
		</Box>
	);
};

export default NextRacing;