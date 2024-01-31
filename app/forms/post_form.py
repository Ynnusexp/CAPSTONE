from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FileField, SubmitField
from flask_wtf.file import FileAllowed, FileRequired
from wtforms.validators import DataRequired, ValidationError, Length
from app.api.aws import ALLOWED_IMG_EXTENSIONS


class PostForm(FlaskForm):
    title = StringField("title", validators=[DataRequired(), Length(max=30)])
    description = StringField("description", validators=[DataRequired(), Length(max=200)])
    image = FileField("image", validators=[FileAllowed(ALLOWED_IMG_EXTENSIONS)])
    submit = SubmitField('Post')
