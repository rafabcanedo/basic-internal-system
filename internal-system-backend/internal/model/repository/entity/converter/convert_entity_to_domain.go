package converter

import (
	"github.com/rafabcanedo/basic-internal-system/internal-system-backend/internal/model/"
	"github.com/rafabcanedo/basic-internal-system/internal-system-backend/internal/model/repository/entity"
)

func ConvertEntityToDomain(
	entity entity.UsersEntity,
) model.UserDomainInterface {
	domain := model.NewUserDomain(
		entity.Name,
		entity.Email,
		entity.Password,
		entity.Phone,
	)

	domain.SetID(entity.ID.String())

	return domain
}