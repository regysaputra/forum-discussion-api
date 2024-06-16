const AddReplyUseCase = require("../../../../Applications/use_case/AddReplyUseCase");
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

module.exports = postReplyHandler;