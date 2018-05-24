******App RESTful Routes******

name        url                                 verb            descr.
============================================================================================================
Index       /campgrounds                        GET             Displays all campgrounds
New         /campgrounds/new                    GET             Displays FORM to make campgrounds
Create      /campgrounds                        POST            Add a new campground to the DB
Show        /campgrounds/:id                    GET             Display a SPECIFIC campground

New         /campgrounds/:id/comments/new       GET             Display FORM to make comments
Create      /campgrounds/:id/comments           POST            Add a new comment to a specific campground


Edit        /campgrounds/:id/edit               GET             Display EDIT FORM for SPECIFIC campground
Update      /campgrounds/:id                    PUT             Update a SPECIFIC campground
Delete      /campgrounds/:id                    DELETE          Delete a SPECIFIC campground and redirect