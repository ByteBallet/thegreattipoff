import * as React from 'react';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@mui/material';
import ScrollbarSize from './ScrollbarSize';

import {
    ownerWindow,
    ownerDocument,
    tabsClasses,
    getTabsUtilityClass,
    useEventCallback,
    TabScrollButton,
    debounce,
    styled,
    useThemeProps,
    useTheme,
} from '@mui/material';
import { jsx as _jsx } from 'react/jsx-runtime';
import { jsxs as _jsxs } from 'react/jsx-runtime';
import animate from '@utils/animate';
import {
    detectScrollType,
    getNormalizedScrollLeft,
} from '@utils/transactions.util';

import _objectWithoutPropertiesLoose from '@babel/runtime/helpers/esm/objectWithoutPropertiesLoose';
import _extends from '@babel/runtime/helpers/esm/extends';

const _excluded = [
    'aria-label',
    'aria-labelledby',
    'action',
    'centered',
    'children',
    'className',
    'component',
    'allowScrollButtonsMobile',
    'indicatorColor',
    'onChange',
    'orientation',
    'ScrollButtonComponent',
    'scrollButtons',
    'selectionFollowsFocus',
    'TabIndicatorProps',
    'TabScrollButtonProps',
    'textColor',
    'value',
    'variant',
    'visibleScrollbar',
];

const nextItem = (list, item) => {
    if (list === item) {
        return list.firstChild;
    }

    if (item && item.nextElementSibling) {
        return item.nextElementSibling;
    }

    return list.firstChild;
};

const previousItem = (list, item) => {
    if (list === item) {
        return list.lastChild;
    }

    if (item && item.previousElementSibling) {
        return item.previousElementSibling;
    }

    return list.lastChild;
};

const moveFocus = (list, currentFocus, traversalFunction) => {
    let wrappedOnce = false;
    let nextFocus = traversalFunction(list, currentFocus);

    while (nextFocus) {
        // Prevent infinite loop.
        if (nextFocus === list.firstChild) {
            if (wrappedOnce) {
                return;
            }

            wrappedOnce = true;
        } // Same logic as useAutocomplete.js

        const nextFocusDisabled =
            nextFocus.disabled ||
            nextFocus.getAttribute('aria-disabled') === 'true';

        if (!nextFocus.hasAttribute('tabindex') || nextFocusDisabled) {
            // Move to the next element.
            nextFocus = traversalFunction(list, nextFocus);
        } else {
            nextFocus.focus();
            return;
        }
    }
};

const useUtilityClasses = (ownerState) => {
    const {
        vertical,
        fixed,
        hideScrollbar,
        scrollableX,
        scrollableY,
        centered,
        scrollButtonsHideMobile,
        classes,
    } = ownerState;
    const slots = {
        root: ['root', vertical && 'vertical'],
        scroller: [
            'scroller',
            fixed && 'fixed',
            hideScrollbar && 'hideScrollbar',
            scrollableX && 'scrollableX',
            scrollableY && 'scrollableY',
        ],
        flexContainer: [
            'flexContainer',
            vertical && 'flexContainerVertical',
            centered && 'centered',
        ],
        indicator: ['indicator'],
        scrollButtons: [
            'scrollButtons',
            scrollButtonsHideMobile && 'scrollButtonsHideMobile',
        ],
        scrollableX: [scrollableX && 'scrollableX'],
        hideScrollbar: [hideScrollbar && 'hideScrollbar'],
    };
    return composeClasses(slots, getTabsUtilityClass, classes);
};

const TabsRoot = styled('div', {
    name: 'MuiTabs',
    slot: 'Root',
    overridesResolver: (props, styles) => {
        const { ownerState } = props;
        return [
            {
                [`& .${tabsClasses.scrollButtons}`]: styles.scrollButtons,
            },
            {
                [`& .${tabsClasses.scrollButtons}`]:
                    ownerState.scrollButtonsHideMobile &&
                    styles.scrollButtonsHideMobile,
            },
            styles.root,
            ownerState.vertical && styles.vertical,
        ];
    },
})(({ ownerState, theme }) =>
    _extends(
        {
            overflow: 'hidden',
            minHeight: 48,
            // Add iOS momentum scrolling for iOS < 13.0
            WebkitOverflowScrolling: 'touch',
            display: 'flex',
        },
        ownerState.vertical && {
            flexDirection: 'column',
        },
        ownerState.scrollButtonsHideMobile && {
            [`& .${tabsClasses.scrollButtons}`]: {
                [theme.breakpoints.down('sm')]: {
                    display: 'none',
                },
            },
        }
    )
);
const TabsScroller = styled('div', {
    name: 'MuiTabs',
    slot: 'Scroller',
    overridesResolver: (props, styles) => {
        const { ownerState } = props;
        return [
            styles.scroller,
            ownerState.fixed && styles.fixed,
            ownerState.hideScrollbar && styles.hideScrollbar,
            ownerState.scrollableX && styles.scrollableX,
            ownerState.scrollableY && styles.scrollableY,
        ];
    },
})(({ ownerState }) =>
    _extends(
        {
            position: 'relative',
            display: 'inline-block',
            flex: '1 1 auto',
            whiteSpace: 'nowrap',
        },
        ownerState.fixed && {
            overflowX: 'hidden',
            width: '100%',
        },
        ownerState.hideScrollbar && {
            // Hide dimensionless scrollbar on MacOS
            scrollbarWidth: 'none',
            // Firefox
            '&::-webkit-scrollbar': {
                display: 'none', // Safari + Chrome
            },
        },
        ownerState.scrollableX && {
            overflowX: 'auto',
            overflowY: 'hidden',
        },
        ownerState.scrollableY && {
            overflowY: 'auto',
            overflowX: 'hidden',
        }
    )
);
const FlexContainer = styled('div', {
    name: 'MuiTabs',
    slot: 'FlexContainer',
    overridesResolver: (props, styles) => {
        const { ownerState } = props;
        return [
            styles.flexContainer,
            ownerState.vertical && styles.flexContainerVertical,
            ownerState.centered && styles.centered,
        ];
    },
})(({ ownerState }) =>
    _extends(
        {
            display: 'flex',
        },
        ownerState.vertical && {
            flexDirection: 'column',
        },
        ownerState.centered && {
            justifyContent: 'center',
        }
    )
);
const TabsIndicator = styled('span', {
    name: 'MuiTabs',
    slot: 'Indicator',
    overridesResolver: (props, styles) => styles.indicator,
})(({ ownerState, theme }) =>
    _extends(
        {
            position: 'absolute',
            height: 2,
            bottom: 0,
            width: '100%',
            transition: theme.transitions.create(),
        },
        ownerState.indicatorColor === 'primary' && {
            backgroundColor: theme.palette.primary.main,
        },
        ownerState.indicatorColor === 'secondary' && {
            backgroundColor: theme.palette.secondary.main,
        },
        ownerState.vertical && {
            height: '100%',
            width: 2,
            right: 0,
        }
    )
);
const TabsScrollbarSize = styled(ScrollbarSize, {
    name: 'MuiTabs',
    slot: 'ScrollbarSize',
})({
    overflowX: 'auto',
    overflowY: 'hidden',
    // Hide dimensionless scrollbar on MacOS
    scrollbarWidth: 'none',
    // Firefox
    '&::-webkit-scrollbar': {
        display: 'none', // Safari + Chrome
    },
});
const defaultIndicatorStyle = {};
let warnedOnceTabPresent = false;
const Tabs = /*#__PURE__*/ React.forwardRef(function Tabs(inProps, ref) {
    const props = useThemeProps({
        props: inProps,
        name: 'MuiTabs',
    });
    const theme = useTheme();
    const isRtl = theme.direction === 'rtl';

    const {
        'aria-label': ariaLabel,
        'aria-labelledby': ariaLabelledBy,
        action,
        centered = false,
        children: childrenProp,
        className,
        component = 'div',
        allowScrollButtonsMobile = false,
        indicatorColor = 'primary',
        onChange,
        orientation = 'horizontal',
        ScrollButtonComponent = TabScrollButton,
        scrollButtons = 'auto',
        selectionFollowsFocus,
        TabIndicatorProps = {},
        TabScrollButtonProps = {},
        textColor = 'primary',
        value,
        variant = 'standard',
        visibleScrollbar = false,
    } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded);

    const scrollable = variant === 'scrollable';
    const vertical = orientation === 'vertical';
    const scrollStart = vertical ? 'scrollTop' : 'scrollLeft';
    const start = vertical ? 'top' : 'left';
    const end = vertical ? 'bottom' : 'right';
    const clientSize = vertical ? 'clientHeight' : 'clientWidth';
    const size = vertical ? 'height' : 'width';

    const ownerState = _extends({}, props, {
        component,
        allowScrollButtonsMobile,
        indicatorColor,
        orientation,
        vertical,
        scrollButtons,
        textColor,
        variant,
        visibleScrollbar,
        fixed: !scrollable,
        hideScrollbar: scrollable && !visibleScrollbar,
        scrollableX: scrollable && !vertical,
        scrollableY: scrollable && vertical,
        centered: centered && !scrollable,
        scrollButtonsHideMobile: !allowScrollButtonsMobile,
    });

    const classes = useUtilityClasses(ownerState);

    const [mounted, setMounted] = React.useState(false);
    const [indicatorStyle, setIndicatorStyle] = React.useState(
        defaultIndicatorStyle
    );
    const [displayScroll, setDisplayScroll] = React.useState({
        start: false,
        end: false,
    });
    const [scrollerStyle, setScrollerStyle] = React.useState({
        overflow: 'hidden',
        scrollbarWidth: 0,
    });
    const valueToIndex = new Map();
    const tabsRef = React.useRef(null);
    const tabListRef = React.useRef(null);

    const getTabsMeta = () => {
        const tabsNode = tabsRef.current;

        let tabsMeta;

        if (tabsNode) {
            const rect = tabsNode.getBoundingClientRect(); // create a new object with ClientRect class props + scrollLeft

            tabsMeta = {
                clientWidth: tabsNode.clientWidth,
                scrollLeft: tabsNode.scrollLeft,
                scrollTop: tabsNode.scrollTop,
                scrollLeftNormalized: getNormalizedScrollLeft(
                    tabsNode,
                    theme.direction
                ),
                scrollWidth: tabsNode.scrollWidth,
                top: rect.top,
                bottom: rect.bottom,
                left: rect.left,
                right: rect.right,
            };
        }
        let tabMeta;
        let tabLabel;

        if (tabsNode && value !== false) {
            const children = tabListRef.current.children;

            if (children.length > 0) {
                const tab = children[valueToIndex.get(value)];

                tabMeta = tab ? tab.getBoundingClientRect() : null;
                tabLabel = tab ? tab.innerText.toLowerCase() : null
            }
        }
        return {
            tabsMeta,
            tabMeta,
            tabLabel
        };
    };

    const updateIndicatorState = useEventCallback(() => {
        const { tabsMeta, tabMeta } = getTabsMeta();
        let startValue = 0;
        let startIndicator;

        if (vertical) {
            startIndicator = 'top';
            if (tabMeta && tabsMeta) {
                startValue = tabMeta.top - tabsMeta.top + tabsMeta.scrollTop;
            }
        } else {
            startIndicator = isRtl ? 'right' : 'left';

            if (tabMeta && tabsMeta) {
                const correction = isRtl
                    ? tabsMeta.scrollLeftNormalized +
                    tabsMeta.clientWidth -
                    tabsMeta.scrollWidth
                    : tabsMeta.scrollLeft;
                startValue =
                    (isRtl ? -1 : 1) *
                    (tabMeta[startIndicator] -
                        tabsMeta[startIndicator] +
                        correction);
            }
        }

        const newIndicatorStyle = {
            [startIndicator]: startValue,
            // May be wrong until the font is loaded.
            [size]: tabMeta ? tabMeta[size] : 0,
        }; // IE11 support, replace with Number.isNaN
        // eslint-disable-next-line no-restricted-globals

        if (
            isNaN(indicatorStyle[startIndicator]) ||
            isNaN(indicatorStyle[size])
        ) {
            setIndicatorStyle(newIndicatorStyle);
        } else {
            const dStart = Math.abs(
                indicatorStyle[startIndicator] -
                newIndicatorStyle[startIndicator]
            );
            const dSize = Math.abs(
                indicatorStyle[size] - newIndicatorStyle[size]
            );

            if (dStart >= 1 || dSize >= 1) {
                setIndicatorStyle(newIndicatorStyle);
            }
        }
    });

    const scroll = (scrollValue, { animation = true } = {}) => {
        if (animation) {
            animate(scrollStart, tabsRef.current, scrollValue, {
                duration: theme.transitions.duration.standard,
            });
        } else {
            tabsRef.current[scrollStart] = scrollValue;
        }
    };

    const moveTabsScroll = (delta) => {
        let scrollValue = tabsRef.current[scrollStart];

        if (vertical) {
            scrollValue += delta;
        } else {
            scrollValue += delta * (isRtl ? -1 : 1); // Fix for Edge

            scrollValue *= isRtl && detectScrollType() === 'reverse' ? -1 : 1;
        }

        scroll(scrollValue);
    };

    const getScrollSize = () => {
        const containerSize = tabsRef.current[clientSize];
        let totalSize = 0;
        const children = Array.from(tabListRef.current.children);

        for (let i = 0; i < children.length; i += 1) {
            const tab = children[i];

            if (totalSize + tab[clientSize] > containerSize) {
                break;
            }

            totalSize += tab[clientSize];
        }

        return totalSize;
    };

    const handleStartScrollClick = () => {
        moveTabsScroll(-1 * getScrollSize());
    };

    const handleEndScrollClick = () => {
        moveTabsScroll(getScrollSize());
    }; // TODO Remove <ScrollbarSize /> as browser support for hidding the scrollbar
    // with CSS improves.

    const handleScrollbarSizeChange = React.useCallback((scrollbarWidth) => {
        setScrollerStyle({
            overflow: null,
            scrollbarWidth,
        });
    }, []);

    const getConditionalElements = () => {
        const conditionalElements = {};
        conditionalElements.scrollbarSizeListener = scrollable
            ? /*#__PURE__*/ _jsx(TabsScrollbarSize, {
                onChange: handleScrollbarSizeChange,
                className: clsx(classes.scrollableX, classes.hideScrollbar),
            })
            : null;
        const scrollButtonsActive = displayScroll.start || displayScroll.end;
        const showScrollButtons =
            scrollable &&
            ((scrollButtons === 'auto' && scrollButtonsActive) ||
                scrollButtons === true);
        conditionalElements.scrollButtonStart = showScrollButtons
            ? /*#__PURE__*/ _jsx(
                ScrollButtonComponent,
                _extends(
                    {
                        orientation: orientation,
                        direction: isRtl ? 'right' : 'left',
                        onClick: handleStartScrollClick,
                        disabled: !displayScroll.start,
                    },
                    TabScrollButtonProps,
                    {
                        className: clsx(
                            classes.scrollButtons,
                            TabScrollButtonProps.className
                        ),
                    }
                )
            )
            : null;
        conditionalElements.scrollButtonEnd = showScrollButtons
            ? /*#__PURE__*/ _jsx(
                ScrollButtonComponent,
                _extends(
                    {
                        orientation: orientation,
                        direction: isRtl ? 'left' : 'right',
                        onClick: handleEndScrollClick,
                        disabled: !displayScroll.end,
                    },
                    TabScrollButtonProps,
                    {
                        className: clsx(
                            classes.scrollButtons,
                            TabScrollButtonProps.className
                        ),
                    }
                )
            )
            : null;
        return conditionalElements;
    };

    const scrollSelectedIntoView = useEventCallback((animation) => {
        const { tabsMeta, tabMeta, tabLabel } = getTabsMeta();

        if (!tabMeta || !tabsMeta) {
            return;
        }

        if (tabMeta[start] < tabsMeta[start]) {
            // left side of button is out of view
            const nextScrollStart =
                tabsMeta[scrollStart] + (tabMeta[start] - tabsMeta[start]);
            scroll(nextScrollStart - 100, {
                animation,
            });
        } else if (tabMeta[end] > tabsMeta[end]) {
            // right side of button is out of view
            const nextScrollStart =
                tabsMeta[scrollStart] + (tabMeta[end] - tabsMeta[end]);
            scroll(nextScrollStart + 100, {
                animation,
            });
        } else if (tabsMeta[end] > tabMeta[end]) {
            // without side buttons
            const nextScrollStart =
                tabsMeta[scrollStart] + (tabMeta[end] - tabsMeta[end]);
            scroll(nextScrollStart + (scrollButtons ? (tabLabel && tabLabel === "today") ? (tabsMeta.clientWidth - 150) : 95 : 150), {
                animation,
            });
        }
    });

    const updateScrollButtonState = useEventCallback(() => {
        if (scrollable) {
            const {
                scrollTop,
                scrollHeight,
                clientHeight,
                scrollWidth,
                clientWidth,
            } = tabsRef.current;
            let showStartScroll;
            let showEndScroll;

            if (vertical) {
                showStartScroll = scrollTop > 1;
                showEndScroll = scrollTop < scrollHeight - clientHeight - 1;
            } else {
                const scrollLeft = getNormalizedScrollLeft(
                    tabsRef.current,
                    theme.direction
                ); // use 1 for the potential rounding error with browser zooms.

                showStartScroll = isRtl
                    ? scrollLeft < scrollWidth - clientWidth - 1
                    : scrollLeft > 1;
                showEndScroll = !isRtl
                    ? scrollLeft < scrollWidth - clientWidth - 1
                    : scrollLeft > 1;
            }

            if (
                showStartScroll !== displayScroll.start ||
                showEndScroll !== displayScroll.end
            ) {
                setDisplayScroll({
                    start: showStartScroll,
                    end: showEndScroll,
                });
            }
        }
    });
    React.useEffect(() => {
        const handleResize = debounce(() => {
            updateIndicatorState();
            updateScrollButtonState();
        });
        const win = ownerWindow(tabsRef.current);
        win.addEventListener('resize', handleResize);
        let resizeObserver;

        if (typeof ResizeObserver !== 'undefined') {
            resizeObserver = new ResizeObserver(handleResize);
            Array.from(tabListRef.current.children).forEach((child) => {
                resizeObserver.observe(child);
            });
        }

        return () => {
            handleResize.clear();
            win.removeEventListener('resize', handleResize);

            if (resizeObserver) {
                resizeObserver.disconnect();
            }
        };
    }, [updateIndicatorState, updateScrollButtonState]);
    const handleTabsScroll = React.useMemo(
        () =>
            debounce(() => {
                updateScrollButtonState();
            }),
        [updateScrollButtonState]
    );
    React.useEffect(() => {
        return () => {
            handleTabsScroll.clear();
        };
    }, [handleTabsScroll]);
    React.useEffect(() => {
        setMounted(true);
    }, []);
    React.useEffect(() => {
        updateIndicatorState();
        updateScrollButtonState();
    });
    React.useEffect(() => {
        // Don't animate on the first render.
        scrollSelectedIntoView(defaultIndicatorStyle !== indicatorStyle);
    }, [scrollSelectedIntoView, indicatorStyle]);
    React.useImperativeHandle(
        action,
        () => ({
            updateIndicator: updateIndicatorState,
            updateScrollButtons: updateScrollButtonState,
        }),
        [updateIndicatorState, updateScrollButtonState]
    );

    const indicator = /*#__PURE__*/ _jsx(
        TabsIndicator,
        _extends({}, TabIndicatorProps, {
            className: clsx(classes.indicator, TabIndicatorProps.className),
            ownerState: ownerState,
            style: _extends({}, indicatorStyle, TabIndicatorProps.style),
        })
    );

    let childIndex = 0;
    const children = React.Children.map(childrenProp, (child) => {
        if (!(/*#__PURE__*/ React.isValidElement(child))) {
            return null;
        }

        const childValue =
            child.props.value === undefined ? childIndex : child.props.value;
        valueToIndex.set(childValue, childIndex);
        const selected = childValue === value;
        childIndex += 1;
        return /*#__PURE__*/ React.cloneElement(
            child,
            _extends(
                {
                    fullWidth: variant === 'fullWidth',
                    indicator: selected && !mounted && indicator,
                    selected,
                    selectionFollowsFocus,
                    onChange,
                    textColor,
                    value: childValue,
                },
                childIndex === 1 && value === false && !child.props.tabIndex
                    ? {
                        tabIndex: 0,
                    }
                    : {}
            )
        );
    });

    const handleKeyDown = (event) => {
        const list = tabListRef.current;
        const currentFocus = ownerDocument(list).activeElement; // Keyboard navigation assumes that [role="tab"] are siblings
        // though we might warn in the future about nested, interactive elements
        // as a a11y violation

        const role = currentFocus.getAttribute('role');

        if (role !== 'tab') {
            return;
        }

        let previousItemKey =
            orientation === 'horizontal' ? 'ArrowLeft' : 'ArrowUp';
        let nextItemKey =
            orientation === 'horizontal' ? 'ArrowRight' : 'ArrowDown';

        if (orientation === 'horizontal' && isRtl) {
            // swap previousItemKey with nextItemKey
            previousItemKey = 'ArrowRight';
            nextItemKey = 'ArrowLeft';
        }

        switch (event.key) {
            case previousItemKey:
                event.preventDefault();
                moveFocus(list, currentFocus, previousItem);
                break;

            case nextItemKey:
                event.preventDefault();
                moveFocus(list, currentFocus, nextItem);
                break;

            case 'Home':
                event.preventDefault();
                moveFocus(list, null, nextItem);
                break;

            case 'End':
                event.preventDefault();
                moveFocus(list, null, previousItem);
                break;

            default:
                break;
        }
    };

    const conditionalElements = getConditionalElements();
    return /*#__PURE__*/ _jsxs(
        TabsRoot,
        _extends(
            {
                className: clsx(classes.root, className),
                ownerState: ownerState,
                ref: ref,
                as: component,
            },
            other,
            {
                children: [
                    conditionalElements.scrollButtonStart,
                    conditionalElements.scrollbarSizeListener,
                    /*#__PURE__*/ _jsxs(TabsScroller, {
                        className: classes.scroller,
                        ownerState: ownerState,
                        style: {
                            overflow: scrollerStyle.overflow,
                            [vertical
                                ? `margin${isRtl ? 'Left' : 'Right'}`
                                : 'marginBottom']: visibleScrollbar
                                    ? undefined
                                    : -scrollerStyle.scrollbarWidth,
                        },
                        ref: tabsRef,
                        onScroll: handleTabsScroll,
                        children: [
                            /*#__PURE__*/ _jsx(FlexContainer, {
                            'aria-label': ariaLabel,
                            'aria-labelledby': ariaLabelledBy,
                            'aria-orientation':
                                orientation === 'vertical'
                                    ? 'vertical'
                                    : null,
                            className: classes.flexContainer,
                            ownerState: ownerState,
                            onKeyDown: handleKeyDown,
                            ref: tabListRef,
                            role: 'tablist',
                            children: children,
                        }),
                            mounted && indicator,
                        ],
                    }),
                    conditionalElements.scrollButtonEnd,
                ],
            }
        )
    );
});

export default Tabs;
