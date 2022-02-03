import { Coffee, CoffeeStocks, Stock } from "src/domain/entity/coffee.model";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'coffees',
})
export class CoffeeEntity {
    @PrimaryGeneratedColumn("uuid", {
        name: 'id',
    })
    id: string;

    @Column({
        name: 'user_id',
        type: 'uuid',
    })
    userId: string;

    @Column({
        name: 'name',
        type: 'text',
    })
    name: string;

    @Column({
        name: 'memo',
        type: 'text',
    })
    memo: string;

    @CreateDateColumn({
        type: 'timestamp',
        name: 'create_at'
    })
    createAt: Date;

    @OneToMany(() => CoffeeStockEntity, stock => stock.coffee)
    stocks: CoffeeStockEntity[];

    convert(): CoffeeStocks {
        return new CoffeeStocks(
            new Coffee(
                this.id,
                this.name,
                this.memo,
                this.createAt,
            ),
            this.stocks?.map(stock => stock.convert()) || [],
        );
    }

}

@Entity({
    name: 'coffee_stocks',
})
export class CoffeeStockEntity {
    @PrimaryGeneratedColumn("uuid", {
        name: 'id',
    })
    id: string;

    @Column({
        name: 'user_id',
        type: 'uuid',
    })
    userId: string;

    @Column({
        name: 'coffee_id',
        type: 'uuid',
    })
    coffeeId: string;

    @Column({
        name: 'amount',
        type: 'int',
    })
    amount: number;

    @Column({
        name: 'place',
        type: 'text',
    })
    place: string;

    @Column({
        name: 'memo',
        type: 'text',
    })
    memo: string;

    @CreateDateColumn({
        type: 'timestamp',
        name: 'create_at'
    })
    createAt: Date;

    @ManyToOne(() => CoffeeEntity, coffee=>coffee.stocks)
    @JoinColumn({
        name: 'coffee_id',
        referencedColumnName: 'id'
       })
    coffee: CoffeeEntity;

    convert(): Stock {
        return new Stock(
            this.id,
            this.amount,
            this.place,
            this.createAt,
            this.memo,
        );
    }
}