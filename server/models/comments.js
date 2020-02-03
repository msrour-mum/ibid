/**
 * On the fly entity to hold the comment part in the auction
 */
class Comment {
       constructor(user,comment_text,creation_date)
       {
        this.user = user;
        this.comment_text = comment_text;
        this.creation_date = creation_date;
       }
  }


module.exports = Comment