export interface IType {
    name: string;
    color: string;
}

export interface IStats {
    name: string;
    value: number;
}

export interface IPokemon {
    id: number;
    name: string;
    image: string;
    largeImage: string;
    description: string;
    weight: number;
    height: number;
    type: IType[];
    stats: IStats[];
    weakness?: IType[];
    strongness?: IType[];
}
