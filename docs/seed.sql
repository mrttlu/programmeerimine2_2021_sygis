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
  