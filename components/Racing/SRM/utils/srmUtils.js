export const utilSRM = {
    getSelectionType: (type) => {
        switch (type) {
            case 'Win': {
                return 'winner';
            }
            case 'Top 2': {
                return 'topTwo';
            }
            case 'Top 3': {
                return 'topThree';
            }
            case 'Top 4': {
                return 'topFour';
            }
            default: {
                return 'winner';
            }
        }
    },
    createTipObj: (raceid, racemeet, fieldname) => {
        return {
            id: raceid,
            stake: 10,
            price: 10,
            isBoost: false,
            boostAvailable: false,
            boost: {},
            eventDesc: racemeet,
            fieldnames: {},
            compName: '',
            selections: {
                winner: [],
                topTwo: [],
                topThree: [],
                topFour: [],
            },
        };
    },
};
