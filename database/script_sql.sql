use db_controle_jogos_bb;


create table tbl_jogo (
	id int not null primary key auto_increment,
    nome varchar(80) not null,
    data_lancamento date not null,
    versao varchar(10) not null,
    tamanho varchar(10),
    descricao text,
    foto_capa varchar(200),
    link varchar(200)
);

show tables;
desc tbl_jogo;
select * from tbl_jogo;

create table tbl_desenvolvedores (
id_desenvolvedor int not null primary key auto_increment,
nome varchar (100) not null,
email varchar(50) not null,
cargo varchar (50) not null
);

show tables;
desc tbl_desenvolvedores;
select * from tbl_desenvolvedores;

create table tbl_empresa(
id_empresa int not null primary key auto_increment,
nome_empresa varchar (45) not null,
email varchar(50) not null,
cnpj int not null,
telefone varchar(45) not null,
id int not null,
foreign key (id) 
    references tbl_jogo(id)
);

show tables;
desc tbl_empresa;
select * from tbl_empresa;

create table tbl_idioma(
id_idioma int not null primary key auto_increment,
idioma varchar (45) not null
);

show tables;
desc tbl_idioma;
select * from tbl_idioma;

create table tbl_usuario(
id_usuario int not null primary key auto_increment,
idade int not null,
data_inscricao date not null,
nome varchar(100) not null,
id int not null,
foreign key (id) 
    references tbl_jogo(id)
);

show tables;
desc tbl_usuario;
select * from tbl_usuario;

create table tbl_jogo_desenvolvedor (
	id_jogo_desenvolvedor int not null primary key auto_increment,
    id		int not null,
    id_desenvolvedor int	not null,
	constraint FK_JOGO_JOGO_DESENVOLVEDOR
    foreign key (id) 
    references tbl_jogo(id),
    
    constraint FK_DESENVOLVEDOR_JOGO_DESENVOLVEDOR
    foreign key (id_desenvolvedor) 
    references tbl_desenvolvedores(id_desenvolvedor)
);

create table tbl_jogo_idioma(
	id_jogo_idioma int not null primary key auto_increment,
    id		int not null,
    id_idioma int	not null,
	constraint FK_JOGO_JOGO_IDIOMA
    foreign key (id) 
    references tbl_jogo(id),
    
    constraint FK_IDIOMA_JOGO_DESENVOLVEDOR
    foreign key (id_idioma) 
    references tbl_idioma(id_idioma)
);