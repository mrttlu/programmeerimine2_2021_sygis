CREATE SCHEMA IF NOT EXISTS excuses;
USE excuses;
CREATE TABLE IF NOT EXISTS `excuses`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(45) NOT NULL,
  `lastName` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `dateCreated` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `dateDeleted` DATETIME NULL DEFAULT NULL,
  `dateUpdated` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `role` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE);
  
  CREATE TABLE IF NOT EXISTS `excuses`.`categories` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `dateCreated` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `dateDeleted` DATETIME NULL DEFAULT NULL,
  `dateUpdated` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `users_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_categories_users1_idx` (`users_id` ASC) VISIBLE,
  CONSTRAINT `fk_categories_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `excuses`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
CREATE TABLE IF NOT EXISTS `excuses`.`excuses` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(255) NOT NULL,
  `visibility` VARCHAR(45) NOT NULL,
  `dateCreated` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `dateDeleted` DATETIME NULL DEFAULT NULL,
  `dateUpdated` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `users_id` INT NOT NULL,
  `categories_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_excuses_users_idx` (`users_id` ASC) VISIBLE,
  INDEX `fk_excuses_categories1_idx` (`categories_id` ASC) VISIBLE,
  CONSTRAINT `fk_excuses_users`
    FOREIGN KEY (`users_id`)
    REFERENCES `excuses`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_excuses_categories1`
    FOREIGN KEY (`categories_id`)
    REFERENCES `excuses`.`categories` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

INSERT INTO users(firstName, lastName, email, password, role) VALUES
  ('Admin', 'Admin', 'admin@admin.ee', '$2b$10$nevnzRS0jBjFh.KEYSoQ6u75M7FdLA7vXEgbbV9iHfU7W/.6W9hFa', 'Admin'),
  ('Juku', 'Juurikas', 'juku@juurikas.ee', '$2b$10$AkiS2VBzORkDESiXYOc2L.dFgZBykCDAnb5R1F41wp0sSfcPmhl9C', 'User');
INSERT INTO categories(name, users_id) VALUES
  ('Kool', 1),
  ('Töö', 2);
INSERT INTO excuses(description, categories_id, users_id, visibility) VALUES
  ('Ei tahtnud teha', 1, 1, 'Public'),
  ('Ei osanud', 2, 1, 'Private'),
  ('Ei viitsinud', 1, 2, 'Public'),
  ('Ei teadnud, et oleks vaja midagi teha', 2, 2, 'Public');
  