const GetAuthenticationUseCase = require("../../../../Applications/use_case/GetAuthenticationUseCase");
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

module.exports = postAuthenticationHandler;