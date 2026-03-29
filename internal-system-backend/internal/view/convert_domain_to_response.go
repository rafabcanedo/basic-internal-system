package view

import (
	"github.com/rafabcanedo/basic-internal-system/internal-system-backend/internal/model/domains"
	"github.com/rafabcanedo/basic-internal-system/internal-system-backend/internal/view/response"
)

func ConvertDomainToResponse(
	userDomain domains.UserDomainInterface,
) response.UserResponse {
	return response.UserResponse{
		ID:    userDomain.GetID(),
		Name:  userDomain.GetName(),
		Email: userDomain.GetEmail(),
		Phone: userDomain.GetPhone(),
	}
}

func ConvertDomainListToResponse(usersDomain []domains.UserDomainInterface) []response.UserResponse {
	usersResponse := make([]response.UserResponse, len(usersDomain))

	for i, user := range usersDomain {
		usersResponse[i] = ConvertDomainToResponse(user)
	}
	return usersResponse
}

func ConvertContactDomainToResponse(
	contactDomain domains.ContactDomainInterface,
) response.ContactResponse {
	return response.ContactResponse{
		ID:       contactDomain.GetID(),
		Name:     contactDomain.GetName(),
		Email:    contactDomain.GetEmail(),
		Phone:    contactDomain.GetPhone(),
		Category: contactDomain.GetCategory(),
	}
}

func ConvertContactDomainListToResponse(contacts []domains.ContactDomainInterface) []response.ContactResponse {
	contactsResponse := make([]response.ContactResponse, len(contacts))

	for i, contact := range contacts {
		contactsResponse[i] = ConvertContactDomainToResponse(contact)
	}
	return contactsResponse
}
