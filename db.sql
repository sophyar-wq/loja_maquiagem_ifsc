-- ============================================================
--  Banco de Dados - loja_maquiagem
--  Baseado no server.js do projeto formularioBD
-- ============================================================

CREATE DATABASE IF NOT EXISTS loja_maquiagem
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE loja_maquiagem;

-- ------------------------------------------------------------
--  Tabela: usuarios
--  Usada pelas rotas POST /usuarios e POST /login
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS usuarios (
  id        INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  nome      VARCHAR(100)  NOT NULL,
  email     VARCHAR(150)  NOT NULL UNIQUE,
  senha     VARCHAR(255)  NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

select * from usuarios;