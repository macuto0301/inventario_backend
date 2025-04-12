export const errorHandler = (err, req, res, next) => {
  console.error(err.stack)

  // Handle specific error types
  if (err.code === "23505") {
    // Unique constraint violation in PostgreSQL
    return res.status(409).json({
      message: "A resource with that unique identifier already exists",
      error: err.detail,
    })
  }

  if (err.code === "22P02") {
    // Invalid input syntax for type
    return res.status(400).json({
      message: "Invalid input format",
      error: err.message,
    })
  }

  // Default error response
  res.status(500).json({
    message: "Internal server error",
    error: process.env.NODE_ENV === "production" ? "An unexpected error occurred" : err.message,
  })
}
