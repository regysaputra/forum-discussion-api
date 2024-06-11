const AddUserUseCase = require("../../../../Applications/use_case/AddUserUseCase");
const container = require("../../../../Infrastructures/container");

async function postUserHandler(req, res, next) {
  const addUserUseCase = container.getInstance(AddUserUseCase.name);

  try {
    const result = await addUserUseCase.execute(req.body);

    const { id, username, fullname } = result;

    res.status(201).json({
      status: 'success',
      data: {
        addedUser: {
          id, username, fullname
        },
      },
    });
  } catch (err) {
    next(err);
  }
}

module.exports = postUserHandler;