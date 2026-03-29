package validation

import (
	"errors"

	"github.com/go-playground/validator/v10"
	"github.com/goccy/go-json"
	"github.com/rafabcanedo/basic-internal-system/internal-system-backend/internal/configuration/rest_errors"
)

func ValidateContactError(validation_err error) *rest_errors.RestErrors {
	var jsonErr *json.UnmarshalTypeError
	var jsonValidationError validator.ValidationErrors

	if errors.As(validation_err, &jsonErr) {
		return rest_errors.NewBadRequestError("invalid field type")
	} else if errors.As(validation_err, &jsonValidationError) {
		errorsCauses := []rest_errors.Causes{}

		for _, e := range validation_err.(validator.ValidationErrors) {
			cause := rest_errors.Causes{
				Message: e.Translate(transl),
				Field:   e.Field(),
			}
			errorsCauses = append(errorsCauses, cause)
		}

		return rest_errors.NewBadRequestValidationError("Some fields are invalid", errorsCauses)
	} else {
		return rest_errors.NewBadRequestError("Error trying to convert fields")
	}
}
