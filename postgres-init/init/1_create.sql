-- UUID Extension
CREATE EXTENSION if not exists pgcrypto;

--ユーザーの作成
CREATE USER iluvcoffee;
--DBの作成
CREATE DATABASE iluvcoffee;
--ユーザーにDBの権限をまとめて付与
GRANT ALL PRIVILEGES ON DATABASE iluvcoffee TO iluvcoffee;
--ユーザーを切り替え
\c iluvcoffee

-- テーブル削除
DROP TABLE IF EXISTS public.users;
DROP TABLE IF EXISTS public.coffees;
DROP TABLE IF EXISTS public.coffee_stocks;
DROP TABLE IF EXISTS public.coffee_stock_activities;
DROP TABLE IF EXISTS public.stores;
DROP TABLE IF EXISTS public.receipts;


-- 初期テーブル作成
CREATE TABLE public.users (
    id uuid PRIMARY KEY DEFAULT(gen_random_uuid()),
    nickname text
);

CREATE TABLE public.coffees (
    id uuid PRIMARY KEY DEFAULT(gen_random_uuid()),
    user_id uuid,
    name text,
    create_at TIMESTAMP,
    foreign key (user_id) references public.users(id)
);

CREATE TABLE public.coffee_stocks (
    id uuid PRIMARY KEY DEFAULT(gen_random_uuid()),
    user_id uuid NOT NULL,
    coffee_id uuid NOT NULL,
    amount int,
    create_at TIMESTAMP,
    foreign key (user_id) references public.users(id),
    foreign key (coffee_id) references public.coffees(id)
);

CREATE TABLE public.coffee_stock_activities (
    id uuid PRIMARY KEY DEFAULT(gen_random_uuid()),
    coffee_stock_id uuid,
    amount integer,
    memo text,
    create_at TIMESTAMP,
    foreign key (coffee_stock_id) references public.coffee_stocks(id)
);

CREATE TABLE public.stores (
    id uuid PRIMARY KEY DEFAULT(gen_random_uuid()),
    user_id uuid NOT NULL,
    name text NOT NULL,
    address text,
    create_at TIMESTAMP,
    foreign key (user_id) references public.users(id)
);

CREATE TABLE public.receipts (
    id uuid PRIMARY KEY DEFAULT(gen_random_uuid()),
    activity_id uuid NOT NULL,
    store_id uuid,
    memo text,
    create_at TIMESTAMP,
	foreign key (activity_id) references public.coffee_stock_activities(id),
	foreign key (store_id) references public.stores(id)
);


