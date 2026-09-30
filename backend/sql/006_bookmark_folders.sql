-- sql/006_bookmark_folders.sql
CREATE TABLE bookmark_folders (
  bookmark_id INT NOT NULL,
  folder_id INT NOT NULL,
  PRIMARY KEY (bookmark_id, folder_id),
  FOREIGN KEY (bookmark_id) REFERENCES bookmarks(id) ON DELETE CASCADE,
  FOREIGN KEY (folder_id) REFERENCES folders(id) ON DELETE CASCADE
);
