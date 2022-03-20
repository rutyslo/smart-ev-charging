import React, {useState, useEffect} from 'react';
import './status.scss'
import {useLocation, useNavigate} from "react-router-dom";
import carImg1 from "../../../assets/images/car-img-1.png";
import {ReactComponent as BatteryLines} from "../../../assets/images/battery-lines.svg";
import Switch from "react-switch";

function Status() {
    const { state } = useLocation();
    const navigate = useNavigate();

    const car = state?.car ? state?.car : {id: 1, name : `Mom's car`, type : 'VOLKSWAGEN iD.3', image : carImg1, batteryTime: 621} ;
    const [isCharged, setIsCharged] = useState(true);
    const [isSmartCharging, setIsSmartCharging] = useState(false);
    const [percent, setPercent] = useState(55);
    const [mile, setMile] = useState(123);
    const [maxBattery, setMaxBattery] = useState(100);
    const hours = Math.floor(car.batteryTime/ 60);
    const minutes = car.batteryTime % 60;

    useEffect(() => {
        const timerId = setInterval(() => {
            if (isCharged && (percent < maxBattery)) {
                setPercent(percent + 1)
            } else {
                clearInterval(timerId);
                if (maxBattery >= percent) {
                    setIsCharged(false);
                }
            }
        } ,500);
        return () => clearInterval(timerId);
    });

    const handleChange = nextChecked => {
        setIsCharged(!nextChecked);
    };

    const handleChangeIsSmart = nextChecked => {
        setIsSmartCharging(nextChecked);
        if (!nextChecked) {
            setIsCharged(true);
            setMaxBattery(100);
            // TODO - CALL CHARGING
        } else {
            setMaxBattery(85);
            if (percent > 85) {
                setIsCharged(false);
            }
        }
    };

    const chargingTimeLeft = 6;

    return (
        <div className={`status-wrapper ${isCharged ? 'charging' : 'not-charging'}`}>
            <div className="header" onClick={() => { navigate("../", { replace: true})}}>
                <i className="chevron-right"></i>
                <div className="title">
                    Home
                </div>
            </div>
            <div className="car-info">
                <div className="name">
                    <div className="car-name">{car.name}</div>
                    <div className="car-type">{car.type}</div>
                </div>
                <div className="image">
                    <img src={car.smallImg} height={88} width={145}/>
                </div>
            </div>
            <div className="switch-wrapper">
                <div className="text-wrapper">
                    <div className={'time'}>
                        { isCharged ? `${chargingTimeLeft} hrs left` : 'Car is connected' }
                    </div>
                    <div className="swipe">
                        {`Swipe to ${isCharged ? `stop` : `start`} charging` }
                    </div>
                </div>
                <Switch
                    key={1}
                    height={65}
                    width={window.innerWidth - 30}
                    checked={!isCharged}
                    onChange={handleChange}
                    className="switch-charging"
                    id="normal-switch"
                    disabled={maxBattery <= percent}
                    uncheckedIcon={<></>}
                    checkedIcon={<></>}
                />
            </div>

            <div className="electric-wrapper">
                <div className="sidebar-left">
                    <div className="item">
                        <div className={"name"}>Energy supplied</div>
                        <div className={"value"}>3.543<span>kW/h</span></div>
                    </div>
                    <div className="item">
                        <div className={"name"}>Est. cost</div>
                        <div className={"value"}>$1.22</div>
                    </div>
                    <div className="item">
                        <div className={"name"}>Charged by</div>
                        <div className={"value"}>04:12 <span>AM</span></div>
                    </div>
                </div>
                <div className="sidebar-right">
                    <div className={"percent"}>{percent}%</div>
                    <div className="car-battery-time">
                        ~ {hours}h {minutes}m/{mile} mi
                    </div>
                    <div className="battery-wrapper">
                        <div className="battery">
                            <BatteryLines className={"battery-lines"}/>
                            <div className="battery-percent" style={{ height: `${percent > 98 ? 98 : percent}%` }}></div>
                        </div>
                    </div>
                </div>

            </div>

            <div className="battery-pref">
                <div className="title">Battery Preferences</div>
                <div className="smart-charging-wrapper">
                    <div className="smart-text-wrapper">
                        <div className="section-title">
                            Smart charging
                        </div>
                        <div className="text-area">
                            Smart charging will attempt to optimize charging times to keep costs low. When turned off, home charging will start immediately.
                        </div>
                    </div>

                    <Switch
                        key={2}
                        width={60}
                        checked={isSmartCharging}
                        onChange={handleChangeIsSmart}
                        className="switch-is-smart react-switch"
                        onColor="#0057B8"
                        id="normal-switch"
                        uncheckedIcon={<></>}
                    />
                </div>
                {isSmartCharging &&<>
                    <div className="row">
                        <div className="item-name">Charged by</div>
                        <div className="item-value">06:15 AM, Mon-Fri
                            08:00 AM Sat-Sun</div>
                        <i className="chevron-right"></i>
                    </div>
                    <div className="row">
                        <div className="item-name">Battery max level</div>
                        <div className="item-value">85%</div>
                        <i className="chevron-right"></i>
                    </div>
                </>}


            </div>

        </div>
    );

}

export default Status;