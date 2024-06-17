const AddCommentUseCase = require("../../../../Applications/use_case/AddCommentUseCase");
const DeleteCommentUseCase = require("../../../../Applications/use_case/DeleteCommentUseCase");
const container = require("../../../../Infrastructures/container");

async function postCommentHandler(req, res, next) {
  const addCommentUseCase = container.getInstance(AddCommentUseCase.name);
  console.log("threadId :", req.params.threadId);

  try {
    const addedComment = await addCommentUseCase
      .execute(req.body, req.params.threadId, req.credentials.id);

    res.status(201).json({
      status: 'success',
      data: {
        addedComment
      }
    });
  } catch (error) {
    next(error);
  }
}

async function deleteCommentHandler(req, res, next) {
  const deleteCommentUseCase = container.getInstance(DeleteCommentUseCase.name);

  try {
    await deleteCommentUseCase.execute(
      req.params.threadId,
      req.params.commentId,
      req.credentials.id
    );

    res.json({
      status: 'success'
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { postCommentHandler, deleteCommentHandler };