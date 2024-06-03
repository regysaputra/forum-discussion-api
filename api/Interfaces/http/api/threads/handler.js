const GetAllThreadUseCase = require("../../../../Applications/use_case/GetAllThreadUseCase");
const container = require("../../../../Infrastructures/container");

async function getAllThreadHandler(req, res) {
  const getAllThreadUseCase = container.getInstance(GetAllThreadUseCase.name);
  const threads = await getAllThreadUseCase.execute();
  res.send({
    status: 'success',
    data: {
      threads,
    }
  });
}

module.exports = getAllThreadHandler;