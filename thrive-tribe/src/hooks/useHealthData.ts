import {useEffect, useState} from 'react';
import AppleHealthKit, {HealthInputOptions, HealthKitPermissions, HealthValue,} from "react-native-health";
import {Platform} from "react-native";
import * as Device from "expo-device";

const {Permissions} = AppleHealthKit.Constants;


const permissions: HealthKitPermissions = {
    permissions: {
        read: [
            Permissions.Steps,
            Permissions.SleepAnalysis,
        ],
        write: [],
    },
};

function getHoursBetweenDates(startDate: string, endDate: string) {
    return (new Date(endDate).getTime() - new Date(startDate).getTime()) / (60 * 60 * 1000);
}

function getSleepDuration(sleepSamples: Array<HealthValue>) {
    let duration = 0;
    sleepSamples
        // .filter(r => r.value == 'INBED')
        .forEach(r => duration += (getHoursBetweenDates(r.endDate, r.startDate)));
    return duration;
}

const useHealthData = () => {
    const [steps, setSteps] = useState(0);
    const [sleepDuration, setSleepDuration] = useState(0);

    const [hasPermissions, setHasPermission] = useState(false);

    useEffect(() => {
        if (Platform.OS !== 'ios' || !Device.isDevice) {//won't run on simulator so set random values
            setSleepDuration(Math.floor(Math.random() * 3) + 6);
            setSteps(Math.floor(Math.random() * 15000) + 1);
            return;
        }
        AppleHealthKit.initHealthKit(permissions, (err) => {
            if (err) {
                console.log('Error getting permissions');
                return;
            }
            setHasPermission(true);
        });
    }, []);

    useEffect(() => {
        if (!hasPermissions) {
            return;
        }

        const stepOptions: HealthInputOptions = {
            date: new Date().toISOString(),
        };

        AppleHealthKit.getStepCount(stepOptions, (err, results) => {
            if (err) {
                console.log('Error getting the steps');
                return;
            }
            setSteps(results.value);
        });

        const todayAtMidnight = new Date();
        todayAtMidnight.setHours(0, 0, 0, 0);

        const sleepOptions: HealthInputOptions = {
            startDate: todayAtMidnight.toISOString()
        };

        AppleHealthKit.getSleepSamples(sleepOptions, (err, results) => {
            if (err) {
                console.log('Error getting the sleep data');
                return;
            }
            setSleepDuration(getSleepDuration(results));
        })
    }, [hasPermissions]);

    return {steps, sleepDuration};
};

export default useHealthData;