package domains

type contactDomain struct {
	id       string
	ownerID  string
	name     string
	email    string
	phone    string
	category string
}

func NewContactDomain(ownerID, name, email, phone, category string) ContactDomainInterface {
	return &contactDomain{
		ownerID:  ownerID,
		name:     name,
		email:    email,
		phone:    phone,
		category: category,
	}
}

func NewContactDomainWithID(id, ownerID, name, email, phone, category string) ContactDomainInterface {
	return &contactDomain{
		id:       id,
		ownerID:  ownerID,
		name:     name,
		email:    email,
		phone:    phone,
		category: category,
	}
}

func (cd *contactDomain) GetID() string {
	return cd.id
}

func (cd *contactDomain) SetID(id string) {
	cd.id = id
}

func (cd *contactDomain) GetOwnerID() string {
	return cd.ownerID
}

func (cd *contactDomain) SetOwnerID(id string) {
	cd.ownerID = id
}

func (cd *contactDomain) GetName() string {
	return cd.name
}

func (cd *contactDomain) SetName(name string) {
	cd.name = name
}

func (cd *contactDomain) GetEmail() string {
	return cd.email
}

func (cd *contactDomain) SetEmail(email string) {
	cd.email = email
}

func (cd *contactDomain) GetPhone() string {
	return cd.phone
}

func (cd *contactDomain) SetPhone(phone string) {
	cd.phone = phone
}

func (cd *contactDomain) GetCategory() string {
	return cd.category
}

func (cd *contactDomain) SetCategory(category string) {
	cd.category = category
}
