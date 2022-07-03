--
-- Base de données :  `amazon_clone_with_test`
--
-- --------------------------------------------------------
--
-- Structure de la table `user`
--
CREATE TABLE `user` (
  `id` int(11) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `username` varchar(255),
  `email` varchar(255) UNIQUE NOT NULL,
  `hashedPassword` varchar(255) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

-- --------------------------------------------------------
--
-- Structure de la table `role`
--
CREATE TABLE `role`(
  `id` int(11) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `title` VARCHAR(50) NOT NULL,
  `code` INT(4) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

-- --------------------------------------------------------
--
-- Structure de la table `user_role`
--
CREATE TABLE `user_role`(
  `userId` int(11) UNSIGNED NOT NULL,
  `roleId` int(11) UNSIGNED NOT NULL,
  FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`roleId`) REFERENCES `role`(`id`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

-- --------------------------------------------------------
INSERT INTO
  role (title, code)
VALUES
  ('USER', 2001),
  ('EDITOR', 1984),
  ('ADMIN', 5150);