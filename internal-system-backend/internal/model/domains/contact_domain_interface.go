package domains

type ContactDomainInterface interface {
	GetID() string
	SetID(id string)

	GetOwnerID() string
	SetOwnerID(id string)

	GetName() string
	SetName(name string)

	GetEmail() string
	SetEmail(email string)

	GetPhone() string
	SetPhone(phone string)

	GetCategory() string
	SetCategory(category string)
}
