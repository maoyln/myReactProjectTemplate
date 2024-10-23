interface MaterialDetail {
    productionValue: number;
    designAmount: number;
    rate: number;
    attr: string;
    name: string;
    sort: number;
    deviationType: 'NORMAL' | 'HIGH' | 'LOW';
    materialType: string;
}

interface Material {
    mixingStationName: string;
    timeStamp: number;
    plateVolume: number;
    workPointName: string;
    beam: string;
    projectPartId: string;
    beamSpan: string;
    plateTimes: string;
    wbsName: string;
    strengthGrade: string;
    deviceName: string;
    deviceId: string;
    materialDetails: MaterialDetail[];
}

interface Column {
    attr: string;
    name: string;
}

interface Result {
    columns: Column[];
    materials: Material[];
}

export interface MockData {
    returnCode: number;
    errorMsg: string;
    detail: {};
    result: Result;
}
