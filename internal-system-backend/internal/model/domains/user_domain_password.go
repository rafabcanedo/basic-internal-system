package domains

import "golang.org/x/crypto/bcrypt"

func (ud *userDomain) EncryptPassword() error {
	hash, err := bcrypt.GenerateFromPassword([]byte(ud.password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	ud.password = string(hash)
	return nil
}

func (ud *userDomain) ComparePassword(candidate string) error {
    return bcrypt.CompareHashAndPassword([]byte(ud.password), []byte(candidate))
}