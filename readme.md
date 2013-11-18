image-thumbnail-server
==================

Image thumbnail server.

API
------------------

- GET
- /thumbnail

Query String
------------------

- url: image url.
- width: thumbnail width.
- height: thumbnail height.
- crop: crop method, "Center" or "North".

Response
------------------

- thumbnail file, if succeed.
- JSON error string, if failed.

