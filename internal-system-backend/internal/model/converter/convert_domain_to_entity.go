package converter

import (
	"github.com/google/uuid"

	"github.com/rafabcanedo/basic-internal-system/internal-system-backend/internal/model/domains"
	"github.com/rafabcanedo/basic-internal-system/internal-system-backend/internal/model/repository/entity"
)

func ConvertDomainToEntity(
	domain domains.UserDomainInterface,
) *entity.UsersEntity {
	id := domain.GetID()
	var userID uuid.UUID

	if id != "" {
		userID = uuid.MustParse(id)
	}

	return &entity.UsersEntity{
		ID:       userID,
		Name:     domain.GetName(),
		Email:    domain.GetEmail(),
		Password: domain.GetPassword(),
		Phone:    domain.GetPhone(),
	}
}
