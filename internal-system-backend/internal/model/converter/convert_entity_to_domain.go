package converter

import (
	"github.com/rafabcanedo/basic-internal-system/internal-system-backend/internal/model/domains"
	"github.com/rafabcanedo/basic-internal-system/internal-system-backend/internal/model/repository/entity"
)

func ConvertEntityToDomain(
	entity entity.UsersEntity,
) domains.UserDomainInterface {
	domain := domains.NewUserDomainWithID(
		entity.ID.String(),
		entity.Name,
		entity.Email,
		entity.Password,
		entity.Phone,
	)

	return domain
}

func ConvertContactEntityToDomain(e entity.ContactEntity) domains.ContactDomainInterface {
	return domains.NewContactDomainWithID(
		e.ID.String(),
		e.OwnerID.String(),
		e.Name,
		e.Email,
		e.Phone,
		string(e.Category),
	)
}
