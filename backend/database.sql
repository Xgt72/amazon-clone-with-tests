SET
  SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

SET
  time_zone = "+00:00";

--
-- Structure de la table `user`
--
CREATE TABLE `user` (
  `id` INT(11) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `username` VARCHAR(255),
  `email` VARCHAR(255) UNIQUE NOT NULL,
  `hashedPassword` VARCHAR(255) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

--
-- Structure de la table `role`
--
CREATE TABLE `role` (
  `id` INT(11) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `title` VARCHAR(50) NOT NULL,
  `code` INT(4) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

--
-- Structure de la table `user_role`
--
CREATE TABLE `user_role`(
  `userId` INT(11) UNSIGNED NOT NULL,
  `roleId` INT(11) UNSIGNED NOT NULL,
  FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`roleId`) REFERENCES `role`(`id`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

--
-- Structure de la table `product`
--
CREATE TABLE `product` (
  `id` INT(11) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `price` DECIMAL(7, 2) NOT NULL DEFAULT 0.00,
  `image` VARCHAR(255),
  `rating` INT
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

--
-- Structure de la table `command`
--
CREATE TABLE `command` (
  `id` INT(11) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `userId` INT(11) UNSIGNED NOT NULL,
  `paymentIntentId` VARCHAR(255),
  `amount` DECIMAL(7, 2) NOT NULL DEFAULT 0.00,
  `created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

--
-- Structure de la table `basket`
--
CREATE TABLE `basket` (
  `id` INT(11) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `commandId` INT(11) UNSIGNED NOT NULL,
  `productId` INT(11) UNSIGNED NOT NULL,
  `quantity` INT UNSIGNED NOT NULL,
  FOREIGN KEY (`commandId`) REFERENCES `command`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`productId`) REFERENCES `product`(`id`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

--
-- Contenu de la table `role`
--
INSERT INTO
  role (title, code)
VALUES
  ('USER', 2001),
  ('EDITOR', 1984),
  ('ADMIN', 5150);