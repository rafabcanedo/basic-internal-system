package entity

import (
	"time"

	"github.com/google/uuid"
)

type CostSplitEntity struct {
	ID         uuid.UUID `gorm:"type:uuid;default:gen_random_uuid();primaryKey"`
	CostID     uuid.UUID `gorm:"type:uuid;not null;index"`
	ContactID  uuid.UUID `gorm:"type:uuid;not null"`
	Value      float64   `gorm:"type:numeric(10,2);not null"`
	Percentage float64   `gorm:"type:numeric(5,2);not null"`
	CreatedAt  time.Time
	UpdatedAt  time.Time

	Cost    CostEntity    `gorm:"foreignKey:CostID;constraint:OnDelete:CASCADE;"`
	Contact ContactEntity `gorm:"foreignKey:ContactID;constraint:OnDelete:CASCADE;"`
}
