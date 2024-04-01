import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({
    to,
    href,
    primary = false,
    outline = false,
    text = false,
    rounded = false,
    disabled = false,
    small = false,
    large = false,
    children,
    leftIcon,
    rightIcon,
    className,
    darkMode = false,
    onClick,
    ...passProps
}) {
    let Comp = 'button';

    const props = {
        onClick,
        ...passProps,
    };

    // Remove event listener when btn is disabled
    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }

    let darkModeClass = false;

    if (darkMode) {
        darkModeClass = 'dark-mode-class';
    }

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    const classes = cx('wrapper', {
        [className]: className,
        primary,
        outline,
        text,
        rounded,
        disabled,
        small,
        large,
    });

    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('left-icon')}>{leftIcon}</span>}
            <span className={cx('title', darkModeClass)}>{children}</span>
            {rightIcon && <span className={cx('right-icon')}>{rightIcon}</span>}
            {darkMode && (
                <div className={cx('divSwitch')}>
                    <span className={cx('spanSwitch')}></span>
                </div>
            )}
        </Comp>
    );
}

Button.propTypes = {
    to: PropTypes.string,
    href: PropTypes.string,
    primary: PropTypes.bool,
    outline: PropTypes.bool,
    text: PropTypes.bool,
    rounded: PropTypes.bool,
    disabled: PropTypes.bool,
    small: PropTypes.bool,
    large: PropTypes.bool,
    children: PropTypes.node.isRequired,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
    className: PropTypes.string,
    darkMode: PropTypes.bool,
    onClick: PropTypes.func,
};

export default Button;
