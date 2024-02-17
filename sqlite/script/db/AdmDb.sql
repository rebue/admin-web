DROP TABLE ADM_MENU;

CREATE TABLE ADM_MENU(
    ID INTEGER PRIMARY KEY,
    NAME varchar(50),
    TREE_CODE varchar(200),
    APP_CODE varchar(50),
    PATH varchar(50),
    COMPONENT varchar(500)
);