interface MonthlyVariance{
    variance: number;
    month: number;
    year: number;
}

export interface DataResponse{
    baseTemperature: number;
    monthlyVariance: MonthlyVariance[];
}