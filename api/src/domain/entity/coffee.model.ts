export class Coffee {
    constructor(
        public id: string,
        public name: string,
        public memo: string,
        public createdAt: Date,
    ) { }
}
export class Stock {
    constructor(
        public id: string,
        public count: number,
        public place: string,
        public createdAt: Date,
        public memo?: string,
    ) {}
}

export class CoffeeStocks {
    constructor(
        public coffee: Coffee,
        public stocks: Stock[],
    ) {}

    countAllStock(): number {
        return this.stocks.map(s => s.count).reduce((pre, cu) => pre + cu);
    }
}

export class CreateStock {
    constructor(
        public count: number,
        public place: string,
        public memo?: string,
    ) {}
}

export class CreateCoffee {
    constructor(
        public name: string,
        public memo: string,
        public stocks: CreateStock[],
    ) { }

}

