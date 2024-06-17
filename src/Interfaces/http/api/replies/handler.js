const AddReplyUseCase = require("../../../../Applications/use_case/AddReplyUseCase");
const DeleteReplyUseCase = require("../../../../Applications/use_case/DeleteReplyUseCase");
const container = require("../../../../Infrastructures/container");

async function postReplyHandler(req, res, next) {
  const addReplyUseCase = container.getInstance(AddReplyUseCase.name);
  
  try {
    const addedReply = await addReplyUseCase
      .execute(req.body, req.params.threadId, req.params.commentId, req.credentials.id);

    res.status(201).json({
      status: 'success',
      data: {
        addedReply
      }
    });
  } catch (error) {
    next(error);
  }
}

async function deleteReplyHandler(req, res, next) {
  const deleteReplyUseCase = container.getInstance(DeleteReplyUseCase.name);

  try {
    await deleteReplyUseCase.execute(
      req.params.threadId,
      req.params.commentId,
      req.params.replyId,
      req.credentials.id
    );

    res.json({
      status: 'success'
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { postReplyHandler, deleteReplyHandler};