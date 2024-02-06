export interface Operator{
    id: string;
    operator_id: string;
    firstname: string;
    state: string[];
    country: string;
    standards: Standard;
    contact_number: string;
    type: number;
    contact_person: string;
    address: string;
    email: string;
    approved: boolean;
}

export interface Standard{
    id: string;
    name: string;
    code: string;
    count: number;
    subunits: SubUnit[]
}

export interface SubUnit{
    status: number;
    name: string;
}