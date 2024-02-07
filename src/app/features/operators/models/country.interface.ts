export interface Country{
    [country:string]: CountryHelper
}

export interface CountryHelper{
    dial_code: string;
    alpha_2: string;
    tin?: string;
    sub_divisions: SubDivision
}

export interface SubDivision{
    [subDivision: string]: SubDivisionHelper
}

export interface SubDivisionHelper{
    id: number;
    name: string;
    code: string;
    latitude: string;
    longitude: string;
}

export interface FormatedCountry{
    id: string;
    name: string;
    dial_code: string;
    alpha_2: string;
    tin?:string
    sub_divisions: SubDivisionHelper[]
}