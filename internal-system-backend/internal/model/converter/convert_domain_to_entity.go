package converter

import (
	"github.com/google/uuid"

	"github.com/rafabcanedo/basic-internal-system/internal-system-backend/internal/model/domains"
	"github.com/rafabcanedo/basic-internal-system/internal-system-backend/internal/model/repository/entity"
	"github.com/rafabcanedo/basic-internal-system/internal-system-backend/internal/model/repository/entity/enums"
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

func ConvertContactDomainToEntity(domain domains.ContactDomainInterface) *entity.ContactEntity {
	id := domain.GetID()
	ownerID := domain.GetOwnerID()

	var contactID, ownerUUID uuid.UUID
	if id != "" {
		contactID = uuid.MustParse(id)
	}
	if ownerID != "" {
		ownerUUID = uuid.MustParse(ownerID)
	}

	return &entity.ContactEntity{
		ID:       contactID,
		OwnerID:  ownerUUID,
		Name:     domain.GetName(),
		Email:    domain.GetEmail(),
		Phone:    domain.GetPhone(),
		Category: enums.ContactCategory(domain.GetCategory()),
	}
}

func ConvertGroupDomainToEntity(domain domains.GroupDomainInterface) *entity.GroupEntity {
	id := domain.GetID()
	ownerID := domain.GetOwnerID()

	var groupID, ownerUUID uuid.UUID
	if id != "" {
		groupID = uuid.MustParse(id)
	}
	if ownerID != "" {
		ownerUUID = uuid.MustParse(ownerID)
	}

	return &entity.GroupEntity{
		ID:       groupID,
		OwnerID:  ownerUUID,
		Name:     domain.GetName(),
		Category: enums.GroupCategory(domain.GetCategory()),
	}
}
