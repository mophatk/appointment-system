CREATE DATABASE socka;
CREATE TABLE IF NOT EXISTS `players` (
    `id` int(5) NOT NULL AUTO_INCREMENT,
    `first_name` varchar(255) NOT NULL,
    `last_name` varchar(255) NOT NULL,
    `position` varchar(255) NOT NULL,
    `number` int(11) NOT NULL,
    `image` varchar(255) NOT NULL,
    `user_name` varchar(20) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS `approved_players` (
    `id` int(5) NOT NULL AUTO_INCREMENT,
    `first_name` varchar(255) NOT NULL,
    `last_name` varchar(255) NOT NULL,
    `position` varchar(255) NOT NULL,
    `number` int(11) NOT NULL,
    `image` varchar(255) NOT NULL,
    `user_name` varchar(20) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS `appointments` (
    `id` int(5) NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    `email` varchar(255) NOT NULL,
    `reg_no` varchar(255) NOT NULL,
    `date` varchar(20) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

ALTER TABLE players
ADD email varchar(255);

CREATE TABLE IF NOT EXISTS `students` (
    `id` int(5) NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    `reg_no` varchar(255) NOT NULL,
    `email` varchar(255) NOT NULL,
    `amount` int(11) NOT NULL,
    `options` varchar(255) NOT NULL,
    `reasons` varchar(1000) NOT NULL,
    `image` varchar(255) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;
