import React from 'react';
import moment from 'moment';
import styled from 'styled-components';

const lansering = moment('2021-08-30T22:00:00+00');

const Alert = styled.div`
    background-color: #d93717;
    color: white;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-radius: 5px;

    .sales-amount {
        font-size: 3em;
        font-weight: bold;
    }

    .slogan {
        font-size: 1.3rem;
        font-weight: bold;
    }

    .vc {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
`;

const StyledCountdown = styled.div`
    margin: 0 20px;
    display: flex;
    justify-content: space-between;
    text-align: center;

    > * {
        margin: 0 15px;
        > *:first-child {
            font-weight: bold;
            font-size: 1em;
        }
    }
`;

const CountDown = ({ to, onDone }) => {
    const [diff, setDiff] = React.useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    React.useEffect(() => {
        const set = () => {
            const now = moment();
            let diff = to.diff(now);
            if (diff <= 0) {
                onDone();
                return;
            }
            let days = to.diff(now, 'days');
            let hours = to.diff(now.add(days, 'days'), 'hour');
            let minutes = to.diff(now.add(hours, 'hours'), 'minutes');
            let seconds = to.diff(now.add(minutes, 'minutes'), 'seconds');

            setDiff({
                days,
                hours,
                minutes,
                seconds,
            });
        };
        set();
        const ref = setInterval(set, 1000);

        return () => clearInterval(ref);
    }, [setDiff, to]);

    return (
        <StyledCountdown>
            <div>
                <div>{diff.days}</div>
                <div>dager</div>
            </div>
            <div>
                <div>{diff.hours}</div>
                <div>timer</div>
            </div>
            <div>
                <div>{diff.minutes}</div>
                <div>Minutter</div>
            </div>
            <div>
                <div>{diff.seconds}</div>
                <div>Sekunder</div>
            </div>
        </StyledCountdown>
    );
};

const Sales = () => {
    const [hide, setHide] = React.useState(false);

    if (hide || moment().isAfter(lansering)) {
        return <></>;
    }

    return (
        <>
            <div className="d-block d-lg-none">
                <Alert>
                    <div className="w-100">
                        <div className="sales-amount vc text-center ">30%</div>
                        <div className="slogan vc text-center mb-3">
                            På hele butikken
                        </div>
                        <div className="vc">
                            <CountDown
                                to={lansering}
                                onDone={() => setHide(true)}
                            />
                        </div>
                    </div>
                </Alert>
            </div>
            <div className="d-none d-lg-block">
                <Alert>
                    <div className="sales-amount vc pl-5">30%</div>
                    <div className="slogan vc pl-2">På hele butikken</div>
                    <div className="vc">
                        <CountDown
                            to={lansering}
                            onDone={() => setHide(true)}
                        />
                    </div>
                </Alert>
            </div>
        </>
    );
};

export default Sales;
