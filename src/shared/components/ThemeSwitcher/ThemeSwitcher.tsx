import React, {useState} from 'react';
import styles from './themeswitcher.css';
import {useDispatch, useSelector} from "react-redux";
import {RootState, updateTheme} from "../../../store/reducer";
import {ETheme} from "../../../types/model";

enum ESwitchPosition {
    "left" = "left", "center" = "center", "right" = "right"
}

enum EAnimation {
    "leftToCenter"= "leftToCenter",
    "centerToRight" = "centerToRight",
    "rightToCenter" = "rightToCenter",
    "centerToLeft" = "centerToLeft",
    "leftToRight" = "leftToRight",
    "rightToLeft" = "rightToLeft",
}

interface ILabel {
    title: string;
    value: ESwitchPosition;
}

export interface IThemeSwitcherProps {
    leftTitle: string,
    centerTitle: string,
    rightTitle: string
}

export function ThemeSwitcher({leftTitle = 'Left', rightTitle='Right', centerTitle='Center'} : IThemeSwitcherProps) {

    const dispatch = useDispatch();
    const theme: ETheme = useSelector<RootState, ETheme>((state) => state.theme);
    let initialPosition: ESwitchPosition = ESwitchPosition.left;

    switch (theme) {
        case ETheme.LIGHT:
            initialPosition = ESwitchPosition.left;
            break;
        case ETheme.SYSTEM:
            initialPosition = ESwitchPosition.center;
            break;
        case ETheme.DARK:
            initialPosition = ESwitchPosition.right;
            break;
    }

    const [switchPosition, setSwitchPosition]
        = useState<ESwitchPosition>(initialPosition)
    const [animation, setAnimation] = useState<EAnimation>()
    const animationCss = animation ? styles[animation.toString()] : ''
    const switchPositionCss = switchPosition ? styles[switchPosition.toString() + 'Position'] : ''

    const defaults = {labels: {
            left: {
                title: leftTitle,
                value: ESwitchPosition.left
            },
            center: {
                title: centerTitle,
                value: ESwitchPosition.center
            },
            right: {
                title: rightTitle,
                value: ESwitchPosition.right
            }
        }}

    function handleSwitch(value: string) {

        const newPosition: ESwitchPosition = ESwitchPosition[value as keyof typeof ESwitchPosition]

        if (newPosition === ESwitchPosition.center && switchPosition === ESwitchPosition.left) {
            setAnimation(EAnimation["leftToCenter"]);
        } else if (newPosition === ESwitchPosition.right && switchPosition === ESwitchPosition.center) {
            setAnimation(EAnimation["centerToRight"]);
        } else if (newPosition === ESwitchPosition.center && switchPosition === ESwitchPosition.right) {
            setAnimation(EAnimation["rightToCenter"]);
        } else if (newPosition === ESwitchPosition.left && switchPosition === ESwitchPosition.center) {
            setAnimation(EAnimation["centerToLeft"]);
        } else if (newPosition === ESwitchPosition.right && switchPosition === ESwitchPosition.left) {
            setAnimation(EAnimation["leftToRight"]);
        } else if (newPosition === ESwitchPosition.left && switchPosition === ESwitchPosition.right) {
            setAnimation(EAnimation["rightToLeft"]);
        }

        setSwitchPosition(newPosition);
        switch (newPosition) {
            case ESwitchPosition.left:
                dispatch(updateTheme(ETheme.LIGHT));
                break;
            case ESwitchPosition.center:
                dispatch(updateTheme(ETheme.SYSTEM));
                break;
            case ESwitchPosition.right:
                dispatch(updateTheme(ETheme.DARK));
                break;
        }
    }

    return (
        <div className={styles.mainContainer}>
            <div
                className={`${styles.switch} ${animationCss} ${switchPositionCss}`}
            ></div>
            <input
                defaultChecked
                onChange={(e) => handleSwitch(e.target.value)}
                name="map-switch"
                id="left"
                type="radio"
                value="left"
                />
            <label
                className={`${styles.leftLabel} ${
                    switchPosition === ESwitchPosition.left && styles.blackFont
                }`}
                htmlFor="left"
            >
                <h4>{defaults.labels.left.title}</h4>
            </label>

            <input
                onChange={(e) => handleSwitch(e.target.value)}
                name="map-switch"
                id="center"
                type="radio"
                value="center"
            />
            <label
                className={`${styles.centerLabel} ${
                    switchPosition === ESwitchPosition.center && styles.blackFont
                }`}
                htmlFor="center"
            >
                <h4>{defaults.labels.center.title}</h4>
            </label>

            <input
                onChange={(e) => handleSwitch(e.target.value)}
                name="map-switch"
                id="right"
                type="radio"
                value="right"
            />
            <label
                className={`${styles.rightLabel} ${
                    switchPosition === ESwitchPosition.right && styles.blackFont
                }`}
                htmlFor="right"
            >
                <h4>{defaults.labels.right.title}</h4>
            </label>
        </div>
    );
}