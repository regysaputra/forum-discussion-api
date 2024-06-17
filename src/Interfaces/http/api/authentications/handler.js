const DeleteAuthenticationUseCase = require("../../../../Applications/use_case/DeleteAuthenticationUseCase");
const GetAuthenticationUseCase = require("../../../../Applications/use_case/GetAuthenticationUseCase");
const RefreshAuthenticationUseCase = require("../../../../Applications/use_case/RefreshAuthenticationUseCase");
const container = require("../../../../Infrastructures/container");

async function postAuthenticationHandler(req, res, next) {
  const getAuthenticationUseCase = container.getInstance(GetAuthenticationUseCase.name);

  try {
    const { accessToken, refreshToken } = await getAuthenticationUseCase.execute(req.body);

    res.status(201).json({
      status: "success",
      data: {
        accessToken,
        refreshToken
      }
    });
  } catch (error) {
    next(error);
  }
}

async function putAuthenticationHandler(req, res, next) {
  const refreshAuthenticationUseCase = container
    .getInstance(RefreshAuthenticationUseCase.name);
  
  try {
    const accessToken = await refreshAuthenticationUseCase.execute(req.body);

    res.json({
      status: 'success',
      data: {
        accessToken,
      }
    });
  } catch (error) {
    next(error);
  }
}

async function deleteAuthenticationHandler(req, res, next) {
  const deleteAuthenticationUseCase = container
    .getInstance(DeleteAuthenticationUseCase.name);
  await deleteAuthenticationUseCase.execute(req.body);

  res.json({
    status: 'success',
  });
}

module.exports = { postAuthenticationHandler, putAuthenticationHandler, deleteAuthenticationHandler };