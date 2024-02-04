# from flask import Blueprint, jsonify
# from flask_login import login_required
# from app.models import Comment

from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Comment, db
from app.forms import CommentForm



comment_routes = Blueprint('comments', __name__ , url_prefix="/api")

def validation_errors(validation_errors):
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

@comment_routes.route('/all')
def get_all_posts():


    comments= Comment.query.order_by((Comment.date.desc())).all()

    return {comment.id: comment.to_dict() for comment in comments}

@comment_routes.route('/new' , methods=["POST"])
@login_required

def create_comments():
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data

        new_comment = Comment(
            description=data["description"],
        )

        db.session.add(new_comment)
        db.session.commit()

        return { "message": "Comment is Successful!"}, 200

    return {'errors': validation_errors(form.errors)}, 400


@comment_routes.route('/<int:id>', methods=["GET"])
def post_comments(id):
    comments = Comment.query.filter_by(post_id=id).all()
    comment_data = [comment.to_dict() for comment in comments]

    return jsonify(comment_data)

@comment_routes.route('/<int:id>' , methods=["PUT"])
@login_required

def update_posts(id):
    comment = Comment.query.get(id)

    if not comment:
        return {"message": "Comment does not exist!"}, 404

    if not user_owns(comment):
        return {"message": "You do not have permission to update this comment!"}, 403


    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        comment.description=form.description.data

        db.session.commit()

        return {"Comment": comment.to_dict()}
    return {'errors': validation_errors(form.errors)}, 400

@comment_routes.route('/<int:id>' , methods=["DELETE"])
# @login_required

def delete_posts(id):
    comment = Comment.query.get(id)

    if not comment:
        return {"message": "Comment does not exist!"}, 404

    if not user_owns(comment):
        return {"message": "You do not have permission to delete this comment!"}, 403

    db.session.delete(comment)
    db.session.commit()

    return {"message": "comment has been successfully deleted"}
