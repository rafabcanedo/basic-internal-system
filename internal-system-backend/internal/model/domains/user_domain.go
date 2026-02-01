package domains

type userDomain struct {
	id       string
	name     string
	email    string
	password string
	phone    string
}

func NewUserDomain(name, email, password, phone string) UserDomainInterface {
	return &userDomain{
		name:     name,
		email:    email,
		password: password,
		phone:    phone,
	}
}

func NewUserDomainWithID(id, name, email, password, phone string) UserDomainInterface {
	return &userDomain{
		id:       id,
		name:     name,
		email:    email,
		password: password,
		phone:    phone,
	}
}

func (ud *userDomain) GetID() string {
	return ud.id
}

func (ud *userDomain) SetID(id string) {
	ud.id = id
}

func (ud *userDomain) GetName() string {
	return ud.name
}

func (ud *userDomain) SetName(name string) {
	ud.name = name
}

func (ud *userDomain) GetEmail() string {
	return ud.email
}

func (ud *userDomain) SetEmail(email string) {
	ud.email = email
}

func (ud *userDomain) GetPassword() string {
	return ud.password
}

func (ud *userDomain) SetPassword(password string) {
	ud.password = password
}

func (ud *userDomain) GetPhone() string {
	return ud.phone
}

func (ud *userDomain) SetPhone(phone string) {
	ud.phone = phone
}