SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
-- -----------------------------------------------------
-- Schema bsi_new_model
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `bsi_new_model` DEFAULT CHARACTER SET latin1 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `bsi_new_model`.`agreement`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`agreement` (
  `id` INT(11) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `bsi_new_model`.`agreement_item`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`agreement_item` (
  `id` INT(11) NOT NULL,
  `agreement_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_agreement_item_agreement1_idx` (`agreement_id` ASC),
  CONSTRAINT `fk_agreement_item_agreement1`
    FOREIGN KEY (`agreement_id`)
    REFERENCES `bsi_new_model`.`agreement` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `bsi_new_model`.`price_component`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`price_component` (
  `id` INT(11) NOT NULL,
  `agreement_item_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_price_component_agreement_item1_idx` (`agreement_item_id` ASC),
  CONSTRAINT `fk_price_component_agreement_item1`
    FOREIGN KEY (`agreement_item_id`)
    REFERENCES `bsi_new_model`.`agreement_item` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `bsi_new_model`.`goods`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`goods` (
  `id` INT(11) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `satuan` VARCHAR(10) NOT NULL,
  `value` INT(11) NOT NULL,
  `brand` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `bsi_new_model`.`part`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`part` (
  `id` INT(11) NOT NULL,
  `part_type` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `bsi_new_model`.`service`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`service` (
  `id` INT(11) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `bsi_new_model`.`product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`product` (
  `id` INT(11) NOT NULL,
  `goods_id` INT(11) NULL DEFAULT NULL,
  `part_id` INT(11) NULL DEFAULT NULL,
  `service_id` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_product_part1_idx` (`part_id` ASC),
  INDEX `fk_product_service1_idx` (`service_id` ASC),
  INDEX `fk_product_goods1` (`goods_id` ASC),
  CONSTRAINT `fk_product_goods1`
    FOREIGN KEY (`goods_id`)
    REFERENCES `bsi_new_model`.`goods` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_product_part1`
    FOREIGN KEY (`part_id`)
    REFERENCES `bsi_new_model`.`part` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_product_service1`
    FOREIGN KEY (`service_id`)
    REFERENCES `bsi_new_model`.`service` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `bsi_new_model`.`product_feature`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`product_feature` (
  `id` INT(11) NOT NULL,
  `product_id` INT(11) NULL DEFAULT NULL,
  `color` VARCHAR(45) NULL DEFAULT NULL,
  `size` VARCHAR(45) NULL DEFAULT NULL,
  `price_component_id` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_product_feature_product1_idx` (`product_id` ASC),
  INDEX `fk_product_feature_price_component1_idx` (`price_component_id` ASC),
  CONSTRAINT `fk_product_feature_price_component1`
    FOREIGN KEY (`price_component_id`)
    REFERENCES `bsi_new_model`.`price_component` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_product_feature_product1`
    FOREIGN KEY (`product_id`)
    REFERENCES `bsi_new_model`.`product` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `bsi_new_model`.`work_center`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`work_center` (
  `id` INT(11) NOT NULL,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `company_name` VARCHAR(45) NULL DEFAULT NULL,
  `oee_target` INT(11) NULL DEFAULT NULL,
  `prod_capacity` INT(11) NULL DEFAULT NULL,
  `work_hours` INT(11) NULL DEFAULT NULL,
  `cost_per_hour` INT(11) NULL DEFAULT NULL,
  `labor_alloc` INT(11) NOT NULL,
  `description` VARCHAR(45) NULL DEFAULT NULL,
  `overhead_cost` INT(11) NOT NULL COMMENT 'this variable which occurs cost to run a work center',
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `mydb`.`production_study`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`production_study` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `product_feature_id` INT(11) NOT NULL,
  `work_center_id` INT(11) NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_production_study_product_feature_idx` (`product_feature_id` ASC),
  INDEX `fk_production_study_work_center1_idx` (`work_center_id` ASC),
  CONSTRAINT `fk_production_study_product_feature`
    FOREIGN KEY (`product_feature_id`)
    REFERENCES `bsi_new_model`.`product_feature` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_production_study_work_center1`
    FOREIGN KEY (`work_center_id`)
    REFERENCES `bsi_new_model`.`work_center` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

USE `bsi_new_model` ;

-- -----------------------------------------------------
-- Table `bsi_new_model`.`agreement_role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`agreement_role` (
  `id` INT(11) NOT NULL,
  `agreement_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_agreement_role_agreement1_idx` (`agreement_id` ASC),
  CONSTRAINT `fk_agreement_role_agreement1`
    FOREIGN KEY (`agreement_id`)
    REFERENCES `bsi_new_model`.`agreement` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `bsi_new_model`.`organization`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`organization` (
  `id` INT(11) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `bsi_new_model`.`person`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`person` (
  `id` INT(11) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `bsi_new_model`.`party`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`party` (
  `id` INT(11) NOT NULL,
  `person_party_id` INT(11) NULL DEFAULT NULL,
  `name` VARCHAR(50) NOT NULL,
  `email` VARCHAR(50) NOT NULL,
  `npwp` VARCHAR(20) NOT NULL,
  `agreement_role_id` INT(11) NULL DEFAULT NULL,
  `organization_party_id` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_party_person1_idx` (`person_party_id` ASC),
  INDEX `fk_party_agreement_role1_idx` (`agreement_role_id` ASC),
  INDEX `fk_party_organization1_idx` (`organization_party_id` ASC),
  CONSTRAINT `fk_party_agreement_role1`
    FOREIGN KEY (`agreement_role_id`)
    REFERENCES `bsi_new_model`.`agreement_role` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_party_organization1`
    FOREIGN KEY (`organization_party_id`)
    REFERENCES `bsi_new_model`.`organization` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_party_person1`
    FOREIGN KEY (`person_party_id`)
    REFERENCES `bsi_new_model`.`person` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `bsi_new_model`.`address`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`address` (
  `id` INT(11) NOT NULL,
  `party_id` INT(11) NULL DEFAULT NULL,
  `city` VARCHAR(50) NOT NULL,
  `province` VARCHAR(50) NOT NULL,
  `country` VARCHAR(50) NOT NULL,
  `street` VARCHAR(255) NOT NULL,
  `postal_code` INT(10) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_address_party1_idx` (`party_id` ASC),
  CONSTRAINT `fk_address_party1`
    FOREIGN KEY (`party_id`)
    REFERENCES `bsi_new_model`.`party` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `bsi_new_model`.`bom`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`bom` (
  `id` INT(11) NOT NULL,
  `product_id` INT(11) NOT NULL,
  `product_feature_id` INT(11) NULL DEFAULT NULL,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `qty` VARCHAR(45) NULL DEFAULT NULL,
  `company_name` VARCHAR(45) NULL DEFAULT NULL,
  `start_date` DATE NOT NULL,
  `end_date` DATE NOT NULL,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_bom_product_feature_id_idx` (`product_feature_id` ASC),
  INDEX `fk_bom_product_id_idx` (`product_id` ASC),
  CONSTRAINT `fk_bom_product_feature_id`
    FOREIGN KEY (`product_feature_id`)
    REFERENCES `bsi_new_model`.`product_feature` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_bom_product_id`
    FOREIGN KEY (`product_id`)
    REFERENCES `bsi_new_model`.`product` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `bsi_new_model`.`bom_component`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`bom_component` (
  `id` INT(11) NOT NULL,
  `bom_id` INT(11) NOT NULL,
  `product_feature_id` INT(11) NOT NULL,
  `qty` INT(11) NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_bom_component_bom1_idx` (`bom_id` ASC),
  INDEX `fk_bom_component_product_feature1_idx` (`product_feature_id` ASC),
  CONSTRAINT `fk_bom_component_bom1`
    FOREIGN KEY (`bom_id`)
    REFERENCES `bsi_new_model`.`bom` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_bom_component_product_feature1`
    FOREIGN KEY (`product_feature_id`)
    REFERENCES `bsi_new_model`.`product_feature` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `bsi_new_model`.`factory`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`factory` (
  `id` INT(11) NOT NULL,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `bsi_new_model`.`request`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`request` (
  `id` INT(11) NOT NULL,
  `req_type` VARCHAR(15) NULL DEFAULT NULL,
  `party_id` INT(11) NULL DEFAULT NULL,
  `ship_to` INT(11) NULL DEFAULT NULL,
  `po_number` VARCHAR(150) NULL DEFAULT NULL,
  `po_date` DATE NULL DEFAULT NULL,
  `delivery_date` DATE NOT NULL,
  `valid_to` DATE NOT NULL,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_request_buyer1_idx` (`party_id` ASC),
  INDEX `fk_request_buyer_idx` (`party_id` ASC, `ship_to` ASC),
  INDEX `fk_request_buyer_shipment1` (`ship_to` ASC),
  CONSTRAINT `fk_request_buyer1`
    FOREIGN KEY (`party_id`)
    REFERENCES `bsi_new_model`.`party` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_request_buyer_shipment1`
    FOREIGN KEY (`ship_to`)
    REFERENCES `bsi_new_model`.`party` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `bsi_new_model`.`quote`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`quote` (
  `id` INT(11) NOT NULL,
  `request_id` INT(11) NULL DEFAULT NULL,
  `po_number` VARCHAR(150) NOT NULL,
  `party_id` INT(11) NULL DEFAULT NULL COMMENT 'It could be contain of information vendor or buyer',
  `ship_to` INT(11) NULL DEFAULT NULL,
  `issue_date` DATE NOT NULL,
  `valid_thru` DATE NOT NULL,
  `delivery_date` DATE NOT NULL,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_at` TIMESTAMP NOT NULL DEFAULT '0000-00-00 00:00:00',
  `quote_type` VARCHAR(12) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_quote_request1_idx` (`request_id` ASC),
  INDEX `fk_quote_buyer1` (`party_id` ASC),
  INDEX `fk_quote_buyer2` (`ship_to` ASC),
  CONSTRAINT `fk_quote_buyer1`
    FOREIGN KEY (`party_id`)
    REFERENCES `bsi_new_model`.`party` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_quote_buyer2`
    FOREIGN KEY (`ship_to`)
    REFERENCES `bsi_new_model`.`party` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_quote_request1`
    FOREIGN KEY (`request_id`)
    REFERENCES `bsi_new_model`.`request` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `bsi_new_model`.`sales_order`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`sales_order` (
  `id` INT(11) NOT NULL,
  `po_number` VARCHAR(50) NOT NULL,
  `order_id` INT(11) NULL DEFAULT NULL,
  `sold_to` INT(11) NULL DEFAULT NULL,
  `ship_to` INT(11) NULL DEFAULT NULL,
  `issue_date` DATE NOT NULL,
  `delivery_date` DATE NOT NULL,
  `valid_thru` DATE NOT NULL,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_at` TIMESTAMP NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  INDEX `fk_sales_order_order1_idx` (`order_id` ASC),
  INDEX `fk_sales_order_buyer1` (`sold_to` ASC),
  INDEX `fk_sales_order_buyer2` (`ship_to` ASC),
  CONSTRAINT `fk_sales_order_buyer1`
    FOREIGN KEY (`sold_to`)
    REFERENCES `bsi_new_model`.`party` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_sales_order_buyer2`
    FOREIGN KEY (`ship_to`)
    REFERENCES `bsi_new_model`.`party` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_sales_order_order1`
    FOREIGN KEY (`order_id`)
    REFERENCES `bsi_new_model`.`order` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `bsi_new_model`.`order`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`order` (
  `id` INT(11) NOT NULL,
  `sales_order_id` INT(11) NULL DEFAULT NULL,
  `purchase_order_id` INT(11) NULL DEFAULT NULL,
  `quote_id` INT(11) NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_order_sales_order1_idx` (`sales_order_id` ASC),
  INDEX `fk_order_purchase_order1_idx` (`purchase_order_id` ASC),
  INDEX `fk_order_quote1_idx` (`quote_id` ASC),
  CONSTRAINT `fk_order_purchase_order1`
    FOREIGN KEY (`purchase_order_id`)
    REFERENCES `bsi_new_model`.`purchase_order` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_order_quote1`
    FOREIGN KEY (`quote_id`)
    REFERENCES `bsi_new_model`.`quote` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_order_sales_order1`
    FOREIGN KEY (`sales_order_id`)
    REFERENCES `bsi_new_model`.`sales_order` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `bsi_new_model`.`purchase_order`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`purchase_order` (
  `id` INT(11) NOT NULL,
  `order_id` INT(11) NULL DEFAULT NULL,
  `po_number` VARCHAR(45) NOT NULL,
  `bought_from` INT(11) NOT NULL,
  `issue_date` DATE NOT NULL,
  `delivery_date` DATE NOT NULL,
  `valid_thru` DATE NOT NULL,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_purchase_order_order1_idx` (`order_id` ASC),
  CONSTRAINT `fk_purchase_order_order1`
    FOREIGN KEY (`order_id`)
    REFERENCES `bsi_new_model`.`order` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `bsi_new_model`.`goods_receipt`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`goods_receipt` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `purchase_order_id` INT(11) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_goods_receipt_purchase_order1_idx` (`purchase_order_id` ASC),
  CONSTRAINT `fk_goods_receipt_purchase_order1`
    FOREIGN KEY (`purchase_order_id`)
    REFERENCES `bsi_new_model`.`purchase_order` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 10
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `bsi_new_model`.`order_item`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`order_item` (
  `id` INT(11) NOT NULL,
  `order_id` INT(11) NOT NULL,
  `qty` INT(45) NULL DEFAULT NULL,
  `unit_price` INT(45) NULL DEFAULT NULL,
  `shipment_estimated` DATE NULL DEFAULT NULL,
  `product_feature_id` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`, `order_id`),
  INDEX `fk_order_item_order_id1` (`order_id` ASC),
  INDEX `order_id` (`order_id` ASC),
  INDEX `fk_order_item_product_id1_idx` (`product_feature_id` ASC),
  CONSTRAINT `fk_order_item_order_id1`
    FOREIGN KEY (`order_id`)
    REFERENCES `bsi_new_model`.`order` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_order_item_product_id1`
    FOREIGN KEY (`product_feature_id`)
    REFERENCES `bsi_new_model`.`product_feature` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `bsi_new_model`.`goods_receipt_items`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`goods_receipt_items` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `goods_receipt_id` INT(11) NULL DEFAULT NULL,
  `order_item_id` INT(11) NULL DEFAULT NULL,
  `order_item_order_id` INT(11) NULL DEFAULT NULL,
  `qty_received` INT(11) NULL DEFAULT NULL,
  `qty_on_receipt` INT(11) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_goods_receipt_items_goods_receipt1_idx` (`goods_receipt_id` ASC),
  INDEX `fk_goods_receipt_items_order_item1_idx` (`order_item_id` ASC, `order_item_order_id` ASC),
  CONSTRAINT `fk_goods_receipt_items_goods_receipt1`
    FOREIGN KEY (`goods_receipt_id`)
    REFERENCES `bsi_new_model`.`goods_receipt` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_goods_receipt_items_order_item1`
    FOREIGN KEY (`order_item_id` , `order_item_order_id`)
    REFERENCES `bsi_new_model`.`order_item` (`id` , `order_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 8
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `bsi_new_model`.`inventory_type`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`inventory_type` (
  `id` INT(11) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `bsi_new_model`.`inventory`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`inventory` (
  `id` INT(11) NOT NULL,
  `inventory_type_id` INT(11) NOT NULL,
  `product_id` INT(11) NOT NULL,
  `qty_on_hand` INT(11) NULL DEFAULT NULL,
  `factory_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_inventory_inventory_type1_idx` (`inventory_type_id` ASC),
  INDEX `fk_inventory_product1_idx` (`product_id` ASC),
  INDEX `fk_inventory_factory1_idx` (`factory_id` ASC),
  CONSTRAINT `fk_inventory_factory1`
    FOREIGN KEY (`factory_id`)
    REFERENCES `bsi_new_model`.`factory` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_inventory_inventory_type1`
    FOREIGN KEY (`inventory_type_id`)
    REFERENCES `bsi_new_model`.`inventory_type` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_inventory_product1`
    FOREIGN KEY (`product_id`)
    REFERENCES `bsi_new_model`.`product` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `bsi_new_model`.`invoice_receipt`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`invoice_receipt` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `purchase_order_id` INT(11) NULL DEFAULT NULL,
  `amount` VARCHAR(45) NULL DEFAULT NULL,
  `qty` VARCHAR(45) NULL DEFAULT NULL,
  `invoice_date` VARCHAR(45) NULL DEFAULT NULL,
  `posting_date` VARCHAR(45) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_invoice_receipt_purchase_order1_idx` (`purchase_order_id` ASC),
  CONSTRAINT `fk_invoice_receipt_purchase_order1`
    FOREIGN KEY (`purchase_order_id`)
    REFERENCES `bsi_new_model`.`purchase_order` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `bsi_new_model`.`invoice_receipt_items`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`invoice_receipt_items` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `invoice_receipt_id` INT(11) NULL DEFAULT NULL,
  `order_item_id` INT(11) NULL DEFAULT NULL,
  `order_item_order_id` INT(11) NULL DEFAULT NULL,
  `amount` VARCHAR(45) NULL DEFAULT NULL,
  `qty` VARCHAR(45) NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_invoice_receipt_items_invoice_receipt1_idx` (`invoice_receipt_id` ASC),
  INDEX `fk_invoice_receipt_items_order_item1_idx` (`order_item_id` ASC, `order_item_order_id` ASC),
  CONSTRAINT `fk_invoice_receipt_items_invoice_receipt1`
    FOREIGN KEY (`invoice_receipt_id`)
    REFERENCES `bsi_new_model`.`invoice_receipt` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_invoice_receipt_items_order_item1`
    FOREIGN KEY (`order_item_id` , `order_item_order_id`)
    REFERENCES `bsi_new_model`.`order_item` (`id` , `order_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 8
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `bsi_new_model`.`shipment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`shipment` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `delivery_date` DATE NOT NULL,
  `total_weight` INT(11) NOT NULL,
  `updated_at` TIMESTAMP NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `bsi_new_model`.`shipment_item`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`shipment_item` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `shipment_id` INT(11) NOT NULL,
  `product_feature_id` INT(11) NOT NULL,
  `qty_shipped` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_shipment_item_order_shipment1_idx` (`shipment_id` ASC),
  INDEX `fk_product_feature` (`product_feature_id` ASC),
  CONSTRAINT `fk_shipment_item_product_feature`
    FOREIGN KEY (`product_feature_id`)
    REFERENCES `bsi_new_model`.`product_feature` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_shipment_item_shipment1`
    FOREIGN KEY (`shipment_id`)
    REFERENCES `bsi_new_model`.`shipment` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `bsi_new_model`.`item_issuance`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`item_issuance` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `shipment_item_id` INT(11) NOT NULL,
  `item_issued` INT(11) NOT NULL,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `shipment` (`shipment_item_id` ASC),
  CONSTRAINT `shipment_item_fk`
    FOREIGN KEY (`shipment_item_id`)
    REFERENCES `bsi_new_model`.`shipment_item` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `bsi_new_model`.`machine_used_by_work_center`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`machine_used_by_work_center` (
  `id` INT(11) NOT NULL,
  `work_center_id` INT(11) NOT NULL,
  `product_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_machine_used_by_work_center_work_center1_idx` (`work_center_id` ASC),
  INDEX `fk_machine_used_by_work_center_product1_idx` (`product_id` ASC),
  CONSTRAINT `fk_machine_used_by_work_center_product1`
    FOREIGN KEY (`product_id`)
    REFERENCES `bsi_new_model`.`product` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_machine_used_by_work_center_work_center1`
    FOREIGN KEY (`work_center_id`)
    REFERENCES `bsi_new_model`.`work_center` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `bsi_new_model`.`manufacture`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`manufacture` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `party_id` INT(11) NOT NULL,
  `qty` INT(11) NULL DEFAULT NULL,
  `scheduled_date` DATETIME NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_manufacture_party1_idx` (`party_id` ASC),
  CONSTRAINT `fk_manufacture_party1`
    FOREIGN KEY (`party_id`)
    REFERENCES `bsi_new_model`.`party` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `bsi_new_model`.`manufacture_component`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`manufacture_component` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `manufacture_id` INT(11) NOT NULL,
  `bom_item_id` INT(11) NOT NULL,
  `qty_to_be_consume` INT(11) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_manufacture_consumption_item_manufacture1_idx` (`manufacture_id` ASC),
  INDEX `fk_manufacture_component_bom_item1_idx` (`bom_item_id` ASC),
  CONSTRAINT `fk_manufacture_component_bom_item1`
    FOREIGN KEY (`bom_item_id`)
    REFERENCES `bsi_new_model`.`bom_item` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_manufacture_consumption_item_manufacture1`
    FOREIGN KEY (`manufacture_id`)
    REFERENCES `bsi_new_model`.`manufacture` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `bsi_new_model`.`manufacture_has_bom`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`manufacture_has_bom` (
  `manufacture_id` INT(11) NOT NULL,
  `bom_id` INT(11) NOT NULL,
  PRIMARY KEY (`manufacture_id`, `bom_id`),
  INDEX `fk_manufacture_has_bom_bom1_idx` (`bom_id` ASC),
  INDEX `fk_manufacture_has_bom_manufacture1_idx` (`manufacture_id` ASC),
  CONSTRAINT `fk_manufacture_has_bom_bom1`
    FOREIGN KEY (`bom_id`)
    REFERENCES `bsi_new_model`.`bom` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_manufacture_has_bom_manufacture1`
    FOREIGN KEY (`manufacture_id`)
    REFERENCES `bsi_new_model`.`manufacture` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `bsi_new_model`.`manufacture_status_type`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`manufacture_status_type` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `description` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `bsi_new_model`.`manufacture_status`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`manufacture_status` (
  `manufacture_status_type_id` INT(11) NOT NULL,
  `manufacture_id` INT(11) NOT NULL,
  PRIMARY KEY (`manufacture_status_type_id`, `manufacture_id`),
  INDEX `fk_manufacture_status_type_has_manufacture_manufacture1_idx` (`manufacture_id` ASC),
  INDEX `fk_manufacture_status_type_has_manufacture_manufacture_stat_idx` (`manufacture_status_type_id` ASC),
  CONSTRAINT `fk_manufacture_status_type_has_manufacture_manufacture1`
    FOREIGN KEY (`manufacture_id`)
    REFERENCES `bsi_new_model`.`manufacture` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_manufacture_status_type_has_manufacture_manufacture_status1`
    FOREIGN KEY (`manufacture_status_type_id`)
    REFERENCES `bsi_new_model`.`manufacture_status_type` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `bsi_new_model`.`manufacture_work_order`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`manufacture_work_order` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `manufacture_id` INT(11) NOT NULL,
  `work_center_id` INT(11) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_manufacture_work_order_manufacture1_idx` (`manufacture_id` ASC),
  INDEX `fk_manufacture_work_order_work_center1_idx` (`work_center_id` ASC),
  CONSTRAINT `fk_manufacture_work_order_manufacture1`
    FOREIGN KEY (`manufacture_id`)
    REFERENCES `bsi_new_model`.`manufacture` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_manufacture_work_order_work_center1`
    FOREIGN KEY (`work_center_id`)
    REFERENCES `bsi_new_model`.`work_center` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `bsi_new_model`.`migrations`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`migrations` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `migration` VARCHAR(191) CHARACTER SET 'utf8mb4' NOT NULL,
  `batch` INT(11) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 9
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `bsi_new_model`.`permissions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`permissions` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(191) CHARACTER SET 'utf8mb4' NOT NULL,
  `guard_name` VARCHAR(191) CHARACTER SET 'utf8mb4' NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `bsi_new_model`.`model_has_permissions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`model_has_permissions` (
  `permission_id` INT(10) UNSIGNED NOT NULL,
  `model_type` VARCHAR(191) CHARACTER SET 'utf8mb4' NOT NULL,
  `model_id` BIGINT(20) UNSIGNED NOT NULL,
  INDEX `model_has_permissions_permission_id_foreign` (`permission_id` ASC),
  CONSTRAINT `model_has_permissions_permission_id_foreign`
    FOREIGN KEY (`permission_id`)
    REFERENCES `bsi_new_model`.`permissions` (`id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `bsi_new_model`.`roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`roles` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(191) CHARACTER SET 'utf8mb4' NOT NULL,
  `guard_name` VARCHAR(191) CHARACTER SET 'utf8mb4' NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `bsi_new_model`.`model_has_roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`model_has_roles` (
  `role_id` INT(10) UNSIGNED NOT NULL,
  `model_type` VARCHAR(191) CHARACTER SET 'utf8mb4' NOT NULL,
  `model_id` BIGINT(20) UNSIGNED NOT NULL,
  INDEX `model_has_roles_role_id_foreign` (`role_id` ASC),
  CONSTRAINT `model_has_roles_role_id_foreign`
    FOREIGN KEY (`role_id`)
    REFERENCES `bsi_new_model`.`roles` (`id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `bsi_new_model`.`oauth_access_tokens`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`oauth_access_tokens` (
  `id` VARCHAR(100) CHARACTER SET 'utf8mb4' NOT NULL,
  `user_id` BIGINT(20) NULL DEFAULT NULL,
  `client_id` INT(10) UNSIGNED NOT NULL,
  `name` VARCHAR(191) CHARACTER SET 'utf8mb4' NULL DEFAULT NULL,
  `scopes` TEXT CHARACTER SET 'utf8mb4' NULL DEFAULT NULL,
  `revoked` TINYINT(1) NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `expires_at` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `oauth_access_tokens_user_id_index` (`user_id` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `bsi_new_model`.`oauth_auth_codes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`oauth_auth_codes` (
  `id` VARCHAR(100) CHARACTER SET 'utf8mb4' NOT NULL,
  `user_id` BIGINT(20) NOT NULL,
  `client_id` INT(10) UNSIGNED NOT NULL,
  `scopes` TEXT CHARACTER SET 'utf8mb4' NULL DEFAULT NULL,
  `revoked` TINYINT(1) NOT NULL,
  `expires_at` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `bsi_new_model`.`oauth_clients`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`oauth_clients` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` BIGINT(20) NULL DEFAULT NULL,
  `name` VARCHAR(191) CHARACTER SET 'utf8mb4' NOT NULL,
  `secret` VARCHAR(100) CHARACTER SET 'utf8mb4' NOT NULL,
  `redirect` TEXT CHARACTER SET 'utf8mb4' NOT NULL,
  `personal_access_client` TINYINT(1) NOT NULL,
  `password_client` TINYINT(1) NOT NULL,
  `revoked` TINYINT(1) NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `oauth_clients_user_id_index` (`user_id` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `bsi_new_model`.`oauth_personal_access_clients`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`oauth_personal_access_clients` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `client_id` INT(10) UNSIGNED NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `oauth_personal_access_clients_client_id_index` (`client_id` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `bsi_new_model`.`oauth_refresh_tokens`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`oauth_refresh_tokens` (
  `id` VARCHAR(100) CHARACTER SET 'utf8mb4' NOT NULL,
  `access_token_id` VARCHAR(100) CHARACTER SET 'utf8mb4' NOT NULL,
  `revoked` TINYINT(1) NOT NULL,
  `expires_at` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `oauth_refresh_tokens_access_token_id_index` (`access_token_id` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `bsi_new_model`.`operation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`operation` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `seq` INT(11) NULL DEFAULT NULL,
  `work_center_id` INT(11) NOT NULL,
  `bom_id` INT(11) NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_at` TIMESTAMP NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  INDEX `fk_operation_work_center1_idx` (`work_center_id` ASC),
  INDEX `fk_operation_routing1_idx` (`bom_id` ASC),
  CONSTRAINT `fk_operation_bom1`
    FOREIGN KEY (`bom_id`)
    REFERENCES `bsi_new_model`.`bom` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_operation_work_center1`
    FOREIGN KEY (`work_center_id`)
    REFERENCES `bsi_new_model`.`work_center` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 7564
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `bsi_new_model`.`order_association`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`order_association` (
  `sales_order_id` INT(11) NOT NULL,
  `purchase_order_id` INT(11) NOT NULL,
  INDEX `fk_order_association_sales_order_idx` (`sales_order_id` ASC),
  INDEX `fk_order_association_purchase_order1_idx` (`purchase_order_id` ASC),
  CONSTRAINT `fk_order_association_purchase_order1`
    FOREIGN KEY (`purchase_order_id`)
    REFERENCES `bsi_new_model`.`purchase_order` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_order_association_sales_order`
    FOREIGN KEY (`sales_order_id`)
    REFERENCES `bsi_new_model`.`sales_order` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `bsi_new_model`.`order_item_has_goods`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`order_item_has_goods` (
  `order_item_id` INT(11) NOT NULL,
  `order_item_order_id` INT(11) NOT NULL,
  `goods_id` INT(11) NOT NULL,
  PRIMARY KEY (`order_item_id`, `order_item_order_id`, `goods_id`),
  INDEX `fk_order_item_has_goods_goods1_idx` (`goods_id` ASC),
  INDEX `fk_order_item_has_goods_order_item1_idx` (`order_item_id` ASC, `order_item_order_id` ASC),
  CONSTRAINT `fk_order_item_has_goods_goods1`
    FOREIGN KEY (`goods_id`)
    REFERENCES `bsi_new_model`.`goods` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_order_item_has_goods_order_item1`
    FOREIGN KEY (`order_item_id` , `order_item_order_id`)
    REFERENCES `bsi_new_model`.`order_item` (`id` , `order_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `bsi_new_model`.`order_item_has_product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`order_item_has_product` (
  `order_item_id` INT(11) NOT NULL,
  `product_feature_id` INT(11) NOT NULL,
  INDEX `fk_order_item_has_product_feature_product_feature1_idx` (`product_feature_id` ASC),
  INDEX `fk_order_item_has_product_feature_order_item1_idx` (`order_item_id` ASC),
  CONSTRAINT `fk_order_item_has_product_feature_order_item1`
    FOREIGN KEY (`order_item_id`)
    REFERENCES `bsi_new_model`.`order_item` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_order_item_has_product_feature_product_feature1`
    FOREIGN KEY (`product_feature_id`)
    REFERENCES `bsi_new_model`.`product_feature` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `bsi_new_model`.`order_item_shipment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`order_item_shipment` (
  `order_item_id` INT(11) NOT NULL,
  `order_item_order_id` INT(11) NOT NULL,
  `shipment_item_id` INT(11) NOT NULL,
  `inventory_type_id` INT(11) NOT NULL,
  PRIMARY KEY (`order_item_id`, `order_item_order_id`, `shipment_item_id`),
  INDEX `fk_order_item_has_shipment_item_shipment_item1_idx` (`shipment_item_id` ASC),
  INDEX `fk_order_item_has_shipment_item_order_item1_idx` (`order_item_id` ASC, `order_item_order_id` ASC),
  INDEX `fk_order_item_has_shipment_item_inventory_type1_idx` (`inventory_type_id` ASC),
  CONSTRAINT `fk_order_item_has_shipment_item_inventory_type1`
    FOREIGN KEY (`inventory_type_id`)
    REFERENCES `bsi_new_model`.`inventory_type` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_order_item_has_shipment_item_order_item1`
    FOREIGN KEY (`order_item_id` , `order_item_order_id`)
    REFERENCES `bsi_new_model`.`order_item` (`id` , `order_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_order_item_has_shipment_item_shipment_item1`
    FOREIGN KEY (`shipment_item_id`)
    REFERENCES `bsi_new_model`.`shipment_item` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `bsi_new_model`.`order_role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`order_role` (
  `id` INT(11) NOT NULL,
  `order_id` INT(11) NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_order_role_order1_idx` (`order_id` ASC),
  CONSTRAINT `fk_order_role_order1`
    FOREIGN KEY (`order_id`)
    REFERENCES `bsi_new_model`.`order` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `bsi_new_model`.`order_status`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`order_status` (
  `id` INT(11) NOT NULL,
  `status_type` VARCHAR(45) NULL DEFAULT NULL,
  `order_id` INT(11) NOT NULL,
  `updated_at` DATETIME NOT NULL,
  `created_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_order_status_order1_idx` (`order_id` ASC),
  CONSTRAINT `fk_order_status_order1`
    FOREIGN KEY (`order_id`)
    REFERENCES `bsi_new_model`.`order` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `bsi_new_model`.`part_bom`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`part_bom` (
  `id` INT(11) NOT NULL,
  `product_id` INT(11) NOT NULL,
  `qty_used` VARCHAR(45) NULL DEFAULT NULL,
  `description` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id`, `product_id`),
  INDEX `fk_part_bom_product1_idx` (`product_id` ASC),
  CONSTRAINT `fk_part_bom_product1`
    FOREIGN KEY (`product_id`)
    REFERENCES `bsi_new_model`.`product` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `bsi_new_model`.`relationship`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`relationship` (
  `id` INT(11) NOT NULL,
  `name` VARCHAR(15) NOT NULL,
  `description` VARCHAR(150) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `bsi_new_model`.`party_roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`party_roles` (
  `id` INT(11) NOT NULL,
  `party_id` INT(11) NULL DEFAULT NULL,
  `relationship_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`, `relationship_id`),
  INDEX `fk_party_roles_party1_idx` (`party_id` ASC),
  INDEX `fk_party_roles_relantionship1_idx` (`relationship_id` ASC),
  CONSTRAINT `fk_party_roles_party1`
    FOREIGN KEY (`party_id`)
    REFERENCES `bsi_new_model`.`party` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_party_roles_relantionship1`
    FOREIGN KEY (`relationship_id`)
    REFERENCES `bsi_new_model`.`relationship` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `bsi_new_model`.`password_resets`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`password_resets` (
  `email` VARCHAR(191) CHARACTER SET 'utf8mb4' NOT NULL,
  `token` VARCHAR(191) CHARACTER SET 'utf8mb4' NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  INDEX `password_resets_email_index` (`email` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `bsi_new_model`.`product_category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`product_category` (
  `id` INT(11) NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `bsi_new_model`.`product_has_category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`product_has_category` (
  `product_id` INT(11) NULL DEFAULT NULL,
  `product_category_id` INT(11) NULL DEFAULT NULL,
  INDEX `fk_product_has_product_category_product_category1_idx` (`product_category_id` ASC),
  INDEX `fk_product_has_product_category_product1_idx` (`product_id` ASC),
  CONSTRAINT `fk_1`
    FOREIGN KEY (`product_id`)
    REFERENCES `bsi_new_model`.`product` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_2`
    FOREIGN KEY (`product_category_id`)
    REFERENCES `bsi_new_model`.`product_category` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `bsi_new_model`.`request_item`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`request_item` (
  `id` INT(11) NOT NULL,
  `request_id` INT(11) NOT NULL,
  `product_feature_id` INT(11) NULL DEFAULT NULL,
  `qty` INT(11) NOT NULL,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_request_item_request1_idx` (`request_id` ASC),
  INDEX `fk_request_item_product_feature1` (`product_feature_id` ASC),
  CONSTRAINT `fk_request_item_product_feature1`
    FOREIGN KEY (`product_feature_id`)
    REFERENCES `bsi_new_model`.`product_feature` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_request_item_request1`
    FOREIGN KEY (`request_id`)
    REFERENCES `bsi_new_model`.`request` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `bsi_new_model`.`quote_item`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`quote_item` (
  `id` INT(11) NOT NULL,
  `quote_id` INT(11) NULL DEFAULT NULL,
  `request_item_id` INT(11) NULL DEFAULT NULL,
  `product_feature_id` INT(11) NULL DEFAULT NULL,
  `qty` INT(11) NULL DEFAULT NULL,
  `unit_price` VARCHAR(45) NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_quote_item_quote1_idx` (`quote_id` ASC),
  INDEX `fk_quote_item_request_item1_idx` (`request_item_id` ASC),
  INDEX `fk_quote_item_product1` (`product_feature_id` ASC),
  CONSTRAINT `fk_quote_item_product1`
    FOREIGN KEY (`product_feature_id`)
    REFERENCES `bsi_new_model`.`product_feature` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_quote_item_quote1`
    FOREIGN KEY (`quote_id`)
    REFERENCES `bsi_new_model`.`quote` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_quote_item_request_item1`
    FOREIGN KEY (`request_item_id`)
    REFERENCES `bsi_new_model`.`request_item` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `bsi_new_model`.`quote_role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`quote_role` (
  `id` INT(11) NOT NULL,
  `quote_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_quote_role_quote1_idx` (`quote_id` ASC),
  CONSTRAINT `fk_quote_role_quote1`
    FOREIGN KEY (`quote_id`)
    REFERENCES `bsi_new_model`.`quote` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `bsi_new_model`.`request_has_party`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`request_has_party` (
  `request_id` INT(11) NOT NULL,
  `party_id` INT(11) NOT NULL,
  PRIMARY KEY (`request_id`, `party_id`),
  INDEX `fk_request_has_party_party1_idx` (`party_id` ASC),
  INDEX `fk_request_has_party_request1_idx` (`request_id` ASC),
  CONSTRAINT `fk_request_has_party_party1`
    FOREIGN KEY (`party_id`)
    REFERENCES `bsi_new_model`.`party` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_request_has_party_request1`
    FOREIGN KEY (`request_id`)
    REFERENCES `bsi_new_model`.`request` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `bsi_new_model`.`requirement`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`requirement` (
  `id` INT(11) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `bsi_new_model`.`requirement_has_request`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`requirement_has_request` (
  `requirement_id` INT(11) NOT NULL,
  `request_id` INT(11) NOT NULL,
  PRIMARY KEY (`requirement_id`, `request_id`),
  INDEX `fk_requirement_has_request_request1_idx` (`request_id` ASC),
  INDEX `fk_requirement_has_request_requirement1_idx` (`requirement_id` ASC),
  CONSTRAINT `fk_requirement_has_request_request1`
    FOREIGN KEY (`request_id`)
    REFERENCES `bsi_new_model`.`request` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_requirement_has_request_requirement1`
    FOREIGN KEY (`requirement_id`)
    REFERENCES `bsi_new_model`.`requirement` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `bsi_new_model`.`requirement_has_request_item`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`requirement_has_request_item` (
  `requirement_id` INT(11) NOT NULL,
  `request_item_id` INT(11) NOT NULL,
  PRIMARY KEY (`requirement_id`, `request_item_id`),
  INDEX `fk_requirement_has_request_item_request_item1_idx` (`request_item_id` ASC),
  INDEX `fk_requirement_has_request_item_requirement1_idx` (`requirement_id` ASC),
  CONSTRAINT `fk_requirement_has_request_item_request_item1`
    FOREIGN KEY (`request_item_id`)
    REFERENCES `bsi_new_model`.`request_item` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_requirement_has_request_item_requirement1`
    FOREIGN KEY (`requirement_id`)
    REFERENCES `bsi_new_model`.`requirement` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `bsi_new_model`.`role_has_permissions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`role_has_permissions` (
  `permission_id` INT(10) UNSIGNED NOT NULL,
  `role_id` INT(10) UNSIGNED NOT NULL,
  INDEX `role_has_permissions_permission_id_foreign` (`permission_id` ASC),
  INDEX `role_has_permissions_role_id_foreign` (`role_id` ASC),
  CONSTRAINT `role_has_permissions_permission_id_foreign`
    FOREIGN KEY (`permission_id`)
    REFERENCES `bsi_new_model`.`permissions` (`id`)
    ON DELETE CASCADE,
  CONSTRAINT `role_has_permissions_role_id_foreign`
    FOREIGN KEY (`role_id`)
    REFERENCES `bsi_new_model`.`roles` (`id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `bsi_new_model`.`routing`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`routing` (
  `id` INT(11) NOT NULL,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `bom_id` INT(45) NULL DEFAULT NULL,
  `work_center_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_routing_work_center1_idx` (`work_center_id` ASC),
  INDEX `bom_id` (`bom_id` ASC),
  CONSTRAINT `fk_routing_work_center1`
    FOREIGN KEY (`work_center_id`)
    REFERENCES `bsi_new_model`.`work_center` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `bsi_new_model`.`shipment_receipt`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`shipment_receipt` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `shipment_item_id` INT(11) NOT NULL,
  `qty_accepted` INT(11) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `shipment_receipt_has_order_item_shipment` (`shipment_item_id` ASC),
  CONSTRAINT `fk_shipment_receipt_has_shipment_item`
    FOREIGN KEY (`shipment_item_id`)
    REFERENCES `bsi_new_model`.`shipment_item` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `bsi_new_model`.`shipment_role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`shipment_role` (
  `id` INT(11) NOT NULL,
  `shipment_receipt_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_shipment_role_shipment_receipt1_idx` (`shipment_receipt_id` ASC),
  CONSTRAINT `fk_shipment_role_shipment_receipt1`
    FOREIGN KEY (`shipment_receipt_id`)
    REFERENCES `bsi_new_model`.`shipment_receipt` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `bsi_new_model`.`status`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`status` (
  `id` INT(11) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `description` TEXT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `bsi_new_model`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`users` (
  `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(191) CHARACTER SET 'utf8mb4' NOT NULL,
  `email` VARCHAR(191) CHARACTER SET 'utf8mb4' NOT NULL,
  `email_verified_at` TIMESTAMP NULL DEFAULT NULL,
  `password` VARCHAR(191) CHARACTER SET 'utf8mb4' NOT NULL,
  `remember_token` VARCHAR(100) CHARACTER SET 'utf8mb4' NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `users_email_unique` (`email` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `bsi_new_model`.`production_study`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`production_study` (
  `id` INT NOT NULL,
  `created_at` VARCHAR(45) NULL,
  `updated_at` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bsi_new_model`.`study_operation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`study_operation` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `production_study_id` INT NOT NULL,
  `party_id` INT(11) NOT NULL,
  `study_operationcol` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_study_operation_production_study1_idx` (`production_study_id` ASC),
  INDEX `fk_study_operation_party1_idx` (`party_id` ASC),
  CONSTRAINT `fk_study_operation_production_study1`
    FOREIGN KEY (`production_study_id`)
    REFERENCES `mydb`.`production_study` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_study_operation_party1`
    FOREIGN KEY (`party_id`)
    REFERENCES `bsi_new_model`.`party` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bsi_new_model`.`process`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`process` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `study_operation_id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `description` VARCHAR(100) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_process_study_operation1_idx` (`study_operation_id` ASC),
  CONSTRAINT `fk_process_study_operation1`
    FOREIGN KEY (`study_operation_id`)
    REFERENCES `bsi_new_model`.`study_operation` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bsi_new_model`.`observation_result`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`observation_result` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `result` DECIMAL(2) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bsi_new_model`.`study_operation_observation_result`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`study_operation_observation_result` (
  `study_operation_id` INT NOT NULL,
  `observation_result_id` INT NOT NULL,
  PRIMARY KEY (`study_operation_id`, `observation_result_id`),
  INDEX `fk_study_operation_has_observation_result_observation_resul_idx` (`observation_result_id` ASC),
  INDEX `fk_study_operation_has_observation_result_study_operation1_idx` (`study_operation_id` ASC),
  CONSTRAINT `fk_study_operation_has_observation_result_study_operation1`
    FOREIGN KEY (`study_operation_id`)
    REFERENCES `bsi_new_model`.`study_operation` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_study_operation_has_observation_result_observation_result1`
    FOREIGN KEY (`observation_result_id`)
    REFERENCES `bsi_new_model`.`observation_result` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

USE `bsi_new_model` ;

-- -----------------------------------------------------
-- Placeholder table for view `bsi_new_model`.`bom_component_views`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`bom_component_views` (`bom_id` INT, `bom_component_id` INT, `product_id` INT, `product_feature_id` INT, `bom_name` INT, `goods_name` INT, `size` INT, `color` INT, `qty_to_be_consumpted` INT, `price` INT, `total_goods_value` INT);

-- -----------------------------------------------------
-- Placeholder table for view `bsi_new_model`.`bom_operation_wc_view`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`bom_operation_wc_view` (`bom_id` INT, `operation_id` INT, `operation_name` INT, `work_center_name` INT, `labor_alloc` INT, `cost_per_hour` INT, `work_hours` INT, `calculated_cost` INT, `overhead_cost` INT);

-- -----------------------------------------------------
-- Placeholder table for view `bsi_new_model`.`buyer_view`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`buyer_view` (`id` INT, `name` INT, `email` INT, `npwp` INT, `type` INT, `street` INT, `city` INT, `province` INT, `country` INT, `postal_code` INT);

-- -----------------------------------------------------
-- Placeholder table for view `bsi_new_model`.`item_issuance_view`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`item_issuance_view` (`shipment_id` INT, `shipment_item_id` INT, `product_feature_id` INT, `product` INT, `qty_shipped` INT, `item_issued` INT, `created_at` INT, `updated_at` INT);

-- -----------------------------------------------------
-- Placeholder table for view `bsi_new_model`.`order_item_shipment_1`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`order_item_shipment_1` (`shipment_id` INT, `shipment_item_id` INT, `order_id` INT, `product_feature_id` INT, `qty_ordered` INT, `qty_shipped` INT, `lefted` INT);

-- -----------------------------------------------------
-- Placeholder table for view `bsi_new_model`.`products_view`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`products_view` (`product_feature_id` INT, `product_id` INT, `name` INT, `color` INT, `size` INT);

-- -----------------------------------------------------
-- Placeholder table for view `bsi_new_model`.`shipment_receipt_view`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`shipment_receipt_view` (`shipment_id` INT, `shipment_item_id` INT, `product_feature_id` INT, `qty_shipped` INT, `qty_accepted` INT, `created_at` INT, `updated_at` INT);

-- -----------------------------------------------------
-- Placeholder table for view `bsi_new_model`.`supplier_view`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsi_new_model`.`supplier_view` (`id` INT, `name` INT, `email` INT, `npwp` INT, `type` INT, `street` INT, `city` INT, `province` INT, `country` INT, `postal_code` INT);

-- -----------------------------------------------------
-- View `bsi_new_model`.`bom_component_views`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bsi_new_model`.`bom_component_views`;
USE `bsi_new_model`;
CREATE  OR REPLACE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `bsi_new_model`.`bom_component_views` AS select `bsi_new_model`.`bom`.`id` AS `bom_id`,`bsi_new_model`.`bom_component`.`id` AS `bom_component_id`,`bsi_new_model`.`product`.`id` AS `product_id`,`bsi_new_model`.`product_feature`.`id` AS `product_feature_id`,`bsi_new_model`.`bom`.`name` AS `bom_name`,`bsi_new_model`.`goods`.`name` AS `goods_name`,`bsi_new_model`.`product_feature`.`size` AS `size`,`bsi_new_model`.`product_feature`.`color` AS `color`,`bsi_new_model`.`bom_component`.`qty` AS `qty_to_be_consumpted`,`bsi_new_model`.`goods`.`value` AS `price`,(`bsi_new_model`.`goods`.`value` * `bsi_new_model`.`bom_component`.`qty`) AS `total_goods_value` from ((((`bsi_new_model`.`bom` left join `bsi_new_model`.`bom_component` on((`bsi_new_model`.`bom`.`id` = `bsi_new_model`.`bom_component`.`bom_id`))) join `bsi_new_model`.`product_feature` on((`bsi_new_model`.`bom_component`.`product_feature_id` = `bsi_new_model`.`product_feature`.`id`))) join `bsi_new_model`.`product` on((`bsi_new_model`.`product_feature`.`product_id` = `bsi_new_model`.`product`.`id`))) join `bsi_new_model`.`goods` on((`bsi_new_model`.`product`.`goods_id` = `bsi_new_model`.`goods`.`id`)));

-- -----------------------------------------------------
-- View `bsi_new_model`.`bom_operation_wc_view`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bsi_new_model`.`bom_operation_wc_view`;
USE `bsi_new_model`;
CREATE  OR REPLACE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `bsi_new_model`.`bom_operation_wc_view` AS select `op`.`bom_id` AS `bom_id`,`op`.`id` AS `operation_id`,`op`.`name` AS `operation_name`,`wc`.`name` AS `work_center_name`,`wc`.`labor_alloc` AS `labor_alloc`,`wc`.`cost_per_hour` AS `cost_per_hour`,`wc`.`work_hours` AS `work_hours`,((`wc`.`labor_alloc` * `wc`.`cost_per_hour`) * `wc`.`work_hours`) AS `calculated_cost`,`wc`.`overhead_cost` AS `overhead_cost` from ((`bsi_new_model`.`bom` join `bsi_new_model`.`operation` `op` on((`op`.`bom_id` = `bsi_new_model`.`bom`.`id`))) join `bsi_new_model`.`work_center` `wc` on((`wc`.`id` = `op`.`work_center_id`)));

-- -----------------------------------------------------
-- View `bsi_new_model`.`buyer_view`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bsi_new_model`.`buyer_view`;
USE `bsi_new_model`;
CREATE  OR REPLACE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `bsi_new_model`.`buyer_view` AS select `p`.`id` AS `id`,`p`.`name` AS `name`,`p`.`email` AS `email`,`p`.`npwp` AS `npwp`,`r`.`name` AS `type`,`a`.`street` AS `street`,`a`.`city` AS `city`,`a`.`province` AS `province`,`a`.`country` AS `country`,`a`.`postal_code` AS `postal_code` from (((`bsi_new_model`.`party` `p` left join `bsi_new_model`.`address` `a` on((`a`.`party_id` = `p`.`id`))) join `bsi_new_model`.`party_roles` `pr` on((`pr`.`party_id` = `p`.`id`))) left join `bsi_new_model`.`relationship` `r` on((`pr`.`relationship_id` = `r`.`id`))) where (`r`.`name` = 'Buyer');

-- -----------------------------------------------------
-- View `bsi_new_model`.`item_issuance_view`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bsi_new_model`.`item_issuance_view`;
USE `bsi_new_model`;
CREATE  OR REPLACE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `bsi_new_model`.`item_issuance_view` AS select `si`.`shipment_id` AS `shipment_id`,`bsi_new_model`.`item_issuance`.`shipment_item_id` AS `shipment_item_id`,`pf`.`id` AS `product_feature_id`,concat(`bsi_new_model`.`goods`.`name`,' ',`pf`.`size`,' ',`pf`.`color`) AS `product`,`si`.`qty_shipped` AS `qty_shipped`,`bsi_new_model`.`item_issuance`.`item_issued` AS `item_issued`,`bsi_new_model`.`item_issuance`.`created_at` AS `created_at`,`bsi_new_model`.`item_issuance`.`updated_at` AS `updated_at` from ((((`bsi_new_model`.`item_issuance` join `bsi_new_model`.`shipment_item` `si` on((`si`.`id` = `bsi_new_model`.`item_issuance`.`shipment_item_id`))) join `bsi_new_model`.`product_feature` `pf` on((`pf`.`id` = `si`.`product_feature_id`))) join `bsi_new_model`.`product` `p` on((`p`.`id` = `pf`.`product_id`))) join `bsi_new_model`.`goods` on((`bsi_new_model`.`goods`.`id` = `p`.`goods_id`))) group by `si`.`id`;

-- -----------------------------------------------------
-- View `bsi_new_model`.`order_item_shipment_1`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bsi_new_model`.`order_item_shipment_1`;
USE `bsi_new_model`;
CREATE  OR REPLACE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `bsi_new_model`.`order_item_shipment_1` AS select `bsi_new_model`.`shipment`.`id` AS `shipment_id`,`bsi_new_model`.`shipment_item`.`id` AS `shipment_item_id`,`bsi_new_model`.`order_item`.`order_id` AS `order_id`,`bsi_new_model`.`order_item`.`product_feature_id` AS `product_feature_id`,`bsi_new_model`.`order_item`.`qty` AS `qty_ordered`,`bsi_new_model`.`shipment_item`.`qty_shipped` AS `qty_shipped`,if(((`bsi_new_model`.`order_item`.`qty` - `bsi_new_model`.`shipment_item`.`qty_shipped`) < 0),0,(`bsi_new_model`.`order_item`.`qty` - `bsi_new_model`.`shipment_item`.`qty_shipped`)) AS `lefted` from ((`bsi_new_model`.`shipment_item` join `bsi_new_model`.`shipment` on((`bsi_new_model`.`shipment`.`id` = `bsi_new_model`.`shipment_item`.`shipment_id`))) join `bsi_new_model`.`order_item` on((`bsi_new_model`.`shipment_item`.`product_feature_id` = `bsi_new_model`.`order_item`.`product_feature_id`)));

-- -----------------------------------------------------
-- View `bsi_new_model`.`products_view`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bsi_new_model`.`products_view`;
USE `bsi_new_model`;
CREATE  OR REPLACE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `bsi_new_model`.`products_view` AS select `pf`.`id` AS `product_feature_id`,`pf`.`product_id` AS `product_id`,`bsi_new_model`.`goods`.`name` AS `name`,`pf`.`color` AS `color`,`pf`.`size` AS `size` from ((`bsi_new_model`.`goods` join `bsi_new_model`.`product` `p` on((`p`.`goods_id` = `bsi_new_model`.`goods`.`id`))) join `bsi_new_model`.`product_feature` `pf` on((`pf`.`product_id` = `p`.`id`))) order by `pf`.`id`;

-- -----------------------------------------------------
-- View `bsi_new_model`.`shipment_receipt_view`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bsi_new_model`.`shipment_receipt_view`;
USE `bsi_new_model`;
CREATE  OR REPLACE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `bsi_new_model`.`shipment_receipt_view` AS select `si`.`shipment_id` AS `shipment_id`,`bsi_new_model`.`shipment_receipt`.`shipment_item_id` AS `shipment_item_id`,`si`.`product_feature_id` AS `product_feature_id`,`si`.`qty_shipped` AS `qty_shipped`,`bsi_new_model`.`shipment_receipt`.`qty_accepted` AS `qty_accepted`,`bsi_new_model`.`shipment_receipt`.`created_at` AS `created_at`,`bsi_new_model`.`shipment_receipt`.`updated_at` AS `updated_at` from (`bsi_new_model`.`shipment_receipt` join `bsi_new_model`.`shipment_item` `si` on((`si`.`id` = `bsi_new_model`.`shipment_receipt`.`shipment_item_id`)));

-- -----------------------------------------------------
-- View `bsi_new_model`.`supplier_view`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bsi_new_model`.`supplier_view`;
USE `bsi_new_model`;
CREATE  OR REPLACE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `bsi_new_model`.`supplier_view` AS select `p`.`id` AS `id`,`p`.`name` AS `name`,`p`.`email` AS `email`,`p`.`npwp` AS `npwp`,`r`.`name` AS `type`,`a`.`street` AS `street`,`a`.`city` AS `city`,`a`.`province` AS `province`,`a`.`country` AS `country`,`a`.`postal_code` AS `postal_code` from (((`bsi_new_model`.`party` `p` left join `bsi_new_model`.`address` `a` on((`a`.`party_id` = `p`.`id`))) join `bsi_new_model`.`party_roles` `pr` on((`pr`.`party_id` = `p`.`id`))) left join `bsi_new_model`.`relationship` `r` on((`pr`.`relationship_id` = `r`.`id`))) where (`r`.`name` = 'Supplier');

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
