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

func ConvertGroupDomainToResponse(domain domains.GroupDomainInterface) response.GroupResponse {
	return response.GroupResponse{
		ID:        domain.GetID(),
		Name:      domain.GetName(),
		Category:  domain.GetCategory(),
		CreatedAt: domain.GetCreatedAt(),
		UpdatedAt: domain.GetUpdatedAt(),
	}
}

func ConvertGroupDomainListToResponse(groups []domains.GroupDomainInterface) []response.GroupResponse {
	groupsResponse := make([]response.GroupResponse, len(groups))

	for i, group := range groups {
		groupsResponse[i] = ConvertGroupDomainToResponse(group)
	}
	return groupsResponse
}

func ConvertGroupDomainToDetailResponse(domain domains.GroupDomainInterface) response.GroupDetailResponse {
	members := make([]response.MemberResponse, len(domain.GetMembers()))

	for i, m := range domain.GetMembers() {
		members[i] = response.MemberResponse{
			ID:    m.ID,
			Name:  m.Name,
			Email: m.Email,
		}
	}

	return response.GroupDetailResponse{
		ID:        domain.GetID(),
		Name:      domain.GetName(),
		Category:  domain.GetCategory(),
		CreatedAt: domain.GetCreatedAt(),
		UpdatedAt: domain.GetUpdatedAt(),
		Members:   members,
	}
}
