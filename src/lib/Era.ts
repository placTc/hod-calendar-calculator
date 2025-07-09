export enum EraEnum {
    UniversalEra = "Universal Era",
    BeforeLaw = "Before Law",
    EraOfLaw = "Era Of Law",
    BeforeVeras = "Before Veras",
    VerasEra = "Veras Era",
    PostVeras = "Post-Veras"
}

export interface Era {
    name: EraEnum
    length: number
    before: boolean
    offset: number
}

export function makeEra(name: EraEnum, length: number, before: boolean = false, offset: number = 0): Era {
    return {name: name, length: length, before: before, offset: offset}
}