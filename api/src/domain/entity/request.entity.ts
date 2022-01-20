import { User } from "./user.entity";

export class RequestContext {
    constructor(
        public user: User,
        public pagination: PaginationContext,
    ) {}

    static fromRequest(request: any): RequestContext {
        var user: User;
        if (request.user instanceof User) {
            user = request.user;
        }
        const pagination = PaginationContext.fromRequest(request);
        return new RequestContext(user, pagination);
    }

}

export class PaginationContext {
    constructor(
        private _limit?: number,
        private _page?: number,
    ) {}

    static fromRequest(request: any): PaginationContext {
        
        const limit = request.limit as number || null;
        const page = request.page as number  || null;
    
        return new PaginationContext(limit, page);
    }

    public get limit(): number {
        return this._limit || 20;
    }

    public get page(): number {
        return this._page || 1;
    }

    get take(): number { 
        return this.limit; 
    }

    get skip(): number {
        return this.take * (this.page - 1);
    }
}

export class PaginationMetaData {
    constructor(
        public currentPage: number,
        public limit: number,
        public hasNext: boolean,
        public hasPrev: boolean,
        public count?: number,
        public page?: number,
    ) {}

        static from(context: PaginationContext, count: number) {
            const currentPage = context.page;
            const countPerPage = context.take;
            const page = (count / countPerPage | 0) + (count % countPerPage == 0 ? 0 : 1);
            const hasNext = page > currentPage;
            const hasPrev = currentPage > 1;
            return new PaginationMetaData(
                currentPage,
                context.limit,
                hasNext,
                hasPrev,
                count,
                page,
            )
        }

}

export class Pagination<T> {
    constructor(
        public data: T,
        public meta: PaginationMetaData,
    ) {}
}