create database ecommerce_clothes;

CREATE TABLE roles (
    id INT  NOT NULL AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE,
    active TINYINT NOT NULL DEFAULT(1),
    created DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(50) DEFAULT NULL,
    modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    modified_by VARCHAR(50) DEFAULT NULL
);

CREATE TABLE permissions (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    permission_name VARCHAR(100) NOT NULL UNIQUE,
    active TINYINT NOT NULL DEFAULT(1),
    created DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(50) DEFAULT NULL,
    modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    modified_by VARCHAR(50) DEFAULT NULL
);

CREATE TABLE role_permissions (
    role_id INT NOT NULL,
    permission_id INT NOT NULL,

    PRIMARY KEY (role_id, permission_id),
    CONSTRAINT fk_rp_role
        FOREIGN KEY (role_id)
        REFERENCES roles(id),
    CONSTRAINT fk_rp_permission
        FOREIGN KEY (permission_id)
        REFERENCES permissions(id)
);

CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(100) NOT NULL,
    role_id INT NOT NULL,
    
    active TINYINT(1) NOT NULL DEFAULT 1,
    created DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(50) DEFAULT NULL,
    modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    modified_by VARCHAR(50) DEFAULT NULL,
    
    CONSTRAINT fk_user_role FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE TABLE categories (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT DEFAULT NULL,

    active TINYINT(1) NOT NULL DEFAULT 1,
    created DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(50) DEFAULT NULL,
    modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    modified_by VARCHAR(50) DEFAULT NULL
);

CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,

    title VARCHAR(255) NOT NULL,
    description TEXT,
    rate DECIMAL(10,2) NOT NULL,
    discount DECIMAL(5,2) DEFAULT 0.00,

    stock_quantity INT DEFAULT 0,

    category_id INT NOT NULL,

    cloth_type VARCHAR(100),
    image_url VARCHAR(500),

    active TINYINT(1) NOT NULL DEFAULT 1,

    created DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(50) DEFAULT NULL,
    modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    modified_by VARCHAR(50) DEFAULT NULL,

    CONSTRAINT fk_product_category
        FOREIGN KEY (category_id)
        REFERENCES categories(id)
);

CREATE TABLE carts (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,

    active TINYINT(1) NOT NULL DEFAULT 1,

    created DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(50) DEFAULT NULL,
    modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    modified_by VARCHAR(50) DEFAULT NULL,

    CONSTRAINT fk_cart_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
);

CREATE TABLE cart_items (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,

    cart_id INT NOT NULL,
    product_id INT NOT NULL,

    quantity INT NOT NULL DEFAULT 1,
    unit_price DECIMAL(10,2) NOT NULL,

    active TINYINT(1) NOT NULL DEFAULT 1,

    created DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(50) DEFAULT NULL,
    modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    modified_by VARCHAR(50) DEFAULT NULL,

    CONSTRAINT fk_cartitem_cart
        FOREIGN KEY (cart_id)
        REFERENCES carts(id),

    CONSTRAINT fk_cartitem_product
        FOREIGN KEY (product_id)
        REFERENCES products(id)
);

