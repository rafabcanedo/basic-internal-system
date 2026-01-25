package entity

import "github.com/google/uuid"

type UsersEntity struct {
	ID uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primaryKey"`
	Name string `gorm:"type:varchar(50);not null"`
	Email string `gorm:"type:varchar(50);unique;not null"`
	Password string `gorm:"type:varchar(50);not null"`
	Phone string `gorm:"type:varchar(20);not null"`

	Contacts []ContactsEntity `gorm:"many2many:user_contacts;"`
	Costs        []CostEntity        `gorm:"foreignKey:UserID"`
	Transactions []TransactionsEntity `gorm:"foreignKey:UserID"`
}
