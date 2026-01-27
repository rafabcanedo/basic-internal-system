package converter

import (
	"github.com/rafabcanedo/basic-internal-system/internal-system-backend/internal/model/"
	"github.com/rafabcanedo/basic-internal-system/internal-system-backend/internal/model/repository/entity"
)

func ConvertDomainToEntity(
	domain model.UserDomainInterface,
) *entity.UsersEntity {
	return &entity.UsersEntity{
		Name: domain.GetName(),
		Email: domain.GetEmail(),
		Password: domain.GetPassword(),
		Phone: domain.GetPhone(),
	}
}