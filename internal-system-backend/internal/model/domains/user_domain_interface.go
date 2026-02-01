package domains

type UserDomainInterface interface {
	GetID() string
	SetID(id string)

	GetName() string
	SetName(name string)

	GetEmail() string
	SetEmail(email string)

	GetPassword() string
	SetPassword(password string)

	GetPhone() string
	SetPhone(phone string)
}