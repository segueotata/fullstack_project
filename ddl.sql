create Table if not exists profiles (
    id serial primary key,
    permissions int not null,
    username varchar(50) not null unique,
    email varchar(100) not null unique,
    password_hash varchar(255) not null,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp
)