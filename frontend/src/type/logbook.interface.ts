export interface LogbookTableInterface {
    id: number;
    plane: string;
    start: {
        date: string;
        place: string;
    },
    end: {
        date: string;
        place: string;
    }
}