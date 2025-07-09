import type { Era } from "./Era";
import { EraEnum, makeEra } from "./Era";
import type {YearEra} from "./YearEra";

export abstract class Calendar {
    eras!: Array<Era>;

    public fromYear(year: number): YearEra {
        let yearCopy = year;
        for (const era of this.eras) {
            if (era.length > yearCopy || Number.isNaN(era.length)) {
                let value = {era: era, year: yearCopy + era.offset};
                if (era.before) {
                    value.year = era.length - value.year;
                }
                return value;
            }

            yearCopy = yearCopy - era.length;
        }

        return {era: makeEra(EraEnum.UniversalEra, 0), year: 0}
    }

    public toYear(year_era: YearEra): number {
        let year = year_era.year;
        for (const era of this.eras) {
            if (era.name == year_era.era.name) {
                if (era.before) {
                    year = era.length - year
                }
                year = year - (era.offset ? era.offset : 0)
                break;
            } else {
                year = year + era.length
            }
        }

        return year;
    }
}

export class UniversalCalendar extends Calendar {
    eras: Array<Era>

    constructor() {
        super()
        this.eras = [makeEra(EraEnum.UniversalEra, NaN)];
    }

    public toString() {
        return "Universal Calendar";
    }
}

export class VerasCalendar extends Calendar {
    eras: Array<Era>

    constructor() {
        super()
        this.eras = [
            makeEra(EraEnum.BeforeVeras, 3071, true),
            makeEra(EraEnum.VerasEra, 1999, undefined, 1),
            makeEra(EraEnum.PostVeras, NaN)
        ];
    }

    public toString() {
        return "Veras Calendar";
    }
}

export class LawfulCalendar extends Calendar {
    eras: Array<Era>

    constructor() {
        super()
        this.eras = [
            makeEra(EraEnum.BeforeLaw, 1685, true),
            makeEra(EraEnum.EraOfLaw, NaN, undefined, 1)
        ];
    }

    public toString() {
        return "Baloshod Calendar";
    }
}