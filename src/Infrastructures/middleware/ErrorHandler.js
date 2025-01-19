const ClientError = require("../../Commons/exceptions/ClientError");
const DomainErrorTranslator = require("../../Commons/exceptions/DomainErrorTranslator");

function ErrorHandler(err, req, res, next) {
  const translatedError = DomainErrorTranslator.translate(err);
  
  // penanganan error secara internal.
  if (translatedError instanceof ClientError) {
    res.status(translatedError.statusCode).json({
      status: "fail",
      message: translatedError.message
    });

    return;
  }

  const statuscode = err.statusCode || 500;
  const message = err.message || "Terjadi kegagalan pada server kami";

  res.status(statuscode).json({
    status: "fail",
    message: message
  });
}

module.exports = ErrorHandler;