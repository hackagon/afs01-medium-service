INSERT INTO item_type (`code`, label) 
SELECT * FROM (
	SELECT "paragraph" AS code, "Paragraph" AS label
) tmp
WHERE NOT EXISTS (
	SELECT code FROM item_type WHERE code = tmp.code
) LIMIT 1;

INSERT INTO item_type (`code`, label) 
SELECT * FROM (
	SELECT "image" AS code, "Image" AS label
) tmp
WHERE NOT EXISTS (
	SELECT code FROM item_type WHERE code = tmp.code
) LIMIT 1;

INSERT INTO item_type (`code`, label) 
SELECT * FROM (
	SELECT "video" AS code, "Video" AS label
) tmp
WHERE NOT EXISTS (
	SELECT code FROM item_type WHERE code = tmp.code
) LIMIT 1;