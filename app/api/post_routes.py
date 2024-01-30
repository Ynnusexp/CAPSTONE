from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Post
from app.forms import PostForm
from .aws import get_unique_filename, upload_file_to_s3, remove_file_from_s3



post_routes = Blueprint('posts', __name__ , url_prefix="/api/posts")

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


def user_owns(record):
  if int(record.user_id) != int(current_user.get_id()):
    return False
  return True

@post_routes.route('/all')
def get_all_posts():

    posts= Post.query.order_by(desc(Post.date)).all()

    # return [post.to_dict() for post in posts]
    return {post.id: post.to_dict() for post in posts}

@post_routes.route('/new' , methods=["POST"])
@login_required

def create_posts():
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data

        image = data['image']
        if image:
            image.filename = get_unique_filename(image.filename)
            image_upload = upload_file_to_s3(image)

            if 'url' not in image_upload:
                return upload, 400

        new_post = Post(
            user_id=current_user.get_id(),
            title=data["title"],
            description=data["description"],
            image = image_upload.url if image_upload else None,
            date=data["date"]
        )

        db.session.add(new_post)
        db.session.commit()

        return { "message": "Post is Successful!"}, 200

    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@post_routes.route('/<int:id>' , methods=["PUT"])
@login_required

def update_posts(id):
    post = Post.query.get(id)

    if not post:
        return {"message": "Post does not exist!"}, 404

    if not user_owns(post):
        return {"message": "You do not have permission to update this post!"}, 403


    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data

        image = data['image']
        if image:
            image.filename = get_unique_filename(image.filename)
            image_upload = upload_file_to_s3(image)

            if 'url' not in image_upload:
                return upload, 400

        post.image = image_upload.url if image_upload else post.image
        post.title=data["title"],
        post.description=data["description"]
        post.date=data["date"]

        db.session.commit()

        return {"message": "You have updated successfully!"}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@post_routes.route('/<int:id>' , methods=["DELETE"])
@login_required

def delete_posts(id):
    post = Post.query.get(id)

    if not post:
        return {"message": "Post does not exist!"}, 404

    if not user_owns(post):
        return {"message": "You do not have permission to delete this post!"}, 403

    if post.image:
        remove_file_from_s3(post.image)

    db.session.delete(post)
    db.session.commit()

    return {"message": "post has been successfully deleted"}
