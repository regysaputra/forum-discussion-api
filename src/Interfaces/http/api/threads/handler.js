const AddThreadUseCase = require("../../../../Applications/use_case/AddThreadUseCase");
const GetAllThreadUseCase = require("../../../../Applications/use_case/GetAllThreadUseCase");
const GetThreadUseCase = require("../../../../Applications/use_case/GetThreadUseCase");
const container = require("../../../../Infrastructures/container");

async function getAllThreadHandler(req, res, next) {
  const getAllThreadUseCase = container.getInstance(GetAllThreadUseCase.name);
  
  try {
    const threads = await getAllThreadUseCase.execute();

    res.status(200).json({
      status: 'success',
      data: {
        threads,
      }
    });
  } catch (error) {
    next(error);
  }
}

async function getThreadHandler(req, res, next) {
  const getThreadUseCase = container.getInstance(GetThreadUseCase.name);
  
  try {
    const thread = await getThreadUseCase.execute(req.params.threadId);

    res.status(200).json({
      status: 'success',
      data: {
        thread,
      }
    });
  } catch (error) {
    next(error);
  }
}

async function postThreadHandler(req, res, next) {
  const addThreadUseCase = container.getInstance(AddThreadUseCase.name);

  try {
    const addedThread = await addThreadUseCase.execute(req.body, req.credentials.id);

    res.status(201).json({
      status: 'success',
      data: {
        addedThread,
      }
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllThreadHandler: getAllThreadHandler,
  getThreadHandler: getThreadHandler,
  postThreadHandler: postThreadHandler
};