package entity

import (
	"github.com/google/uuid"
	"github.com/rafabcanedo/basic-internal-system/internal-system-backend/internal/model/repository/entity/enums"
)

type ContactsEntity struct {
	ID       uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primaryKey"`

	Name string `gorm:"type:varchar(50)"`
	Email string `gorm:"type:varchar(50)"`
	Phone string `gorm:"type:varchar(20)"`
	Category enums.ContactsCategory  `gorm:"type:varchar(20);not null"`

	Users        []UsersEntity        `gorm:"many2many:user_contacts;"`
	Costs        []CostEntity        `gorm:"foreignKey:ContactID"`
	Transactions []TransactionsEntity `gorm:"foreignKey:ContactID"`
}
