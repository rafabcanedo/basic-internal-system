package entity

import (
	"time"

	"github.com/google/uuid"
	"github.com/rafabcanedo/basic-internal-system/internal-system-backend/internal/model/repository/entity/enums"
)

type CostEntity struct {
	ID              uuid.UUID          `gorm:"type:uuid;default:gen_random_uuid();primaryKey"`
	UserID          uuid.UUID          `gorm:"type:uuid;not null"`
	GroupID         uuid.UUID          `gorm:"type:uuid;not null"`
	CostName        string             `gorm:"type:varchar(100);not null"`
	TotalValue      float64            `gorm:"type:decimal(10,2);not null"`
	OwnerPercentage float64            `gorm:"type:decimal(5,2);not null"`
	Category        enums.CostCategory `gorm:"type:varchar(20);not null"`
	CreatedAt       time.Time
	UpdatedAt       time.Time

	User UsersEntity `gorm:"foreignKey:UserID;constraint:OnDelete:CASCADE;"`
}
