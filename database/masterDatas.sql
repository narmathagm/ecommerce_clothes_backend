INSERT INTO roles (role_name) VALUES
('ADMIN'),
('USER');

INSERT INTO permissions (permission_name) VALUES
('CREATE_PRODUCT'),
('VIEW_PRODUCT'),
('UPDATE_PRODUCT'),
('DELETE_PRODUCT'),
('VIEW_USERS'),
('ADD_TO_CART'),
('REMOVE_FROM_CART');

INSERT INTO role_permissions (role_id, permission_id)
SELECT 1, id
FROM permissions;

INSERT INTO role_permissions (role_id, permission_id)
SELECT 2, id
FROM permissions
WHERE permission_name IN
(
    'VIEW_PRODUCT',
    'ADD_TO_CART',
    'REMOVE_FROM_CART'
);