const AddCommentUseCase = require("../../../../Applications/use_case/AddCommentUseCase");
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

module.exports = postCommentHandler;