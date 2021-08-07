const Ajv = require('ajv')

const ajv = new Ajv()

const errorResponse = (schemaErrors) => {
  const errors = schemaErrors.map((error) => {
    return {
      path: error.instancePath,
      message: error.message
    }
  })
  return {
    status: 'Failed',
    errors: errors
  }
}

const checkSchema = (schema) => {
  return (req, res, next) => {
    if (schema) {
      const validate = ajv.compile(schema)
      const valid = validate(req.body)
      if (!valid) return res.status(400).send(errorResponse(validate.errors))
    }
    next()
  }
}

module.exports = checkSchema