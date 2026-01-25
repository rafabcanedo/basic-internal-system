package entity

import (
	"github.com/google/uuid"
	"github.com/rafabcanedo/basic-internal-system/internal-system-backend/internal/model/repository/entity/enums"
)

type TransactionsEntity struct {
	ID        uuid.UUID           `gorm:"type:uuid;default:uuid_generate_v4();primaryKey"`
	UserID    uuid.UUID           `gorm:"type:uuid;not null"`
	ContactID uuid.UUID           `gorm:"type:uuid;not null"`
	Value     string              `gorm:"type:text;not null"`
	Category  enums.TransactionsCategory `gorm:"type:varchar(20);not null"`

	User    UsersEntity    `gorm:"constraint:OnDelete:CASCADE;"`
	Contact ContactsEntity `gorm:"constraint:OnDelete:CASCADE;"`
}
